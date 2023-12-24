import FormData from "form-data";
import {getUploadImagePath, getUploadToken} from "../requests/URL";
import axios from "axios";
import AccountMetaData from "../types/AccountMetaData";
import * as fs from "fs";

export default async (account: AccountMetaData) => {
    // 获取上传图片用的token
    const token = (await axios.get(getUploadToken(), {
        headers: {
            cookie: account.cookie
        }
    })).data['_token']

    // 要上传的图片
    const imgPath = './image/img2.png'
    const image = fs.readFileSync(imgPath)

    const formData = new FormData()
    formData.append('file', image, 'img2.png');
    formData.append('puid', account.puid)
    return (await axios.post(getUploadImagePath(token), formData)).data.objectId
}
