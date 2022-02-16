import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CustomEventConfig, EventDispatcherService, IYoutubeSearchResult, WatchAPPEvents } from '@youtube/common-ui';
import { Subject, takeUntil } from 'rxjs';
import { UIStoreService } from '../core/services/ui-store/ui-store.service';

@Component({
  selector: 'watch-app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoCardComponent implements OnInit, OnDestroy {
  @Input() videoId!: string;
  @Input() videoResult?: IYoutubeSearchResult;
  public likedVideos: string[] = [];
  public dislikedVideos: string[] = [];

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private uiStore: UIStoreService,
    private eventDispatcher: EventDispatcherService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.initStoreData();
  }

  public get isLiked(): boolean {
    return this.likedVideos?.includes(this.videoId);
  }

  public get isDisLiked(): boolean {
    return this.dislikedVideos?.includes(this.videoId);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onToggleLike(): void {
    const config: CustomEventConfig = {
      detail: {
        videoId: this.videoId,
      },
    };

    this.eventDispatcher.dispatchEvent(WatchAPPEvents.TOGGLE_LIKE_VIDEO, config);
  }

  public onToggleDisLike(): void {
    const config: CustomEventConfig = {
      detail: {
        videoId: this.videoId,
      },
    };

    this.eventDispatcher.dispatchEvent(WatchAPPEvents.TOGGLE_DISLIKE_VIDEO, config);
  }

  private initStoreData(): void {
    this.uiStore
      .selectLikedVideos()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.likedVideos = data;
        this.cdr.detectChanges();
      });

    this.uiStore
      .selectDislikedVideos()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.dislikedVideos = data;
        this.cdr.detectChanges();
      });
  }
}
