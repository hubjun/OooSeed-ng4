import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HomepageService} from "../homepage.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ToolsService} from "../../shared/tools/tools.service";

@Component({
  selector: 'seed-homepage-fans',
  templateUrl: './homepage-fans.component.html',
  styleUrls: ['./homepage-fans.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomepageFansComponent implements OnInit {
  public myFans=[];
  public myCareFans=[];
  public myFansNumber:string;
  public myCareFansNumber:string;
  public userId:string;
  public localUserid:string;
  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    public homepageService:HomepageService,
    private _activatedRoute:ActivatedRoute,
    public ToolServices:ToolsService
  ) {

  }

  myFans_Careme(obj){
    //查询我关注的人
    this.subscription.add(
      this.homepageService.getMycare(obj).subscribe(res=>{
        let object=res;
        if(object.result==0&&object.data.list.length>0){
          this.myFansNumber=object.data.total;
          if(object.data.list.length>8){
            for(let i=0;i<8;i++){
              this.myCareFans.push(object.data.list[i]);
            }
          }else{
            this.myCareFans=object.data.list;
          }
        }else{
          this.myCareFans[0]='无';
        }
      })
    );
    //查询我的粉丝
    this.subscription.add(
      this.homepageService.getMyfans(obj).subscribe(res=>{
        let object=res;
        if(object.result==0&&object.data.list.length>0){
          this.myCareFansNumber=object.data.total;
          if(object.data.list.length>8){
            for(let i=0;i<8;i++){
              this.myFans.push(object.data.list[i]);
            }
          }else{
            this.myFans=object.data.list;
          }

        }else{
          this.myFans[0]='无';
        }
      })
    )
  }
  goPersonalPage(obj){
    this.router.navigate(['/homepage', obj]);
  }

  ngOnInit() {
    this.localUserid=localStorage.getItem('userid');
    this._activatedRoute.parent.params
      .subscribe((params:Params) => {
        this.myFans_Careme(params['userId']);
        this.userId=params['userId'];
      })
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }

}
