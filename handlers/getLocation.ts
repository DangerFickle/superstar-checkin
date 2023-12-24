import axios from "axios";
import AccountMetaData from "../types/AccountMetaData";

export default async (activeId: number | string, courseId: number, classId: string, account: AccountMetaData) => {
    const url = `https://mobilelearn.chaoxing.com/v2/apis/sign/getLocationLog?courseId=${courseId}&DB_STRATEGY=COURSEID&STRATEGY_PARA=courseId&classId=${classId}&aid=${activeId}`
    const res = await axios.get(url, {
        headers: {
            cookie: account.cookie
        }
    })
    const location  = res.data.data.find(e => e.activeid == activeId)
    return location ? location : ''
}
