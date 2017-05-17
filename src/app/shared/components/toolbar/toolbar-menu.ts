/**
 * Created by dell on 2017/5/4.
 */
import {ChangeDetectionStrategy, ViewEncapsulation} from "@angular/core";
import {Component} from '@angular/core';
@Component({
  selector: 'seed-toolbar-menu',
  template:
  `<button
    [class.unfold]="isUnfold == true"
    class="seed-toolbar-menu"
    (click)="onNavToggle()"
   >
  
  </button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarMenuComponent {
  private isUnfold:boolean = false;
  onNavToggle(){
    if (this.isUnfold){
      this.isUnfold = false;
    }else {
      this.isUnfold = true;
    }
    document.getElementsByClassName('seed-toolbar-nav')[0].classList.toggle('fold');
    document.getElementsByClassName('seed-scroll-content')[0].classList.toggle('unfold');
  }
}
