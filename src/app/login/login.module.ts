import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from "./login.component";
import {LoginRoutingModule} from "./login-routing.module";
import { SetPasswordComponent } from './set-password/set-password.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SetNicknameComponent } from './set-nickname/set-nickname.component';
import { BlankHeaderComponent } from './component/blank-header/blank-header.component';
import { LoginLogoComponent } from './component/logo/logo.component';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    SetPasswordComponent,
    RegisterComponent,
    SetNicknameComponent,
    BlankHeaderComponent,
    LoginLogoComponent
  ]
})
export class LoginModule { }
