/**
 * Created by dell on 2017/5/12.
 */
import {Component,OnInit}from'@angular/core';
import {Router,ActivatedRoute}from '@angular/router';
import {componentFactoryName} from "@angular/compiler";
import {AuthService} from '../../shared/service/auth.service';

@Component({
  selector: 'my-content',
  templateUrl: './my-content.component.html',
  styleUrls: ['./my-content.component.scss']
})

export class MyContentComponent implements OnInit {
  private userId: string = ''
  constructor(
    private router: Router,
    private authSer: AuthService,
  ){
    this.userId = this.authSer.getUserid();
  }
  goMyFeeds(){
    this.router.navigate(['/home/feed']);
  }
  goMyAlbum(){
    this.router.navigate([`/homepage/${this.userId}/my-picture`]);
  }
  goMyVideo(){
    this.router.navigate([`/homepage/${this.userId}/my-video`]);
  }
  goMyInfo(){
    this.router.navigate([`/mine/my-info`]);
  }
  goMyDigg(){
    this.router.navigate([`/mine/my-digg`]);
  }
  ngOnInit(){
    !this.authSer.getUserid?this.router.navigate(['./login']):'';
  }
}
