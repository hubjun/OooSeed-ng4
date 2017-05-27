import {Component, OnInit, Input} from '@angular/core';
import {FeedRespVO} from "../../../domain/interface.model";
import {ToolsService} from '../../tools/tools.service';


@Component({
  selector: 'seed-feed-profile',
  templateUrl: './feed-profile.component.html',
  styleUrls: ['./feed-profile.component.scss']
})
export class FeedProfileComponent implements OnInit{
  @Input() feeds:FeedRespVO[];
  scrollContainer;
  constructor(
    public tools:ToolsService
  ){}


  ngOnInit(){
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
}
