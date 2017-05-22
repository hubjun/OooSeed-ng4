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
import {ToolsService} from '../../../shared/tools/tools.service'

@Component({
  selector: 'my-potency-team',
  templateUrl: './potency-team-list.html',
  styleUrls: ['./potency-team-list.scss']
})

export class PotencyTeamComponent implements OnInit {
  public historylist:any=[];
  public historycansee:boolean=false;
  constructor(public userdataservice: UserDataService,
              public mineService: MineService,
              public activatedroute: ActivatedRoute,
              public router: Router,
              public toolservice:ToolsService
  ) {

  }
  timeTamp(time){
    let date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate() + ' ';
    return Y+M+D;
  };
  getHistoryInfo(){
    this.toolservice.showLoading();
    let userid=this.userdataservice.getUserid();
    this.mineService.getHistory(userid).subscribe(res=>{
      console.log(res);
      if(res.result==0){
        this.historylist=res.data.list;
        res.data.list.length==0?this.historycansee=true:'';
        this.toolservice.hideLoading();
      }
    })
  }
  ngOnInit() {
    this.getHistoryInfo()
  }
}
