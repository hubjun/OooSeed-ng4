import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'seed-blank-header',
  template: `
        <div class="login-header">
              <span class="login-back" (click)="goBack()"></span> {{title}}
        </div>
        <div class="divider"></div>
  `,
  styleUrls: ['./blank-header.component.scss']
})
export class BlankHeaderComponent implements OnInit {

  @Input() title:string;
  constructor() { }

  ngOnInit() {

  }
  goBack() {
    window.history.back();
  }
}
