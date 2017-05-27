import { Injectable } from '@angular/core';
import { ToolsService } from '../shared/tools/tools.service';
import { HttpService } from '../core/http.service';
import { Observable, Subject } from 'rxjs';
import { SNSResult, FootballTeam, TeamMatchVO, CommonPageVo, UserInfoVO, TeamPlayerVO, OrgInfoVO, ReportTeamMatchVO } from '../domain/interface.model';

@Injectable()
export class TeamService {
  public TEAM_TYPE_URL = '/dict/organization/type';
  public TEAM_BASIC_INFO_URL = '/team/ball';
  public TEAM_PLAYER_URL = '/team/players'
  public MATCH_URL = '/matchs/ball'
  public TEAM_RESULTS_URL = '/general/match/sum'
  public PLAYER_DETAIL_URL = '/team/player'
  public USER_INFO_URL = '/user/_guest/userInfo'
  public FOLLOW_URL = '/user/_guest/findFollow'
  public FANS_URL = '/user/_guest/findFans'
  public MATCH_DETAIL_URL = '/team/match'
  public EXPENSE_TYPE_URL = '/dict/expense/type'
  public MATCH_FORMAT_URL = '/dict/match/formart'
  public TEAM_CLOTHER_COLOR_URL = '/dict/jersey/color/football'

  // 默认头像
  public defaultUserIcon = '../../../assets/icon/concern_default_head.png';// 默认头像
  public defaultTeamIcon = '../../../assets/icon/team_default_badgebig.png'// 默认球队头像
 
  public currentChannel: string = 'teamChannel';
  constructor(
    public httpService: HttpService,
    public toolsService: ToolsService
  ) {
  }
  /**
   * 获取球队基本信息
   * @param teamId :球队id
   */
  getTeamBasicInfo(teamId: string): Observable<SNSResult<FootballTeam>> {
    let url = this.TEAM_BASIC_INFO_URL + '?id=' + teamId;
    return this.httpService.get(url).map(res => res.json());
  }
  /**
   * 获取球队球员列表
   * @param obj {id：球队id,rows?：球员数量 } 
   */
  getTeamPlayer(obj: object): Observable<SNSResult<CommonPageVo<TeamPlayerVO>>> {
    let url = this.TEAM_PLAYER_URL;
    let uri = this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  //获取球队战绩
  /**
   * 
   * @param obj { teamId: 球队id,mode: 报表模式 ,dataSize: 数据大小}
   */
  getTeamMatchResult(obj: object): Observable<SNSResult<ReportTeamMatchVO>>  {
    let url = this.TEAM_RESULTS_URL;
    let uri = this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  /**
   * 获取球队赛程
   * @param obj {teamId: 球队id,status：比赛状态}
   */
  getTeamMatch(obj): Observable<SNSResult<CommonPageVo<TeamMatchVO>>> {
    let url = this.MATCH_URL;
    let uri = this.toolsService.params(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
   /**
   * 获取球队关注信息
   * @param obj  {userId: 球队创建者ID,rows?: 数据条数}
   */
  getFollow(obj: object): Observable<SNSResult<UserInfoVO[]>> {
    let url = this.FOLLOW_URL;
    let uri = this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  /**
   * 获取用户粉丝信息
   * @param obj  {userId: 球队创建者ID,rows?: 数据条数}
   */
  getFans(obj: object): Observable<SNSResult<UserInfoVO[]>> {
    let url = this.FANS_URL;
    let uri = this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  /**
   * 获取球队球员详情
   * @param obj {teamId:球队id,playerId:球员id}
   */
  getTeamPlayerDetail(obj: object): Observable<SNSResult<TeamPlayerVO>> {
    let url = this.PLAYER_DETAIL_URL;
    let uri = this.toolsService.param(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  /**
   * 获取用户信息
   * @param userId :用户 id
   */
  getUserInfo(userId: string): Observable<SNSResult<UserInfoVO>> {
    let url = this.USER_INFO_URL + '?userId=' + userId;
    return this.httpService.get(url).map(res => res.json());
  }
  /**
   * 获取球队比赛详情
   * @param matchId :比赛id
   */
  getMatchDetail(matchId: number): Observable<SNSResult<TeamMatchVO>> {
    let url = this.MATCH_DETAIL_URL + '?matchId=' + matchId;
    return this.httpService.get(url).map(res => res.json());
  }
}
