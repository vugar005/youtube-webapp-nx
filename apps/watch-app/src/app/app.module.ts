
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { WatchVideoComponent } from './watch-video/watch-video.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { VideoPlayerModule } from '@youtube/common-ui';

@NgModule({
  declarations: [AppComponent, WatchVideoComponent, VideoCardComponent],
  imports: [
    BrowserModule,
    VideoPlayerModule,
    AppRoutingModule
  ],
  providers: [],
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
