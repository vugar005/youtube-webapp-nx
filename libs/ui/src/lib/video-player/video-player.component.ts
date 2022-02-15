import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'yt-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() videoId?: string;
  @Input() startSeconds? = 1;
  @Input() width?: number;
  @Input() height = 170;
  @Input() playerVars?: YT.PlayerVars = {
    showinfo: 0,
    modestbranding: 0,
  };
  public isIframLoaded!: boolean;

  private readonly onDestroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef, private element: ElementRef) {}

  public ngOnInit(): void {
    this.loadIframScript();
    this.listenToWindowResize();
  }

  public ngOnDestroy(): void {
      this.onDestroy$.next();
      this.onDestroy$.complete();
  }

  public ngAfterViewInit(): void {
    this.setVideoDimensions();
  }

  public onReady(event: YT.PlayerEvent): void {
    console.log(event);
    setTimeout(() => {
      //  event.target.playVideo();
    }, 0);
  }

  private loadIframScript(): void {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.setAttribute('allow', 'autoplay');
    document.body.appendChild(script);
  }

  private listenToWindowResize(): void {
    fromEvent(window, 'resize')
    .pipe(
      debounceTime(200),
      takeUntil(this.onDestroy$)
    ).subscribe(event => this.setVideoDimensions())
  }

  private setVideoDimensions(): void {
   // const el = document.getElementsByClassName('video-player')[0];
    const el = this.element.nativeElement.parentElement;
    console.log(el);
    this.width = el.clientWidth;
    this.height = el.clientHeight;
    console.log(this.width);
    this.cdr.detectChanges();
  }
}
