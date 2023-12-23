import * as db from '../providers/db'
import {genQrcodeCheckinParams} from '../utils/genCheckinParams'
import AccountMetaData from '../types/AccountMetaData'

export default async (activeId: string, enc: string, account: AccountMetaData) => {
    const params = genQrcodeCheckinParams({
        uid: account.uid,
        name: account.name,
        activeId, enc,
    })
    console.log(`[${account.name}] 执行二维码签到->handleQrcodeCheckin.ts`)
    // 执行二维码签到

    return 'success'
}
