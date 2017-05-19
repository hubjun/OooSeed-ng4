import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {HomepageComponent} from "./homepage.component";
import {HomepageShareComponent} from "./homepage-share/homepage-share.component";
import {HomepageServiceComponent} from "./homepage-service/homepage-service.component";
import {HomepageFansComponent} from "./homepage-fans/homepage-fans.component";
import {HomepageCircleComponent} from "./homepage-circle/homepage-circle.component";
import {MyVideoComponent} from "./my-video/my-video.component";
import {MyPictureComponent} from "./my-picture/my-picture.component";
import {MyCareFansComponent} from "./my-care-fans/my-care-fans.component";
import {MyFansComponent} from "./my-fans/my-fans.component";

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
      },
    ]
  },
  {
    path:'my-video/:userId',
    component:MyVideoComponent,
  },
  {
    path:'my-picture/:userId',
    component:MyPictureComponent,
  },
  {
    path:'my-care-fans/:userId',
    component:MyCareFansComponent,
  },
  {
    path:'my-fans/:userId',
    component:MyFansComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomepageRoutingModule {
}
