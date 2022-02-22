import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UIStoreService } from './core/services/ui-store/ui-store.service';

@Component({
  selector: 'history-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  @Input() watchedVideoList?: string[];
  @Input() isWatchHistoryEnabled?: boolean;

  constructor(private router: Router, private uiStore: UIStoreService) {}

  public ngOnInit(): void {
    this.connectRouter();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const watchedVideosListChange = changes && changes['watchedVideoList'];
    const isWatchHistoryEnabledChange = changes && changes['isWatchHistoryEnabled'];
    console.log(watchedVideosListChange);
    if (watchedVideosListChange) {
      const watchedVideosListData = watchedVideosListChange.currentValue;
      const data = watchedVideosListData ? watchedVideosListData.split(',') : [];
      this.uiStore.setWatchedVideosList({ videoIds: data });
    }
    if (isWatchHistoryEnabledChange) {
      const isWatchHistoryEnabledValue = coerceBooleanProperty(isWatchHistoryEnabledChange.currentValue);
      this.uiStore.setIsWatchHistoryEnabled({ isEnabled: isWatchHistoryEnabledValue });
      console.log(isWatchHistoryEnabledValue);
    }
  }

  private connectRouter(): void {
    const url = `${location.pathname.substr(1)}${location.search}`;
    this.router.navigateByUrl(url);
    window.addEventListener('popstate', () => {
      this.router.navigateByUrl(url);
    });
  }
}
