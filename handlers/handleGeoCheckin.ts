import {genGeoCheckinParams} from '../utils/genCheckinParams'
import checkin from '../requests/checkin'
import config from '../providers/config'
import AccountMetaData from '../types/AccountMetaData'
import handlerSimpleCheckin from './handleSimpleCheckin'
import GeoLocation from '../types/GeoLocation'
import {warn} from "../utils/log";
import axios from "axios";
import {getLocationSignPath} from "../requests/URL";
import handlePreSign from "./handlePreSign";
import handleAnalysis from "./handleAnalysis";
import handleGetLocation from "./handleGetLocation";

const inferCourseGeoInfo = (geoLocations: Array<GeoLocation>, courseId: number) => {
    const weekDay = new Date().getDay()
    const locations = geoLocations.filter(e => e.courseId === courseId)
    for (const location of locations) {
        if (!location.onlyOnWeekdays)
            return location
        else if (location.onlyOnWeekdays && location.onlyOnWeekdays.includes(weekDay)) {
            return location
        }
    }
    // 使用 fallback 位置
    const fallback = geoLocations.find(e => e.courseId === "*")
    if (fallback) {
        warn(`课程 ID ${courseId} 没有设置位置信息，使用 fallback 位置`)
        return fallback
    }
}

export default async (activeId: string, courseId: number, account: AccountMetaData, geoInfo?: GeoLocation) => {
    console.log(`[${account.name}] 执行地理位置签到->handleGeoCheckin.ts`)



    if (!geoInfo) {
        geoInfo = inferCourseGeoInfo(config.geoLocations, courseId)
    }
    let params

    // 预签到
    await handlePreSign(account.cookie, activeId)

    // 分析
    await handleAnalysis(activeId, account.cookie)

    if (geoInfo) {
        params = genGeoCheckinParams({
            uid: account.uid,
            name: account.name,
            activeId,
            latitude: geoInfo.lat,
            longitude: geoInfo.lon,
            address: geoInfo.address,
        })
        return await axios.get(getLocationSignPath(activeId, params.uid, params.address, params.lat, params.lon), {
            headers: {
                cookie: account.cookie
            }
        })
    } else {
        console.warn(`课程 ID ${courseId} 没有设置位置信息，将不提交位置信息`)
        return (await axios.get(getLocationSignPath(activeId, account.uid), {
            headers: {
                cookie: account.cookie
            }
        })).data
        // `\n警告：课程 ID ${courseId} 没有设置位置信息，将不提交位置信息`
    }
}
