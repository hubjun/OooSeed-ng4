import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from "@angular/router";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule'
  },
 {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
 {
    path:'homepage/:userId',
    loadChildren:'app/homepage/homepage.module#HomepageModule'
  },
  {
    path:'mine',
    loadChildren:'app/mine/mine.module#MineModule',
  },
  {
    path:'team/:teamId',
    loadChildren:'app/team/team.module#TeamModule'
  },
  {
    path:'videos',
    loadChildren:'app/videos/videos.module#VideosModule'
  },
  {
    path:'local',
    loadChildren:'app/local/local.module#LocalModule',
  },
  {
    path:'login-out',
    loadChildren:'app/home/home.module#HomeModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],

})
export class AppRoutingModule {
}
