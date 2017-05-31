import {Component, OnInit,ViewEncapsulation} from '@angular/core';
import {LocalService} from "../local.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToolsService} from "../../shared/tools/tools.service";
import {UserDataService} from "../../shared/tools/user-data.service";

@Component({
  selector: 'app-local-spell-detail',
  templateUrl: './local-spell-detail.component.html',
  styleUrls: ['./local-spell-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LocalSpellDetailComponent implements OnInit {
  public defaulticon = 'assets/icon/concern_default_head.png';
  public spellDetail:any;
  public haveJoin:string;
  public joinListCheck:string[]=[];
  public phoneCheck:string;
  public timeDate;any;
  public signEndTime:any;
  public spellToggle=false;
  public fightId:string;
  public applyCheck:any;

  constructor(
    public router: Router,
    public LocalService: LocalService,
    public _activatedRoute:ActivatedRoute,
    public toolsService:ToolsService,
    public user:UserDataService,
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
            if(this.user.getUserid()){
              if(res.data.joinList[j].userId==this.user.getUserid()){
                this.haveJoin='joined';
                this.applyCheck=0;
              }
            }
          }
          this.joinListCheck=res.data.joinList;
        }
        if(res.data.phone){
          this.phoneCheck=res.data.phone.slice(0,3)+'***'+res.data.phone.slice(-3,res.data.phone.length);
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
  goPersonalPage(obj:any){
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
  }
  ngOnDestroy() {
    this.toolsService.hideLoading();
  }

}
