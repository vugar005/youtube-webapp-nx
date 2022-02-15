import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'watch-app-webapp-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchVideoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
