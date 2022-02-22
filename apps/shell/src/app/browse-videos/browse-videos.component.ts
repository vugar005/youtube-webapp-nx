import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IYoutubeService, IYoutubeSearchResult, YOUTUBE_SERVICE } from '@youtube/common-ui';
import { Subject, switchMap, take, takeUntil } from 'rxjs';
import { VideoStoreService } from '../core/services/video-store/video-store.service';

@Component({
  selector: 'yt-browse-videos',
  templateUrl: './browse-videos.component.html',
  styleUrls: ['./browse-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseVideosComponent implements OnInit, OnDestroy {
  public videoLinks: IYoutubeSearchResult[] = [];
  public videoWidth?: number;
  public items = new Array(20);

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private videoStore: VideoStoreService,
    @Inject(YOUTUBE_SERVICE) private youtubeService: IYoutubeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.listenToEvents();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onSelectVideo(videoId?: string): void {
    if (!videoId) {
      return;
    }
    this.videoStore
      .selectIsMiniPlayerMode()
      .pipe(take(1))
      .subscribe((isMiniMode: boolean) => {
        if (isMiniMode) {
          this.videoStore.setMiniPlayerVideo({ videoId, startSeconds: 1 });
        } else {
          this.router.navigate(['/watch'], { queryParams: { v: videoId, t: 1 } });
        }
      });
  }

  private listenToEvents(): void {
    this.listenToSearchQuery();
  }

  private listenToSearchQuery(): void {
    this.videoStore
      .selectSearchQuery()
      .pipe(
        switchMap((query: string) => this.youtubeService.searchVideoResults({ query })),
        takeUntil(this.onDestroy$)
      )
      .subscribe((items: IYoutubeSearchResult[]) => {
        this.videoLinks = items;
        this.cdr.detectChanges();
      });
  }
}
