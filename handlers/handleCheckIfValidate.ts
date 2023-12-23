import AccountMetaData from "../types/AccountMetaData";
import axios from "axios";

export default async (aid: string, accountMeta: AccountMetaData) => {
    await axios.get(`https://mobilelearn.chaoxing.com/widget/sign/pcStuSignController/checkIfValidate?DB_STRATEGY=PRIMARY_KEY&STRATEGY_PARA=activeId&activeId=${aid}&puid=${accountMeta.uid}`, {
        headers: {
            cookie: accountMeta.cookie
        }
    })
}
