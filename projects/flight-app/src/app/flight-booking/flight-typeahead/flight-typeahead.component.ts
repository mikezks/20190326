import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subscription, Observable, Subject } from 'rxjs';
import { map, skip, tap, takeUntil, share } from 'rxjs/operators';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  timerSubscription: Subscription;
  destroy$ = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    this.rxDemo();
  }

  rxDemo(): void {
    this.timer$ = timer(0, 1000)
      .pipe(
        takeUntil(this.destroy$),
        //skip(1),
        map(value => 10 * value),
        tap(value => console.log(value)),
        //share()
      );
    
/*     this.timerSubscription = this.timer$
      .subscribe(
        value => console.log(value)
      ); */
  }

  ngOnDestroy(): void {
    //this.timerSubscription.unsubscribe();
    this.destroy$.next(true);
  }
}
