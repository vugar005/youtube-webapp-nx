import { createAction, props } from '@ngrx/store';

export const login = createAction('[Account] Login');
export const logout = createAction('[Account] Logout');

export const toggleLikeVideo = createAction('[Account] Toggle Like Video', props<{ videoId: string }>());

export const toggleDislikeVideo = createAction('[Account] Toggle Dislike Video', props<{ videoId: string }>());
