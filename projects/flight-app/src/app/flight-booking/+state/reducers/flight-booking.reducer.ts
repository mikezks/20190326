
import { FlightBookingActions, FlightBookingActionTypes } from '../actions/flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';
import { RootState } from '../../../+state';

export interface State {
  flights: Flight[];
}

export const initialState: State = {
  flights: []
};

export interface FeatureState extends RootState {
  flightBooking: State;
}

export function reducer(state = initialState, action: FlightBookingActions): State {
  switch (action.type) {

    case FlightBookingActionTypes.FLightsLoadedAction:
      return { ...state, flights: action.flights };

    default:
      return state;
  }
}
