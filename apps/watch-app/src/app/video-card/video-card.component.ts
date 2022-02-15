import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IYoutubeSearchResult } from '@youtube/common-ui';

@Component({
  selector: 'watch-app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoCardComponent implements OnInit {
  @Input() videoId!: string;
  @Input() videoResult?: IYoutubeSearchResult;
  constructor() {}

  ngOnInit(): void {}
}
