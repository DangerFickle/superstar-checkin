import {getAnalysis2Path, getAnalysisPath} from "../requests/URL";
import axios from "axios";
import CheckinInfo from "../types/CheckinInfo";

export default async (checkInfo: CheckinInfo, cookie: string) => {
    // 分析1
    const analysis = await axios.get<string>(getAnalysisPath(checkInfo.activeId), {
        headers: {
            cookie
        }
    })

    if(!analysis.data.startsWith('$.ajax')) {
        throw new Error('分析1失败')
    }

    // `$.ajax({type:'get',url:'/pptSign/analysis2?DB_STRATEGY=RANDOM&code='+'5dabbd3b0e405cb7b1f8a604716a83bd',success:function(res){}});`
    // 解析出上面str中code的值
    const code = analysis.data.substring(analysis.data.indexOf('code=') + 8, analysis.data.indexOf("',success"))

    // 分析2
    const analysis2 = await axios.get<string>(getAnalysis2Path(code), {
        headers: {
            cookie
        }
    })
    if(analysis2.data !== 'success') {
        throw new Error('分析2失败')
    }
}
