import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SEARCH_RESULT_MOCK } from '@youtube/common-ui';

@Component({
  selector: 'watch-app-related-videos',
  templateUrl: './related-videos.component.html',
  styleUrls: ['./related-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedVideosComponent implements OnInit {
  public resultMock = SEARCH_RESULT_MOCK;
  constructor() {}

  ngOnInit(): void {}
}
