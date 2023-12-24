import {Client, createClient, Sendable} from 'icqq'
import config from './config'
import attachGroupMessageHandler from '../handlers/attachGroupMessageHandler'
import {error} from '../utils/log'

let bot: Client

export const loginBot = () => new Promise<any>(resolve => {
  if (config.bot.disabled === true) return resolve(0)
  if (config.bot.uin === 'disabled') return resolve(0)

  if (config.bot.qrlogin === true) {
    bot = createClient({ platform: 3, ver: '2.1.7', sign_api_addr: 'http://127.0.0.1:8080/' });
    bot.on("system.online", resolve);
    bot.on("system.login.qrcode", (e) => {
      //扫码后按回车登录
      console.log("扫码后按回车登录")
      process.stdin.once("data", () => {
        bot.login();
      });
    })
    bot.login();
  } else {
    bot = createClient({ platform: 4, ver: '2.1.7', sign_api_addr: 'http://127.0.0.1:8080/' });
    bot.on("system.online", resolve);
    // 密码登录
    bot.on('system.login.slider', (e) => {
      console.log('滑块地址（使用这个）: ' + e.url)
      console.log('输入滑块地址获取的ticket后回车继续：')
      process.stdin.once('data', (data) => {
        bot.submitSlider(data.toString().trim())
      })
    })
    bot.on('system.login.device', (e) => {
      console.log('输入回车，使用短信验证码验证')
      process.stdin.once('data', (data) => {
        bot.sendSmsCode()
        console.log('请输入手机收到的短信验证码:')
        process.stdin.once('data', (res) => {
          bot.submitSmsCode(res.toString().trim())
        })
      })
    })
    bot.login(config.bot.uin ,config.bot.password)
  }
  //机器人接收二维码和解码签到事件
  attachGroupMessageHandler(bot)
})

export const pushQMsg = async (message: Sendable) => {
  if (config.bot.disabled === true) return
  if (config.bot.uin === 'disabled') return
  try {
    for (const group of config.bot.notifyGroups) {
      await bot.pickGroup(group).sendMsg(message)
    }
  } catch (e) {
    error('QQ 消息发送失败', e)
  }
}

export const pushQMsgToFirstGroup = async (message: Sendable) => {
  if (config.bot.disabled === true) return
  if (config.bot.uin === 'disabled') return
  try {
    await bot.pickGroup(config.bot.notifyGroups[0]).sendMsg(message)
  } catch (e) {
    error('QQ 消息发送失败', e)
  }
}
