
import { AppActions, AppActionTypes } from '../actions/app.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: AppActions): State {
  switch (action.type) {

    case AppActionTypes.LoadApps:
      return state;

    default:
      return state;
  }
}
