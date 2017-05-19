import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpModule, XHRBackend, RequestOptions, Http} from "@angular/http";
import {HttpService} from "./http.service";
import {UserDataService} from "../shared/tools/user-data.service";
import {HttpIntercept} from "./HttpIntercept";
import {AuthService} from "../shared/service/auth.service";
import {AuthGuardService} from "../shared/service/auth-guard.service";

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions, userData: UserDataService) {
  return new HttpIntercept(backend, defaultOptions, userData)
}
@NgModule({
  imports: [
    HttpModule,
  ],
  providers:[
    HttpService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, UserDataService]
    },
    AuthService,
    AuthGuardService
  ]
})

export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}




