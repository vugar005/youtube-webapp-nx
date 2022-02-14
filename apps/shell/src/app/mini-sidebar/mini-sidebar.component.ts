import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MINI_SIDEBAR_NAV_ENDPOINTS } from './mini-sidebar.constants';

@Component({
  selector: 'yt-mini-sidebar',
  templateUrl: './mini-sidebar.component.html',
  styleUrls: ['./mini-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniSidebarComponent implements OnInit {
  public readonly endpoints = MINI_SIDEBAR_NAV_ENDPOINTS;
  constructor() { }

  ngOnInit(): void {
  }

}
