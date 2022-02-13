import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'yt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() readonly openMenu = new EventEmitter<void>();

  public onOpenMenu(): void {
    console.log('openm');
    this.openMenu.next();
  }
}
