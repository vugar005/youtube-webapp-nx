
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule],
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
