import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ToolsService} from "../../../shared/tools/tools.service";
import {LocalService} from "../../../local/local.service";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";

@Component({
  selector: 'seed-my-join',
  templateUrl: './my-join.component.html',
  styleUrls: ['./my-join.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class MyJoinComponent implements OnInit {
  public defaulticon = 'assets/icon/concern_default_head.png';
  public spellData:any;
  public locationError:string;
  subscription: Subscription = new Subscription();
  public param:any={
    longitude: 0,
    latitude: 0,
    // userId:'hhly91181',
    userId: localStorage.getItem('userid'),
    page:1,
    rows: 10
  };
  constructor(
    private router: Router,
    public localService: LocalService,
    public ToolServices:ToolsService
  ) {

  }
  doDataSpellInfo(obj){
    this.ToolServices.showLoading();
    this.subscription.add(
      this.localService.getMyJoin(obj).subscribe((res)=>{
        if(res.result==0 && res.data.list){
          this.spellData=res.data.list;
          this.ToolServices.hideLoading();
        }else{
          this.spellData=[];
        }
        this.ToolServices.hideLoading();
      })
    )
  }
  goToJoinDetail(obj){
    this.router.navigate(['/mine/my-join-detail', obj]);
  }
  TipCommon(){
    this.ToolServices.presentConfirm('下载球苗APP，看更多精彩内容!');
  }

  goPersonalPage(obj){
    this.router.navigate(['/homepage', obj]);
  }
  ngOnInit() {
    this.ToolServices.showLoading();
      this.param.latitude=this.localService.coor.lat;
      this.param.longitude=this.localService.coor.long;
      this.doDataSpellInfo(this.param);
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.ToolServices.hideLoading();
  }
}
