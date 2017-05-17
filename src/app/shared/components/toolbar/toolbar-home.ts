/**
 * Created by dell on 2017/5/4.
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'seed-toolbar-home',
  template:
  `<a 
    routerLink="home"
    class="seed-toolbar-home"  
    >
    <span class="homepage"></span>
  </a>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarHomeComponent {
  constructor() {
  }
}
