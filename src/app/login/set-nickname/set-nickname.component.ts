import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/Router';
import { Subscription } from "rxjs";
import { UserActivityService } from '../../shared/tools/user-activity.service';
import { ValidationService } from '../../shared/tools/validator.service';
import { ToolsService } from '../../shared/tools/tools.service';

@Component({
  selector: 'app-set-nickname',
  templateUrl: './set-nickname.component.html',
  styleUrls: ['./set-nickname.component.scss'],
  providers: [UserActivityService]
})
export class SetNicknameComponent implements OnInit {
  nickNameForm: FormGroup;
  subscription: Subscription = new Subscription();
  public checkValid: Boolean = false;
  public msg: string = '';  //错误信息
  constructor(
    public formBuider: FormBuilder,
    public userActivityService: UserActivityService,
    public tools: ToolsService,
    private router: 　Router
  ) {
    this.nickNameForm = this.formBuider.group({
      'nickName': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), ValidationService.nickNameValidator]]
    })
  }

  ngOnInit() {
    this.tools.setTitle('设置昵称');
    this.subscription.add(
      this.nickNameForm.valueChanges
        .debounceTime(300)
        .distinctUntilChanged()
        .subscribe(res => {
          if (this.nickNameForm.invalid && this.nickNameForm.controls['nickName'].errors['invalidAccount']) {
            this.checkValid = true;
            this.msg = ValidationService.getValidatorErrorMessage('invalidNickname');
          } else {
            this.checkValid = false;
            this.msg = '';
          }
        })
    )
  }
  jump(){
    this.router.navigate(['/home']);    
  }
  //设置昵称
  setNickName() {
    let data = {
      nickName: this.nickNameForm.value.nickName
    };
    this.subscription.add(
      this.userActivityService.setNickname(data).subscribe((res) => {
        if (res.result === '0') {
          this.tools.showToast('注册成功正在跳转至登录页面...', 1000);
          setTimeout(() => {
            // this.navCtrl.push(LoginPage)
            this.router.navigate(['/home'])
          }, 1000)
        }else{
          this.tools.showStatusCodeMsg(res.result);
        }
      })
    );
  }
  goBack() {
    window.history.back();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
