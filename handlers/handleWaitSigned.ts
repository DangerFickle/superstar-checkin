import AccountMetaData from "../types/AccountMetaData";
import {getSignPersonPath} from "../requests/URL";
import axios from "axios";
import {info} from "../utils/log";
import config from "../providers/config";

// 每隔三秒轮询，获取已经签到的人员列表
export default async (aid: string, classId: string, accountMeta: AccountMetaData): Promise<boolean> => {
    return new Promise(resolve => {
        // 记录时间，如果超过3分钟还没有人签到，则取消签到流程
        let timeoutTimer;
        if (config.checkinTiming.waitSignedOutTime !== 0) {
            timeoutTimer = setTimeout(() => {
                info('等待其他人签到超时，不进行自动签到')
                clearInterval(timer)
                resolve(false)
            }, 1000 * config.checkinTiming.waitSignedOutTime)
        }

        const timer = setInterval(async () => {
            info('查询已签人员轮询中...')
            const alreadySignReq = (await axios.get(getSignPersonPath(aid, classId), {
                headers: {
                    cookie: accountMeta.cookie
                }
            })).data.data
            let yiqianList = alreadySignReq.yiqianList
            // 如果已签人员列表不为空，则清除定时器
            if (timeoutTimer && yiqianList.length !== 0) {
                clearTimeout(timeoutTimer)
                timeoutTimer = undefined
            }
            // 当已签人员大于等于多少时才自动签到
            if (yiqianList.length !== 0 && yiqianList.length >= config.checkinTiming.waitSignedCount) {
                clearInterval(timer)
                resolve(true)
            }
        }, 3000)
    })
}
