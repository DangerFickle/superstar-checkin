import axios from "axios";

export default async (activeId: number | string, courseId: number, classId: string, cookie: string) => {
    const url = `https://mobilelearn.chaoxing.com/v2/apis/sign/getLocationLog?courseId=${courseId}&DB_STRATEGY=COURSEID&STRATEGY_PARA=courseId&classId=${classId}&aid=${activeId}`
    const res = await axios.get(url, {
        headers: {
            cookie
        }
    })
    return res.data
}
