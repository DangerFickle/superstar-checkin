import {getNormalSignPath} from '../requests/URL'
import CheckinInfo from "../types/CheckinInfo";
import AccountMetaData from "../types/AccountMetaData";
import getSignCode from "../requests/getSignCode";
import handlePreSign from "./handlePreSign";
import handleCheckCode from "./handleCheckCode";
import handleAnalysis from "./handleAnalysis";
import handleCheckIfValidate from "./handleCheckIfValidate";
import axios from "axios";
import {error} from "../utils/log";

export default async (checkinInfo: CheckinInfo, accountMeta: AccountMetaData) => {
    const signCode = await getSignCode(checkinInfo.activeId, checkinInfo.classId, checkinInfo.courseId, accountMeta)
    // 预签到
    await handlePreSign(checkinInfo, accountMeta.cookie)

    await handleAnalysis(checkinInfo, accountMeta.cookie)

    // 检查签到码
    await handleCheckCode(checkinInfo.activeId, signCode, accountMeta.cookie)

    // checkIfValidate
    await handleCheckIfValidate(checkinInfo, accountMeta)

    // 开始签到
    const signCodePath = getNormalSignPath(checkinInfo.courseId, checkinInfo.classId, checkinInfo.activeId, signCode)
    await axios.get<string>(signCodePath, {
        headers: {
            cookie: accountMeta.cookie
        }
    })
    return 'success'
}
