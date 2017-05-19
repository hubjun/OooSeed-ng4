import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HomepageService} from "../homepage.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ToolsService} from "../../shared/tools/tools.service";

@Component({
  selector: 'seed-homepage-circle',
  templateUrl: './homepage-circle.component.html',
  styleUrls: ['./homepage-circle.component.scss'],
})
export class HomepageCircleComponent implements OnInit {
  public dealCreate;
  public dealJoin=[];
  public creatCheck:string;
  public joinCheck:string;
  subscription: Subscription = new Subscription();

  constructor(
    public homepageService:HomepageService,
    private _activatedRoute:ActivatedRoute,
    public ToolServices:ToolsService
  ) { }

  Launch_Join(obj){
    //查询用户加入的球队
    this.subscription.add(
      this.homepageService.getPersonJoin(obj).subscribe(res=>{
        let object=res;
        if(object.result==0&&object.data.list){
          if(object.data.list.length>2){
            for(let i=0;i<2;i++){
              this.dealJoin.push(object.data.list[i]);
            }
          }else{
            this.dealJoin=object.data.list;
          }
          this.joinCheck='yes';
        }else{
          this.joinCheck='no';
        }
      })
    );
    //查询用户创建的球队
    this.subscription.add(
      this.homepageService.getPeronCreate(obj).subscribe(res=>{
        if(res.result==0&&res.data.list){
          this.dealCreate=res.data.list[0];
          this.creatCheck='yes';
        }else{
          this.creatCheck='no';
        }
      })
    );
  }

  TipCommon(){
    this.ToolServices.presentConfirm('下载球苗APP，看更多精彩内容!');
  }
  ngOnInit() {
    this._activatedRoute.params
      .subscribe((params:Params) => {
        this.Launch_Join(params['userId']);
      })
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }
}
