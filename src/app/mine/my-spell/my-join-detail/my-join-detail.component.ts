import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ToolsService} from "../../../shared/tools/tools.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LocalService} from "../../../local/local.service";
import {Subscription} from "rxjs/Subscription";
import {UserDataService} from "../../../shared/tools/user-data.service";

@Component({
  selector: 'seed-my-join-detail',
  templateUrl: './my-join-detail.component.html',
  styleUrls: ['./my-join-detail.component.scss'],
})
export class MyJoinDetailComponent implements OnInit {
  public spellDetail:any
  public haveJoin:string;
  public joinListCheck:string[]=[];
  public phoneCheck:string;
  public timeDate;any;
  public signEndTime:any;
  public spellToggle=false;
  public fightId:string;
  public applyCheck:any;
  scrollContainer;
  subscription: Subscription = new Subscription();

  constructor(
    public router: Router,
    public LocalService: LocalService,
    public _activatedRoute:ActivatedRoute,
    public ToolServices:ToolsService,
    public user:UserDataService,
  ) { }

  getSpellDetailData(obj){
    this.subscription.add(
      this.LocalService.getSpellDetail(obj).subscribe((res)=>{
        let object=res;
        if(object.result==0){
          this.spellDetail=object.data;
          this.applyCheck=object.data.status;

          if(object.data.joinList){
            for(let j=0;j<object.data.joinList.length;j++){
              if(this.user.getUserid()){
                if(object.data.joinList[j].userId==localStorage.getItem('userid')){
                  this.haveJoin='joined';
                  this.applyCheck=0;
                }
              }
            }
            this.joinListCheck=object.data.joinList;
          }
          if(object.data.phone){
            this.phoneCheck=object.data.phone.slice(0,3)+'***'+object.data.phone.slice(-3,object.data.phone.length);
          }
          if(object.data.days==0||!object.data.days){
            this.timeDate='yes';
            let timeNow=new Date().getTime();
            this.signEndTime=(parseFloat(object.data.startTime)-parseFloat(object.data.signEnd)*3600*1000-timeNow)/1000;
          }
        }
      })
    )
  }

  spellDetailToggle(){
    if(this.spellToggle==true){
      this.spellToggle=false;
    }else{
      this.spellToggle=true;
    }
  }
  goPersonalPage(obj){
    this.router.navigate(['/homepage', obj]);
  }
  TipCommon(){
    if(this.applyCheck==1){
      this.ToolServices.presentConfirm('下载球苗APP，看更多精彩内容!');
    }
  }
  ngOnInit() {
    this._activatedRoute.params
      .subscribe((params:Params) => {
        this.getSpellDetailData(params['fightId']);
      });
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }

}
