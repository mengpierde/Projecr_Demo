import HttpUtil  from '../utils/common/HttpUtil';
import backend   from '../backend';
import api       from '../../conf/api';
import $store    from '../../store';
import $router   from './index';
import session   from '../utils/business/session';
import {Message} from 'element-ui';
import appHelper from '../utils/common/appHelper';

/**
 * 单点登录相关处理（抽取相关逻辑，可定制化修改相关内容）
 */
export default {
    /**
     * 单点登录相关配置项
     */
    config: {
        isAccessAllowed: false,    // 是否需要进行单点登录验证
        // isAccessAllowed: false,    // 是否需要进行单点登录验证
        errorTo: process.env.NODE_ENV === 'development' ? 'login' : 'noPermission' // 登录错误之后跳转页面
    },

    /**
     * 单点登录，获取用户信息
     * @return {Promise<{user,msg,nextTo}>}
     */
    async getAccount () {
        const application = require('../application');
        const queryMaps = HttpUtil.getUrlParams();
        const userInfo = application.getLoginUser();

        // 单点登录
        if (userInfo) {
            return {user: userInfo};
        } else if (queryMaps.TICKET) {
            try {
                let result = await backend.request(api.appDefault.isAccessAllowed, queryMaps);
                if (result.data) {
                    const systemId = window.config.systemId;
                    if (result.data.moduleMap && Array.isArray(result.data.moduleMap[systemId]) && result.data.moduleMap[systemId].length > 0) {
                        $store.dispatch('global.setUser', result.data);
                        initUserPrivData(result.data.moduleMap);
                        session.setModuleMap(result.data.moduleMap);
                        return {
                            user: result.data,
                        };
                    } else {
                        return {
                            msg: `systemId:${systemId} 无法匹配到对应的功能模块`,
                        };
                    }
                } else if (result.code === '808010') {
                    return {
                        user: null,
                        msg: '没有权限',
                        nextTo: {path: 'noPermission', query: ''}
                    };
                } else {
                    return {
                        user: null,
                        msg: '登录认证错误'
                    };
                }
            } catch (error) {
                console.error(error);
            } finally {

            }
        } else {
            return {msg: '没有TICKET参数'};
        }
    },

    /**
     * 单点登录失败回调处理
     * @return {Promise<void>}
     */
    async onAccountError (msg) {
        msg && console.error(msg);

        Message.warning(msg || '单点登录错误');
        await appHelper.sleep(300);

        if (process.env.NODE_ENV === 'development') {
            $router.push(this.config.errorTo);
        } else {
            // 跳转平台门户（生产环境默认没有登录页）
            if (window.config.wpUrl && window.config.wpUrl !== '') {
                window.location.href = window.config.wpUrl;
            } else {
                Message.warning('平台门户地址未配置');
            }
        }
    }
};

/**
 * 权限初始化
 */
function initUserPrivData (moduleMap, systemId) {
    // 初始化 Menu
    const Menu = [];
    const privKeys = [];
    const paths = ['/', '*', '/error', '/login', '/403'];
    // 平台联网的系统id是否存在
    if (systemId) {
        window.config.systemId = systemId;
    }
    for (const temp of moduleMap[window.config.systemId]) {
        privKeys.push(temp.permiCode);
    }
    session.setPrivData(privKeys);
    session.setPaths(paths);
}
