import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {LocalService} from "../local.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToolsService} from "../../shared/tools/tools.service";

@Component({
  selector: 'app-local-spell-detail',
  templateUrl: './local-spell-detail.component.html',
  styleUrls: ['./local-spell-detail.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class LocalSpellDetailComponent implements OnInit {
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
  // @Input fightId:item;

  constructor(
    private router: Router,
    public LocalService: LocalService,
    private _activatedRoute:ActivatedRoute,
    public toolsService:ToolsService
  ) { }


  getSpellDetailData(obj){
    this.toolsService.showLoading();
    this.LocalService.getSpellDetail(obj).subscribe((res)=>{
      if(res.result==0){
        this.spellDetail=res.data;
        this.applyCheck=res.data.status;
        this.toolsService.hideLoading();
        if(res.data.joinList){
          for(let j=0;j<res.data.joinList.length;j++){
            if(localStorage.getItem('userid')){
              if(res.data.joinList[j].userId==localStorage.getItem('userid')){
                this.haveJoin='joined';
                this.applyCheck=0;
              }
            }
          }
          this.joinListCheck=res.data.joinList;
        }
        if(res.data.phone){
          this.phoneCheck=res.data.phone.slice(0,3)+'***'+res.data.phone.slice(-3,res.data.phone.length);
          if(localStorage.getItem('userid')){
            this.phoneCheck=res.data.phone;
          }
        }
        if(res.data.days==0||!res.data.days){
          this.timeDate='yes';
          let timeNow=new Date().getTime();
          this.signEndTime=(parseFloat(res.data.startTime)-parseFloat(res.data.signEnd)*3600*1000-timeNow)/1000;
        }
      }
    })
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
      this.toolsService.presentConfirm('下载球苗APP，看更多精彩内容!');
    }
  }
  ngOnInit() {
    this.fightId=this._activatedRoute.snapshot.params['fightId'];
    this.getSpellDetailData(this.fightId);
    this.toolsService.setTitle('我的拼球')
  }
  ngOnDestroy() {
    this.toolsService.hideLoading();
  }

}
