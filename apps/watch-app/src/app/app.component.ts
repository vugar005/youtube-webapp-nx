import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'watch-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'watch-app';
  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.connectRouter();
  }

  private connectRouter(): void {
    const url = `${location.pathname.substr(1)}${location.search}`;
    this.router.navigateByUrl(url);
    window.addEventListener('popstate', () => {
      this.router.navigateByUrl(url);
    });
  }
}
