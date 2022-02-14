import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'yt-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  @Input() videoId?: string;
  @Input() startSeconds? = 1;
  @Input() width?: number;
  @Input() height = 170;
  @Input() playerVars?: YT.PlayerVars = {
    showinfo: 0,
    modestbranding: 0
  };
  public isIframLoaded!: boolean;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.loadIframScript();
  }

  public ngAfterViewInit(): void {
    this.setVideoDimensions();
  }

  public onReady(event: YT.PlayerEvent): void {
    console.log(event);
    setTimeout(() => {
    //  event.target.playVideo();
    }, 0)
  }

  private loadIframScript(): void {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.setAttribute('allow', 'autoplay');
    document.body.appendChild(script);
  }

  private setVideoDimensions(): void {
    const el = document.getElementsByClassName('video-player')[0];
    console.log(el);
    this.width = el.clientWidth;
    console.log(this.width)
    this.cdr.detectChanges();
  }

}
