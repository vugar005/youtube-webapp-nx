import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
  OnDestroy,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'yt-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Output() readonly stateChange = new EventEmitter<YT.PlayerState>();
  @Input() videoId?: string;
  @Input() startSeconds? = 1;
  @Input() width?: number;
  @Input() height = 170;
  @Input() playerVars?: YT.PlayerVars = {
    showinfo: 0,
    modestbranding: 0,
  };
  public isIframLoaded!: boolean;

  private playerRef?: YT.Player;

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

  public ngOnChanges(changes: SimpleChanges): void {
      const videoIdChange = changes['videoId'];
      console.log(videoIdChange)
      if (videoIdChange && !videoIdChange.isFirstChange) {
         this.player?.loadVideoById(videoIdChange.currentValue, 0);
      }
  }

  public onReady(event: YT.PlayerEvent): void {
    console.log(event);
    this.playerRef = event.target;
    this.stateChange.next(this.playerRef.getPlayerState());
  //  event.target.playVideo();
  }

  public onStateChange(event: YT.OnStateChangeEvent): void {
    this.stateChange.next(event.data);
  }

  public get player(): YT.Player | undefined {
    return this.playerRef;
  }

  private loadIframScript(): void {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);
    script.addEventListener('load', () => {
      this.isIframLoaded = true;
      this.cdr.detectChanges();
    });
  }

  private listenToWindowResize(): void {
    fromEvent(window, 'resize')
      .pipe(debounceTime(200), takeUntil(this.onDestroy$))
      .subscribe(() => this.setVideoDimensions());
  }

  private setVideoDimensions(): void {
    const el = this.element.nativeElement.parentElement;
    this.width = el.clientWidth;
    this.height = el.clientHeight;
    this.cdr.detectChanges();
  }
}
