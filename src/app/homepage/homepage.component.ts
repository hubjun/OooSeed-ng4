import {Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ViewChild} from '@angular/core';
import {HomepageService} from "./homepage.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ToolsService} from "../shared/tools/tools.service";
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../shared/service/auth.service";
import {UserDataService} from "../shared/tools/user-data.service";
import {Content} from "../shared/components/toolbar/toolbar-content";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit {
  public classTag:string;
  public personHeaderInfo:any;
  public uncare='../../assets/images/user_states_1.png';
  public cared='../../assets/images/user_states_2.png';
  public eachcare='../../assets/images/user_states_3.png';
  public isFollowedMe:number;
  public isFollowed:number;
  public userId:string;
  public isLogin:string;
  public localUserId:string;
  scrollContainer;
  subscription: Subscription = new Subscription();
  @ViewChild(Content) content;
  constructor(
    public router: Router,
    public auth:AuthService,
    public homepageService:HomepageService,
    public _activatedRoute:ActivatedRoute,
    public toolsService:ToolsService,
    public user:UserDataService,
  ) {

  }

  share(){
    this.classTag='share';
    this.homepageService.checkClass='share';
  }
  events(){
    this.classTag='events';
    this.homepageService.checkClass='events';
  }
  fans(){
    this.classTag='fans';
    this.homepageService.checkClass='fans';
  }
  service(){
    this.classTag='service';
    this.homepageService.checkClass='service';
  }

  addCare(obj){
    this.homepageService.addCareFans(obj).subscribe(res=>{
      if(res.result==0){
        this.isFollowed=1;
      }
    })
  }

  deleteCare(obj){
    this.homepageService.DeleteCareFans(obj).subscribe(res=>{
      if(res.result==0){
        this.isFollowed=0;
      }
    })
  }

  addDelete(obj){
    if(this.user.getUserid()){
      if(this.isFollowed==0){
        this.addCare(obj);
      }else{
        this.deleteCare(obj);
      }
    }else{
      this.router.navigate(['/login']);
    }
  }

  getInfo(obj){
    this.homepageService.getPeronInfo(obj).subscribe(res=>{
      if(res.result==0){
        this.personHeaderInfo=res.data;
        this.isFollowed=this.personHeaderInfo.isFollowed;
        this.isFollowedMe=this.personHeaderInfo.isFollowedMe;
      }
    });
  }

  ngOnInit() {
    this.isLogin=this.user.getUserid();
    if(this.user.getUserid()){
      this.localUserId='yes';
    }else{
      this.localUserId='';
    }
    this._activatedRoute.params
      .subscribe((params:Params) => {
/*        this.isFollowedMe=null;
        this.isFollowed = null;
        this.userId='';
        this.localUserId = '';
        this.classTag = 'share';
        this.personHeaderInfo='';*/
        this.classTag = 'share';
       this.content.scrollTop();
       this.userId=params['userId'];
       this.getInfo(params['userId']);
       //this.classTag=this.homepageService.checkClass;
      });

    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }

}
