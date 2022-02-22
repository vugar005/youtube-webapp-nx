import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  CustomEventConfig,
  EventDispatcherService,
  GlobalCustomEvent,
  IYoutubeSearchResult,
  IYoutubeService,
  YOUTUBE_SERVICE,
} from '@youtube/common-ui';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'watch-app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchVideoComponent implements OnInit, OnDestroy {
  public videoId!: string;
  public startSeconds?: number;
  public videoInfo?: IYoutubeSearchResult;
  private readonly onDestroy$ = new Subject<void>();

  constructor(
    @Inject(YOUTUBE_SERVICE) private youtubeService: IYoutubeService,
    private route: ActivatedRoute,
    private eventDispatcher: EventDispatcherService,
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
    this.route.queryParams
      .pipe(
        takeUntil(this.onDestroy$),
        tap((params: Params) => {
          this.videoId = params['v'];
          this.startSeconds = params['t'] || 1;
          this.cdr.detectChanges();
        }),
        switchMap(() => this.getVideoInfo())
      )
      .subscribe((results: IYoutubeSearchResult[]) => {
        this.videoInfo = results && results?.find((result) => result.id?.videoId === this.videoId);

        const config: CustomEventConfig = {
          detail: {
            videoId: this.videoId,
          },
        };

        this.eventDispatcher.dispatchEvent(GlobalCustomEvent.ADD_VIDEO_TO_WATCH_HISTORY, config);
        this.cdr.detectChanges();
      });
  }

  private getVideoInfo(): Observable<IYoutubeSearchResult[]> {
    return this.youtubeService.searchVideoResults({ query: this.videoId });
  }
}
