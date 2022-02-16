import { createReducer, on } from '@ngrx/store';
import { AccountActions } from '../actions';

export const featureKey = 'account';

export interface AccountState {
  likedVideoList: string[];
  dislikedVideoList: string[];
  isAuthenticated: boolean;
}

const initialState: AccountState = {
  likedVideoList: [],
  dislikedVideoList: [],
  isAuthenticated: false,
};

export const reducer = createReducer(
  initialState,
  on(AccountActions.login, (state) => ({
    ...state,
    isAuthenticated: true,
  })),
  on(AccountActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
  })),
  on(AccountActions.toggleLikeVideo, (state, payload) => {
    const likedVideoId = payload.videoId;
    let likedList = [...state.likedVideoList];
    const isAlreadyLiked = !!likedList.find((videoId: string) => videoId === likedVideoId);
    if (!isAlreadyLiked) {
      likedList.push(likedVideoId);
    } else {
      likedList = likedList.filter((videoId) => videoId !== likedVideoId);
    }
    return {
      ...state,
      likedVideoList: likedList,
    };
  }),
  on(AccountActions.toggleDislikeVideo, (state, payload) => {
    const dislikedVideoId = payload.videoId;
    let disikedList = [...state.dislikedVideoList];
    const isAlreadyDisLiked = !!disikedList.find((videoId: string) => videoId === dislikedVideoId);
    if (!isAlreadyDisLiked) {
      disikedList.push(dislikedVideoId);
    } else {
      disikedList = disikedList.filter((videoId) => videoId !== dislikedVideoId);
    }
    return {
      ...state,
      dislikedVideoList: disikedList,
    };
  })
);

export const selectLikedVideos = (state: AccountState) => state.likedVideoList;
export const selectDislikedVideos = (state: AccountState) => state.dislikedVideoList;
