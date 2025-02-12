import * as log from './log'
import {info, success, warn} from './log'
import * as db from '../providers/db'
import config from '../providers/config'
import validateCookie from '../requests/validateCookie'
import Account from '../types/Account'
import login from '../requests/login'
import getUserInfo from '../requests/getUserInfo'
import AccountMetaData from '../types/AccountMetaData'

const loginAndSaveInfo = async (account: Account) => {
    //获取 cookie
    info('正在获取 Cookie')
    const getCookieRes = await login(account.username, account.password)
    const cookie = getCookieRes.cookie
    // 全局保存 cookie
    await accountsManager.setAccountData(account.username, 'cookie', cookie)
    success('Cookie 获取成功，正在获取用户信息')
    const userInfo = await getUserInfo(cookie)
    const {schoolname, name, uid, puid} = userInfo
    /**
     * TODO
     *  uid和 puid不是同一个东西
     *  uid是用于连接IM协议的，puid才是用户真正的id
     *  所有的签到接口都不需要在querystring传递uid
     *  但是在图片签到时，上传图片需要携带puid，记住不是上面获取的uid
     *
     * @Author DengChao
     * @Date 2023/12/24 18:06
     */
    await accountsManager.setAccountData(account.username, 'schoolname', schoolname)
    await accountsManager.setAccountData(account.username, 'name', name)
    await accountsManager.setAccountData(account.username, 'uid', uid)
    await accountsManager.setAccountData(account.username, 'puid', puid)
    success(`${name} 的凭据信息已刷新`)
    return cookie
}

const accountsManager = {
    async checkCookies() {
        log.info('开始检查帐号的 Cookies')
        for (const account of config.accounts) {
            log.info(`检查 ${account.username} 的 Cookies`)
            const accountData = await accountsManager.getAccountData(account.username)
            let isCookieValid: boolean = false
            // 验证及获取 cookie
            if (accountData.cookie) {
                isCookieValid = await validateCookie(accountData.cookie)
                if (isCookieValid) success(`Cookie 有效，${accountData.name} 的凭据无需刷新`)
                else warn('Cookie 无效')
            }
            if (!isCookieValid) {
                await loginAndSaveInfo(account)
            }
        }
    },
    async getAccountData(username: string): Promise<AccountMetaData> {
        return {
            cookie: await db.getMeta<string>(`cookie_${username}`),
            uid: await db.getMeta<number>(`uid_${username}`),
            puid: await db.getMeta<number>(`puid_${username}`),
            schoolname: await db.getMeta<string>(`schoolname_${username}`),
            name: await db.getMeta<string>(`name_${username}`),
        }
    },
    async setAccountData(username: string, metaName: keyof AccountMetaData, value: string | number) {
        await db.setMeta(`${metaName}_${username}`, value)
    },
}

export default accountsManager
