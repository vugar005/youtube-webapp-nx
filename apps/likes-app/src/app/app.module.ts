/*
 * This RemoteEntryModule is imported here to allow TS to find the Module during
 * compilation, allowing it to be included in the built bundle. This is required
 * for the Module Federation Plugin to expose the Module correctly.
 * */
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './home/home.component';
import { ROOT_REDUCERS } from './reducers';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  providers: [],
  bootstrap: [],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  public ngDoBootstrap(): void {
    const ce = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('likes-app-element', ce);
    // <watch-app-element></watch-app-element>
  }
}
