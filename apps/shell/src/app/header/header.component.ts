import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'yt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() readonly openMenu = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  public onOpenMenu(): void {
    console.log('openm');
    this.openMenu.next();
  }
}
