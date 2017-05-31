import {Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {FeedRespVO} from "../../../domain/interface.model";
import {ToolsService} from '../../tools/tools.service';


@Component({
  selector: 'seed-feed-profile',
  templateUrl: './feed-profile.component.html',
  styleUrls: ['./feed-profile.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
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
