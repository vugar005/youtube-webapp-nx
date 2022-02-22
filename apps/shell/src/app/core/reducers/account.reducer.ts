import { createReducer, on } from '@ngrx/store';
import { AccountActions } from '../actions';

export const featureKey = 'account';

export interface AccountState {
  isAuthenticated: boolean;
  likedVideoList: string[];
  dislikedVideoList: string[];
  watchedVideos: string[];
  isWatchHistoryEnabled: boolean;
}

const initialState: AccountState = {
  likedVideoList: ['EbEswsDYFyM', 'hArGbyby5'],
  dislikedVideoList: [],
  isAuthenticated: false,
  watchedVideos: [],
  isWatchHistoryEnabled: true,
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
  }),
  on(AccountActions.addVideoToHistoryList, (state, payload) => {
    const videoId = payload.videoId;
    const watchedList = [...state.watchedVideos];
    watchedList.push(videoId);

    return {
      ...state,
      watchedVideos: watchedList,
    };
  }),
  on(AccountActions.clearWatchHistory, (state) => {
    return {
      ...state,
      watchedVideos: [],
    };
  }),
  on(AccountActions.toggleIsWatchHistoryEnabled, (state, payload) => {
    return {
      ...state,
      isWatchHistoryEnabled: payload.isActive,
    };
  })
);

export const selectLikedVideos = (state: AccountState) => state.likedVideoList;
export const selectDislikedVideos = (state: AccountState) => state.dislikedVideoList;
export const selectedWatchedVideos = (state: AccountState) => state.watchedVideos;
export const selectIsWatchHistoryEnabled = (state: AccountState) => state.isWatchHistoryEnabled;
