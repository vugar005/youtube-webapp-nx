import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { YoutubeService } from '@youtube/common-ui';
import { YoutubeSearchResultItem } from 'libs/ui/src/lib/models/youtube-search-list.model';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { VideoStoreService } from '../core/services/video-store/video-store.service';

@Component({
  selector: 'yt-browse-videos',
  templateUrl: './browse-videos.component.html',
  styleUrls: ['./browse-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseVideosComponent implements OnInit, OnDestroy {
  public videoLinks: YoutubeSearchResultItem[] = [];
  public videoWidth?: number;
  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private videoStore: VideoStoreService,
    private youtubeService: YoutubeService,
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
    // this.listenToSearchQuery();
  }

  private listenToSearchQuery(): void {
    this.videoStore
      .selectSearchQuery()
      .pipe(
        switchMap((query: string) => this.youtubeService.searchVideoResults(query)),
        map((results) => results.items),
        takeUntil(this.onDestroy$)
      )
      .subscribe((items: YoutubeSearchResultItem[]) => {
        this.videoLinks = items;
        this.cdr.detectChanges();
      });
  }
}
