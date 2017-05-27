import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ToolsService} from '../../shared/tools/tools.service';
import {VideosService} from '../videos.service';

@Component({
  selector: 'app-video-more',
  templateUrl: './video-more.component.html',
  styleUrls: ['./video-more.component.scss']
})

export class VideoMoreComponent implements OnInit {
  listObj: any[] = [];
  cateId: number;
  constructor(
    public activeRoute: ActivatedRoute,
    public router: Router,
    public videoService: VideosService,
    public tools: ToolsService
  ) {
    this.tools.setTitle('更多视频');
  }

  getMoreList(){
    this.videoService
      .getMoreList(this.cateId)
      .subscribe(rs=>{
        // console.log(rs);
        if(rs.result === '0'){
          this.listObj = rs.data.list;
        }
      })
  };

  ngOnInit() {
    // this.cateId = this.activeRouter.params['cateId'];
    this.activeRoute.params.forEach((params: Params) => {
      // 使用+将字符串类型的参数转换成数字
      this.cateId = +params['cateId'];
      this.getMoreList();
    });
    console.log(this.cateId);
  }

}
