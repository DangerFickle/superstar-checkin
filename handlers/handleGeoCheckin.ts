import config from '../providers/config'
import AccountMetaData from '../types/AccountMetaData'
import GeoLocation from '../types/GeoLocation'
import {info, warn} from "../utils/log";
import axios from "axios";
import {getLocationSignPath} from "../requests/URL";
import handlePreSign from "./handlePreSign";
import handleAnalysis from "./handleAnalysis";
import getLocation from "../requests/getLocation";
import handleCheckIfValidate from "./handleCheckIfValidate";
import {MOBILE_AGENT} from "../constants";

const inferCourseGeoInfo = (geoLocations: Array<GeoLocation>, courseId: number) => {
    const weekDay = new Date().getDay()
    const locations = geoLocations.filter(e => e.courseId === courseId)
    if (locations.length !== 0) {
        for (const location of locations) {
            if (!location.onlyOnWeekdays)
                return location
            else if (location.onlyOnWeekdays && location.onlyOnWeekdays.includes(weekDay)) {
                return location
            }
        }
    } else {
        warn(`课程 ID ${courseId} 没有设置位置信息，将使用教师指定的位置`)
    }
}

export default async (activeId: string, courseId: number, classId: string, account: AccountMetaData) => {

    // 配置文件中配置了该课程的配置信息，就用配置文件中的，否则就用教师指定的
    let locationInfo: GeoLocation = inferCourseGeoInfo(config.geoLocations, courseId)


    if (!locationInfo) {
        locationInfo = await getLocation(activeId, courseId, classId, account)
    }

    // 预签到
    await handlePreSign(activeId, account.cookie)

    // 分析
    await handleAnalysis(activeId, account.cookie)

    // checkIfValidate
    await handleCheckIfValidate(activeId, account)

    // 位置签到需要设置 User-Agent 为手机端的， 否则签到失败
    if (locationInfo) {
        info(`课程 ID ${courseId} 教师指定了位置信息，将提交位置信息`)
        // 教师指定了位置信息
        let res
        let times = 0
        while (times < 3) {
            await handleCheckIfValidate(activeId, account)
            res = await axios.get(getLocationSignPath(activeId, locationInfo.address, locationInfo.latitude, locationInfo.longitude), {
                headers: {
                    cookie: account.cookie,
                    'User-Agent': MOBILE_AGENT
                }
            })
            if (res.data !== 'validate') {
                break
            }
            console.warn('validate了！！！，重新签到')
            times++
        }
        if (res.data === 'validate') {
            warn(`课程 ID ${courseId} 教师指定了位置信息，将提交位置信息，但是签到失败了`)
            res.data = '签到失败'
        }
        return res.data
    } else {
        // 教师未指定位置信息
        info(`课程 ID ${courseId} 没有设置位置信息，将不提交位置信息`)
        let res
        let times = 0
        while (times < 3) {
            await handleCheckIfValidate(activeId, account)
            res = await axios.get(getLocationSignPath(activeId), {
                headers: {
                    cookie: account.cookie,
                    'User-Agent': MOBILE_AGENT
                }
            })
            if (res.data !== 'validate') break
            console.warn('validate了！！！，重新签到')
            times++
        }
        if (res.data === 'validate') {
            warn(`课程 ID ${courseId} 没有设置位置信息，将不提交位置信息，但是签到失败了`)
            res.data = '签到失败'
        }
        // `\n警告：课程 ID ${courseId} 没有设置位置信息，将不提交位置信息`
        return res.data
    }
}
