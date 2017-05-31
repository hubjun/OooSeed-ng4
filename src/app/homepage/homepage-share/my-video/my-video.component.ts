import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ToolsService} from "../../../shared/tools/tools.service";
import {ActivatedRoute, Params} from "@angular/router";
import {HomepageService} from "../../homepage.service";
import {Observable} from "rxjs";
import {UserAlbumFileVO} from "../../../domain/interface.model";

@Component({
  selector: 'seed-my-video',
  templateUrl: 'my-video.component.html',
  styleUrls: ['my-video.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyVideoComponent implements OnInit {
  public scrollContainer:any;
  public src:string;
  public poster:string;
  @ViewChild('content') content;
  @ViewChild('videoModal') videoModal;
  public videoThumbnail:Observable<UserAlbumFileVO[]>;
  constructor(
    public homepageService:HomepageService,
    public toolsService:ToolsService,
    public _activatedRoute:ActivatedRoute,
  ) {
    this.videoThumbnail = this.homepageService.videoThumbnail;
  }

  showVideoView(src:string){
    if(!src)
      return;
    this.src = src;
    this.poster = src+'&width=300&second=1';
    this.videoModal.show();
    this.disableScroll();
  }

  disableScroll(){
    let content = this.content.nativeElement;
    if (content){
      if(!content.classList.contains('no-scroll')){
        content.classList.add('no-scroll')
      }else{
        content.classList.remove('no-scroll')
      }
    }
  }

  ngOnInit() {
    this._activatedRoute.parent.params
      .subscribe((params:Params) => {
        if (params['userId'])
          this.homepageService.getUserAlbum(params['userId'],3,1,1,20)
      });
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
  ngOnDestroy() {
    this.toolsService.hideLoading();
  }

}
