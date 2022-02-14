import { createAction, props } from '@ngrx/store';

export const login = createAction('[AUTH] Login', props<{ payload: any }>());
export const logout = createAction('[AUTH] Logout');
