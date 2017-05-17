import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ValidationService } from "../../shared/tools/validator.service";
import { UserActivityService } from '../../shared/tools/user-activity.service';
import { UserDataService } from '../../shared/tools/user-data.service';
import { ToolsService } from '../../shared/tools/tools.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
  providers: [UserActivityService, ToolsService]
})
export class SetPasswordComponent implements OnInit {
  private passwordForm: FormGroup;
  private password: AbstractControl;
  private repassword: AbstractControl;
  private register;
  private mesg: string = ''; //错误信息
  private checkValid: boolean = false; //判断错误信息
  subscription: Subscription = new Subscription();
  constructor(
    public formBuilder: FormBuilder,
    public userActivityService: UserActivityService,
    public tools: ToolsService,
    private router: Router,
    private route: ActivatedRoute,
    private userData: UserDataService,
  ) {
    this.passwordForm = this.formBuilder.group({
      'password': ['', [Validators.required, ValidationService.passwordValidator]],
      'repassword': ['', [Validators.required]]
    }, { validator: ValidationService.matchingPasswords('password', 'repassword') })
  }

  ngOnInit() {
    this.subscription.add(
      this.route.queryParams.subscribe(param => {
        this.register = {
          account: param['phone'],
          loginPwd: '',//加密密码
          accountType: '2',
          operateType: '1',
          smsCode: param['code']
        }
      })
    )
    this.subscription.add(
      this.passwordForm.valueChanges
        .debounceTime(300)  //开始输入之后500毫秒内只取最新的结果
        .distinctUntilChanged() //去掉跟之前输入一样的结果
        .subscribe(form => {
          let pswd = this.passwordForm.controls['password']; //先保存两个输入的对象
          let rePswd = this.passwordForm.controls['repassword'];
          if (!pswd.pristine) {  //第一个密码框输入过了
            if (pswd.errors && pswd.errors['passwordLimitLength']) { //第一个密码框如果不是6-16位就提示错误并返回
              this.mesg = ValidationService.getValidatorErrorMessage('passwordLimitLength');
              this.checkValid = true;
              return;
            } else {
              this.checkValid = false;
            }
            if (!rePswd.pristine && this.passwordForm.errors && this.passwordForm.errors['passwordInconformity']) {  //第一个密码框没错，但两个密码框输入不一样
              this.mesg = ValidationService.getValidatorErrorMessage('passwordInconformity');
              this.checkValid = true;
              return true;
            } else {
              this.checkValid = false;
            }
          }
        })
    )
  }
  onRegister() {
    let password = this.tools.encryption(this.passwordForm.value.password)
    // this.register = {
    //   account: this.route.params.get('phone'),
    //   loginPwd: password,//加密密码
    //   accountType: '2',
    //   operateType: '1',
    //   smsCode: this.route.params.get('code')
    // };
    this.register['loginPwd'] = password;
    this.subscription.add(
      this.userActivityService.register(this.register).subscribe((res) => {
        if (res.result === '0' && res.data) {
          // this.navCtrl.push(SetNickNamePage) //前往设置昵称
          this.userData.login(res.data.userId,res.data.token,res.data.refreshToken);
          this.router.navigate(['/login/set-nickname']);
        }

        this.tools.showToast(res.msg, 1500)
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
