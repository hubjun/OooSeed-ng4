
import {Component} from '@angular/core';
/**
 * Created by dell on 2017/5/4.
 */
@Component({
  selector: 'seed-toolbar-header',
  template:`
   <ng-content></ng-content>        
  `,
  styleUrls: ['./toolbar.scss'],
})

export class ToolbarHeaderComponent {

  constructor() { }

}
