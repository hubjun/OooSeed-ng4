import {Component, ViewEncapsulation} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {LocalService} from "../../../local/local.service";
import {ToolsService} from "../../../shared/tools/tools.service";
import {Router} from "@angular/router";
import {UserDataService} from "../../../shared/tools/user-data.service";


@Component({
  selector: 'my-launch-spell',
  templateUrl: './my-launch.component.html',
  styleUrls: ['./my-launch.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MyLaunchComponent {
  public spellData:any;
  scrollContainer;
  subscription: Subscription = new Subscription();

  public param:any={
    longitude: 0,
    latitude: 0,
    userId: this.user.getUserid(),
    page:1,
    rows: 10
  };
  constructor(
    public router: Router,
    public localService: LocalService,
    public ToolServices:ToolsService,
    public user:UserDataService,
  ) {

  }

  doDataSpellInfo(obj){
    this.subscription.add(
      this.localService.getMySpell(obj).subscribe((res)=>{
        if(res.result==0 && res.data.list){
          this.spellData=res.data.list;
        }else {
            this.spellData=[];
        }
      })
    )
  }

  goToJoinDetail(obj){
    this.router.navigate(['/mine/my-launch-detail', obj]);
  }
  goPersonalPage(obj){
    this.router.navigate(['/homepage', obj]);
  }
  TipCommon(){
    this.ToolServices.presentConfirm('下载球苗APP，看更多精彩内容!');
  }

  ngOnInit() {
      this.param.latitude=this.localService.coor.lat;
      this.param.longitude=this.localService.coor.long;
      this.doDataSpellInfo(this.param);
      this.scrollContainer = document.querySelector('#seed-scroll-content');
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }
}
