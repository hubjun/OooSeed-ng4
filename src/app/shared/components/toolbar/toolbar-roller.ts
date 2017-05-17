/**
 * Created by dell on 2017/5/4.
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'seed-toolbar-roller',
  template:
  '<div class="seed-scroll">' +
   '<ng-content></ng-content>' +
  '</div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarRollerComponent {
  constructor() {
  }
}
