import { ChangeDetectionStrategy, Component } from '@angular/core';
import { YoutubeService } from '@youtube/common-ui';

@Component({
  selector: 'yt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'shell';
  constructor(private youtubeService: YoutubeService) {
   // this.youtubeService.searchVideoResults('roudeep').subscribe(res => console.log(res))
  }
}
