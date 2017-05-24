import {
  Component, ElementRef, OnDestroy, Input, ViewChild,
  AfterViewInit, AfterViewChecked
} from '@angular/core';

@Component({
  selector: 'seed-swiper-container',
  templateUrl: './swiper-container.component.html',
  styleUrls: ['./swiper-container.component.scss']
})
export class SwiperContainerComponent implements OnDestroy,AfterViewInit,AfterViewChecked {
  private readonly SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  width:number;
  _timer:any;
  _length:number;
  _list:Array<string> = [];
  _isStart: boolean;
  _index:number = 5;
  _isEnd: boolean;
  children:any[] = [];
  _auto:boolean = false;
  _pager:boolean = false;
  _isSliding:boolean = false;
  _loop:boolean = false;
  @ViewChild('container') container:ElementRef;

/*  public list = [
    {
      "playTurnId":194,
      "resUrl":"http://192.168.10.115:5088/f/20170317/sport/sns/cms/i/8a8546789d314d5b97ae741c86264ca6.jpg",
      "title":"足坛少了一位女球王，却多了一位奥运会女拳，她就是在伦敦奥运会女子轻量级拳击项目中斩获金牌的凯蒂.泰勒",
      "status":1,
      "clickUrl":"http://pc.sport.com/personal/index/feedetail/13689",
      "resPosition":6001,
      "resType":4,
      "resId":"13689",
      "sortValue":4,
      "fileId":0,
      "deviceType":4,
      "visible": true
    },
    {
      "playTurnId":193,
      "resUrl":"http://192.168.10.115:5088/f/20170317/sport/sns/cms/i/8b1710726be244e79514bd744378975c.jpeg",
      "title":"热辣资讯",
      "status":1,
      "resPosition":6001,
      "resType":4,
      "resId":"13693",
      "sortValue":3,
      "fileId":0,
      "deviceType":4,
      "visible": false,
    },
    {
      "playTurnId":192,
      "resUrl":"http://192.168.10.115:5088/f/20170317/sport/sns/cms/i/29fa51ee754a4b06962c95e9d49a5761.jpg",
      "title":"精彩赛事资讯",
      "status":1,
      "resPosition":6001,
      "resType":4,
      "resId":"13700",
      "sortValue":2,
      "fileId":0,
      "deviceType":4,
      "visible": false,
    },
    {
      "playTurnId":191,
      "resUrl":"http://192.168.10.115:5088/f/20170317/sport/sns/cms/i/65a9d7883b70477985b7a104b7ee5f3b.jpg",
      "title":"17投11中，砍30分，火箭捡到宝了",
      "status":1,
      "resPosition":6001,
      "resType":4,
      "resId":"13686",
      "sortValue":1,
      "fileId":0,
      "deviceType":4,
      "visible": false,
    }
  ]*/

  constructor(){}

  @Input()
  get index():number{
    return this._index;
  }
  set index(val:number){
    this._index = val
  }

  @Input()
  get loop(){
    return this._loop;
  }
  set loop(val:boolean){
    this._loop = val;
  }

  @Input()
  get list(){
    return this._list;
  }
  set list(val:Array<string>){
    this._list = val;
  }
  @Input()
  get auto(){
    return this._auto;
  }
  set auto(val:boolean){
    this._auto = val;
  }

  @Input()
  get time(){
    return this._autoplayMs;
  }
  set time(val:any){
    this._autoplayMs = parseInt(val,10)
  }
  private _autoplayMs: number = 3000;

  @Input()
  get pager(){
    return this._pager;
  }
  set pager(val:boolean){
    this._pager = val;
  }



  get isEnd():boolean{
    return this._isEnd;
  }

  set isEnd(status:boolean){
    this._isEnd = status;
  }


  get isStart():boolean{
    return this._isStart
  }

  set isStart(status:boolean){
    this._isStart = status;
  }

  get isSliding():boolean{
    return this._isSliding
  }
  set isSliding(status:boolean){
    this._isSliding = status;
  }


  set length(num:number){
    this._length = num;
  }
  get length():number{
    return this._length;
  }


  status(index){
    if(index == 0){
      this.isEnd   = false;
      this.isStart = true;
    }else if(index == this.length - 1){
      this.isEnd   = true;
      this.isStart = false;
    }else {
      this.isEnd = null;
      this.isStart = null;
    }
  }

  slideNext(sliderIndex){
    this.isSliding = true;
    this.status(sliderIndex);
    if (this.isEnd)
      sliderIndex = 0;
    else
      sliderIndex++;
    this.index = sliderIndex;
    this.container.nativeElement.style.transform =`translate3d(-${this.width * sliderIndex}px,0,0)`;
  }

  setEffect(sliderIndex){
      this.container.nativeElement.children[sliderIndex].classList.add('shake');
    setTimeout(() => {
      this.container.nativeElement.children[sliderIndex].classList.remove('shake');
    },1500)
  }
  slideTo(sliderIndex,action){
    this.isSliding = true;


    if (action === this.SWIPE_ACTION.RIGHT) {
      this.status(sliderIndex);
      if(this.isStart){
        if(this.loop){
          sliderIndex = this.length - 1;
        }else{
          this.setEffect(sliderIndex);
          return false;
        }
      }
      else{
        sliderIndex--;
      }

    }

    // next
    if (action === this.SWIPE_ACTION.LEFT) {
      this.status(sliderIndex);

      if (this.isEnd){
        if(this.loop){
          sliderIndex = 0;
        }else{
          console.log(this.container.nativeElement.children[sliderIndex])
          this.setEffect(sliderIndex);
          return false;
        }
      }
      else{
        sliderIndex++;
      }
    }

    this.index = sliderIndex;

    this.container.nativeElement.style.transform =`translate3d(-${this.width * sliderIndex}px,0,0)`;
  }



  autoPlay(autoplayDelay){
    if(!autoplayDelay)
      return;
    this._timer = setInterval(() =>{
      this.slideNext(this.index)
    },autoplayDelay)
  }


  startAutoPlay(){
    if(typeof this._timer !== 'undefined'){
      return false;
    }

    if(this.isSliding)
      return false;
    if(!this.auto){
      this.slideTo(this.index,this.SWIPE_ACTION.LEFT);
      return;
    }

    this.isSliding = true;
    this.autoPlay(this.time)
  }
  stopAutoPlay(){
    if(!this._timer)
      return;
    if(this._timer)
      clearInterval(this._timer);
    this.isSliding = false;
    this._timer = undefined;
  }
  swipe(action: string) {
    if (this.index > this.length|| this.index < 0) return;
    this.slideTo(this.index,action);
  }


  getChildrenNodesLength(){
    if (this.length == 0 || typeof this.length == 'undefined'){
      setTimeout( () => {
        this.length = this.container.nativeElement.children.length;
        for(var i=0; i <this.length;i++){
          this.children.push([i])
        }
      })
    }

  }

  getWindowWidth(){
    if (document.documentElement && document.documentElement.clientWidth){
      let w = document.documentElement.clientWidth;
      this.width = w;
    }
  }

  init(){
    this.getWindowWidth();
    this.startAutoPlay();
  }

  ngAfterViewChecked(){
    this.getChildrenNodesLength();
    console.log('1213')
  }

  ngAfterViewInit(){
    this.init();
  }




  ngOnDestroy(){
    this.stopAutoPlay();
  }
}
