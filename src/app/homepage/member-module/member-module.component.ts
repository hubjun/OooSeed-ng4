import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'member-moduled',
  templateUrl: './member-module.component.html',
  styleUrls: ['./member-module.component.scss']
})
export class MemberModule implements OnInit {

  @Input() members;
  scrollContainer;
  constructor(
    private router: Router,
  ) { }

  goPersonalPage(obj){
    this.router.navigate(['/homepage', obj]);
  }

  ngOnInit() {
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
}
