import handleGeoCheckin from './handleGeoCheckin'
import handleCodeGestureCheckin from './handleCodeGestureCheckin'
import {error, info} from '../utils/log'
import config from '../providers/config'
import accountsManager from '../utils/accountsManager'
import CheckinInfo from '../types/CheckinInfo'
import handleNormalCheckin from "./handleNormalCheckin";
import handlePhotoCheckin from "./handlePhotoCheckin";
import {pushQMsg} from "../providers/bot";
import handleQrcodeCheckin from "./handleQrcodeCheckin";
import handleWaitSigned from "./handleWaitSigned";

export default async (checkinInfo: CheckinInfo) => {
    let res = ''
    try {
        // 将会附加到最终 QQ 群里推送的提示消息中
        for (const account of config.accounts) {
            const accountMeta = await accountsManager.getAccountData(account.username)
            res += '\n' + accountMeta.name + '：'
            info('开始签到', account.username)

            info('等待其他人签到中......')
            pushQMsg('等待其他人签到中......')
            // 等待其他人签到，防止老师还没公布签到码就签到了
            const waitRes = await handleWaitSigned(checkinInfo, accountMeta)
            if (!waitRes) {
                return `自动签到：等待其他人签到超时，不进行自动签到`
            }

            let ret = ''
            switch (checkinInfo.type) {
                case 'normal': {
                    ret = await handleNormalCheckin(checkinInfo, accountMeta)
                    break
                }
                case 'code': {
                    ret = await handleCodeGestureCheckin(checkinInfo, accountMeta)
                    break
                }
                case 'gesture': {
                    ret = await handleCodeGestureCheckin(checkinInfo, accountMeta)
                    break
                }
                case 'photo': {
                    ret = await handlePhotoCheckin(checkinInfo, accountMeta)
                    break
                }
                case 'location': {
                    // 处理位置签到
                    ret = await handleGeoCheckin(checkinInfo, accountMeta)
                    break
                }
                case "qr": {
                    ret = await handleQrcodeCheckin(checkinInfo.activeId, '', accountMeta)
                    break
                }
            }

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
        return `自动签到：\naid:${checkinInfo.activeId}${res}`
    } catch (e) {
        error('签到失败', checkinInfo.activeId, e)
        return `自动签到\naid:${checkinInfo.activeId}抛错：\n${e}\n\n部分返回信息：${res}`
    }
}
