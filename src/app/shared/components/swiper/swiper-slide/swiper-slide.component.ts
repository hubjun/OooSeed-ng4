import {Component, OnInit,Input,ViewChild, ElementRef, ChangeDetectionStrategy, AfterContentInit} from '@angular/core';

@Component({
  selector: 'seed-swiper-slide',
  templateUrl: './swiper-slide.component.html',
  styleUrls: ['./swiper-slide.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SwiperSlideComponent implements OnInit {
  ngOnInit(){}
}
