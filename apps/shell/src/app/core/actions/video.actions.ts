import { createAction, props } from '@ngrx/store';

export const setVideoSearchQuery = createAction('[HEADER] Set Video Search Query', props<{ payload: string }>());
