import {Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation,} from '@angular/core';
import {AppPlayTurn} from "../../../domain/interface.model";

@Component({
  selector: 'seed-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {

  @Input() gallery:AppPlayTurn[];

  constructor() {
  }
  ngOnInit() {
  }

}
