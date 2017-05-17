import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {CoreModule} from "./core/core.module";
import {HomeModule} from "./home/home.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    HomeModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
