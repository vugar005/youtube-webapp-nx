import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MiniVideoPayload } from '@youtube/common-ui';
import { Observable } from 'rxjs';
import { VideoStoreService } from './core/services/video-store/video-store.service';

@Component({
  selector: 'yt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public miniVideo$?: Observable<MiniVideoPayload>;
  public isMiniPlayerMode$?: Observable<boolean>;

  constructor(private videoStore: VideoStoreService, private router: Router) {}

  public ngOnInit(): void {
    this.selectStoreData();
  }

  public onCloseVideo(): void {
    this.videoStore.setIsMiniPlayerMode(false);
  }

  public onExpandVideo(videoPayload: MiniVideoPayload): void {
    const { videoId, startSeconds } = videoPayload;
    this.videoStore.setIsMiniPlayerMode(false);
    this.videoStore.setMiniPlayerVideo({ videoId: null, startSeconds: 0 });
    this.router.navigate(['/watch'], { queryParams: { v: videoId, t: startSeconds } });
  }

  private selectStoreData(): void {
    this.miniVideo$ = this.videoStore.selectMiniPlayerVideo();
    this.isMiniPlayerMode$ = this.videoStore.selectIsMiniPlayerMode();
  }
}
