import GeoLocation from './GeoLocation'

type CheckinType = 'qr' | 'gesture' | 'location' | 'photo' | 'normal' | 'code'

export default interface CheckinInfo {
    type: CheckinType
    location?: GeoLocation & { range: string }
}
