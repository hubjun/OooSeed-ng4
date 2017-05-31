/**
 * Created by dell on 2017/5/17.
 */

/**
 * Created by dell on 2017/5/12.
 */
import {Component, OnInit, ViewEncapsulation}from'@angular/core';
import {Router, ActivatedRoute}from '@angular/router';
import {componentFactoryName} from "@angular/compiler";
import {MineService} from '../../mine.service';
import {UserDataService} from '../../../shared/tools/user-data.service';
import {ToolsService} from '../../../shared/tools/tools.service';
import {Subscription} from "rxjs";
import {AuthService} from '../../../shared/service/auth.service';

@Component({
  selector: 'my-content',
  templateUrl: './edit-detail.html',
  styleUrls: ['./edit-detail.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EditDetailComponent implements OnInit {
  public defaulticon = '../../assets/icon/concern_default_head.png';// 默认头像
  public subscription: Subscription = new Subscription();
  public infotype: string;
  public title: string = '';
  public newinfo = '';
  public cansave = false;
  public placeHolder: string = '请输入内容';
  
  constructor(public userdataservice: UserDataService,
              public mineService: MineService,
              public activatedroute: ActivatedRoute,
              public router: Router,
              public toolservice:ToolsService,
              public authservice:AuthService
  ) {

  }

  editinfo(event) {
    event != '' ? this.cansave = true : false;
    this.newinfo = event;
  }

  saveinfo() {
    if(!this.cansave){
      return;
    }
    let str = '{"' + this.infotype + '":"' + this.newinfo + '"}';
    let data = JSON.parse(str);
    this.toolservice.showLoading();
    this.subscription.add(
    this.mineService.UserInfoUpdate(data).subscribe(res => {
      this.toolservice.hideLoading();
      res.result == 0 ? this.router.navigate(['./mine/my-edit-info']) : this.toolservice.showToast('操作失败，请从新尝试');
    })
    )
  }

  ngOnInit() {
    !this.authservice.getUserid?this.router.navigate(['./login']):'';
    this.activatedroute.queryParams.subscribe(param => {
      let infolist = ['编辑昵称', '编辑签名'];
      param.type == 'sign' ? this.title = infolist[1] : this.title = infolist[0];
      this.infotype = param.type;
      this.newinfo = param.placeHolder;
    })
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.toolservice.hideLoading();
  }
}
