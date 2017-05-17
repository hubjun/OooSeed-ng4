
/**
 * Created by dell on 2017/5/12.
 */
import {Component,OnInit}from'@angular/core';
import {Router,ActivatedRoute}from '@angular/router';
import {componentFactoryName} from "@angular/compiler";
import {MineService} from '../mine.service'
import {UserDataService} from '../../shared/tools/user-data.service'

@Component({
  selector: 'my-content',
  templateUrl: './my-edit-info.component.html',
  styleUrls: ['./my-edit-info.component.scss']
})

export class MyEditInfoComponent implements OnInit {
  public defaulticon='../../assets/icon/concern_default_head.png';// 默认头像
  public sexseed:boolean=false;//性别框
  public userObj: any = {
    concernNum: 0,
    followNum: 0,
    height: '',
    iconUrl: "../../assets/icon/concern_default_head.png",
    isFollowed: 0,
    isFollowedMe: 0,
    nickName: '',
    repostCount: 1,
    sex: '',
    sign: '11',
    userAge: '',
    userId: '',
    weight: '',
    areaCityName: '',
    areaProvName: ''
  };
  constructor(
    public userdataservice:UserDataService,
    public mineService: MineService
  ){

  }
  getuserinfo(){
     let userid= this.userdataservice.getUserid();
     this.mineService.getUserInfo(userid).subscribe(res=>{
       console.log(res)
       if(res.result==0)
       {
         this.userObj=res.data;
       }
     })
  }
  // 签名
  setSignature(){
console.log('1')
  }
  // 性别
  setGender(){
    console.log('0')
    this.sexseed=true;
  }
  // 修改性别
  changsexnum(even){
    let i=parseInt(even.target.id);
    if(i==0){
      this.sexseed=false;
    }else {
        console.log(typeof i)
      this.mineService.UserInfoUpdate({sex:i}).subscribe(res=>{
        if(res.result==0)
        {
          this.sexseed=false;
          this.getuserinfo();
        }
      });
    }
  }
  // 昵称
  setNickName(){
    console.log('4')
  }
  // 头像
  selectFileOnchanged(even){
    let file = even.target.files[0];
    console.log(file);
    this.mineService.updateAvatar(file).subscribe((res) => {
      console.log(res);
      let reader = new FileReader();
      reader.onload = (r: any) => {
        this.userObj.iconUrl = r.target.result;
      };
      reader.readAsDataURL(file);

    })
  }
  ngOnInit() {
    this.getuserinfo()
  }
}
