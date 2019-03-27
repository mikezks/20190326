import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap, switchMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { FlightBookingActionTypes, FlightBookingActions, FlightLoadAction, FlightsLoadedAction } from '../actions/flight-booking.actions';
import { FlightService } from '@flight-workspace/flight-api';


@Injectable()
export class FlightBookingEffects {


  @Effect()
  flightLoad$ = this.actions$
    .pipe(
      ofType(FlightBookingActionTypes.FlightLoadAction),
      switchMap(
        (a: FlightLoadAction) => this.flightService.find(a.from, a.to)
      ),
      map(flights => new FlightsLoadedAction(flights))
    );

  constructor(
    private actions$: Actions<FlightBookingActions>,
    private flightService: FlightService) {}

}
