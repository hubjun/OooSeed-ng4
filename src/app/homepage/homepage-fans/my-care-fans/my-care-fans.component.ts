import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ToolsService} from "../../../shared/tools/tools.service";
import {HomepageService} from "../../homepage.service";
import {UserDataService} from "../../../shared/tools/user-data.service";

@Component({
  selector: 'seed-my-care-fans',
  templateUrl: './my-care-fans.component.html',
  styleUrls: ['./my-care-fans.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyCareFansComponent implements OnInit {
  public userId:string;
  public myCheck:string;
  public isLoging:string;
  public mineLoging:string;
  public myCareFans=[];
  public myFansNumber:string;
  scrollContainer;

  public unCare:string='../../../../assets/images/subscript_icon_unfollow.png';
  public havsCare:string='../../../../assets/images/subscript_icon_isfollow.png';
  public careEach:string='../../../../assets/images/subscript_icon_isfollowboth.png';

  subscription: Subscription = new Subscription();

  constructor(
    public router: Router,
    public toolsService:ToolsService,
    public homepageService:HomepageService,
    public _activatedRoute:ActivatedRoute,
    public user:UserDataService,
  ) { }

  myFans_Careme(obj){
    //查询我关注的人
    this.subscription.add(
      this.homepageService.getMycare(obj).subscribe(res=>{
        let object=res;
        if(object.result==0&&object.data.list.length>0){
          this.myFansNumber=object.data.total;
          this.myCareFans=object.data.list;
        }else{
          this.myCareFans[0]='无';
        }
      })
    );
  }

  careCheck(obj,followed,event){
    if(this.user.getUserid()){//判断用户是否登录
      if(followed==0){
        //H5页面只做点击关注，已关注状态后点击则不做任何操作
        this.getAddCareFans(obj,event);
      }
    }else{//未登录用户点击关注则路由到登录页面
      this.router.navigate(['/login']);
    }
  }
  //新增关注
  getAddCareFans(obj,event){
    this.homepageService.addCareFans(obj).subscribe(res=>{
      let obj=res;
      if(obj.result==0){
        if(obj.data.isFollowedMe==0){//是否关注了我
          event.target.src=this.havsCare;
        }else{
          event.target.src=this.careEach;
        }
      }
    })
  }

  mineCheck(){//要判断是否是查看自己的个人中心
    this.isLoging=this.user.getUserid();
    if(this.user.getUserid()&&this.user.getUserid()==this.userId){
      this.myCheck='我的关注';
    }else{
      this.myCheck='他的关注';
    }
    this.toolsService.setTitle(this.myCheck);
  }

  goPersonalPage(obj){
    this.router.navigate(['/homepage', obj]);
  }

  ngOnInit() {
    this._activatedRoute.params
      .subscribe((params:Params) => {
        this.myFans_Careme(params['userId']);
        this.userId=params['userId'];
        if(params['userId']==this.user.getUserid()){//判断被查看个人中心的用户是否是自己
          this.mineLoging='yes';
        }
        this.mineCheck();
      });
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }
}
