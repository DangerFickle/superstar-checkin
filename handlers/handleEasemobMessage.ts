import ImMessageCheckin from '../types/ImMessageCheckin'
import {error, info, warn} from '../utils/log'
import {pushQMsg, pushQMsgToFirstGroup} from '../providers/bot'
import config from '../providers/config'
import handleSign from './handleCheckin'
import getCheckinDetail from '../requests/getCheckinDetail'
import expiringMap from "../utils/ExpiringMap";

/**
 * 处理环信消息
 *
 * @param message 收到的环信消息，解析为签到的消息结构体，到底是不是签到需要自行判断
 * @param cookie 登录环信所使用的 cookie，需要传递给下面的函数用于获取共用的签到详细信息之类
 */
export default async (message: ImMessageCheckin, cookie: string) => {
    try {
        if (message.data === 'test') {
            pushQMsgToFirstGroup('测试成功，WebSocket 在线')
        }
        if (!message.ext.attachment) return
        if (message.ext.attachment.attachmentType !== 15) {
            //不是签到信息
            return
        }
        const activeId = String(message.ext.attachment.att_chat_course.aid)
        const courseName = String(message.ext.attachment.att_chat_course.courseInfo.coursename)
        const courseId = Number(message.ext.attachment.att_chat_course.courseInfo.courseid)
        const classId = String(message.ext.attachment.att_chat_course.courseInfo.classid)
        // if (config.ignoreCourses && config.ignoreCourses.includes(courseId)) return
        if (!activeId) {
            warn('处理 IM 消息时出现异常，找不到 aid')
            return
        }
        switch (message.ext.attachment.att_chat_course.atype) {
            case 0:
                // 可能是签到
                if (!isSignActivity(message)) {
                    const activityName = message.ext.attachment.att_chat_course.atypeName
                    if (activityName) {
                        pushQMsg(`收到 ${courseName} 的 ${activityName} 类型活动\naid: ${activeId}`)
                    } else {
                        pushQMsg(`收到 ${courseName} 的未知类型活动，需要引起注意\naid: ${activeId}`)
                    }
                    return
                }
            // 如果是签到，直接进入 case 2 处理
            case 2:
                const checkinInfo = await getCheckinDetail(cookie, activeId)
                checkinInfo.activeId = activeId
                checkinInfo.classId = classId
                checkinInfo.courseId = courseId
                // 保存签到信息, 签到结束后自动清除
                expiringMap.set(activeId, checkinInfo, checkinInfo.endTime - Date.now())
                // const sleepTime = getRandomIntInclusive(20, 35)
                if (checkinInfo.type === 'qr') {
                    info('收到二维码签到')
                    pushQMsg(`收到 ${courseName} 的二维码签到，activeId 为 ${activeId}\n需要提供一张二维码`)
                } else {
                    info('收到', checkinInfo.type, '类型签到')
                    let messageToSend = `收到 ${courseName} 的签到\n类型：${checkinInfo.type}\nactiveId:${activeId}`
                    // 被忽略的课程不会自动签到
                    if (config.ignoreCourses && config.ignoreCourses.includes(courseId)) {
                        messageToSend += '\n这门课程已被忽略，不会自动签到'
                        info('这门课程已被忽略，不会自动签到')
                        pushQMsg(messageToSend)
                    } else {
                        if (config.system.autoSign) {
                            messageToSend += '\n将等待其他人签到后自动签到'
                            info('将等待其他人签到后自动签到')
                            pushQMsg(await handleSign(checkinInfo))
                        } else {
                            messageToSend += '\n系统未开启自动签到'
                            pushQMsg(messageToSend)
                        }
                    }
                }
                break
            default:
                const activityName = message.ext.attachment.att_chat_course.atypeName
                pushQMsg(`收到 ${courseName} 的 ${activityName} 类型活动\naid: ${activeId}`)
        }
    } catch (e) {
        error('处理 IM 消息时出现异常，可能不是活动消息', e)
    }
}

// 用于判断一个 atype=0 的消息是不是变相的签到消息
const isSignActivity = (atype0Activity: ImMessageCheckin) => {
    if (atype0Activity.ext.attachment.att_chat_course.pcUrl.toLowerCase().includes('sign')) {
        return true
    }
    if (atype0Activity.ext.attachment.att_chat_course.pcUrl.toLowerCase().includes('checkin')) {
        return true
    }
    if (atype0Activity.ext.attachment.att_chat_course.url.toLowerCase().includes('sign')) {
        return true
    }
    if (atype0Activity.ext.attachment.att_chat_course.url.toLowerCase().includes('checkin')) {
        return true
    }
    if (atype0Activity.ext.attachment.att_chat_course.logo.toLowerCase().includes('qd3.png')) {
        return true
    }
    return atype0Activity.ext.attachment.att_chat_course.title.includes('签到')
}
