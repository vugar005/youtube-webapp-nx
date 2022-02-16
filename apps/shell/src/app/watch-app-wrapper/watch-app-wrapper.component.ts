import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { EventDispatcherService, WatchAPPEvents } from '@youtube/common-ui';
import { Subject, takeUntil } from 'rxjs';
import { addVideoToLikeList, addVideoToUnLikeList, removeVideoFromLikeList } from '../core/actions/account.actions';
import { registry } from '../registry';

@Component({
  selector: 'yt-watch-app-wrapper',
  templateUrl: './watch-app-wrapper.component.html',
  styleUrls: ['./watch-app-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchAppWrapperComponent implements OnInit, OnDestroy {
  public isElementLoaded?: boolean;
  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private eventDispatcher: EventDispatcherService,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.loadElement();
    this.initWatchAppListeners();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public loadElement(): void {
    const elementName = this.route.snapshot.data['elementName'];
    const importName = this.route.snapshot.data['importName'];

    const importFn = registry[importName];
    importFn()
      .then(() => {
        console.log(`element ${elementName} loaded!`);
        this.isElementLoaded = true;
        this.cdr.detectChanges();
      })
      .catch((err: Error) => console.error(`error loading ${elementName}:`, err));
  }

  private initWatchAppListeners(): void {
    this.eventDispatcher
      .on(WatchAPPEvents.ADD_VIDEO_TO_LIKE_LIST)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: Partial<CustomEvent>) => {
        const videoId = event.detail.videoId;
        this.store.dispatch(addVideoToLikeList({ videoId }));
      });

    this.eventDispatcher
      .on(WatchAPPEvents.ADD_VIDEO_TO_UNLIKE_LIST)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: Partial<CustomEvent>) => {
        const videoId = event.detail.videoId;
        this.store.dispatch(addVideoToUnLikeList({ videoId }));
      });
  }
}
