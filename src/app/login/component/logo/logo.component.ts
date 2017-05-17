import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-logo',
  template: `
            <div class="logo" *ngIf="!entrying">
              <img src="../../assets/images/LOGO_dl.png" alt="">
            </div>
  `,
  styleUrls: ['./logo.component.scss']
})
export class LoginLogoComponent implements OnInit {
  public entrying: boolean = false;
  constructor() { }

  ngOnInit() {
    let h = document.body.scrollHeight;
    let that = this;
    window.onresize = function(){  //安卓端输入框会把布局顶上去，当可滚动范围小于屏幕时候隐藏此logo即可
        if (document.body.scrollHeight < h) {
            that.entrying = true;
        }else{
            that.entrying = false;
        }
    };
  }

}
