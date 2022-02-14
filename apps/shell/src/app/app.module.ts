import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing';
import { SearchBoxModule, VideoPlayerModule, VideoThumbnailModule, YOUTUBE_API_KEY, YTIconModule } from '@youtube/common-ui';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './reducers';
import { BrowseVideosComponent } from './browse-videos/browse-videos.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { MiniSidebarComponent } from './mini-sidebar/mini-sidebar.component';
@NgModule({
  declarations: [AppComponent, HeaderComponent, SidebarComponent, HomeComponent, BrowseVideosComponent, MiniSidebarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    YTIconModule,
    VideoPlayerModule,
    VideoThumbnailModule,
    SearchBoxModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      name: 'Youtube Shell Store',
    }),
  ],
  providers: [
    {
      provide: YOUTUBE_API_KEY,
      useValue: environment.youtubeApiKey
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
