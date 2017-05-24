/**
 * Created by dell on 2017/5/17.
 */

/**
 * Created by dell on 2017/5/12.
 */
import {Component, OnInit}from'@angular/core';
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
  styleUrls: ['./edit-detail.scss']
})

export class EditDetailComponent implements OnInit {
  public defaulticon = '../../assets/icon/concern_default_head.png';// 默认头像
  public subscription: Subscription = new Subscription();
  public infotype: string;
  public title: string = '';
  public newinfo = '';
  public cansave = false;

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
    if(this.newinfo==''){
      this.toolservice.presentConfirm('修改内容不能为空！',1);
      return;
    }
    let str = '{"' + this.infotype + '":"' + this.newinfo + '"}';
    let data = JSON.parse(str);
    this.toolservice.showLoading();
    this.subscription.add(
    this.mineService.UserInfoUpdate(data).subscribe(res => {
      this.toolservice.hideLoading();
      res.result == 0 ? this.router.navigate(['./mine/my-edit-info']) : this.router.navigate(['./login']);
    })
    )
  }

  ngOnInit() {
    !this.authservice.getUserid?this.router.navigate(['./login']):'';
    this.activatedroute.params.subscribe(param => {
      let infolist = ['编辑昵称', '编辑签名'];
      param.id == 'sign' ? this.title = infolist[1] : this.title = infolist[0];
      this.infotype = param.id;
    })
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.toolservice.hideLoading();
  }
}
