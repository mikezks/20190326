import { Action } from '@ngrx/store';

export enum AppActionTypes {
  LoadApps = '[App] Load Apps',
  
  
}

export class LoadApps implements Action {
  readonly type = AppActionTypes.LoadApps;
}


export type AppActions = LoadApps;
