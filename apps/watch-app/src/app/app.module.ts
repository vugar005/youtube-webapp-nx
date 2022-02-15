import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { WatchVideoComponent } from './watch-video/watch-video.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { VideoPlayerModule, VideoThumbnailModule, YoutubeServiceV2, YOUTUBE_SERVICE } from '@youtube/common-ui';
import { MatIconModule } from '@angular/material/icon';
import { RelatedVideosComponent } from './related-videos/related-videos.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, WatchVideoComponent, VideoCardComponent, RelatedVideosComponent],
  imports: [BrowserModule, HttpClientModule, VideoPlayerModule, VideoThumbnailModule, MatIconModule, AppRoutingModule],
  providers: [
    {
      provide: YOUTUBE_SERVICE,
      useClass: YoutubeServiceV2
    }
  ],
  bootstrap: [],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  public ngDoBootstrap(): void {
    const ce = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('watch-app-element', ce);
    // <watch-app-element></watch-app-element>
  }
}
