import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CustomEventConfig, EventDispatcherService, IYoutubeSearchResult, WatchAPPEvents } from '@youtube/common-ui';

@Component({
  selector: 'watch-app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoCardComponent implements OnInit {
  @Input() videoId!: string;
  @Input() videoResult?: IYoutubeSearchResult;

  constructor(private eventDispatcher: EventDispatcherService) {}

  ngOnInit(): void {}

  public onLikeVideo(): void {
    const config: CustomEventConfig = {
      detail: {
        videoId: this.videoId,
      },
    };

    this.eventDispatcher.dispatchEvent(WatchAPPEvents.ADD_VIDEO_TO_LIKE_LIST, config);
  }

  public onUnLikeVideo(): void {
    const config: CustomEventConfig = {
      detail: {
        videoId: this.videoId,
      },
    };

    this.eventDispatcher.dispatchEvent(WatchAPPEvents.ADD_VIDEO_TO_UNLIKE_LIST, config);
  }
}
