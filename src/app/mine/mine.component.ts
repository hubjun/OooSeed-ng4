import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MineService} from "./mine.service";
import {ToolsService} from "../shared/tools/tools.service";
import {UserDataService} from '../shared/tools/user-data.service';
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../shared/service/auth.service";

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss']
})
export class MineComponent implements OnInit {
  public userInfo;
  public defaulticon = 'assets/icon/concern_default_head.png';
  public urllist: any[] = ['./mine/my-massage', './mine/my-team', './mine/my-content', '', '', './mine/personal-schedule'];
  subscription: Subscription = new Subscription();
  private userId:string = '';
  constructor(
    private router: Router,
    public mineService: MineService,
    public toolsService: ToolsService,
    public ToolServices:ToolsService,
    private user: UserDataService,
    private auth : AuthService
  ) {
    this.getUserInfomation();
  }

  //我的拼球
  goToMySpell() {
    this.router.navigate(['/mine/my-spell']);
  }

  //退出登录
  goLogOut() {
    this.ToolServices.showLoading();
    this.mineService.goLoginOut().subscribe(res => {
      if (res.result == 0) {
        this.toolsService.showToast('退出成功！');
        this.auth.logout();
        this.router.navigate(['home']);

      } else {
        this.ToolServices.hideLoading();
        this.toolsService.showToast('退出登录出错请刷新后重试', 1000);
      }
    });
  }

  //查询用户信息
  getUserInfomation() {
      let userid = localStorage.getItem('userid');
      this.ToolServices.showLoading();
      this.mineService.getUserInfo(userid).subscribe(res => {
        console.log(res)
        if (res.result == 0) {
          this.userInfo = res.data;
          this.ToolServices.hideLoading();
        }else{
          this.toolsService.hideLoading();
          this.router.navigate(['/login']);
        }
      })
  }

  // 跳转详情
  jumpdetail(i) {
    this.router.navigate([this.urllist[i]]);
  }

  //转跳关注/粉丝页面
  goToFanslist(userid){
    this.router.navigate([`/homepage/${userid}/my-fans`, userid]);
  }
  goToFollowlist(userid){
    this.router.navigate([`/homepage/${userid}/my-care-fans`, userid]);
  }
// 跳转编辑个人资料
  goedit(){
    this.router.navigate(['./mine/my-edit-info']);
  }
  goPersonalPage(obj){
    this.router.navigate(['/homepage', obj]);
  }

  ngOnInit() {
    this.ToolServices.showLoading();
    this.toolsService.setTitle('我的')

  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.ToolServices.hideLoading();
  }
}
