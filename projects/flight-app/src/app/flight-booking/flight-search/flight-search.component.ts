import {Component, OnInit} from '@angular/core';
import {FlightService, Flight} from '@flight-workspace/flight-api';
import { Observable } from 'rxjs';
import * as fromFlightBooking from '../+state/reducers/flight-booking.reducer';
import { Store, select } from '@ngrx/store';
import { FlightsLoadedAction } from '../+state/actions/flight-booking.actions';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from: string = 'Hamburg'; // in Germany
  to: string = 'Graz'; // in Austria
  urgent: boolean = false;

  flights$: Observable<Flight[]>;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    private flightService: FlightService,
    private store: Store<fromFlightBooking.FeatureState>) {
  }

  ngOnInit() {
    this.flights$ = this.store
      .pipe(
        select(state => state.flightBooking.flights)
      );
  }

  search(): void {
    if (!this.from || !this.to) return;

/*     this.flightService
      .load(this.from, this.to, this.urgent); */
    
    this.flightService
      .find(this.from, this.to)
      .subscribe(
        flights =>
          this.store.dispatch(new FlightsLoadedAction(flights)),
        error =>
            console.error('error', error)
      );
  }

  delay(): void {
    this.flightService.delay();
  }

}
