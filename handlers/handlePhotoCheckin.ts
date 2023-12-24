import AccountMetaData from "../types/AccountMetaData";
import CheckinInfo from "../types/CheckinInfo";
import {getSignWithPhoto} from "../requests/URL";
import axios from "axios";
import handlePreSign from "./handlePreSign";
import handleAnalysis from "./handleAnalysis";
import handleCheckIfValidate from "./handleCheckIfValidate";
import getAlreadSignList from "./getAlreadSignList";
import config from "../providers/config";

/**
 * TODO
 *  获取已经签到人员的图片时，用哪一张图片，需要特定算法，还没想好
 *
 * @Author DengChao
 * @Date 2023/12/24 21:30
 */
export default async (aid: string, classId: string, courseId: number, accountMeta: AccountMetaData, checkinInfo: CheckinInfo) => {
    let objectId = ''
    if (config.alreadySignedCount !== 0) {
        // 上传图片获取objectId， 获取已经签到人员的图片
        let yiqianList = await getAlreadSignList(aid, classId, accountMeta)
        // 获取随机数 从 3 到 yiqianList.length - 1
        const random = Math.floor(Math.random() * (yiqianList.length - 3)) + 3
        objectId = yiqianList[random].title
        console.log('random --->', random)
        console.log('objectId --->', objectId)
    }

    // 预签
    await handlePreSign(aid, accountMeta.cookie)

    // 分析
    await handleAnalysis(aid, accountMeta.cookie)

    // checkIfValidate
    await handleCheckIfValidate(aid, accountMeta)
    // 开始签到
    let res = (await axios.get(getSignWithPhoto(aid, objectId), {
        headers: {
            cookie: accountMeta.cookie,
        }
    })).data


    while (res === 'validate') {
        console.warn('validate了！！！，重新签到')
        await handleCheckIfValidate(aid, accountMeta)
        res = (await axios.get(getSignWithPhoto(aid, objectId), {
            headers: {
                cookie: accountMeta.cookie,
            }
        })).data
    }

    return res
}
