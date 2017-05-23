import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { LocalService } from '../../local.service';
import { ToolsService } from '../../../shared/tools/tools.service';
import { TeamEngageVO } from '../../../domain/interface.model';

@Component({
  selector: 'match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['../../../team/components/match-card/match-card.component.scss','./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {
  private match: TeamEngageVO;
  private defaultTeamIcon = this.localService.defaultTeamIcon;
  constructor(
    private localService: LocalService,
    private toolsService: ToolsService,
    private router: ActivatedRoute
  ) { }
  /**
   * 获取约战信息
   * @param matchId ： 约战ID 
   */
  getMatchDetail(matchId: number) {
    let params = {
      engageId: matchId,
      language: 'zh_cn'
    }
    this.toolsService.showLoading();
    this.localService.getBookingMatchDetail(params).subscribe((res) => {
      if (res.result === '0') {
        this.toolsService.hideLoading();
        let match = res.data;
        let moreClotherParam = match.homeTeamColorUrl;
        //没有主队球服
        if (!moreClotherParam) {
          this.match = match;
          return;
        }
        //有主队球服
        let moreCloter = moreClotherParam.indexOf(',');
        if (moreCloter !== -1) {  //有多件主队球服
          let clotherIcons = match.homeTeamColorUrl.split(',');
          let clotherTexts = match.homeTeamColorName.split(',');
          let clothers = []
          for (let i = 0; i < clotherIcons.length; i++) {
            let icon = {
              "url": clotherIcons[i],
              "text": clotherTexts[i]
            }
            clothers.push(icon);
          }
          Object.assign(match, {
            "clothers": clothers
          })
        }
        this.match = match;
      }
    })
  }
  ngOnInit() {
    this.router.params.subscribe(params => {
      this.getMatchDetail(params.matchId);
    })
  }
}
