import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'watch-app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
