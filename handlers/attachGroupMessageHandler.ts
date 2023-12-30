import {Client, ImageElem} from 'icqq'
import config from '../providers/config'
import {info} from '../utils/log'
import decodeQrCode from '../utils/decodeQrCode'
import handlerQrcodeSign from './handleQrcodeCheckin'
import accountsManager from '../utils/accountsManager'
import handleCheckin from "./handleCheckin"
import expiringMap from "../utils/ExpiringMap";

export default (bot: Client) => bot.on('message.group', async data => {
    //检查来源
    if (!config.bot.qrcodeGroups.includes(data.group_id)) return
    //检查屏蔽名单，防止两个机器人一台戏
    if (config.bot.ignore && config.bot.ignore.includes(data.user_id)) return
    //处理 ping 请求
    if (data.raw_message === 'ping') {
        data.reply('pong!')
        return
    }
    //检查图片
    const imageElem = data.message.find(e => e.type === 'image') as ImageElem
    if (imageElem) {
        //获取图片，识别二维码
        try {
            const dec = await decodeQrCode(imageElem.url)
            let message = '二维码解码：\n' + dec
            //解析签到参数
            const REGEX_ENC = /(SIGNIN:|e\?).*(aid=|id=)(\d+)(&.*)?&enc=([\dA-F]+)/
            if (REGEX_ENC.test(dec)) {
                const exec = REGEX_ENC.exec(dec)
                message += `\naid: ${exec[3]}\nenc: ${exec[5]}\n正在执行签到...`
                data.reply(message)
                let res = '自动签到：'
                for (const account of config.accounts) {
                    const accountMeta = await accountsManager.getAccountData(account.username)
                    res += '\n' + accountMeta.name + '：'
                    info('开始签到', account.username)
                    const ret = await handlerQrcodeSign(exec[3], exec[5], accountMeta)
                    switch (ret) {
                        case 'success':
                            res += '成功';
                            break;
                        default:
                            res += ret;
                            break;
                    }
                    info('签到结束', account.username, ret)
                }
                data.reply(res)
            } else
                data.reply(message)
        } catch (e) {
            info(`二维码解码失败：${e}`)
        }
    } else {
        // 拆分消息
        const message = data.raw_message.split(' ')
        const command = message[0]
        const args = message.slice(1)
        // 检查命令
        switch (command) {
            case '签到':
            case 'sign':
            case 'checkin':
                if (!args.length) {
                    data.reply(`请输入签到参数，参数格式为：\n签到 {activeId}`)
                    return
                }
                const activeId = args[0]
                const checkinInfo = expiringMap.get(activeId)
                console.log(checkinInfo)
                // if (checkinInfo.type === 'qr') {
                // if (args.length < 2) {
                //     data.reply('二维码签到需要指定 enc')
                //     return
                // }
                // const enc = args[1]
                // data.reply(`aid: ${aid}\nenc: ${enc}\n正在执行签到...`)
                // let res = '自动签到：'
                // for (const account of config.accounts) {
                //     const accountMeta = await accountsManager.getAccountData(account.username)
                //     res += '\n' + accountMeta.name + '：'
                //     info('开始签到', account.username)
                //     const ret = await handlerQrcodeSign(aid, enc, accountMeta)
                //     switch (ret) {
                //         case 'success': res += '成功'; break;
                //         default: res += ret; break;
                //     }
                //     info('签到结束', account.username, ret)
                // }
                // data.reply(res)
                // }
                // else{
                // }

                data.reply(await handleCheckin(checkinInfo))

                break
            case '关闭自签':
                config.system.autoSign = false
                data.reply('已关闭自动签到')
                break
            case '开启自签':
                config.system.autoSign = true
                data.reply('已开启自动签到')
        }
    }
})
