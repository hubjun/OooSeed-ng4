import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ToolsService} from "../../../shared/tools/tools.service";
import {HomepageService} from "../../homepage.service";

@Component({
  selector: 'seed-my-fans',
  templateUrl: 'my-fans.component.html',
  styleUrls: ['my-fans.component.scss']
})
export class MyFansComponent implements OnInit {
  subscription: Subscription = new Subscription();
  public myFans=[];
  public myCareFansNumber;
  public userId:string;
  public myCheck:string;
  public isLoging:string;
  public mineLoging:string;
  scrollContainer;

  public unCare:string='../../../assets/images/subscript_icon_unfollow.png';
  public havsCare:string='../../../assets/images/subscript_icon_isfollow.png';
  public careEach:string='../../../assets/images/subscript_icon_isfollowboth.png';

  constructor(
    private router: Router,
    public toolsService:ToolsService,
    public homepageService:HomepageService,
    private _activatedRoute:ActivatedRoute,
  ) { }
  myfans(obj){
    //查询我的粉丝
    this.subscription.add(
      this.homepageService.getMyfans(obj).subscribe(res=>{
        let object=res;
        if(object.result==0&&object.data.list.length>0){
          this.myCareFansNumber=object.data.total;
          if(object.data.list.length>20){
            for(let i=0;i<20;i++){
              this.myFans.push(object.data.list[i]);
            }
          }else{
            this.myFans=object.data.list;
          }

        }else{
          this.myFans[0]='无';
        }
      })
    )
  }

  careCheck(obj,event){
    if(localStorage.getItem('userid')){//判断用户是否登录
      if(event.target.src=='http://'+location.host+'/assets/images/subscript_icon_unfollow.png'){
        //H5页面只做点击关注，已关注状态后点击则不做任何操作
        this.getAddCareFans(obj,event);
      }else{
        // this.getDeleteCareFans(obj,event);
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
    this.isLoging=localStorage.getItem('userid');
    if(localStorage.getItem('userid')&&localStorage.getItem('userid')==this.userId){
      this.myCheck='我的粉丝';
    }else{
      this.myCheck='他的粉丝';
    }
    this.toolsService.setTitle(this.myCheck);
  }

  goPersonalPage(obj){
    this.router.navigate(['/homepage', obj]);
  }

  ngOnInit() {
    this.isLoging=localStorage.getItem('userid');
    this._activatedRoute.params
      .subscribe((params:Params) => {
        this.myfans(params['userId']);
        this.userId=params['userId'];
        if(params['userId']==localStorage.getItem('userid')){//判断被查看个人中心的用户是否是自己
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
