import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDispatcherService } from '@youtube/common-ui';
import { Observable, Subject } from 'rxjs';
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

  private initWatchAppListeners(): void {}

  private initStoreData(): void {
    this.likedVideosList$ = this.accountStore.selectLikedVideoList();
  }
}
