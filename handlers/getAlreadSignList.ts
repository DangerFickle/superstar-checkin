import AccountMetaData from "../types/AccountMetaData";
import {getSignPersonPath} from "../requests/URL";
import axios from "axios";
import {info} from "../utils/log";
import config from "../providers/config";

// 每隔三秒轮询，直到获取到已经签到的人员列表
export default async (aid: string, classId: string, accountMeta: AccountMetaData): Promise<Array<{ title: string }>> => {
    return new Promise(resolve => {
        const timer = setInterval(async () => {
            info('查询已签人员轮询中...')
            const alreadySignReq = (await axios.get(getSignPersonPath(aid, classId), {
                headers: {
                    cookie: accountMeta.cookie
                }
            })).data.data
            let yiqianList = alreadySignReq.yiqianList
            if (yiqianList.length !== 0 && yiqianList.length > config.alreadySignedCount) {
                clearInterval(timer)
                resolve(yiqianList)
            }
        }, 3000)
    })
}
