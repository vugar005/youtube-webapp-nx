import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLikedVideos, selectDislikedVideos } from '../../../reducers';
import { AccountActions } from '../../actions';

@Injectable({ providedIn: 'root' })
export class AccountStoreService {
  constructor(private store: Store) {}

  public toggleLikeVideo(payload: { videoId: string }): void {
    this.store.dispatch(AccountActions.toggleLikeVideo(payload));
  }

  public selectLikedVideoList(): Observable<string[]> {
    return this.store.select(selectLikedVideos);
  }

  public toggleDislikeVideo(payload: { videoId: string }): void {
    this.store.dispatch(AccountActions.toggleDislikeVideo(payload));
  }

  public selectDislikedVideoList(): Observable<string[]> {
    return this.store.select(selectDislikedVideos);
  }
}
