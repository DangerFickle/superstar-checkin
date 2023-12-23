import axios from "axios";
import config from "../providers/config";
const pushplus = config.pushplus
export default async (content: string, title: string  = "超星自动签到") => {
    await axios.post(pushplus.url, {
        token: pushplus.token,
        content,
        title
    })
}
