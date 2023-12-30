import GeoLocation from './GeoLocation'

type CheckinType = 'qr' | 'gesture' | 'location' | 'photo' | 'normal' | 'code'

export default interface CheckinInfo {
    activeId?: string
    classId?: string
    courseId?: number
    type: CheckinType
    endTime: number // 签到结束时间, 时间戳
    location?: GeoLocation & { range: string }
}
