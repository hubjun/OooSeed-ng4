/**
 * Created by 陈文豪 on 2017/4/30.
 * @description 此模块专门用于存放后台接口模型
 * 与swagger ui一样分为几大模块每个module在个子的模块下书写;
 */

export class SNSResult<T> {
  data: T;
  msg: string;
  result: string;
}
/**
 *认证相关接口 ;//IP Auth Controller
 **/


/**
 *视频相关接口 ;//Video Controller
 **/
export class catePart {
  id?: number;
  cateId?: number;
  cateName?: string;
  sortValue?: number;
  parentId?: number;
  selected?: number;
  forUpload?: number;
  createTime?: number;
  updateTime?: number;
}


/**
 *消息通知接口 ;//Notice Controller
 **/


/**
 *字典数据接口 ;//Dict Controller
 **/

export class DictVersionCityVO extends SNSResult<DictVersionCityVO>{
  dictCityVOList:Array<DictCityVO>;
  version:number;
}
export class DictCityVO {
  areaCode :string;//区号 ,
  areaId :number;//区域Id ,
  areaList : Array<DictArea>;
  firstLetter :string;//首字母 ,
  isHot :number;//是否热门 ,
  langType :string;//语言类型 ,
  latitude:number;//纬度 ,
  longitude:number//经度 ,
  parentId :number;//父Id ,
  pinYin :string;//城市拼音 ,
  postCode :string;//邮编 ,
  sortValue :number;//排序值 ,
  title :string;//区域名称
}

export class DictArea extends SNSResult<DictArea>{
  areaCode?: string;
  areaId: number ;
  firstLetter?: string ;
  isHot?: number ;
  langType?: string ;
  latitude?: number ;
  longitude?: number ;
  parentId?: number ;
  parentPostCode?: string ;
  pinYin?: string ;
  postCode?: string ;
  sortValue?: number ;
  title: string
}
/**
 *用户操作相关 ;//Feedback Controller
 **/
export interface UserShowTokenVO {
  refreshToken?: string;
  token?: string;
  userId?: string
}
export class UserInfoVO {
  aliasName : string; // 好友备注 ,
  appImgUrl : string; // 认证图标地址 ,
  appImgtxtUrl : string; // 认证图文地址 ,
  areaCity : number; // 所在地-市 ,
  areaCityName : string; // 所在地-市名称 ,
  areaDist : number; // 所在地-区/县 ,
  areaDistName : string; // 所在地-区/县名称 ,
  areaProv : number; // 所在地-省 ,
  areaProvName : string; // 所在地-省名称 ,
  areaStreet : string; // 所在地-街道 ,
  authName : string; // 认证名称 ,
  authStatus : number; // 认证状态：0,未认证,1,已认证 ,
  authType : number; // 用户类型1个人2组织 ,
  ballAge : number; // 年限 ,
  concernNum : number; // 关注数量 ,
  firstLetter : string; // 头字母 ,
  followNum : number; // 粉丝数量 ,
  height : number; // 用户身高 ,
  iconUrl : string; // 用户图像URL ,
  isFollowed : number; // 是否关注 ,
  isFollowedMe : number; // 是否关注了我 0未关注 1已关注 ,
  isFunction :boolean; // 是否拥有业务事件 ,
  nickName : string; // 用户昵称 ,
  orgInfoVO :OrgInfoVO; // 机构信息 ,
  repostCount : number; // 分享数 ,
  sex : number; // 性别 1.男 2女 3保密 ,
  sign : string; // 用户个性签名 ,
  sportType : number; // 运动类型 ,
  universityId : number; // 大学id ,
  userAge : number; // 用户年龄 ,
  userId : string; // 用户id ,
  weight : number; // 用户体重
}

export class UserInfoBasicRespVO {
  authType?:number;// 用户类型 ,
  iconUrl ?:string;// 用户图像URL ,
  nickName ?:string;// 用户昵称 ,
  orgId?:number;// 球队id ,
  sex?:number;// 性别 ,
  userId ?:string;// 用户id
}
export class OrgInfoVO {
  areaCity : number; // 市名 ,
  areaCityName : string; // 所在地-市名称 ,
  areaDist : number; // 区名 ,
  areaDistName : string; // 所在地-区/县名称 ,
  areaProv : number; // 省名 ,
  areaProvName : string; // 所在地-省名称 ,
  city : number; // 市 ,
  createTime : string; // 创建时间 ,
  creator : string; // 机构创建者 ,
  dist : number; // 区 ,
  distance :number; // 距离 ,
  iconUrl : string; // 头像地址 ,
  intro : string; // 机构简介 ,
  latitude :number; // 纬度 ,
  longitude :number; // 经度 ,
  orgId : number; // 机构id ,
  orgName : string; // 机构名称 ,
  orgType : number; // 机构类型 ,
  prov : number; // 省 ,
  status : number; // 机构状态：0：已删除，1：正常，2：警告 ,
  street : string; // 街道 ,
  userId : string; // 用户Id
}

export class UserAlbumFileVO {
  contentId?:number;// 内容id ,
  createTime?:string;//: 创建时间 ,
  feedId?:number;// 动态id ,
  fileId?:number;// 资源文件id ,
  fileName?:string;//: 资源文件名 ,
  fileNameHD?:string;//: 高清,不需要上报 ,
  fileNameSD?:string;//: 标清,不需要上报 ,
  fileSize?:number;// 视频文件大小 必填(单位字节) ,
  isDel?:number;// 帖子删除删除标记：1是 ,
  liveId?:number;// 直播ID,不需要上报 ,
  order?:string;//,
  playTime?:number;// 视频时长 必填(格式 hh:mm:ss或mm:ss字符串),2017-05-10类型改为int ,
  size?:number;//,
  sort?:string;//,
  start?:number;//,
  textContent?:string;//: 文本内容 ,
  type?:number;// 文件类型：2,图片;3,视频 ,
  userId?:string;//: 用户id
}
/**
 *帖子内容相关 ;//Feed Controller
 **/
export class FeedRespVO {
  address ?:string;// 发布时所在地 ,
  appImgUrl ?:string;// 认证图标地址 ,
  appImgtxtUrl ?:string;// 认证图文地址 ,
  clickCount ?:number;// 浏览次数 ,
  clientIp ?:string;// 客户端IP ,
  commentCount ?:number;// 评论次数 ,
  createTm ?:string;// 发帖时间 ,
  derviceType ?:number;//客户端类型：1.PC网站，2.iphone，3.android ,
  deviceName ?:string;// 设备名 ,
  diggCount ?:number;// 被赞次数 ,
  feedContents?:Array<FeedContentVO>;
  feedId ?:number;//
  isAudit ?:number;// 审核状态：0.未审核，1.已审核 ,
  isDel ?:number;// 删除标记：1是 ,
  isDigg ?:boolean;// 是否点赞 ,
  isFollow ?:number;// 是否关注 ,
  isRecommend ?:number;// 是否推荐：1.是 ,
  isRepost ?:number;// 是否转发 ,
  label ?:string;// 微博动态标签,传标签ID,用逗号分割 如1,2,3 ,
  labels?:Array<FeedLabel>;
  latitude ?:number;// 纬度 ,
  longitude ?:number;// 经度 ,
  nickName ?:string;// 昵称 ,
  publishTime ?:string;// 发布时间 ,
  rangeType ?:number;// 公开范围：0.所有人，1.仅好友可见，2.仅自己可见 ,
  recomTm ?:string;// 推荐时间 ,
  refId ?:number;// 微博转发ID ,
  repostCount ?:number;// 分享次数 ,
  sortValue ?:number;// 推荐排序 ,
  textContent ?:string;// 文本内容 ,
  title ?:string;// 微博动态标题 ,
  universityName ?:string;// 大学名称 ,
  userIcon ?:string;// 用户头像 ,
  userId ?:string;// 用户Id
}
export  class  FeedContentVO {
  albumContent ?:string;//
  content ?:string;// 内容 ,
  contentId ?:number;// 内容id ,
  contentType ?:number;// 内容类型：1,文本;2,图片;3,视频 ,
  feedId ?:number;// 微博id ,
  fileSize ?:number;// 文件大小,内容类型是3视频：必填(单位字节) ,
  operationType ?:number;// 对内容的操作：0,新增;1,删除;2,修改 ,
  playTime ?:string;// 视频时长,内容类型是3视频：必填(格式 hh:mm:ss或mm:ss字符串) ,
  sortNum ?:number;// 排序值 ,
  thumbnail ?:string;// 预览图
}
export class FeedLabel {
  isHot ?:number;//是否热门 0否1是 ,
  labelId ?:number;//标签Id ,
  labelName ?:string;// 标签名称 ,
  order ?:string;//
  sort ?:string;//
  sortValue ?:number;//排序值
}

export class FeedCommentRespVO {
  appImgUrl?:string;// 认证图标地址 ,
  appImgtxtUrl?:string;// 认证图文地址 ,
  clientIp?:string;// 客户端IP ,
  clientName?:string;// 设备名 ,
  clientType ?:number;// 客户端类型：1.PC网站，2.android，3,iphone ,
  commentId ?:number;// 动态序号 ,
  content ?:string;// 评论内容 ,
  createTime?:string;// 评论发表时间 ,
  diggCount ?:number;// 被赞次数 ,
  feedId ?:number;// 动态Id ,
  feedTitle ?:string;// 评论标题 ,
  fileId ?:number;// 文件Id ,
  fileUrl?:string;// 发表评论图像URL ,
  floor ?:number;// 楼层，对应相同feed_id从1开始累加 ,
  isAudit ?:number;// 是否审核，1.是 ,
  isDel ?:number;// 是否删除标记 ,
  isDigg ?:boolean;// 评论是否点赞 ,
  refCommentId ?:number;// 引用的评论id ,
  refContent?:string;// 引用的内容 ,
  refFileId ?:number;// 引用的fileId ,
  refFileUrl?:string;// 引用的图像地址 ,
  refUserNickName ?:string;// 引用用户昵称 ,
  type ?:number;// 评论标识,1：评论图片，文字，非引用 2：评论图片，文字，引用 3:既有评论，又有引用 ,
  userId ?:string;// 用户ID ,
  userInfoBasicRespVO?:Array<UserInfoBasicRespVO>
}

/**
 *球队相关接口 ;//Ball Team Controller
 **/
export class TeamEngageVO extends SNSResult<TeamEngageVO>{
  beginTime :string;// 比赛开始时间 ,
  clother :string;// 主方衣服颜色 ,
  costTypeId :number;// 费用类型ID ,
  costTypeName :string;// 比赛费用 ,
  createTime :string;// 创建时间 ,
  distance:number;// 距离 ,
  endDate :string;// 比赛结束时间 时间戳 ,
  endTime :string;// 比赛结束时间 ,
  fieldName :string;// 场地名称 ,
  fieldPlan :number;// 场地安排 ,
  formatId :number;// 赛制类型ID ,
  formatName :string;// 赛制name ,
  guestScoreTemp :number;// 客队临时得分 ,
  guestTeamIconUrl :string;// 客方球队图标 ,
  guestTeamId :number;// 客方球队ID ,
  guestTeamName :string;// 客方球队名称 ,
  homeScoreTemp :number;// 主队临时得分 ,
  homeTeamColorName :string;// 主约战球队颜色 ,
  homeTeamColorUrl :string;// 主约战球队颜色图标 ,
  homeTeamIconUrl :string;// 主约战球队图标 ,
  homeTeamId :number;// 主约战球队ID ,
  homeTeamName :string;// 主约战球队名称 ,
  id :number;// ID ,
  isAutoReferee :number;// 是否自动 AA制 裁判费 1是 2否 ,
  matchDate :string;// 比赛日期 ,
  matchTypeId :number;// 比赛类型ID 1.友谊赛 2.队内赛 ,
  matchTypeName :string;// 比赛类型name ,
  place :string;// 地点 ,
  remarks :string;// 备注 ,
  sportName :string;// 运动名称 ,
  sportType :number;// 运动类型ID ,
  startDate :string;// 比赛开始时间 时间戳 ,
  status :number;// 状态 0 取消 1约战中 2 约战成功 3 约战失败 ,
  teams:Array<number>;// 客队球队的ID集合
}
export class FootballTeam extends SNSResult<FootballTeam>{
  areaCity:number;// 所在地-市编码 ,
  areaCityName:string;// 所在地-市编名称 ,
  areaDist:number;// 所在地-区编码 ,
  areaDistName:string;// 所在地-区名称 ,
  areaProv:number;// 所在地-省编码 ,
  areaProvName:string;// 所在地-省名称 ,
  areaStreet:string;// 所在地-街道描述 ,
  autoMatchingCount:number;// 自动约战人数条件 ,
  avgAge:number;// 平均年龄 ,
  avgHeight:number;// 平均身高 ,
  avgWeight:number;// 平均体重 ,
  captainNickName:string;// 队长昵称 ,
  cateIconUrl:string;// 分类图标 ,
  cateName:string;// 分类名称 ,
  countFans:number;// 粉丝统计 ,
  countFollow:number;// 关注统计 ,
  countPlayer:number;// 成员数量 ,
  courtAddr:string;// 球场地址 ,
  createTime:string;// 创建时间, 格式yyyy-MM-dd HH:mm:ss ,
  creator:string;// 创始人ID ,
  defaultColorName:string;// 默认队服颜色名称 ,
  defaultColorUrl:string;// 默认队服颜色图标 ,
  distance :number;// 距离 ,
  establishTime:string;// 成立时间 ,
  formatIconUrl:string;// 赛制图标 ,
  formatId:number;// 默认赛制ID ,
  formatName:string;// 赛制名称 ,
  gradeFollow:number;// 0.双向关注 1 都没关注 2.我关注了对方 对方没有关注我 3.我没有关注对方 对方关注了我 ,
  gradeIconUrl:string;// 级别图标 ,
  gradeName:string;// 级别名称 ,
  groupType:number;// 组织类型：1.同城球友 ,
  groupTypeInfo:string;// 组织类型相关信息 ,
  iconFileId:number;// 队标资源ID ,
  iconFileUrl:string;// 队标资源url ,
  id:number;// 球队ID ,
  intro:string;// 介绍 ,
  latitude :number;// 纬度 ,
  longitude :number;// 经度 ,
  metro:string;// 附近地铁 ,
  name:string;// 球队名称 ,
  orgId:number;// 机构id ,
  orgName:string;// 机构id ,
  orgUser:string;// 机构用户id ,
  phone:string;// 手机号 ,
  place1:string;// 常驻场地 ,
  place2:string;// 常驻场地2 ,
  qq:string;// QQ号 ,
  qqGroup:string;// QQ群号 ,
  signature:string;// 球队签名 ,
  sportAttr:number;// 运动属性 ,
  sportAttrIconUrl:string;// 运动属性图标 ,
  sportAttrInfo:string;// 运动属性相关信息 ,
  sportAttrName:string;// 运动属性名称 ,
  sportTypes :Array<number>;
  status:number;// 状态 0.已删除 1.正常 2.风控警告规避 ,
  transit:string;// 附近公交 ,
  wchat:string;// 微信号
}
export class TeamPlayerVO {
  firstPosition : number; // 第一位置 ,
  firstPositionName : string; // 第一位置名称 ,
  inTeamTime : string; // 入队时间 ,
  inTeamTimeFormat : string; // 入队时长 ,
  leftOrRight : number; // 惯用方位 ,
  leftOrRightName : string; // 惯用脚 ,
  outTeamTime : string; // 离队时间 ,
  pcImgTxtUrl : string; // 球员认证图文图标：PC版本 ,
  pcImgUrl : string; // 球员认证图标：PC版本 ,
  personality : string; // 个性 多个id 用,隔开 ,
  personalityList :Array<string>
  personalityName : string; // 个性名称,多个用,隔开 ,
  playerNumber : number; // 球员编号 ,
  playerNumberName : string; // 球员编号名称 ,
  playerNumberUrl : string; // 球员编号图标 ,
  remarks : string; // 备注 ,
  roleDesc : string; // 角色描述 ,
  roleId : number; // 角色id ,
  roleName : string; // 角色名称 ,
  roleTag : string; // 角色key ,
  roleType : number; // 角色类型 ,
  secondPosition : number; // 第二位置 ,
  secondPositionName : string; // 第二位置名称 ,
  status : number; // 状态 ,
  statusName : string; // 状态 ,
  teamId : number; // 球队ID ,
  teamPosition : number; // 球队定位 ,
  teamPositionName : string; // 球队定位名称 ,
  // teamRole (SnsunionRole, optional; // 球队角色 ,
  userIconUrl : string; // 球员头像地址 ,
  userId : string; // 球员ID ,
  userName : string; // 球员名字
}
export class TeamMatchVO extends SNSResult<TeamMatchVO> {
  allowUpdate :boolean;
  beginTime : string; // 比赛开始时间 ,
  costTypeName : string; // 比赛费用 ,
  endDate : string; // 比赛结束时间 时间戳 ,
  endTime : string; // 比赛结束时间 ,
  engageId : number; // 约战Id ,
  fieldName : string; // 比赛场地 ,
  formatName : string; // 赛制name ,
  guestScore : number; // 客队得分 ,
  guestScoreTemp : number; // 客队临时得分 ,
  guestTeamIconUrl : string; // 客队头像 ,
  guestTeamId : number; // 客队ID ,
  guestTeamName : string; // 客队名称 ,
  homeColorName : string; // 主队队服颜色名称 ,
  homeColorUrl : string; // 主队队服颜色图标 ,
  homeScore : number; // 主队得分 ,
  homeScoreTemp : number; // 主队临时得分 ,
  homeTeamIconUrl : string; // 主队头像 ,
  homeTeamId : number; // 主队ID ,
  homeTeamName : string; // 主队名称 ,
  id : number; // 赛事ID ,
  matchState : number; // 比赛状态 0:未开,1:上半场,2:中场,3:下半场,4,加时，5,点球,-11:待定,-12:腰斩,-13:中断,-14:推迟,-1:完场，-10取消 ,
  matchTime : string; // 比赛时间 ,
  remarks : string; // 备注 ,
  scoreId : number; // 比分id ,
  scoreStatus : number; // 比分状态 0.初始化 1.待评审,2驳回,3.通过 ,
  searchSize : number;
  searchTeamId : number;
  sportType : number; // 运动类型ID ,
  startDate : string; // 比赛开始时间 时间戳
}
/**
 *IP推荐接口 ;//Ip Recom Conrtroller
 **/

/**
 *同城拼球接口 ;//City Fight Controller
 **/
export class RespCityEngageVO extends SNSResult<RespCityEngageVO>{
  distance :number; //距离 ,
  endTime :string; //开始时间 ,
  fightArea :string; //约战场地 ,
  fightCost :string; //费用 ,
  fightStatus :number; //约战状态 0：取消，1：越战中，2：约战成功，3：约战失败 ,
  iconUrl :string;// 头像 ,
  id :number;// 约战id ,
  nickName :string; //昵称 ,
  orgId :number; //主约战球队ID ,
  orgUserId :string;// 机构用户id ,
  sportForm :string; //类型制度 ,
  sportType :string; //约战类型 ,
  startTime :string; //开始时间
}


/**
 *其他 ;//Image Controller
 **/
export class CommonPageVo{
  endRow?:number;
  hasNextPage?:boolean;
  list?:Array<AppPlayTurn>;
  page?:number;
  pages?:number;
  rows?:number;
  startRow?:number;
  total?:number;
}

export class AppPlayTurn {
  clickUrl?;//string;
  deviceType?;//number;
  extParams?;//string;
  fileId?;//number;
  order?;//string;
  orderayTurnId?;//string;
  resId?;//string;
  resPosition?;//number;
  resType?;//number;
  resUrl?;//string;
  sortrtValue?;//string;
  status?;//number;
  title?;//string;
}


/**
 *认证相关接口 ;//IP Auth Controller
 **/

export class IpAuthCateLevelVO{
  cateName :string; //分类名称,
  cateType :number; //分类类型 1 个人 2 组织 ,
  ipCateId :number; //主键分类Id ,
  parentId :number; //父级分类id
}

/**
 *资讯相关接口 ;//Article Controller
 **/
export class ArticleCate {
  cateId?:number;
  cateName?:string;
  langId?:string;
  langType?:string;
  order?:string;
  parentId?:number;
  sort?:string;
  sortValue?:number;
}

export class ArticleVO {
  articleContentList?:Array<ArticleContent[]>;
  articleId?:number;
  authorIPImageUrl?:string;
  authorIPTextUrl?:string;
  authorImageUrl?:string;
  authorName?:string;
  cateId?:number;
  cateName?:string;
  clickCount?:number;
  commentCount?:number;
  content?:string;
  contentSize?:number;
  contentUrl?:Array<string[]>;
  coverUrl ?:Array<string[]>;
  createTime?:string;
  delOperatorId?:number;//删除操作人ID ,
  deleteTime?:string;//删除时间 ,
  hotOperatorId?:number;//热门操作人ID ,
  infoType?:number;//资讯类别；1:文章；2:组图 ,
  isDelete?:number;//是否删除 ,
  isHot?:number;//是否热门:0未推荐、1推荐、2不推荐 ,
  isRecommend?:number;//是否推荐 ,
  isTimming?:number;
  langId?:string;
  langType?:string;//语言 ,
  order?:string;
  parentCateId?:number;//分类父类id ,
  plainPublishTime?:string;//计划推送时间 ,
  publishStatus?:number;//推送状态 ,
  publishTime?:string;//推送时间 ,
  publishTimeFormat?:string;//发布时间 ,
  sort?:string;
  source?:string;//文章来源 ,
  status?:number;//状态 ,
  summary?:string;//主题 ,
  templateId?:number;//模板id ,
  title?:string;//标题 ,
  url?:string;//url ,
  userId?:string;//用户id
}

export class ArticleContent {
  articleId ?:number;
  content?:string;
  order?:string;
  page ?:number;
  sort ?:string;
}

export class ArticleCommentVO {
    appImgUrl?:string;
    appImgtxtUrl?:string;
    articleId?:number;//资讯ID ,
    clientIp?:string;// 客户端Ip ,
    commentId?:number;//评论ID ,
    content?:string;// 评论内容 ,
    createTime?:string;// 创建时间 ,
    iconUrl?:string;
    ipCateId?:number;
    isAudit?:number;//是否审核，默认是1通过0不通过 ,
    isDel?:number;//是否删除1是0否 默认0 ,
    nickName?:string;
    order?:string;
    osType?:number;//客户端类型：1.PC，2.iOS，3.android 4.H5 ,
    refCommentId?:number;//引用的评论 ,
    sort?:string;
    userId?:string;// 用户ID
}

/**
 *NEW 字典数据接口 ;//Dict Common Controller
 **/

export class DictReversalVO  extends SNSResult<DictReversalVO>{
  dicts: Array<BaseDictCommonVO>;
  remarks?: string;
  tableCode?: string;
  version: string;
}
export class BaseDictCommonVO {
  iconUrl?: string;
  id?: number;
  parentId?: number;
  selected?: number;
  title: string
}
