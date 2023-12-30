import axios from "axios";
import CheckinInfo from "../types/CheckinInfo";

export default async (checkInfo: CheckinInfo, cookie: string,) => {
    const preSignUrl = `https://mobilelearn.chaoxing.com/newsign/preSign`
    const res = await axios.get(preSignUrl, {
        headers: {
            cookie
        },
        params: {
            activePrimaryId: checkInfo.activeId,
            general: 1,
            sys: 1,
            ls: 1,
            appType: 15,
            ut: 's',
        }
    })
    if (!res) {
        throw new Error('预签到失败')
    }
}
