import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {ArticleVO} from "../../../domain/interface.model";

@Component({
  selector: 'seed-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgesComponent implements OnInit{
  @Input() articles:ArticleVO[];
  scrollContainer;
  ngOnInit(){
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
}
