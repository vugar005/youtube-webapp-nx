import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { SettingsStore } from '../core/services/settings-store/settings-store.service';
import { AppTheme } from '../core/services/theme-service/theme.constants';
import { ThemeService } from '../core/services/theme-service/theme.service';
import { VideoStoreService } from '../core/services/video-store/video-store.service';

@Component({
  selector: 'yt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() readonly toggleMenu = new EventEmitter<void>();
  @Output() readonly toggleAccountMenu = new EventEmitter<void>();
  public searchControl = new FormControl();

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private videoStore: VideoStoreService,
    private router: Router,
    private settingsStore: SettingsStore,
    private themeService: ThemeService
  ) {}

  public ngOnInit(): void {
    this.listenToEvents();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onToggleMenu(): void {
    this.toggleMenu.next();
  }

  public onToggleAccountMenu(): void {
    this.toggleAccountMenu.next();
  }

  public onChangeTheme(): void {
    this.settingsStore
      .selectTheme()
      .pipe(take(1))
      .subscribe((theme: AppTheme | null) => {
        console.log(theme);
        if (theme === AppTheme.DARK) {
          console.log('set light');
          this.themeService.setTheme(AppTheme.LIGHT);
        } else {
          console.log('set dark');
          this.themeService.setTheme(AppTheme.DARK);
        }
      });
  }

  private listenToEvents(): void {
    this.listenToSearchInput();
  }

  private listenToSearchInput(): void {
    this.searchControl.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((value) => {
      console.log(value);
      this.videoStore.setSearchQuery(value);
      this.router.navigate(['']);
    });
  }
}
