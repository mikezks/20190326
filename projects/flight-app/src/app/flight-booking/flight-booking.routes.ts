import {Routes} from '@angular/router';
import {FlightBookingComponent} from './flight-booking.component';
import {FlightEditComponent} from './flight-edit/flight-edit.component';
import {FlightSearchComponent} from './flight-search/flight-search.component';
import {PassengerSearchComponent} from './passenger-search/passenger-search.component';
import { FlightTypeaheadComponent } from './flight-typeahead/flight-typeahead.component';
import { AuthGuard } from '../shared/auth/auth.guard';

export const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: 'flight-booking',
    component: FlightBookingComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'flight-search',
        component: FlightSearchComponent
      },
      {
        path: 'flight-typeahead',
        component: FlightTypeaheadComponent
      },
      {
        path: 'passenger-search',
        component: PassengerSearchComponent
      },
      {
        path: 'flight-edit/:id',
        component: FlightEditComponent
      }
    ]
  }

]
