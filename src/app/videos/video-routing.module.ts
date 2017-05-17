import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { VideoMoreComponent } from './video-more/video-more.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { VideoHomeComponent } from './video-home/video-home.component';

const routes:Routes = [
  {
    path:'',
    component: VideoHomeComponent,
    children:[
      // {
      //   path: 'more/:cateId',
      //   component: VideoMoreComponent
      // },
    ]
  },
  {
    path: 'more/:cateId',
    component: VideoMoreComponent
  },
  {
    path: 'detail',
    component: VideoDetailComponent
  },
  {
    path:'video-home',
    component: VideoHomeComponent
  },
  {
    path:'video-detail',
    component: VideoDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class VideoRoutingModule { }
