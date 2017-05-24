import {Component, OnInit, ElementRef} from '@angular/core';
import {ToolsService} from "../../../shared/tools/tools.service";
import {ActivatedRoute, Params} from "@angular/router";
import {HomepageService} from "../../homepage.service";
import {Observable} from "rxjs";
import {UserAlbumFileVO} from "../../../domain/interface.model";

@Component({
  selector: 'seed-my-video',
  templateUrl: 'my-video.component.html',
  styleUrls: ['my-video.component.scss']
})
export class MyVideoComponent implements OnInit {
  public videoThumbnail:Observable<UserAlbumFileVO[]>;
  public scrollContainer:any;
  constructor(
    public homepageService:HomepageService,
    public toolsService:ToolsService,
    private _activatedRoute:ActivatedRoute,
  ) {
    this.videoThumbnail = this.homepageService.videoThumbnail;
    console.log(this.videoThumbnail)
  }


  ngOnInit() {
    this._activatedRoute.params
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
