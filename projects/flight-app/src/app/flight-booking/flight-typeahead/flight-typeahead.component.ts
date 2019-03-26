import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subscription, Observable, Subject } from 'rxjs';
import { map, skip, tap, takeUntil, share, bufferCount, debounceTime, switchMap, filter, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-api';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number[]>;
  timerSubscription: Subscription;
  destroy$ = new Subject<boolean>();

  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    //this.rxDemo();
    this.initTypeahead();
  }

  rxDemo(): void {
    this.timer$ = timer(0, 1000)
      .pipe(
        takeUntil(this.destroy$),
        //skip(1),        
        bufferCount(3, 3),
        /* map(value => { [
          ...value.slice(0, 1),
          10 * value[2]
        ] }), */
        tap(value => console.log(value)),
        //share()
      );
    
/*     this.timerSubscription = this.timer$
      .subscribe(
        value => console.log(value)
      ); */
  }

  initTypeahead(): void {
    this.flights$ = this.control
      .valueChanges
      .pipe(
        debounceTime(300),
        filter((value: string) => value.length > 2),
        distinctUntilChanged(),
        tap(() => this.loading = true),
        switchMap(value => this.load(value)),
        tap(() => this.loading = false)
      );
  }

  load(from: string): Observable<Flight[]> {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http
      .get<Flight[]>(url, { params, headers });
  }

  ngOnDestroy(): void {
    //this.timerSubscription.unsubscribe();
    this.destroy$.next(true);
  }
}
