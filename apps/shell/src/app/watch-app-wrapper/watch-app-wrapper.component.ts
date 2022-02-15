import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { registry } from '../registry';

@Component({
  selector: 'yt-watch-app-wrapper',
  templateUrl: './watch-app-wrapper.component.html',
  styleUrls: ['./watch-app-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchAppWrapperComponent implements OnInit, OnDestroy {

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
        console.log(`element ${elementName} loaded!`);
        this.isElementLoaded = true;
        this.cdr.detectChanges();
      })
      .catch((err: Error) => console.error(`error loading ${elementName}:`, err));
  }

}
