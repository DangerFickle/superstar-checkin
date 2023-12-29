import {getSignCodePath} from "./URL";
import AccountMetaData from "../types/AccountMetaData";
import cheerio from "cheerio";
import axios from "axios";

export default async (aid: string, classId: string, courseId: number, accountMeta: AccountMetaData): Promise<(string)> => {
    // 获取签到码的url
    const signCodePath = getSignCodePath(aid, classId, courseId)
    // 发送网络请求获取签到码
    const res = await axios.get<string>(signCodePath, {
        headers: {
            cookie: accountMeta.cookie
        }
    })
    // @ts-ignore
    const $ = cheerio.load(res.data)
    const code = $('#signCode').val()
    if (code) {
        if (typeof code === 'string') {
            return code
        } else {
            return code[0]
        }
    }
}
