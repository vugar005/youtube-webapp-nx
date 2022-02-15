import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'watch-app-webapp-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchVideoComponent implements OnInit, OnDestroy {
  public videoId?: string;

  private readonly onDestroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.setVideoId();
    this.listenToEvents();
  }

  public ngOnDestroy(): void {
      this.onDestroy$.next();
      this.onDestroy$.complete();
  }

  private setVideoId(): void {
    this.videoId = this.route.snapshot.queryParams['v'];
    this.cdr.detectChanges();
  }

  private listenToEvents(): void {
    this.route.queryParams
    .pipe(
      takeUntil(this.onDestroy$)
    )
    .subscribe(() => {
      this.setVideoId();
    });
  }

}
