// 登录接口
import {string} from "yaml/dist/schema/common/string";

export function getLoginPath(username: string, password: string): string {
    return `https://passport2-api.chaoxing.com/v11/loginregister?code=${password}&cx_xxt_passport=json&uname=${username}&loginType=1&roleSelect=true`
}

// 获取所有课程
export function getAllCourseListPath(): string {
    return `http://mooc1-api.chaoxing.com/mycourse/backclazzdata`
}

// 获得头像地址
export function getAvtarImgPath(uid: string): string {
    return `http://photo.chaoxing.com/p/${uid}_80`
}

// 查询所有活动
export function gatActiveTaskListPath(courseId: string, classId: string, uid: string, cpi: string): string {
    return `https://mobilelearn.chaoxing.com/ppt/activeAPI/taskactivelist?courseId=${courseId}&classId=${classId}&uid=${uid}&cpi=${cpi}`
}

// 获取签到类型
export function getSignType(activeId: string): string {
    return `https://mobilelearn.chaoxing.com/newsign/signDetail?activePrimaryId=$activeId&type=1`
}

// 获取签到码
export function getSignCodePath(activeId: string, classId: string, courseId: number): string {
    return `https://mobilelearn.chaoxing.com/widget/sign/pcTeaSignController/endSign?activeId=${activeId}&classId=${classId}&courseId=${courseId}&isTeacherViewOpen=1`
}

export function getSignWithCameraPath(aid: string, location: string = ""): string {
    return `https://mobilelearn.chaoxing.com/pptSign/stuSignajax?activeId=${aid}&location=${location}`
}

// 普通签到 和 签到码签到 和 手势签到三者通用
export function getNormalSignPath(
    courseId: number,
    classId: string,
    aid: string,
    signCode: string = ""
): string {
    return `https://mobilelearn.chaoxing.com/widget/sign/pcStuSignController/signIn?courseId=${courseId}&classId=${classId}&activeId=${aid}&signCode=${signCode}&validate=`
}

// 获取位置签到url
export function getLocationSignPath(
    aid: string,
    uid: number,
    address?: string,
    lat?: number,
    long?: number,
): string {
    return `https://mobilelearn.chaoxing.com/pptSign/stuSignajax?address=${address}&activeId=${aid}&uid=${uid}&clientip=0.0.0.0&latitude=${lat}&longitude=${long}&fid=&appType=15&ifTiJiao=1`
}

export function getUploadToken(): string {
    return "https://pan-yz.chaoxing.com/api/token/uservalid"
}

export function getUploadImagePath(token: string): string {
    return `https://pan-yz.chaoxing.com/upload?_token=${token}`
}

export function getSignWithPhoto(aid: string, uid: string, objectId: string): string {
    return `https://mobilelearn.chaoxing.com/pptSign/stuSignajax?activeId=${aid}&uid=${uid}&appType=15&fid=0&objectId=${objectId}`
}

export function getWorkEncPath(courseId: string, classId: string, cpi: string): string {
    return `https://mooc1-2.chaoxing.com/mooc-ans/visit/stucoursemiddle?courseid=${courseId}&clazzid=${classId}&vc=1&cpi=${cpi}&ismooc2=1&v=2`
}

// 作业列表
export function getHomeworkListPath(
    courseId: string,
    classId: string,
    cpi: string,
    workEnc: string
): string {
    return `https://mooc1.chaoxing.com/mooc2/work/list?courseId=${courseId}&classId=${classId}&cpi=${cpi}&ut=s&enc=${workEnc}`
}

// 用户信息
export function getUserInfo(): string {
    return `http://i.chaoxing.com/base`
}

// 验证码
export function getSendCaptchaUrl(): string {
    return `https://passport2-api.chaoxing.com/api/sendcaptcha`
}

// 手机验证码登录
export function getLoginWithSmsUrl(): string {
    return "https://passport2-api.chaoxing.com/v11/loginregister?cx_xxt_passport=json"
}

export function getAnalysisPath(aid: string): string {
    return `https://mobilelearn.chaoxing.com/pptSign/analysis?DB_STRATEGY=RANDOM&aid=${aid}&vs=1`
}

export function getAnalysis2Path(analysis2Code: string): string {
    return `https://mobilelearn.chaoxing.com/pptSign/analysis2?DB_STRATEGY=RANDOM&code=${analysis2Code}`
}


export function checkSignCodePath(aid: string, signCode: string): string {
    return `https://mobilelearn.chaoxing.com/widget/sign/pcStuSignController/checkSignCode?activeId=${aid}&signCode=${signCode}`
}


// https://mobilelearn.chaoxing.com/widget/sign/pcStuSignController/checkIfValidate?DB_STRATEGY=PRIMARY_KEY&STRATEGY_PARA=activeId&activeId=6000082884145&puid=228981012










