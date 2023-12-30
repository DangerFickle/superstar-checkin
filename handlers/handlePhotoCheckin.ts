import AccountMetaData from "../types/AccountMetaData";
import CheckinInfo from "../types/CheckinInfo";
import {getSignWithPhoto} from "../requests/URL";
import axios from "axios";
import handlePreSign from "./handlePreSign";
import handleAnalysis from "./handleAnalysis";
import handleCheckIfValidate from "./handleCheckIfValidate";
import getAlreadSignList from "../requests/getAlreadSignList";
import config from "../providers/config";
import {warn} from "../utils/log";

/**
 * TODO
 *
 * @Author DengChao
 * @Date 2023/12/24 21:30
 */
export default async (checkinInfo: CheckinInfo, accountMeta: AccountMetaData) => {
    let objectId = ''
    if (config.checkinTiming.photoSignedCount !== 0) {
        // 上传图片获取objectId， 获取已经签到人员的图片
        let yiqianList = await getAlreadSignList(checkinInfo, accountMeta)
        // 获取随机数
        const random = Math.floor(Math.random() * (yiqianList.length - 10)) + 5
        objectId = yiqianList[random].title
        // console.log('random --->', random)
        // console.log('objectId --->', objectId)
    }

    // 预签
    await handlePreSign(checkinInfo, accountMeta.cookie)

    // 分析
    await handleAnalysis(checkinInfo, accountMeta.cookie)

    // checkIfValidate
    await handleCheckIfValidate(checkinInfo, accountMeta)
    // 开始签到
    let res;
    let times = 0
    // 如果出现validate，重新签到，最多尝试三次
    while (times < 3) {
        await handleCheckIfValidate(checkinInfo, accountMeta)
        res = (await axios.get(getSignWithPhoto(checkinInfo.activeId, objectId), {
            headers: {
                cookie: accountMeta.cookie,
            }
        })).data
        if (res !== 'validate') break
        warn('validate了！！！，重新签到')
        times++;
    }
    if (res === 'validate') res = '签到失败'
    return res
}
