import { Injectable } from '@angular/core';
import { ToolsService } from '../shared/tools/tools.service';
import { HttpService } from '../core/http.service';
import { Observable, Subject } from 'rxjs';
import { SNSResult, FootballTeam, TeamMatchVO, CommonPageVo, UserInfoVO } from '../domain/interface.model';

@Injectable()
export class TeamService {
  private TEAM_TYPE_URL = '/dict/organization/type';
  private TEAM_BASIC_INFO_URL = '/team/ball';
  private TEAM_PLAYER_URL = '/team/players'
  private MATCH_URL = '/matchs/ball'
  private TEAM_RESULTS_URL = '/general/match/sum'
  private PLAYER_DETAIL_URL = '/team/player'
  private USER_INFO_URL = '/user/_guest/userInfo'
  private FOLLOW_URL = '/user/_guest/findFollow'
  private FANS_URL = '/user/_guest/findFans'
  private MATCH_DETAIL_URL = '/team/match'
  private EXPENSE_TYPE_URL = '/dict/expense/type'
  private MATCH_FORMAT_URL = '/dict/match/formart'
  private TEAM_CLOTHER_COLOR_URL = '/dict/jersey/color/football'

  // 默认头像
  public defaultUserIcon = '../../../assets/icon/concern_default_head.png';// 默认头像
  public defaultTeamIcon = '../../../assets/icon/team_default_badgebig.png'// 默认球队头像
  public team = {
    id: null,
    orgUser: null
  }
  public basicInfo: Subject<FootballTeam> = new Subject<FootballTeam>()
  constructor(
    private httpService: HttpService,
    private toolsService: ToolsService
  ) {

  }
  //获取球队基本信息
  getTeamBasicInfo(teamId: number) {
    let url = this.TEAM_BASIC_INFO_URL + '?id=' + teamId;
    this.httpService.get(url).map(res => res.json()).subscribe((res: FootballTeam) => {
      if (res.result === '0' && res.data) {
        this.basicInfo.next(res.data);
      }
    });
  }
  //获取球队球员列表
  getTeamPlayer(obj: object) {
    let url = this.TEAM_PLAYER_URL;
    let uri = this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  //获取球队战绩
  getTeamMatchResult(obj: object) {
    let url = this.TEAM_RESULTS_URL;
    let uri = this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  //获取球队赛程
  getTeamMatch(obj): Observable<any> {
    let url = this.MATCH_URL;
    let uri = this.toolsService.params(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  //获取球队关注信息
  getFollow(obj): Observable<any> {
    let url = this.FOLLOW_URL;
    let uri = this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  //获取用户粉丝信息
  getFans(obj): Observable<any> {
    let url = this.FANS_URL;
    let uri = this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  //获取球队球员详情
  getTeamPlayerDetail(obj) {
    let url = this.PLAYER_DETAIL_URL;
    let uri = this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  //获取用户信息
  getUserInfo(obj) {
    let url = this.USER_INFO_URL;
    let uri = this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  //获取球队比赛详情
  getMatchDetail(obj) {
    let url = this.MATCH_DETAIL_URL;
    let uri = this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
}
