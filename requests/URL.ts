// 登录接口
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

// 获取签到后的图片
export function getSignPhotoPath(title: string): string {
    return `https://p.ananas.chaoxing.com/star3/origin/${title}.jpg`
}

// 获取此次签到的签到人员信息
export function getSignPersonPath(activeId: string, classId: string): string {
    return `https://mobilelearn.chaoxing.com/widget/sign/pcTeaSignController/getAttendList?activeId=${activeId}&appType=15&classId=${classId}&fid=0`
}

// 查询所有活动
export function gatActiveTaskListPath(courseId: number, classId: string, uid: number, cpi: string): string {
    return `https://mobilelearn.chaoxing.com/ppt/activeAPI/taskactivelist?courseId=${courseId}&classId=${classId}&uid=${uid}&cpi=${cpi}`
}

// 获取签到类型
export function getSignType(activeId: string): string {
    return `https://mobilelearn.chaoxing.com/newsign/signDetail?activePrimaryId=${activeId}&type=1`
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

// 位置签到url
export function getLocationSignPath(
    aid: string,
    address: string = '',
    latitude: number | string = '',
    longitude: number | string = '',
    uid?: number
): string {
    // 将address转换为url编码
    address = encodeURIComponent(address).toString()
    // &uid=${uid}
    return `https://mobilelearn.chaoxing.com/pptSign/stuSignajax?address=${address}&activeId=${aid}&clientip=0.0.0.0&latitude=${latitude}&longitude=${longitude}&fid=&appType=15&ifTiJiao=1`
}

// 获取上传图片时需要的token
export function getUploadToken(): string {
    return "https://pan-yz.chaoxing.com/api/token/uservalid"
}

// 上传图片, 还需要传入 (formData --> 两个字段为 file, puid)
export function getUploadImagePath(token: string): string {
    return `https://pan-yz.chaoxing.com/upload?_token=${token}`
}

// 图片签到
export function getSignWithPhoto(aid: string, objectId: string, uid?: number): string {
    // &uid=${uid}
    return `https://mobilelearn.chaoxing.com/pptSign/stuSignajax?activeId=${aid}&appType=15&fid=0&objectId=${objectId}`
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










