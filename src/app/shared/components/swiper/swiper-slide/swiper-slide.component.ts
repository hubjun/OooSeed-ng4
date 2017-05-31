import {
  Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy, AfterContentInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'seed-swiper-slide',
  templateUrl: './swiper-slide.component.html',
  styleUrls: ['./swiper-slide.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class SwiperSlideComponent implements OnInit {
  constructor(
    private ele:ElementRef
  ){}
  getWindowWidth(){
    if (document.documentElement && document.documentElement.clientWidth){
      let w = document.documentElement.clientWidth;
      this.ele.nativeElement.style.width = w+'px';
    }
  }
  ngOnInit(){
    this.getWindowWidth();
  }
}
