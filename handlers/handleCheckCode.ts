import {checkSignCodePath} from "../requests/URL";
import axios from "axios";

type Result = { result: number, msg: string, data: null, errorMsg: string | null }
export default async (aid: string, signCode: string, cookie: string) => {
    const checkSignCodeUrl = checkSignCodePath(aid, signCode)
    const res = await axios.get<Result>(checkSignCodeUrl, {
        headers: {
            cookie
        }
    })
    if (!res) {
        Error('签到码无效')
    }
}