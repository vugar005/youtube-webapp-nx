import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'yt-video-thumbnail-loader',
  templateUrl: './video-thumbnail-loader.component.html',
  styleUrls: ['./video-thumbnail-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoThumbnailLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
