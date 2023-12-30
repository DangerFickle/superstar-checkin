import {getNormalSignPath} from '../requests/URL'
import CheckinInfo from "../types/CheckinInfo";
import AccountMetaData from "../types/AccountMetaData";
import handlePreSign from "./handlePreSign";
import axios from "axios";

export default async (checkinInfo: CheckinInfo, accountMeta: AccountMetaData) => {
    // 预签到
    await handlePreSign(checkinInfo, accountMeta.cookie)

    // 开始签到
    const signCodePath = getNormalSignPath(checkinInfo.courseId, checkinInfo.classId, checkinInfo.activeId)
    const res = await axios.get<string>(signCodePath, {
        headers: {
            cookie: accountMeta.cookie
        }
    })
    return 'success'
}
