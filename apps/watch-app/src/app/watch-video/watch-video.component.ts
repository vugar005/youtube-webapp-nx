import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IYoutubeSearchResult, IYoutubeService, YOUTUBE_SERVICE } from '@youtube/common-ui';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'watch-app-webapp-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchVideoComponent implements OnInit, OnDestroy {
  public videoId!: string;
  public videoInfo?: IYoutubeSearchResult;
  private readonly onDestroy$ = new Subject<void>();

  constructor(
    @Inject(YOUTUBE_SERVICE) private youtubeService: IYoutubeService,
    private route: ActivatedRoute, private cdr: ChangeDetectorRef
    ) {}

  public ngOnInit(): void {
    this.listenToEvents();
  }

  public ngOnDestroy(): void {
    console.log('onDes')
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private listenToEvents(): void {
    this.route.queryParams.pipe(
      takeUntil(this.onDestroy$),
      tap((params: Params) => {
        this.videoId = params['v'];
        console.log(params);
        this.cdr.detectChanges();
      }),
      switchMap(() => this.getVideoInfo()))
      .subscribe((results: IYoutubeSearchResult[]) => {
        this.videoInfo = results && results?.find(result => result.id?.videoId === this.videoId);
        this.cdr.detectChanges();
      });
  }

  private getVideoInfo(): Observable<IYoutubeSearchResult[]> {
    return this.youtubeService.searchVideoResults({query: this.videoId});

  }
}
