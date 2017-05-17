import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ToolsService} from "../../../shared/tools/tools.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LocalService} from "../../../local/local.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'seed-my-launch-detail',
  templateUrl: './my-launch-detail.component.html',
  styleUrls: ['./my-launch-detail.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class MyLaunchDetailComponent implements OnInit {
  public defaulticon = 'assets/icon/concern_default_head.png';
  public spellDetail:string[]=[];
  public haveJoin:string;
  public joinListCheck:string[]=[];
  public phoneCheck:string;
  public timeDate;any;
  public signEndTime:any;
  private spellToggle=false;
  public fightId:string;
  public applyCheck:any;
  subscription: Subscription = new Subscription();
  // @Input fightId:item;

  constructor(
    private router: Router,
    public LocalService: LocalService,
    private _activatedRoute:ActivatedRoute,
    public ToolServices:ToolsService
  ) { }

  getSpellDetailData(obj){
    this.ToolServices.showLoading();
    this.subscription.add(
      this.LocalService.getSpellDetail(obj).subscribe((res)=>{
        let object=res;
        if(object.result==0){
          this.spellDetail=object.data;
          this.applyCheck=object.data.status;
          this.ToolServices.hideLoading();

          if(object.data.joinList){
            for(let j=0;j<object.data.joinList.length;j++){
              if(localStorage.getItem('userid')){
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
            if(localStorage.getItem('userid')){
              this.phoneCheck=object.data.phone;
            }
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
    this.router.navigate(['/go-person-page', obj]);
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
      })
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.ToolServices.hideLoading();
  }

}
