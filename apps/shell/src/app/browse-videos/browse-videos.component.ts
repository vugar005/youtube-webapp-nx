import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'yt-browse-videos',
  templateUrl: './browse-videos.component.html',
  styleUrls: ['./browse-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowseVideosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
