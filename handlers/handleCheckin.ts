import handleGeoCheckin from './handleGeoCheckin'
import handleCodeCheckin from './handleCodeCheckin'
import {error, info} from '../utils/log'
import config from '../providers/config'
import accountsManager from '../utils/accountsManager'
import CheckinInfo from '../types/CheckinInfo'
import handleNormalCheckin from "./handleNormalCheckin";

export default async (aid: string, classId: string, courseId: number, checkinInfo: CheckinInfo) => {
    let res = ''
    try {
        // 将会附加到最终 QQ 群里推送的提示消息中
        for (const account of config.accounts) {
            const accountMeta = await accountsManager.getAccountData(account.username)
            res += '\n' + accountMeta.name + '：'
            info('开始签到', account.username)
            let ret = ''
            switch (checkinInfo.type) {
                case 'normal': {
                    ret = await handleNormalCheckin(aid, classId, courseId, accountMeta, checkinInfo)
                    break
                }
                case 'gesture': {
                    ret = await handleCodeCheckin(aid, classId, courseId, accountMeta, checkinInfo)
                    break
                }
                case 'photo': {
                    break
                }
                case 'location': {
                    // 处理位置签到
                    ret = await handleGeoCheckin(aid, courseId, accountMeta, checkinInfo.location)
                    break
                }
                case 'code': {
                    ret = await handleCodeCheckin(aid, classId, courseId, accountMeta, checkinInfo)
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
        return `自动签到：\naid:${aid}${res}`
    } catch (e) {
        error('签到失败', aid, e)
        return `自动签到\naid:${aid}抛错：\n${e}\n\n部分返回信息：${res}`
    }
}
