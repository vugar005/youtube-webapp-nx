import { Component, ChangeDetectionStrategy, VERSION } from '@angular/core';

@Component({
  selector: 'yt-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrls: ['./account-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSidebarComponent {
  public readonly version = VERSION.full;
}
