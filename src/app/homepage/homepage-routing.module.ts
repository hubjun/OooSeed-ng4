import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {HomepageComponent} from "./homepage.component";
import {HomepageShareComponent} from "./homepage-share/homepage-share.component";
import {HomepageServiceComponent} from "./homepage-service/homepage-service.component";
import {HomepageFansComponent} from "./homepage-fans/homepage-fans.component";
import {HomepageCircleComponent} from "./homepage-circle/homepage-circle.component";

const routes: Routes = [
  {
    path:'',
    component:HomepageComponent,
    children: [
      {
        path:'',
        component:HomepageShareComponent,
      },
      {
        path:'person-share/:userId',
        component:HomepageShareComponent,
      },
      {
        path:'person-circle/:userId',
        component:HomepageCircleComponent,
      },
      {
        path:'person-fans/:userId',
        component:HomepageFansComponent,
      },
      {
        path:'person-service/:userId',
        component:HomepageServiceComponent,
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomepageRoutingModule {
}
