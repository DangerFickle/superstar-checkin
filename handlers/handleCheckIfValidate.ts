import AccountMetaData from "../types/AccountMetaData";
import axios from "axios";
import CheckinInfo from "../types/CheckinInfo";

export default async (checkinInfo: CheckinInfo, accountMeta: AccountMetaData) => {
    await axios.get(`https://mobilelearn.chaoxing.com/widget/sign/pcStuSignController/checkIfValidate?DB_STRATEGY=PRIMARY_KEY&STRATEGY_PARA=activeId&activeId=${checkinInfo.activeId}&puid=${accountMeta.uid}`, {
        headers: {
            cookie: accountMeta.cookie
        }
    })
}
