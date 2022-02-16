import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'youtube-webapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Input() likedVideoList?: string[];

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.connectRouter();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    // const likedVideoListChange = changes && changes['likedVideoList'];
    // const dislikedVideosListChange = changes && changes['dislikedVideosList'];
    // if (likedVideoListChange) {
    //   const likedVideoListData = likedVideoListChange.currentValue;
    //   const data = likedVideoListData ? likedVideoListData.split(',') : [];
    //   this.uiStore.setLikedVideosList({ videoIds: data });
    // }
  }

  private connectRouter(): void {
    const url = `${location.pathname.substr(1)}${location.search}`;
    this.router.navigateByUrl(url);
    window.addEventListener('popstate', () => {
      this.router.navigateByUrl(url);
    });
  }
}
