import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDispatcherService, WatchAPPEvents } from '@youtube/common-ui';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AccountStoreService } from '../core/services/account-store/account-store.service';
import { registry } from '../registry';

@Component({
  selector: 'yt-watch-app-wrapper',
  templateUrl: './watch-app-wrapper.component.html',
  styleUrls: ['./watch-app-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchAppWrapperComponent implements OnInit, OnDestroy {
  public isElementLoaded?: boolean;
  public likedVideosList$!: Observable<string[]>;
  public dislikedVideosList$!: Observable<string[]>;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private eventDispatcher: EventDispatcherService,
    private accountStore: AccountStoreService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.loadElement();
    this.initStoreData();
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
      .on(WatchAPPEvents.TOGGLE_LIKE_VIDEO)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: Partial<CustomEvent>) => {
        const videoId = event.detail.videoId;
        this.accountStore.toggleLikeVideo({ videoId });
      });

    this.eventDispatcher
      .on(WatchAPPEvents.TOGGLE_DISLIKE_VIDEO)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: Partial<CustomEvent>) => {
        const videoId = event.detail.videoId;
        this.accountStore.toggleDislikeVideo({ videoId });
      });
  }

  private initStoreData(): void {
    this.likedVideosList$ = this.accountStore.selectLikedVideoList();
    this.dislikedVideosList$ = this.accountStore.selectDislikedVideoList();
  }
}
