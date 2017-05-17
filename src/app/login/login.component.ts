import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/Router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ValidationService } from '../shared/tools/validator.service';
import { StatusCodeService } from '../shared/status-code/status-code.service';
import { ToolsService } from '../shared/tools/tools.service';
import { UserDataService } from "../shared/tools/user-data.service";
import { UserActivityService } from "../shared/tools/user-activity.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  providers: [ToolsService, StatusCodeService, UserActivityService, UserDataService],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  account: AbstractControl;
  password: AbstractControl;
  phoneError: string = '';
  pswError: string = '';
  invalidPhoneNumber: boolean = false;
  passwordLimitLength: boolean = false;
  entrying: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tools: ToolsService,
    private userData: UserDataService,
    private user: UserActivityService,
  ) {
    this.loginForm = this.formBuilder.group({
      'account': ['', [Validators.required, ValidationService.accountValidator]],
      'loginPwd': ['', [Validators.required, ValidationService.passwordValidator]]
    });
  }
  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.router.events.subscribe((res) => {
        window.scrollTo(0, 0);
      })
    );
    this.subscription.add(
      this.loginForm.valueChanges
        .debounceTime(300)  //开始输入之后500毫秒内只取最新的结果
        .distinctUntilChanged() //去掉跟之前输入一样的结果
        .subscribe(form => {
          if (this.loginForm.controls['account'].errors) {  //判断账号框是否有错
            if (!this.loginForm.controls['account'].hasError('required')) {  //如果输入框非空
              this.invalidPhoneNumber = this.loginForm.controls['account'].errors['invalidPhoneNumber'];  //取验证结果
              this.phoneError = ValidationService.getValidatorErrorMessage('invalidPhoneNumber')
            } else { //用户名是空 
              this.phoneError = ValidationService.getValidatorErrorMessage('phoneNumberNull')
            }
          } else {
            this.invalidPhoneNumber = false;  //否则就不显示错误提示
          }
          if (!this.loginForm.controls['loginPwd'].pristine && !this.loginForm.controls['loginPwd'].hasError('required')) {  //判断密码框是否输入过和非空
            if (this.loginForm.controls['loginPwd'].errors) {  //如果密码框有错误
              this.passwordLimitLength = this.loginForm.controls['loginPwd'].errors['passwordLimitLength'];  //去验证结果
              this.pswError = ValidationService.getValidatorErrorMessage('passwordLimitLength')
            } else {
              this.passwordLimitLength = false;  //否则不显示错误提示
            }
          }
        })
    )
  }

  login() {
    this.tools.showLoading();
    let data = this.loginForm.value;
    data.loginPwd = this.tools.encryption(data.loginPwd);
    this.subscription.add(
      this.user.login(data).subscribe((res) => {
        if (!res || !res.result)
          return;
        if (res.result == 13 || res.result == 11) {
          this.tools.hideLoading();
          this.tools.showToast('登录名或者密码错误', 800);
        } else if (res.result == 0 && res.data) {
          this.userData.login(res.data.userId, res.data.token, res.data.refreshToken);
          this.tools.hideLoading();
          this.router.navigate(['/home'])
        } else {
          this.tools.showToast('登录出错请刷新后重试', 800);
        }
      })
    )
  }

  gotoRegister() {
    this.router.navigate(['/login/register'])
  }
  close() {
    this.router.navigate(['/home'])
    // window.history.back();
  }
}
