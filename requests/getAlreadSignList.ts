import AccountMetaData from "../types/AccountMetaData";
import {getSignPersonPath} from "./URL";
import axios from "axios";
import {info} from "../utils/log";
import config from "../providers/config";
import CheckinInfo from "../types/CheckinInfo";

// 每隔三秒轮询，获取已经签到的人员列表
export default async (checkinInfo: CheckinInfo, accountMeta: AccountMetaData): Promise<Array<{ title: string }>> => {
    return new Promise(resolve => {
        const timer = setInterval(async () => {
            info('拍照签到查询已签人员轮询中...')
            const alreadySignReq = (await axios.get(getSignPersonPath(checkinInfo.activeId, checkinInfo.classId), {
                headers: {
                    cookie: accountMeta.cookie
                }
            })).data.data
            let yiqianList = alreadySignReq.yiqianList
            if (yiqianList.length !== 0 && yiqianList.length >= config.checkinTiming.photoSignedCount) {
                clearInterval(timer)
                resolve(yiqianList)
            }
        }, 3000)
    })
}
