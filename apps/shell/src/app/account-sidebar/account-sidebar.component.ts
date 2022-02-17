import { ViewportScrollPosition } from '@angular/cdk/scrolling';
import { Component, OnInit, ChangeDetectionStrategy, VERSION } from '@angular/core';

@Component({
  selector: 'yt-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrls: ['./account-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSidebarComponent implements OnInit {
  public readonly version = VERSION.full;

  constructor() {}

  ngOnInit(): void {}
}
