import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { SetPasswordComponent } from './set-password/set-password.component';
import { RegisterComponent } from './register/register.component';
import { SetNicknameComponent } from './set-nickname/set-nickname.component';
import {AuthService} from "../shared/service/auth.service";
import {AuthGuardService} from "../shared/service/auth-guard.service";
import { RegistrationProtocolComponent } from '../protocol/registration-protocol/registration-protocol.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      // {
      //   path: 'account',
      //   component: AccountComponent
      // },
    ]
  },
  {
    path: 'set-psw',
    component: SetPasswordComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'set-nickname',
    component: SetNicknameComponent
  },
  {
    path: 'registration-protocol', 
    component: RegistrationProtocolComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
