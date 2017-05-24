
/**
 * Created by dell on 2017/5/12.
 */
import {Component,OnInit}from'@angular/core';
import {Router,ActivatedRoute}from '@angular/router';
import {componentFactoryName} from "@angular/compiler";
import {MineService} from '../mine.service'
import {UserDataService} from '../../shared/tools/user-data.service';
import {ToolsService} from '../../shared/tools/tools.service';
import {Subscription} from "rxjs";
import {AuthService} from '../../shared/service/auth.service';

@Component({
  selector: 'my-content',
  templateUrl: './my-edit-info.component.html',
  styleUrls: ['./my-edit-info.component.scss']
})

export class MyEditInfoComponent implements OnInit {
  public defaulticon='../../assets/icon/concern_default_head.png';// 默认头像
  public sexseed:boolean=false;//性别框
  public agearr:Array<any>=[];
  public heightarr:Array<any>=[];
  public weightarr:Array<any>=[];
  public subscription: Subscription = new Subscription();
  public userObj: any = {
    concernNum: 0,
    followNum: 0,
    height: '',
    iconUrl: "../../assets/icon/concern_default_head.png",
    isFollowed: 0,
    isFollowedMe: 0,
    nickName: '',
    repostCount: 1,
    sex: '',
    sign: '',
    userAge: '',
    userId: '',
    weight: '',
    areaCityName: '',
    areaProvName: ''
  };
  constructor(
    public userdataservice:UserDataService,
    public mineService: MineService,
    public router:Router,
    public toolservice:ToolsService,
    public authservice:AuthService
  ){

  }
  getuserinfo(){
    this.toolservice.showLoading();
     let userid= this.userdataservice.getUserid();
    this.subscription.add(
     this.mineService.getUserInfo(userid).subscribe(res=>{
       if(res.result==0)
       {
         this.userObj=res.data;
       }
       this.toolservice.hideLoading();
     })
    )
  }
  // 签名
  editinfo(id){
    this.router.navigate(['./mine/edit-detail',id]);
  }
  // 性别
  setGender(){
    this.sexseed=true;
  }
  // 修改性别
  changsexnum(even){
    let i=parseInt(even.target.id);
    if(i==0){
      this.sexseed=false;
    }else {
      this.toolservice.showLoading();
      this.subscription.add(
      this.mineService.UserInfoUpdate({sex:i}).subscribe(res=>{
        if(res.result==0)
        {
          this.sexseed=false;
          this.getuserinfo();
          this.toolservice.presentConfirm('更新性别成功',1);
          this.toolservice.removeconfirm();
        }else{
          this.toolservice.presentConfirm('更新性别失败：'+res.msg,1);
          this.router.navigate(['./login']);
        }
        this.toolservice.hideLoading();
      })
    )
    }
  }

  // 头像
  selectFileOnchanged(even){
    let file = even.target.files[0];
    this.toolservice.showLoading();
    this.subscription.add(
    this.mineService.updateAvatar(file).subscribe((res) => {
      if(res.result==0){
        let reader = new FileReader();
        reader.onload = (r: any) => {
          this.userObj.iconUrl = r.target.result;
        };
        reader.readAsDataURL(file);
        this.toolservice.presentConfirm('更新头像成功',1);
        this.toolservice.removeconfirm();
      }else {
        this.toolservice.presentConfirm('更新头像失败：'+res.msg,1);
      }
      this.toolservice.hideLoading();

    })
    )
  }
  age(event){

    if(typeof event=='string')
    {
      this.toolservice.showLoading();
      this.subscription.add(
      this.mineService.UserInfoUpdate({age:event}).subscribe(res=>{
        if(res.result==0){
          this.userObj.userAge=event;
          this.toolservice.presentConfirm('更新年龄成功',1);
          this.toolservice.removeconfirm();
        }else{
          this.toolservice.presentConfirm('更新年龄失败：'+res.msg,1);
          this.router.navigate(['./login']);
        }
        this.toolservice.hideLoading();
      })
      )
    }
  }
  height(event){

    if(typeof event=='string')
    {
      this.toolservice.showLoading();
      this.subscription.add(
      this.mineService.UserInfoUpdate({height:event}).subscribe(res=>{
        if(res.result==0){
          this.userObj.height=event;
          this.toolservice.presentConfirm('更新身高成功',1);
          this.toolservice.removeconfirm();
        }else{
          this.toolservice.presentConfirm('更新身高失败：'+res.msg,1);
          this.router.navigate(['./login']);
        }
        this.toolservice.hideLoading();
      })
      )
    }
  }
  weight(event){

    if(typeof event=='string')
    {
      this.toolservice.showLoading();
      this.subscription.add(
      this.mineService.UserInfoUpdate({weight:event}).subscribe(res=>{
        if(res.result==0){
          this.userObj.weight=event;
          this.toolservice.presentConfirm('更新体重成功',1);
          this.toolservice.removeconfirm();
        }else{
          this.toolservice.presentConfirm('更新体重失败：'+res.msg,1);
          this.router.navigate(['./login']);
        }
        this.toolservice.hideLoading();
      })
      )
    }
  }


  addnum(start,end){
    let arr=[];
    for(var i=start;i<end;i++)
    {
      arr.push(i);
    }
    return arr;
  }
  setBallInfo(){
    this.router.navigate(['./mine/edit-ball-info']);
  }
  chooseCity(){
    this.router.navigate(['/mine/choose-city']);
  }
  ngOnInit() {
    !this.authservice.getUserid?this.router.navigate(['./login']):'';
    this.agearr=this.addnum(1,99);
    this.heightarr=this.addnum(50,220);
    this.weightarr=this.addnum(20,200);
    this.getuserinfo();
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.toolservice.hideLoading();
  }
}
