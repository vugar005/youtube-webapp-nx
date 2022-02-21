import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { VideoPlayerComponent } from '@youtube/common-ui';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'yt-mini-player',
  templateUrl: './mini-player.component.html',
  styleUrls: ['./mini-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniPlayerComponent implements OnInit {
  @ViewChild(VideoPlayerComponent) videoPlayerRef?: VideoPlayerComponent;
  public readonly playerVars: YT.PlayerVars = {
    modestbranding: 0,
    controls: 0,
  };

  public isPointEventsEnabled?: boolean;
  public playerState?: YT.PlayerState;
  public videoId?: string = 'fHgNUHtOxyA';

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  public onPlayToggle(): void {
    const playerRef = this.videoPlayerRef?.player;
    const playerState = playerRef?.getPlayerState();
    if (playerState === 1) {
      playerRef?.pauseVideo();
    } else if (playerState === 2){
      playerRef?.playVideo();
    }
  }

  public onPlayerStateChange(state: YT.PlayerState): void {
    console.log(state);
    this.playerState = state;
    this.cdr.detectChanges();
  }

  public get isPlayerControlsVisible(): boolean {
    return this.playerState === 1 || this.playerState === 2;
  }

  private listenToScroll(): void {
    const element = document.getElementsByClassName('mat-drawer-content')?.[0];
    if (!element) { return; }
    fromEvent(element, 'scroll').subscribe(() => {

    });
  }

}
