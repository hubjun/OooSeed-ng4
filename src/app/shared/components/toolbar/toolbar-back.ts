/**
 * Created by dell on 2017/5/4.
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'seed-toolbar-backbutton',
  template: `
    <button class="seed-toolbar-backbtn-warp">
      <span class="seed-toolbar-backbtn">
      
      </span>
    </button>  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarBackButtonComponent {

  constructor() { }

}
