import {getNormalSignPath} from '../requests/URL'
import CheckinInfo from "../types/CheckinInfo";
import AccountMetaData from "../types/AccountMetaData";
import getSignCode from "./getSignCode";
import handlePreSign from "./handlePreSign";
import handleCheckCode from "./handleCheckCode";
import handleAnalysis from "./handleAnalysis";
import handleCheckIfValidate from "./handleCheckIfValidate";
import axios from "axios";

export default async (aid: string, classId: string, courseId: number, accountMeta: AccountMetaData, checkinInfo: CheckinInfo) => {
    // 预签到
    const preSignRes = await handlePreSign(accountMeta.cookie, aid)
    if (!preSignRes) return Error('预签到失败')

    // 开始签到
    const signCodePath = getNormalSignPath(courseId, classId, aid)
    const res = await axios.get<string>(signCodePath, {
        headers: {
            cookie: accountMeta.cookie
        }
    })
    console.log(res.data)
    return res.data
}
