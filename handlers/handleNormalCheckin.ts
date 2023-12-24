import {getNormalSignPath} from '../requests/URL'
import CheckinInfo from "../types/CheckinInfo";
import AccountMetaData from "../types/AccountMetaData";
import handlePreSign from "./handlePreSign";
import axios from "axios";

export default async (aid: string, classId: string, courseId: number, accountMeta: AccountMetaData, checkinInfo: CheckinInfo) => {
    // 预签到
    await handlePreSign(aid, accountMeta.cookie)

    // 开始签到
    const signCodePath = getNormalSignPath(courseId, classId, aid)
    const res = await axios.get<string>(signCodePath, {
        headers: {
            cookie: accountMeta.cookie
        }
    })
    if (!res) {

    }
    return 'success'
}
