import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpModule} from "@angular/http";
import {HttpService} from "./http.service";

@NgModule({
  imports: [
    HttpModule,
  ],
  providers:[
    HttpService, 
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
