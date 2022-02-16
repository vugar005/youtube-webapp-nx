import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDispatcherService, LikedAppEvent } from '@youtube/common-ui';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AccountStoreService } from '../core/services/account-store/account-store.service';
import { registry } from '../registry';

@Component({
  selector: 'yt-likes-app-wrapper',
  templateUrl: './likes-app-wrapper.component.html',
  styleUrls: ['./likes-app-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LikesAppWrapperComponent implements OnInit {
  public isElementLoaded?: boolean;
  public likedVideosList$!: Observable<string[]>;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
      .on(LikedAppEvent.WATCH_VIDEO)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: Partial<CustomEvent>) => {
        const videoId = event.detail.videoId;
        this.router.navigate(['/watch'], { queryParams: { v: videoId } });
      });
  }

  private initStoreData(): void {
    this.likedVideosList$ = this.accountStore.selectLikedVideoList();
  }
}
