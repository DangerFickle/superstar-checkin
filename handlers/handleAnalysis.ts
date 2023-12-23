import {getAnalysis2Path, getAnalysisPath} from "../requests/URL";
import axios from "axios";

export default async (aid: string, cookie: string) => {
    // 分析1
    const analysis = await axios.get<string>(getAnalysisPath(aid), {
        headers: {
            cookie
        }
    })
    // `$.ajax({type:'get',url:'/pptSign/analysis2?DB_STRATEGY=RANDOM&code='+'5dabbd3b0e405cb7b1f8a604716a83bd',success:function(res){}});`
    // 解析出上面str中code的值
    const code = analysis.data.substring(analysis.data.indexOf('code=') + 8, analysis.data.indexOf("',success"))

    // 分析2
    const analysis2 = await axios.get<string>(getAnalysis2Path(code), {
        headers: {
            cookie
        }
    })
}
