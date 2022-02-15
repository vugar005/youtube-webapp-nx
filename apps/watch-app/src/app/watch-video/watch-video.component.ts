import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IYoutubeSearchResult, IYoutubeService, YOUTUBE_SERVICE } from '@youtube/common-ui';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    this.setVideoId();
    this.getVideoInfo();
    this.listenToEvents();
  }

  public ngOnDestroy(): void {
    console.log('onDes')
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private setVideoId(): void {
    this.videoId = this.route.snapshot.queryParams['v'];
    this.cdr.detectChanges();
  }

  private listenToEvents(): void {
    this.route.queryParams.pipe(takeUntil(this.onDestroy$)).subscribe((event) => {
      console.log('queryCHange', event);
      this.setVideoId();
      this.getVideoInfo();
    });
  }

  private getVideoInfo(): void {
  //  console.log(this.videoId)
    this.youtubeService.searchVideoResults({query: this.videoId})
    .subscribe((results: IYoutubeSearchResult[]) => {
      this.videoInfo = results && results?.find(result => result.id?.videoId === this.videoId);
   //   console.log(results?.map(result => result.id.videoId));
     // console.log(this.videoInfo)
      this.cdr.detectChanges();
    });
  }
}
