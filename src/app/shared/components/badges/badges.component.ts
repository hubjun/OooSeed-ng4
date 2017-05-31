import {Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {ArticleVO} from "../../../domain/interface.model";

@Component({
  selector: 'seed-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BadgesComponent implements OnInit{
  @Input() articles:ArticleVO[];
  scrollContainer;
  ngOnInit(){
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
}
