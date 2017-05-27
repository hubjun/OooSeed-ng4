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
    public router: Router,
  ) { }

  goPersonalPage(obj,checkPerson){
    if(checkPerson.orgInfoVO){
      this.router.navigate(['/team', checkPerson.orgInfoVO.orgId])
    }else{
      this.router.navigate(['/homepage', obj])
    }

  }

  ngOnInit() {
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
}
