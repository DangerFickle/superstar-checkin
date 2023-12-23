import axios from "axios";

export default async (cookie: string, aid: string) => {
    const preSignUrl = `https://mobilelearn.chaoxing.com/newsign/preSign`
    const res = axios.get(preSignUrl, {
        headers: {
            cookie
        },
        params: {
            activePrimaryId: aid,
            general: 1,
            sys: 1,
            ls: 1,
            appType: 15,
            ut: 's',
        }
    })
    if (!res) return Error('预签到失败')
}