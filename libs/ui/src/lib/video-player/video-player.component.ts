import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
  OnDestroy,
} from '@angular/core';
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
    event.target.playVideo();
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
