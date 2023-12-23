export type SignType = {
    // 普通签到(包含图片签到)
    NORMAl: "0"
    // 细分是否图片签到
    PHOTO: "1"
    // 扫码签到
    SCAN_QR: "2"
    // 手势签到
    GESTURE: "3"
    // 定位签到
    LOCATION: "4"
    // 签到码签到
    SIGN_CODE: "5"
    ID: "id"
    IF_PHOTO: "ifPhoto"
    OTHER_ID: "otherId"
}
