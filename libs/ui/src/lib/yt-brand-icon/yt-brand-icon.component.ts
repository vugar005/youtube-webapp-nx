import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'yt-brand-icon',
  templateUrl: './yt-brand-icon.component.html',
  styleUrls: ['./yt-brand-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YtIconComponent {
  @Input() width?: string | number;
}
