import axios from "axios";
import AccountMetaData from "../types/AccountMetaData";
import CheckinInfo from "../types/CheckinInfo";

export default async (checkinInfo: CheckinInfo, account: AccountMetaData) => {
    const url = `https://mobilelearn.chaoxing.com/v2/apis/sign/getLocationLog?courseId=${checkinInfo.courseId}&DB_STRATEGY=COURSEID&STRATEGY_PARA=courseId&classId=${checkinInfo.classId}&aid=${checkinInfo.activeId}`
    const res = await axios.get(url, {
        headers: {
            cookie: account.cookie
        }
    })
    const location  = res.data.data.find(e => e.activeid == checkinInfo.activeId)
    return location ? location : ''
}
