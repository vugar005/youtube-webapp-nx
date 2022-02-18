import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'yt-video-thumbnail-loader',
  templateUrl: './video-thumbnail-loader.component.html',
  styleUrls: ['./video-thumbnail-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoThumbnailLoaderComponent implements OnInit {
  @Input() direction?: 'vertical' | 'horizontal';
  constructor() {}

  ngOnInit(): void {}
}
