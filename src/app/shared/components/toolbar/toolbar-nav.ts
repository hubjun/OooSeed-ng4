/**
 * Created by dell on 2017/5/4.
 */
import {ChangeDetectionStrategy, ViewEncapsulation,Component} from "@angular/core";

@Component({
  selector: 'seed-toolbar-nav',
  template:
  `<div class="seed-toolbar-nav unfold">
    <a
      routerLink="/home"
      routerLinkActive="current"
    >
    首页
    </a>
    <a
      routerLink="/videos"
      routerLinkActive="isCurrent"
    >
     视频
     </a>
    <a  
      routerLink="/local"
      routerLinkActive="current"
     >
      同城
     </a>  
    <a 
      routerLink="/mine"
      routerLinkActive="current"
     >
      我的
     </a>
   </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarNavComponent {
  public isCurrent:string = '0';
  constructor() {
  }
}
