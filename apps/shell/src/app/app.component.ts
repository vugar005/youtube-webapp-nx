import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { IYoutubeService, YOUTUBE_SERVICE } from '@youtube/common-ui';

@Component({
  selector: 'yt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'shell';
  constructor(@Inject(YOUTUBE_SERVICE) private youtubeService: IYoutubeService) {
    // this.youtubeService.searchVideoResults('roudeep').subscribe(res => console.log(res))
  }
}
