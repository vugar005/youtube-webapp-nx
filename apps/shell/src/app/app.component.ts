import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventDispatcherService, GlobalCustomEvent, MiniVideoPayload } from '@youtube/common-ui';
import { Observable, Subject, takeUntil } from 'rxjs';

import { VideoStoreService } from './core/services/video-store/video-store.service';

@Component({
  selector: 'yt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public miniVideo$?: Observable<MiniVideoPayload>;
  public isMiniPlayerMode$?: Observable<boolean>;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private videoStore: VideoStoreService,
    private router: Router,
    private eventDispatcher: EventDispatcherService
  ) {}

  public ngOnInit(): void {
    this.selectStoreData();
    this.initGlobalEventListeners();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onCloseVideo(): void {
    this.videoStore.setIsMiniPlayerMode(false);
  }

  public onExpandVideo(videoPayload: MiniVideoPayload): void {
    const { videoId, startSeconds } = videoPayload;
    this.videoStore.setIsMiniPlayerMode(false);
    this.videoStore.setMiniPlayerVideo({ videoId: null, startSeconds: 0 });
    this.router.navigate(['/watch'], { queryParams: { v: videoId, t: startSeconds } });
  }

  private selectStoreData(): void {
    this.miniVideo$ = this.videoStore.selectMiniPlayerVideo();
    this.isMiniPlayerMode$ = this.videoStore.selectIsMiniPlayerMode();
  }

  private initGlobalEventListeners(): void {
    this.eventDispatcher
      .on(GlobalCustomEvent.WATCH_VIDEO)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: Partial<CustomEvent>) => {
        const videoId = event.detail.videoId;
        this.videoStore.setIsMiniPlayerMode(false);
        this.videoStore.setMiniPlayerVideo({ videoId: null, startSeconds: 0 });
        this.router.navigate(['/watch'], { queryParams: { v: videoId } });
      });
  }
}
