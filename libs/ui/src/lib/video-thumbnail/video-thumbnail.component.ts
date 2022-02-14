import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { VideoSnippet } from '../models/youtube-search-list.model';

@Component({
  selector: 'yt-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoThumbnailComponent implements OnInit {
  @Input() snippet?: VideoSnippet;
  constructor() { }

  ngOnInit(): void {
  }

}
