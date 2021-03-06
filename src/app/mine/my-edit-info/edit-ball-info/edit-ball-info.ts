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
import {AuthService} from '../../../shared/service/auth.service';
import {ToolsService} from '../../../shared/tools/tools.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'my-content',
  templateUrl: './edit-ball-info.html',
  styleUrls: ['./edit-ball-info.scss'],
  encapsulation: ViewEncapsulation.None
})

export class EditBallComponent implements OnInit {
  public userObj: any ={
      ballAge: 0,
      foot: '',
      Auth: '',
      position: '',
      tedian: ''
    }

  public subscription: Subscription = new Subscription();
  public postionsee: boolean = false;
  public tediansee: boolean = false;
  public agearr: any = [];
  public footarr: any = ['左脚', '右脚', '双脚'];
  public positionitems: any={
    alldata:[],
    selected:[]
  };
  public tetianitems: any={
    alldata:[],
    selected:[]
  };
  // public positionitems:any=['前锋','边锋','中场','后卫','门将','裁判'];
  // public tetianitems:any=['空霸','快马','禁区杀手','中场发动机','混泥土防守','钢铁门神','任意球专家','点球高手','假动作过人'];
  public infotype: string;
  public title: string = '';
  public newinfo = '';
  public cansave = false;

  constructor(public userdataservice: AuthService,
              public mineService: MineService,
              public activatedroute: ActivatedRoute,
              public router: Router,
              public toolservice: ToolsService,
              public authservice:AuthService
  ) {

  }

  setGender(){

  }
  ballage(event) {
    if (typeof event == 'string') {
      let data = {
        attrs: [],
        ballAge: event,
        sportType: 3001
      }
      this.toolservice.showLoading();
      this.subscription.add(
      this.mineService.putBallLocation(data)
        .subscribe(rs => {
          if (rs.result == 0) {
            this.toolservice.showToast('更新成功');
            this.userObj.ballAge = event;
          } else {
            this.toolservice.showToast('更新失败'+rs.msg, 2000);
          }
          this.toolservice.hideLoading();
        })
      )
    }
  }

  changepositon() {
    this.toolservice.showLoading();
    this.subscription.add(
    this.mineService.getfootballpostion().subscribe(res => {
      if (res.result == 0) {
        this.positionitems.alldata = res.data.dicts;
      } else {
        this.toolservice.showToast('获取位置失败', 2000);
      }
      this.toolservice.hideLoading();
    })
    )
    this.postionsee = true;
  }

  addnum(start, end) {
    let arr = [];
    for (var i = start; i < end; i++) {
      arr.push(i);
    }
    return arr;
  }

  changefoot(event) {
    if (typeof event == 'string') {
      this.toolservice.showLoading();
      let id = '1600' + (this.footarr.indexOf(event) + 1);
      let data = {
        attrs: [{attr: 16, lableId: id}],
        ballAge: this.userObj.ballAge,
        sportType: 3001
      }
      this.subscription.add(
      this.mineService.putBallLocation(data).subscribe(res => {
        if (res.result == 0) {
          this.toolservice.showToast('更新成功');
          this.userObj.foot = event;
        } else {
          this.toolservice.showToast('更新失败'+res.msg);
        }
        this.toolservice.hideLoading();
      })
      )

    }
  }

  changetedian() {
    this.toolservice.showLoading();
    this.subscription.add(
    this.mineService.getfootballtedian().subscribe(res => {
      if (res.result == 0) {
        this.tetianitems.alldata= res.data.dicts;
      } else {
        this.toolservice.showToast('获取特点失败');
      }
      this.toolservice.hideLoading();
    })
    )
    this.tediansee = true;

  }

  choosete(event, i) {
    let newdataarr = [];
    let data = {
      attrs: event.data,
      ballAge: this.userObj.ballAge,
      sportType: 3001
    }
    if (event.result == 2 && event.data.length > 0) {
      this.toolservice.showLoading();
      this.subscription.add(
      this.mineService.putBallLocation(data)
        .subscribe(rs => {
          if (rs.result == 0) {
            this.toolservice.showToast('更新成功');
            this.getfootballinfo();
          } else {
            this.toolservice.showToast('更新失败'+rs.msg);
          }
          this.toolservice.hideLoading();
        })
      )
    }
    i == 1 ? this.postionsee = false : this.tediansee = false;

  }

  getfootballinfo() {
    this.positionitems.selected=[];
    this.tetianitems.selected=[];
    this.toolservice.showLoading();
    this.subscription.add(
    this.mineService.getfootballinfo().subscribe(res => {
      this.toolservice.hideLoading();
      if (res.result === '0') {
        this.userObj.ballAge = res.data.ballAge;
        let attrsObj = res.data.attrs;
        let tediantarr = [];
        let positionarr = [];
        if (typeof(attrsObj) !== 'undefined') {
          for (let i = 0; i < attrsObj.length; i++) {
            //场上位置
            if (attrsObj[i].attr == 17) {
              positionarr.push(attrsObj[i].lableName);
              this.positionitems.selected.push(attrsObj[i]);
            }
            //能力特征
            else if (attrsObj[i].attr == 18) {
              tediantarr.push(attrsObj[i].lableName);
              this.tetianitems.selected.push(attrsObj[i]);
            }
            //惯用脚
            else if (attrsObj[i].attr == 16) {
              this.userObj.foot = attrsObj[i].lableName;
            }
          }
          this.userObj.position = positionarr.join('，');
          this.userObj.tedian = tediantarr.join('，');
        } else {
          return;
        }
      } else if (res.result === '2') {
        this.toolservice.showToast('系统数据异常');
      } else {
        return;
      }
    })
    )

  }

  setBallInfo() {
    this.router.navigate(['./mine/potency-team-list']);
  }

  ngOnInit() {
    !this.authservice.getUserid?this.router.navigate(['./login']):'';
    this.agearr = this.addnum(0, 50);
    this.getfootballinfo();
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.toolservice.hideLoading();
  }
}
