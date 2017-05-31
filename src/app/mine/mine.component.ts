import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {MineService} from "./mine.service";
import {ToolsService} from "../shared/tools/tools.service";
import {UserDataService} from '../shared/tools/user-data.service';
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../shared/service/auth.service";
import {UserInfoVO} from "../domain/interface.model";

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MineComponent implements OnInit {
  userInfo:UserInfoVO = {};
  public defaulticon = 'assets/icon/concern_default_head.png';
  public urllist: any[] = ['./mine/my-massage', './mine/my-team', './mine/my-content', '', '', './mine/personal-schedule'];
  subscription: Subscription = new Subscription();
  public userId:string = '';
  constructor(
    public router: Router,
    public mineService: MineService,
    public toolsService: ToolsService,
    public ToolServices:ToolsService,
    public user: UserDataService,
    public auth : AuthService,
  ) {

  }

  //我的拼球
  goToMySpell() {
    this.router.navigate(['/mine/my-spell']);
  }

  //退出登录
  goLogOut() {
    this.ToolServices.showLoading();
    this.subscription.add(
      this.mineService.goLoginOut().subscribe(res => {
        if (res.result == 0) {
          this.toolsService.showToast('退出成功！');
          this.auth.logout();
          this.router.navigate(['home']);

        } else {
          this.ToolServices.hideLoading();
          this.toolsService.showToast('退出登录出错请刷新后重试', 1000);
        }
      })
    )
  }

  //查询用户信息
  getUserInfomation() {
      //let userid = localStorage.getItem('userid');
      let userid = this.auth.getUserid()
      this.ToolServices.showLoading();
      this.subscription.add(
        this.mineService.getUserInfo(userid).subscribe(res => {
          if (res.result == 0) {
            console.log(res)
            this.userInfo = res.data;
            this.ToolServices.hideLoading();
          }else{
            this.toolsService.hideLoading();
            this.router.navigate(['/login']);
          }
        })
      )
  }

  // 跳转详情
  jumpdetail(i) {
    this.router.navigate([this.urllist[i]]);
  }

  //转跳关注/粉丝页面
  goToFanslist(userid){
    this.router.navigate([`/homepage/${userid}/my-fans`]);
  }
  goToFollowlist(userid){
    this.router.navigate([`/homepage/${userid}/my-care-fans`]);
  }
// 跳转编辑个人资料
  goedit(){
    this.router.navigate(['./mine/my-edit-info']);
  }
  goPersonalPage(obj){
    this.router.navigate(['/homepage', obj]);
  }

  ngOnInit() {
    this.getUserInfomation();
    this.ToolServices.showLoading();
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.ToolServices.hideLoading();
  }
}
