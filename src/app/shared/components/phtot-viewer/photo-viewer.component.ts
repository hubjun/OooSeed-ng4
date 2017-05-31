import {Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import  PhotoSwipe  from 'photoswipe';
import  * as PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default.js";
@Component({
  selector: 'seed-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PhotoViewerComponent implements OnInit {
  public _list = [];
  public _index:number;
  public length:number;
  public lists = [];


  public intercept:boolean = true;
/*  @Input() list;*/
  @Input()
  get list(){
    return this._list;
  }
  set list(arr){
    this.setPhotos(arr)
  }

  @Input()
  get index(){
    return this._index;
  }
  set index(val:number){
    this._index = val;
  }
  constructor() { }

  setPhotos(arr,target?){
      let keys = Object.keys(arr);
      let o   = target ? target : this._list;

      keys.map(item => {
        o.push({
          src:arr[item]['fileName'],
          w:414,
          h:667
        })
      });
    console.log('==================')
  }

  setArray(target){
    var tmp=[];
    let keys = Object.keys(target);
    keys.map(item => {
      tmp.push({
        src:target[item]['src'],
        w:750,
        h:667
      })
    });
    return tmp;
  }
  ngOnChanges(){
    if (this.list.length > 0 && this.intercept){
          this.intercept = false;

          let v:number = Number(this.index)
          var options:any = {
            // history & focus options are disabled on CodePen
            index:v,
            preventHide: true,
            allowUserZoom: false,
            captionAndToolbarShowEmptyCaptions: false,
            preventSlideshow: true,
            zIndex: '101',
            escKey:false,
            closeOnVerticalDrag:false,
            imageScaleMethod: 'zoom',
            arrowKeys:false,
            captionAndToolbarAutoHideDelay: 3333,
            history:false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0
          };
          console.log(this.list);

          var items = Object.assign({},this.list);
          items = this.setArray(items)
          let pswpElement:any = document.querySelectorAll('.pswp')[0];

          let gallery = new PhotoSwipe(pswpElement,PhotoSwipeUI_Default, items, options);
          gallery.init();

      }


  }


  ngOnInit() {
    var arr = [
      {
        src: 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
        w: 964,
        h: 1024
      },
      {
        src: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg',
        w: 1024,
        h: 683
      }
    ];
    console.log(arr)




// updates the content of slides


  }



}
