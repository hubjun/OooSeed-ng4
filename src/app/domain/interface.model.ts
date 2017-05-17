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


/**
 *帖子内容相关 ;//Feed Controller
 **/


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
