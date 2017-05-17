import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ToolbarHeaderComponent} from "./components/toolbar/toolbar-header";
import {ToolbarTitleComponent} from "./components/toolbar/toolbar-title";
import {ToolbarContentComponent} from "./components/toolbar/toolbar-content";
import {ToolbarMenuComponent} from "./components/toolbar/toolbar-menu";
import {ToolbarBackButtonComponent} from "./components/toolbar/toolbar-back";
import {ToolbarHomeComponent} from "./components/toolbar/toolbar-home";
import {ToolsService} from "./tools/tools.service";
import {StatusCodeService} from "./status-code/status-code.service";
import { SliderComponent } from './components/slider/slider.component';
import { DownAppComponent } from './components/go-down-app/go-down-app';
import {NgxSiemaModule} from "ngx-siema";
import {
  SafeStyle,
  TruncatePipe,
  ChineseDay,
  recruitWeek,
  Distance,
  ChineseWeek
} from './pipes/shared.pipe'
import {ToolbarRollerComponent} from "./components/toolbar/toolbar-roller";
import {RollerDirective} from "./directives/shared.directive";
import { BadgesComponent } from './components/badges/badges.component';
import {UserDataService} from '../shared/tools/user-data.service';
import {MissingDefaultContentComponent} from "./components/missing-page/missing-page";
import { ViewMoreComponent } from './components/view-more/view-more.component';
import {ToolbarNavComponent} from "./components/toolbar/toolbar-nav";
import {RouterModule} from "@angular/router";
import { GapBgComponent } from './components/gap-bg/gap-bg.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxSiemaModule,
    RouterModule
  ],
  declarations: [
    SafeStyle,
    TruncatePipe,
    ChineseDay,
    ChineseWeek,
    recruitWeek,
    Distance,
    ToolbarNavComponent,
    ToolbarHeaderComponent,
    ToolbarTitleComponent,
    ToolbarContentComponent,
    ToolbarMenuComponent,
    ToolbarBackButtonComponent,
    ToolbarHomeComponent,
    ToolbarRollerComponent,
    SliderComponent,
    RollerDirective,
    BadgesComponent,
    MissingDefaultContentComponent,
    ViewMoreComponent,
    DownAppComponent,
    ViewMoreComponent,
    GapBgComponent
   ],
  exports: [
    CommonModule,
    FormsModule,
    SafeStyle,
    TruncatePipe,
    ChineseDay,
    recruitWeek,
    Distance,
    ChineseWeek,
    ToolbarNavComponent,
    ToolbarHeaderComponent,
    ToolbarTitleComponent,
    ToolbarContentComponent,
    ToolbarMenuComponent,
    ToolbarBackButtonComponent,
    ToolbarHomeComponent,
    ToolbarRollerComponent,
    SliderComponent,
    RollerDirective,
    BadgesComponent,
    MissingDefaultContentComponent,
	  ViewMoreComponent,
    DownAppComponent,
	  ViewMoreComponent,
    GapBgComponent
  ],


  providers:[ToolsService, StatusCodeService, UserDataService]
})
export class SharedModule { }
