import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { IYoutubeService, IYoutubeSearchResult, YOUTUBE_SERVICE } from '@youtube/common-ui';
import { Subject, switchMap, takeUntil } from 'rxjs';
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
  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private videoStore: VideoStoreService,
     @Inject(YOUTUBE_SERVICE) private youtubeService: IYoutubeService,
     private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.listenToEvents();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private listenToEvents(): void {
    this.listenToSearchQuery();
  }

  private listenToSearchQuery(): void {
    this.videoStore
      .selectSearchQuery()
      .pipe(
        switchMap((query: string) => this.youtubeService.searchVideoResults({query})),
        takeUntil(this.onDestroy$)
      )
      .subscribe((items: IYoutubeSearchResult[]) => {
        this.videoLinks = items;
        this.cdr.detectChanges();
      });
  }
}
