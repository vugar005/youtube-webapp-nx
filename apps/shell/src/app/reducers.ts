import { Action, ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './core/reducers';
import { InjectionToken } from '@angular/core';

export interface AppState {
  [fromAuth.featureKey]: fromAuth.AuthState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState, Action>>('Root reducers token', {
  factory: () => ({
    [fromAuth.featureKey]: fromAuth.reducer,
  }),
});
