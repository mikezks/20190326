import { Action } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-api';

export enum FlightBookingActionTypes {
  FLightsLoadedAction = '[FlightBooking] Flights loaded',
  
  
}

export class FlightsLoadedAction implements Action {
  readonly type = FlightBookingActionTypes.FLightsLoadedAction;
  constructor(readonly flights: Flight[]) {}
}


export type FlightBookingActions = FlightsLoadedAction;
