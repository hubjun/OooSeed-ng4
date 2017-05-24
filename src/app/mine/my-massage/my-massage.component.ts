/**
 * Created by dell on 2017/5/12.
 */
import {Component,OnInit}from'@angular/core';
import {Router,ActivatedRoute}from '@angular/router';
import {componentFactoryName} from "@angular/compiler";
import {AuthService} from '../../shared/service/auth.service';

@Component({
  selector: 'my-content',
  templateUrl: './my-massage.component.html',
  styleUrls: ['./my-massage.component.scss']
})

export class MyMassageComponent implements OnInit {

  constructor(
    private router: Router,
    public authservice:AuthService
  ){

  }
  goNotice(){
    this.router.navigate(['/mine/my-notice']);
  }
  goAtMe(){
    this.router.navigate(['/mine/atme']);
  }
  goDiggMe(){
    this.router.navigate(['/mine/diggme']);
  }
  ngOnInit(){
    !this.authservice.getUserid?this.router.navigate(['./login']):'';
  }
}
