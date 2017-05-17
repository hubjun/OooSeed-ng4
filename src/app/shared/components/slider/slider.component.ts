import {Component, OnInit, Input, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {NgxSiemaOptions, NgxSiemaComponent} from "ngx-siema";
import {AppPlayTurn} from "../../../domain/interface.model";

@Component({
  selector: 'seed-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {
  index:number = 0;
  timer:number;
  options: NgxSiemaOptions;
  isSlidersActive:number = 0;
  @Input() gallery:AppPlayTurn[];
  @ViewChild(NgxSiemaComponent) siema;

  constructor() { }

  onNext() {
    this.siema.onNext();
  }

  setTimer(){
    this.timer = setInterval(() => {
      this.onNext();
    },4000)
  }

  clearTimer() {
    clearInterval(this.timer);
  }

  ngOnInit() {
    this.options = {
      duration: 200,
      easing: 'ease-out',
      perPage: 1,
      startIndex: 0,
      draggable: true,
      threshold: 20,
      loop: true,
      onInit: () => {
        this.setTimer();
      },
      onChange: () => {
        this.clearTimer();
        this.setTimer();
        this.isSlidersActive = this.siema.instance.currentSlide;
      }
    };

  }

}
