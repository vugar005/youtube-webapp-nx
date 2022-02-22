import { Component, ChangeDetectionStrategy, VERSION } from '@angular/core';
import { AppTheme } from '../core/services/theme-service/theme.constants';
import { ThemeService } from '../core/services/theme-service/theme.service';

@Component({
  selector: 'yt-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrls: ['./account-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSidebarComponent {
  public readonly version = VERSION.full;
  public readonly appTheme = AppTheme;

  constructor(private themeService: ThemeService) {}

  public onChangeTheme(theme: AppTheme): void {
    this.themeService.setTheme(theme);
  }
}
