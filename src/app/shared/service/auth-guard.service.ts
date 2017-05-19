import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate,CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean{
    let url:string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    return this.canActivate(route,state)
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn == 'true') {
      return true;
    }

    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

}
