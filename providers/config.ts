import * as fs from 'fs'
import YAML from 'yaml'
import Account from '../types/Account'
import GeoLocation from '../types/GeoLocation'

interface Config {
    system: {
        autoSign: boolean
    },
    bot: {
        disabled: boolean
        uin: number | 'disabled';
        qrlogin: boolean;
        password: string;
        notifyGroups: number[];
        qrcodeGroups: number[];
        ignore?: number[];
        platform?: number;
        data_dir: string;
    };
    ocr: {
        secretId: string;
        secretKey: string;
    }
    ignoreCourses: number[];
    geoLocations: Array<GeoLocation>
    accounts: Array<Account>
    pushplus: {
        token: string;
        url: string
    }
    checkinTiming: {
        waitSignedTimeout: number
        waitSignedCount: number
        photoSignedCount: number
    }
}

export default YAML.parse(fs.readFileSync(process.env.CONFIG_FILE || 'config.yaml', 'utf-8')) as Config
