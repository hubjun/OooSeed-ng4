import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';
import { FormBuilder, FormGroup, AbstractControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ValidationService } from '../../shared/tools/validator.service';
import { UserActivityService } from '../../shared/tools/user-activity.service';
import { ToolsService } from '../../shared/tools/tools.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserActivityService,]
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  private account: AbstractControl;//手机号
  private verifyCode: AbstractControl;//验证码
  private isRegister: boolean = false //是否已注册
  public invalidPhoneNumber: boolean = false;
  public phoneError: string = '';
  private timer: string = '发送验证码';
  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public userActicityService: UserActivityService,
    public tools: ToolsService,
  ) {
    this.registerForm = this.formBuilder.group({
      'account': ['', [Validators.required, ValidationService.accountValidator]],
      'verifyCode': ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.tools.setTitle('注册');
    this.subscription.add(
      this.registerForm.valueChanges
        .debounceTime(300)  //开始输入之后500毫秒内只取最新的结果
        .distinctUntilChanged() //去掉跟之前输入一样的结果
        .subscribe(form => {
          if (this.registerForm.controls['account'].errors) {  //判断账号框是否有错
            if (!this.registerForm.controls['account'].hasError('required')) {  //如果输入框非空
              this.invalidPhoneNumber = this.registerForm.controls['account'].errors['invalidPhoneNumber'];  //取验证结果
              this.phoneError = ValidationService.getValidatorErrorMessage('invalidPhoneNumber')
            } else { //用户名是空 
              this.phoneError = ValidationService.getValidatorErrorMessage('phoneNumberNull')
            }
          } else {
            this.invalidPhoneNumber = false;  //否则就不显示错误提示
          }
        })
    )
  }

  gotoFindPsw() {
    this.router.navigate(['/login/set-psw'])
  }
  //获取短信验证码
  getSMSCode() {
    if(this.registerForm.controls['account'].errors){  //手机号码不正确就不请求
      return;
    }
    let SMSCode = {
      phone: this.registerForm.value.account,
      operateType: '1'
    }
    this.userActicityService.getSMSCode(SMSCode).subscribe((res) => {
      if (res.result === '0') {
        this.SMSCodeCountDown(60)
        return false;
      }else if(res.result =='4002'){  //后台返回4002去取的话是缺少参数的提示，所以这个接口单独写
          this.tools.showToast('手机号码不正确');
          return false;
        } else {
        this.tools.showStatusCodeMsg(res.result)
      }
    })
  }
  //前往设置密码
  goSetPassword() {
    //核实验证码
    let form = this.registerForm.value;
    let validateSMSCode = {
      validateMsg: form.verifyCode,
      validateType: '5',
      somethingStr: form.account,
      operateType: '1'
    };
    // this.router.navigate(['/login/set-psw'],{queryParams:{phone: form.account , code: form.verifyCode}})
    this.subscription.add(
      this.userActicityService.checkSMSCode(validateSMSCode).subscribe((res) => {
        if (res.result === '0') {
          // this.navCtrl.push(SetPasswordPage, {
          //   code: form.verifyCode,
          //   phone: form.account
          // })
          this.router.navigate(['/login/set-psw'], { queryParams: { phone: form.account, code: form.verifyCode } })
          return false;
        }


        this.tools.showStatusCodeMsg(res.result)

      })
    );
  }
  //发送验证码倒计时
  SMSCodeCountDown(second: number) {
    if (second !== 0) {
      // e.target.preventDefault()
      this.timer = `${second--}秒`
      setTimeout(() => {
        this.SMSCodeCountDown(second)
      }, 1000)
    }
    else {
      this.timer = '发送验证码'
    }
  }
  goProtocal(){
    this.router.navigate(['/login/registration-protocol']);
  }
  // goBack() {
  //   window.history.back();
  // }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
