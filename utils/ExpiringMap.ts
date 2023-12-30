import CheckinInfo from "../types/CheckinInfo";

class ExpiringMap<K, V> {
    private map: Map<K, V>;
    constructor() {
        this.map = new Map();
    }

    set(key: K, value: V, expire) {
        this.map.set(key, value);
        setTimeout(() => this.map.delete(key), expire);
    }

    get(key: K) {
        return this.map.get(key);
    }

    // 其他Map方法...
}
 export default new ExpiringMap<string, CheckinInfo>();

