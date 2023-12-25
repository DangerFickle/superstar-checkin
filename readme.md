# Superstar Checkin

超星学习通自动签到工具

[![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/Clansty/Superstar-checkin/oicq/main)](https://github.com/takayama-lily/oicq)
[![discord](https://img.shields.io/static/v1?label=chat&message=discord&color=7289da&logo=discord)](https://discord.gg/WV8W25eH)

特色：

- 通过 IM 协议实时获取签到信息，而不是每隔一定时间请求服务器

- 包含 QQ 机器人，实时向指定的群通知程序状态

- 等待其他人签到后再签到，防止秒签

- 暂不支持二维码签到

## 功能（已实现部分）

- [x] 自动取 Cookie，过期自动更新

- [x] 支持通过学习通 IM 协议实时获取签到推送

- [x] 在群内发送提醒并自动签到

- [x] 支持多用户共同签到

- [x] 根据课程设置签到经纬度以及位置名称

  请使用[此网页](https://api.map.baidu.com/lbsapi/getpoint/index.html)拾取坐标

- [x] 支持通过周次设定签到的地址，适用于实验课和正课在不同地点的情况

- [x] 支持设置等待其他人签到后再执行签到，防止老师还没发布签到码就秒签了

- [x] 支持设置等待其他人签到超时时间，单位秒

- [x] 支持设置等待已签人员时，已签人员大于等于多少时才自动签到，为0时有人签到了就直接签到

- [x] 支持图片签到，自行设置当多少人签到后随机抽取已签人员的图片上传

- [x] 手动签到

  机器人命令：`签到 {aid} {courseId} {classId}`

- [x] Docker 和 Docker Compose 部署

- [ ] 通过 REST API 设置课程信息

- [ ] 通过 QQ 机器人接收群内发送的二维码实现二维码签到

## 部署方法

### 手动部署

1. 安装 NodeJS 14 以上版本
2. `yarn install`
3. `cp config.example.yaml config.yaml` 并在 `config.yaml` 中填写配置项。配置文件中自带说明，请参考
4. `yarn build`
5. `yarn start`

提示：机器人建议使用账号密码登陆

## 限制

（据说）学习通禁止腾讯云阿里云这种 IP 签到，所以需要部署在家庭宽带下

## 参考

本程序借鉴了一些前人的项目：

- [mkdir700/chaoxing_auto_sign](https://github.com/mkdir700/chaoxing_auto_sign)
- [SSmJaE/XueXiTonsSign_Electron](https://github.com/SSmJaE/XueXiTonsSign_Electron)
- [cyanray/cx-auto-sign](https://github.com/cyanray/cx-auto-sign)

更多有关学习通签到的项目值得尝试

| 项目地址                                                | 开发语言   | 备注                                           |
| ------------------------------------------------------- | ---------- | ---------------------------------------------- |
| https://github.com/cyanray/cx-auto-sign                 | C#         | 超星学习通自动签到工具，通过IM协议监测签到活动。        |
| https://github.com/mkdir700/chaoxing_auto_sign          | Python     | 超星学习通自动签到脚本&多用户多任务&API       |
| https://github.com/PrintNow/ChaoxingSign                | PHP        | PHP版超星自动签到，支持多用户，二次开发便捷！|
| https://github.com/Wzb3422/auto-sign-chaoxing           | TypeScript | 超星学习通自动签到，梦中刷网课       |
| https://github.com/Huangyan0804/AutoCheckin             | Python     | 学习通自动签到，支持手势，二维码，位置，拍照等 |
| https://github.com/aihuahua-522/chaoxing-testforAndroid | Java       | 学习通（超星）自动签到               |
| https://github.com/yuban10703/chaoxingsign              | Python     | 超星学习通自动签到                   |
| https://github.com/SSmJaE/XueXiTonsSign_Electron        | TypeScript | 基于Electron，桌面端，GUI，签到队列            |
