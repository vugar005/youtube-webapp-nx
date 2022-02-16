export interface CustomEventConfig {
  detail?: any;
  view?: boolean;
  bubbles?: boolean;
  cancelable?: boolean;
}

export enum WatchAPPEvents {
  TOGGLE_LIKE_VIDEO = `WATCH_APP: Toggle Like Video`,
  TOGGLE_DISLIKE_VIDEO = `WATCH_APP: Toggle Dislike Video`,
}
