/**
 * Created by dell on 2017/5/12.
 */
import {Component,OnInit}from'@angular/core';
import {Router,ActivatedRoute}from '@angular/router';
import {componentFactoryName} from "@angular/compiler";
import {MineService} from '../mine.service'
import {UserDataService} from '../../shared/tools/user-data.service'
import {Subscription} from "rxjs";
import {ToolsService} from '../../shared/tools/tools.service';

@Component({
  selector: 'my-content',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})

export class MyTeamComponent implements OnInit {
  public subscription: Subscription = new Subscription();
  // public myTeamsObj: any= [
  //   {
  //     iconFileUrl: "http://file.oooseed.com/f/20170410/sport/api/i/0b92dd1210514ddca343dd223441b441.jpg",
  //     id: 34253,
  //     name: "路人黑",
  //     createTime: 1491814455000,
  //     status: 1,
  //     creator: "hhly298219",
  //     formatId: 2001,
  //     areaProv: 0,
  //     areaCity: 11959,
  //     areaCityName: "深圳市",
  //     areaDist: 0,
  //     groupType: 12007,
  //     sportAttr: 12007,
  //     distance: -1,
  //     gradeFollow: 1,
  //     countFollow: 1,
  //     countPlayer: 0,
  //     countFans: 1,
  //     gradeName: "院队水平",
  //     gradeIconUrl: "http://file.oooseed.com/f/20170329/sport/sns/cms/i/38f30a4a035440ada741ac94c1c41a20.png",
  //     formatName: "3-5人制",
  //     orgUser: "hhly305885",
  //     avgAge: 0,
  //     avgHeight: 0,
  //     avgWeight: 0
  //   },
  //   {
  //     iconFileUrl: "http://file.oooseed.com/f/20170406/sport/api/i/9a7264d845ea4786afca4e6e354cc1d4.jpg",
  //     id: 34246,
  //     name: "华海乐盈足球俱乐部",
  //     createTime: 1491467539000,
  //     status: 1,
  //     creator: "hhly91332",
  //     formatId: 2002,
  //     areaProv: 11935,
  //     areaProvName: "广东省",
  //     areaCity: 11959,
  //     areaCityName: "深圳市",
  //     areaDist: 11962,
  //     areaDistName: "南山区",
  //     groupType: 12001,
  //     sportAttr: 12001,
  //     distance: -1,
  //     gradeFollow: 1,
  //     countFollow: 12,
  //     countPlayer: 0,
  //     countFans: 12,
  //     gradeName: "院队水平",
  //     gradeIconUrl: "http://file.oooseed.com/f/20170329/sport/sns/cms/i/38f30a4a035440ada741ac94c1c41a20.png",
  //     formatName: "6-8人制",
  //     orgUser: "hhly305672",
  //     avgAge: 0,
  //     avgHeight: 0,
  //     avgWeight: 0
  //   }
  // ];
  private myTeamsObj:Array<any>=[];
  userId: any;
  page: number = 1;
  rows: number = 10;
  constructor(
    public router:Router,
    public mineservice:MineService,
    private userservice:UserDataService,
    public toolservice: ToolsService
  ){

  }
  getMyTeamsInfo(type?){
      this.toolservice.showLoading();
    this.subscription.add(
    this.mineservice.getMyTeams(this.page,this.rows,this.userId)
      .subscribe(rs => {
        if(rs.result === '0'){
          if(type){
            this.myTeamsObj.concat(rs.data.list);
          }else {
            this.myTeamsObj = rs.data.list;
          }

        }else {
          return;
        }
        this.toolservice.hideLoading();
      })
    )
  };
  goTeamDetail(id){

  }
  ngOnInit(){
   this.userId=this.userservice.getUserid();
    this.getMyTeamsInfo();
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.toolservice.hideLoading();
  }
}
