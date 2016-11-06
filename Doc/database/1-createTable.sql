/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     16/8/1 下午3:23:56                             */
/*==============================================================*/
CREATE DATABASE `tfdor`  
CHARACTER SET 'utf8'  
COLLATE 'utf8_general_ci'; 
/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     16/10/15 下午11:29:28                          */
/*==============================================================*/


drop table if exists AccessToken;
drop table if exists UserInfo;
drop table if exists RoleMenuRelate;
drop table if exists Menu;
drop table if exists QrcodeImg;
drop table if exists Role;
drop table if exists channel;
drop table if exists Auditing;
drop table if exists RedPack;
drop table if exists CreateQrcodeImg;



create table CreateQrcodeImg
(
   CreateQISeq        integer not null auto_increment comment '序列',
   channelId          varchar(20) not null comment '渠道',
   bigenDate          varchar(20) comment '二维码生效时间',
   endDate            varchar(20) comment '二维码失效时间',
   number             integer not null comment '二维码数量',
   createTime         timestamp default '0000-00-00 00:00:00',
   updateTime         timestamp default now() on update now(),
   primary key (CreateQISeq)
)DEFAULT CHARSET= UTF8
ENGINE = InnoDB;
alter table CreateQrcodeImg comment '二维码生成配置表';

create table RedPack(
   redPackSeq           integer not null auto_increment comment 'Seq',
   redPackType         char(1) not null comment '红包种类 1-普通红包，2-裂变红包' ,
   amountType          varchar(20) not null comment '金额类型 1-固定金额、2-随机金额',
   totalAmount         varchar(20) not null comment '红包金额  1-200，当type是随机金额时 totalAmount为一个区间例如：1-3（元）',
   wishing              varchar(50) not null comment '红包祝福语',
   actName              varchar(50) not null comment '活动名称',
   channelId            varchar(20) not null,
   remark               varchar(100) not null comment '备注',
   createTime           timestamp default '0000-00-00 00:00:00',
   updateTime           timestamp default now() on update now(),
   primary key (redPackSeq)
)DEFAULT CHARSET= UTF8
ENGINE = InnoDB;

alter table RedPack comment '红包配置表';




create table Auditing(
   auditingSeq integer not null auto_increment comment '审核表序列',
   auditingTrans varchar(50)  comment '审核交易',
   auditingName  varchar(100) comment '审核交易名称',
   auditingData  varchar(1024) not null comment '审核交易请求数据',
   promoterSeq integer not null comment '审核发起人Seq',
   promoter varchar(20) not null comment '审核发起人',
   auditPersonSeq integer not null comment '指定审核人SEQ',
   auditPerson varchar(20) not null comment '审核人名称',
   createTime timestamp comment '创建时间',
   updateTime timestamp comment '修改时间（审核时间）',
   state char(1) comment '审核状态，I－待审核，S－审核通过，F－审核拒绝',
   remarks varchar(100) comment '备注',
   primary key (auditingSeq)
)DEFAULT CHARSET= UTF8 ENGINE = InnoDB;
alter table Auditing comment '审核表';
/*==============================================================*/
/* Table: AccessToken                                           */
/*==============================================================*/
create table AccessToken
(
   tokenSeq             integer not null auto_increment,
   channelId            varchar(20),
   accessToken          varchar(512) not null,
   invalidTime          varchar(5) not null,
   createTime           timestamp default '0000-00-00 00:00:00',
   updateTime           timestamp default now() on update now(),
   primary key (tokenSeq)
)
DEFAULT CHARSET= UTF8
ENGINE = InnoDB;

alter table AccessToken comment 'AccessToken表';

/*==============================================================*/
/* Table: Menu                                                  */
/*==============================================================*/
create table Menu
(
   MenuId               varchar(20) not null,
   MenuName             varchar(50) not null,
   ParentId             varchar(20) not null,
   OrderId              integer,
   TransId              varchar(20),
   CreateTime           TIMESTAMP not null,
   primary key (MenuId)
)
DEFAULT CHARSET= UTF8
ENGINE = InnoDB;

alter table Menu comment '菜单表';

/*==============================================================*/
/* Table: QrcodeImg                                             */
/*==============================================================*/
create table QrcodeImg
(
   qrcodeSeq            integer not null auto_increment,
   CreateQISeq          integer not null,
   channelId            varchar(20) not null,
   appId                varchar(20) not null,
   actionName           varchar(20) not null,
   sceneId              varchar(50) not null,
   ticket               varchar(100) not null,
   url                  varchar(100) not null,
   qrcodeName           varchar(50),
   preservation         varchar(50),
   state                char(1) not null comment '二维码状态：I-初始状态，S-使用成功，F-使用失败',
   createTime           timestamp default '0000-00-00 00:00:00',
   updateTime           timestamp default now() on update now(),
   primary key (qrcodeSeq)
)DEFAULT CHARSET= UTF8
ENGINE = InnoDB;

alter table QrcodeImg comment '二维码表';

/*==============================================================*/
/* Table: Role                                                  */
/*==============================================================*/
create table Role
(
   RoleSeq              INTEGER not null auto_increment,
   ChannelId            VARCHAR(20) not null,
   RoleName             VARCHAR(30) not null,
   CreateTime           TIMESTAMP not null,
   primary key (RoleSeq)
)
auto_increment = 1000
DEFAULT CHARSET= UTF8
ENGINE = InnoDB;

alter table Role comment '角色表';

/*==============================================================*/
/* Table: RoleMenuRelate                                        */
/*==============================================================*/
create table RoleMenuRelate
(
   RoleSeq              INTEGER not null,
   MenuId               varchar(20) not null,
   primary key (RoleSeq, MenuId)
)
auto_increment = 1000
DEFAULT CHARSET= UTF8
ENGINE = InnoDB;

alter table RoleMenuRelate comment '角色菜单关联表';

/*==============================================================*/
/* Table: UserInfo                                              */
/*==============================================================*/
create table UserInfo
(
   UserSeq              INTEGER not null auto_increment,
   RoleSeq              INTEGER,
   UserId               VARCHAR(18),
   UserName             VARCHAR(18),
   Password             VARCHAR(50),
   Sex                  char(1),
   Age                  INTEGER(3),
   IdType               char(2),
   IdNo                 char(18),
   MobilePhone          char(11),
   Phone                VARCHAR(24),
   ChannelId            char(20),
   CreateTime           timestamp,
   Addr                 VARCHAR(500),
   primary key (UserSeq)
)
auto_increment = 800000
DEFAULT CHARSET= UTF8
ENGINE = InnoDB;

alter table UserInfo comment '用户表';

/*==============================================================*/
/* Table: channel                                               */
/*==============================================================*/
create table channel
(
   channelId            varchar(20) not null,
   channelName          varchar(50) not null,
   appId                varchar(20) not null,
   wxToken              varchar(20) not null,
   appSecret            varchar(100) not null,
   createTime           timestamp default '0000-00-00 00:00:00',
   updateTime           timestamp default now() on update now(),
   state                char(1) comment '渠道状态  N-正常，C-销户，S-停用',
   primary key (channelId)
)
auto_increment = 100
DEFAULT CHARSET= UTF8
ENGINE = InnoDB;

alter table channel comment '渠道表';

alter table AccessToken add constraint FK_Reference_6 foreign key (channelId)
      references channel (channelId) on delete restrict on update restrict;

alter table QrcodeImg add constraint FK_Reference_7 foreign key (channelId)
      references channel (channelId) on delete restrict on update restrict;

alter table RoleMenuRelate add constraint FK_Reference_2 foreign key (RoleSeq)
      references Role (RoleSeq) on delete restrict on update restrict;

alter table RoleMenuRelate add constraint FK_Reference_3 foreign key (MenuId)
      references Menu (MenuId) on delete restrict on update restrict;

alter table Role add constraint FK_Reference_4 foreign key (channelId)
      references channel (channelId) on delete restrict on update restrict;

alter table UserInfo add constraint FK_Reference_1 foreign key (RoleSeq)
      references Role (RoleSeq) on delete restrict on update restrict;

alter table UserInfo add constraint FK_Reference_5 foreign key (channelId)
      references channel (channelId) on delete restrict on update restrict;

alter table RedPack add constraint FK_Reference_7 foreign key (channelId)
      references channel (channelId) on delete restrict on update restrict;

alter table QrcodeImg add constraint FK_Reference_8 foreign key (CreateQISeq)
      references CreateQrcodeImg (CreateQISeq) on delete restrict on update restrict;

