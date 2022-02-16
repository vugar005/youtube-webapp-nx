import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { VideoStoreService } from '../core/services/video-store/video-store.service';

@Component({
  selector: 'yt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() readonly toggleMenu = new EventEmitter<void>();
  public searchControl = new FormControl();

  private readonly onDestroy$ = new Subject<void>();

  constructor(private videoStore: VideoStoreService, private router: Router) {}

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
