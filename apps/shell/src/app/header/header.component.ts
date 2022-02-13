import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'yt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() readonly toggleMenu = new EventEmitter<void>();

  public onToggleMenu(): void {
    this.toggleMenu.next();
  }
}
