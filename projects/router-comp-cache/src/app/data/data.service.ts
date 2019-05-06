import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { CustomUrlSerializerService } from '../router/custom-url-serializer.service';
import { dynRoutes, State } from '../router/dyn-routes.config';

export interface RouteState {
  [key: string]: State;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  state$: BehaviorSubject<RouteState>;

  constructor(private urlService: CustomUrlSerializerService) {
    this.state$ = new BehaviorSubject(this.getStateFromConfig());
  }
  
  getStateFromConfig(): RouteState {
    const state: RouteState = {};
    Object.keys(dynRoutes.config).forEach(key =>
      state[key] = dynRoutes.config[key].data
    );
    return state;
  }

  selectByRoute$<T>(route: ActivatedRoute, slice: string): Observable<T> {
    const currentDynPath = this.urlService.getPathByRoute(route);
    return this.state$
      .pipe(
        pluck(currentDynPath),
        pluck(slice)
      );
  }
}
