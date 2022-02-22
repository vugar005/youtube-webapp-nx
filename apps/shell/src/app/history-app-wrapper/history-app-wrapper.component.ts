import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { registry } from '../registry';

@Component({
  selector: 'yt-history-app-wrapper',
  templateUrl: './history-app-wrapper.component.html',
  styleUrls: ['./history-app-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryAppWrapperComponent implements OnInit, OnDestroy {
  public isElementLoaded?: boolean;

  private readonly onDestroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.loadElement();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public loadElement(): void {
    const elementName = this.route.snapshot.data['elementName'];
    const importName = this.route.snapshot.data['importName'];

    const importFn = registry[importName];
    importFn()
      .then(() => {
        this.isElementLoaded = true;
        this.cdr.detectChanges();
      })
      .catch((err: Error) => console.error(`error loading ${elementName}:`, err));
  }
}
