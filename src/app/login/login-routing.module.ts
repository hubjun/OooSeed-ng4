import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { SetPasswordComponent } from './set-password/set-password.component';
import { RegisterComponent } from './register/register.component';
import { SetNicknameComponent } from './set-nickname/set-nickname.component';

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
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
