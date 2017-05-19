/**
 * Created by dell on 2017/5/17.
 */

/**
 * Created by dell on 2017/5/12.
 */
import {Component, OnInit}from'@angular/core';
import {Router, ActivatedRoute}from '@angular/router';
import {componentFactoryName} from "@angular/compiler";
import {MineService} from '../../mine.service'
import {UserDataService} from '../../../shared/tools/user-data.service'

@Component({
  selector: 'my-content',
  templateUrl: './edit-detail.html',
  styleUrls: ['./edit-detail.scss']
})

export class EditDetailComponent implements OnInit {
  public defaulticon = '../../assets/icon/concern_default_head.png';// 默认头像

  public infotype: string;
  public title: string = '';
  public newinfo = '';
  public cansave = false;

  constructor(public userdataservice: UserDataService,
              public mineService: MineService,
              public activatedroute: ActivatedRoute,
              public router: Router) {

  }

  editinfo(event) {
    event != '' ? this.cansave = true : false;
    this.newinfo = event;
  }

  saveinfo() {
    let str = '{"' + this.infotype + '":"' + this.newinfo + '"}';
    console.log(str)
    let data = JSON.parse(str);
    console.log(data)
    this.mineService.UserInfoUpdate(data).subscribe(res => {
      console.log(res)
      res.result == 0 ? this.router.navigate(['./mine/my-edit-info']) : '';
    })
  }

  ngOnInit() {
    this.activatedroute.params.subscribe(param => {
      let infolist = ['编辑昵称', '编辑签名'];
      param.id == 'sign' ? this.title = infolist[1] : this.title = infolist[0];
      this.infotype = param.id;
    })
  }
}
