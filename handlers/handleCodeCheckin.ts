import {getNormalSignPath} from '../requests/URL'
import CheckinInfo from "../types/CheckinInfo";
import AccountMetaData from "../types/AccountMetaData";
import getSignCode from "./getSignCode";
import handlePreSign from "./handlePreSign";
import handleCheckCode from "./handleCheckCode";
import handleAnalysis from "./handleAnalysis";
import handleCheckIfValidate from "./handleCheckIfValidate";
import axios from "axios";
import {error} from "../utils/log";

export default async (aid: string, classId: string, courseId: number, accountMeta: AccountMetaData, checkinInfo: CheckinInfo) => {
    const signCode = await getSignCode(aid, classId, courseId, accountMeta)
    // 预签到
    try {
        await handlePreSign(accountMeta.cookie, aid)
    } catch (e) {
        error('预签到失败', e)
    }

    try {
        await handleAnalysis(aid, accountMeta.cookie)
    } catch (e) {
        error('handleAnalysis失败', e)
    }

    // 检查签到码
    try {
        await handleCheckCode(aid, signCode, accountMeta.cookie)
    } catch (e) {
        error('签到码无效')
    }


    // checkIfValidate
    await handleCheckIfValidate(aid, accountMeta)

    // 开始签到
    const signCodePath = getNormalSignPath(courseId, classId, aid, signCode)
    await axios.get<string>(signCodePath, {
        headers: {
            cookie: accountMeta.cookie
        }
    })
    return 'success'
}
