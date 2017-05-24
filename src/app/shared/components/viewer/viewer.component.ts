import {Component, OnInit, ViewChild, ElementRef, Renderer, Input, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'seed-viewer',
  templateUrl: 'viewer.component.html',
  styleUrls: ['viewer.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ViewerComponent implements OnInit {
  public list = [
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
  ]
  public SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  width:number;
  _index:number = 0;
  _isEnd: boolean;
  _isStart: boolean;
  _timer:any;
  _isSliding:boolean = false;
  _pager:boolean = false;
  @ViewChild('container') container:ElementRef;
  @Input()
  get time(){
    return this._autoplayMs;
  }
  set time(val:any){
    this._autoplayMs = parseInt(val,10)
  }

  @Input()
  get pager(){
    return this._pager;
  }
  set pager(val:any){
    this._pager = val;
  }

  private _autoplayMs: number = 3000;
  constructor(
    public ele:ElementRef,
    public renderer:Renderer
  ) {}

  ngOnInit() {
    this.init();
  }


  get index():number{
    return this._index;
  }
  set index(val:number){
    this._index = val
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

  init(){
    if (document.documentElement && document.documentElement.clientWidth){
      let w = document.documentElement.clientWidth;
      console.log(typeof w)
      this.width = w;
    }
    this.autoPlay(this.time);
  }

  length():number{
    return this.list.length;
  }

  status(index){
    console.log(index+'status')
    if(index === 0){
      this.isEnd   = false;
      this.isStart = true;
    }else if(index === this.length() - 1){
      this.isEnd   = true;
      this.isStart = false;
    }
  }

  slideNext(sliderIndex){
    this.isSliding = true;
    if (this.isEnd)
      sliderIndex = 0;
    else
      sliderIndex++;
    this.index = sliderIndex;
    this.status(sliderIndex);

    this.container.nativeElement.style.transform =`translate3d(-${this.width * sliderIndex}px,0,0)`;
  }

  slideTo(sliderIndex,action){
    this.isSliding = true;
    this.status(sliderIndex);
    if (action === this.SWIPE_ACTION.RIGHT) {
      if(this.isStart)
        sliderIndex = this.length() - 1;
      else
        sliderIndex--;
    }

    // next
    if (action === this.SWIPE_ACTION.LEFT) {
      if (this.isEnd)
        sliderIndex = 0;
      else
        sliderIndex++;

    }
    this.stopAutoPlay();
    this.index = sliderIndex;
    this.container.nativeElement.style.transform =`translate3d(-${this.width * sliderIndex}px,0,0)`;
  }



  autoPlay(autoplayDelay){
    if(!autoplayDelay)
      return
    this._timer = setInterval(() =>{
      this.slideNext(this.index)
    },autoplayDelay)
  }



  startAutoPlay(){
    if(typeof this._timer !== 'undefined')
      return false;
    if(this.isSliding)
      return false;
    this.isSliding = true;
    this.autoPlay(this.time)
  }
  stopAutoPlay(){
    if(!this._timer)
      return;
    if(this._timer)
      clearInterval(this._timer);
    console.log('clearInterval')
    this.isSliding = false;
    this._timer = undefined;
  }
  swipe(action: string = this.SWIPE_ACTION.RIGHT) {

    if (this.index > this.length()|| this.index < 0) return;

    this.slideTo(this.index,action);

  }

  ngOnDestroy(){
    this.stopAutoPlay();
  }
}
