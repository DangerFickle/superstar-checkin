export default interface GeoLocation {
    clazzid: number
    courseId: number | string,
    activeid: number,
    latitude: number,
    longitude: number,
    locationrange: string
    address: string
    onlyOnWeekdays?: Array<number>
}
