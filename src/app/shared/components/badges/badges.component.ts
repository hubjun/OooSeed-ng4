import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'seed-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgesComponent {
  @Input() articles;
}
