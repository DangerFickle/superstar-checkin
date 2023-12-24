import * as db from '../providers/db'
import {genQrcodeCheckinParams} from '../utils/genCheckinParams'
import AccountMetaData from '../types/AccountMetaData'
import {pushQMsg} from "../providers/bot";

export default async (activeId: string, enc: string, account: AccountMetaData) => {
    const params = genQrcodeCheckinParams({
        uid: account.uid,
        name: account.name,
        activeId, enc,
    })
    pushQMsg('暂不支持二维码签到')
    // 执行二维码签到

    return '暂不支持二维码签到'
}
