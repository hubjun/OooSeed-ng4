import { Component, OnInit, ElementRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToolsService } from '../../shared/tools/tools.service';
import {VideosService} from '../videos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss'],
  providers: [VideosService,ToolsService]
})
export class VideoDetailComponent implements OnInit {
  videoId: number;
  cateId: number;

  isPause: boolean = false;
  // videoRefresh: boolean = false;
  // isRcommend: boolean = false;
  videoCover: string = "";
  isTextHidden: boolean = false;
  isHasUserIcon: boolean = false;
  deVideoInfo: any[] = [];
  videoCateList: any[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    public videoService: VideosService,
    public tools: ToolsService,
    private el:ElementRef,
  ) {
    // this.videoId = this.activeRoute.snapshot.params['videoID'];
    // this.cateId = this.activeRouter.snapshot.queryParams['cateId'];
    this.tools.setTitle('视频详情');

  }

  goBack(){
    this.router.navigate(['/videos']);
  };

  goPersonalPage(userid){
    this.router.navigate(['/homepage',userid]);
  }

  hiddenToggle(){
    if(this.isTextHidden == false){
      this.isTextHidden = true;
    }else {
      this.isTextHidden = false;
    }
  };

  videoSwitch(){
    var video = this.el.nativeElement.querySelector('video');
    // var videoRefresh = this.el.nativeElement.querySelector('.vplay');
    // videoRefresh.classList.remove('videoRefresh');
    if(video.paused) {
      this.isPause = true;
      video.play();
    }else {
      this.isPause = false;
      video.pause();
    }
  };

  //跳跃播放
  videoSkip(e){
    var video = this.el.nativeElement.querySelector('video');
    var ev = e || window.event;
    //debugger
    video.currentTime = (ev.offsetX / ev.target.offsetWidth) * video.duration;
    //console.log('offsetX:'+ev.offsetX+' ------- offsetWidth:'+ev.target.offsetWidth +' ------ clientX:'+ev.clientX);
  };

  //视频信息
  getDemandInfo(){
    // debugger
    // console.log(this.videoId);
    this.videoService
      .getDeVideoDetail(this.videoId)
      .subscribe(rs => {
        if(rs.result === '0'){
          // console.log(rs);
          this.deVideoInfo = rs.data;
          if(rs.data.userIcon == '' || 'undefinded'){
            this.isHasUserIcon = true;
          }
        }else {
          return;
        }
      })
  };

  //视频详情推荐列表
  getRecommendList(){
    // let cateID = this.cateId;
    // let cateID = 5;
    this.videoService
      .getVideoDetailList(this.cateId)
      .subscribe(rs => {
        // debugger
        if(rs.result === '0'){
          if(rs.data.list.length){
            this.videoCateList = rs.data.list;
            // console.log(this.videoCateList);
            // this.isRcommend = false;
          }else {
            // this.isRcommend = true;
          }
        }else {
          return;
        }
      })
  };

  ngOnInit(){
    var video = this.el.nativeElement.querySelector('video');
    // console.log(videos.innerHTML);
    var totalTime = this.el.nativeElement.querySelector('.total');
    var pause = this.el.nativeElement.querySelector('.ispause');
    // var videoRefresh = this.el.nativeElement.querySelector('.vplay');
    var loaded = this.el.nativeElement.querySelector('.loaded');
    var currPlayTime = this.el.nativeElement.querySelector('.current');
    var expand = this.el.nativeElement.querySelector('.expand');

    this.activeRoute.queryParams.subscribe(param => {
      this.videoId = param['videoID'];
      this.cateId = param['cateID'];
      this.videoCover = param['videoCover'];
      // let video = document.getElementById('video');
      let video = this.el.nativeElement.querySelector('video');
      video.poster = this.videoCover;
      this.getDemandInfo();
      this.getRecommendList();
      // console.log(this.videoCover);

    });

    this.getRecommendList();
    // this.activeRoute.params.forEach((params: Params) => {
    //   // 使用+将字符串类型的参数转换成数字
    //   this.videoId = +params['videoID'];
    //   this.cateId = +params['cateID'];
    //
    //   this.getDemandInfo();
    //   this.getRecommendList();
    // });

    //当视频可播放的时候
    video.oncanplay = function(){
      //显示视频
      this.style.display = "block";
      //显示视频总时长
      totalTime.innerHTML = getFormatTime(this.duration);
      //自动播放
      // var video = this.el.nativeElement.querySelector('video');
      // if(video.paused) {
      //   video.play();
      //   // this.isPause = false;
      // }
    };

    // video.onerror = function (err) {
    //   console.log(err);
    //   // this.tools.showToast('视频不存在',1500);
    // };

    //播放完毕还原设置
    video.onended = function(){
      var that = this;
      //进度条为0
      // loaded.style.width = 0;
      //还原当前播放时间
      currPlayTime.innerHTML = getFormatTime('');
      //视频恢复到播放开始状态
      that.currentTime = 0;
      // videoRefresh.classList.add('videoRefresh');
      //this.isPause = false;
      // console.log(videoRefresh.attributes);
    };

    //播放时间
    function getFormatTime(time) {
      var time = time || 0;

      var h = parseInt((time /3600).toString()),
        m = parseInt((time%3600/60).toString()),
        s = parseInt((time%60).toString());
      h = h < 10 ? 0 +h : h;
      m = m < 10 ? 0 +m : m;
      s = s < 10 ? 0 +s : s;

      return h+":"+m+":"+s;
    }

    //播放进度
    video.ontimeupdate = function(){
      var currTime = this.currentTime,    //当前播放时间
        duration = this.duration;       // 视频总时长
      //百分比
      var pre = currTime / duration * 100 + "%";
      //显示进度条
      loaded.style.width = pre;
      //console.log('已播放:'+pre+' ----- 播放时间:'+currTime);
      //显示当前播放进度时间
      currPlayTime.innerHTML = getFormatTime(currTime);
    };

    //全屏
    // expand.onclick = function(){
    //   video.webkitRequestFullScreen();
    // };
  };



  ngOnDestroy(){
    let videos = this.el.nativeElement.querySelector('video');
    if(videos.play) {
      videos.pause();
      this.isPause = false;
    }
    this.subscription.unsubscribe();
  };

}
