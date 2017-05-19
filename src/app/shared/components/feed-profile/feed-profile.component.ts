import {Component, OnInit, Input} from '@angular/core';
import {FeedRespVO} from "../../../domain/interface.model";

@Component({
  selector: 'seed-feed-profile',
  templateUrl: './feed-profile.component.html',
  styleUrls: ['./feed-profile.component.scss']
})
export class FeedProfileComponent implements OnInit{
  @Input() feeds:FeedRespVO[];
  scrollContainer;
  ngOnInit(){
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
}
