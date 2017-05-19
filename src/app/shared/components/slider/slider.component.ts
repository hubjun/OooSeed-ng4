import {Component, OnInit, Input, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {AppPlayTurn} from "../../../domain/interface.model";
import {KSSwiperContainer,} from "angular2-swiper";

@Component({
  selector: 'seed-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {
  index:number = 0;
  isSlidersActive:number = 0;
  @Input() gallery:AppPlayTurn[];
  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;

  example1SwipeOptions: any;
  constructor() {

  }



  ngOnInit() {
    this.example1SwipeOptions = {
      autoplay : 3000,
      loop: true,
      pagination: '.seed-sliders-pagination',
    };

  }

}
