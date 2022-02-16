import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UIStoreService } from './core/services/ui-store/ui-store.service';

@Component({
  selector: 'youtube-webapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Input() likedVideoList?: string[];

  constructor(private router: Router, private uiStore: UIStoreService) {}

  public ngOnInit(): void {
    this.connectRouter();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    const likedVideoListChange = changes && changes['likedVideoList'];
    if (likedVideoListChange) {
      const likedVideoListData = likedVideoListChange.currentValue;
      const data = likedVideoListData ? likedVideoListData.split(',') : [];
      this.uiStore.setLikedVideosList({ videoIds: data });
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
