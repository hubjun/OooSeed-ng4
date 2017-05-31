import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserAlbumFileVO, UserInfoVO} from "../../../domain/interface.model";
import {Observable,BehaviorSubject} from "rxjs";
import {HomepageService} from "../../homepage.service";
import {Params, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'seed-viewer-album',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewerAlbumComponent implements OnInit {

  public userId:UserInfoVO;
  public activeIndex:any;
  public rows:any;
  public _activeIndex:BehaviorSubject<any> = new BehaviorSubject<any>({});
  public gallery:Observable<UserAlbumFileVO[]>;
  constructor(
    public homepageService:HomepageService,
    public _activatedRoute:ActivatedRoute,
  ) {
    this.gallery = this.homepageService.gallery;
    this.activeIndex = this._activeIndex.asObservable();
  }
  list=[
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
  ]
  ngOnInit() {
    this._activatedRoute.parent.params
      .subscribe((params:Params) => {
        this.userId = params['userId'];
      });
    this._activatedRoute.params
      .subscribe((params:Params) => {
        this.rows = params['rows']
        this._activeIndex.next(params['index'])
        console.log(params)
        this.homepageService.getUserAlbum(params['userId'],2,1,1,this.rows);
      })
  }

}
