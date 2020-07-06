import backend from '../../app/backend';
import user from '../../conf/api/user';
import session from '../../app/utils/business/session.js';

const NS = 'userProxy.';

/**
 * 用户信息代理
 */
export default {
    state: {
        data: '',

    },
    getters: {
        [NS + 'user']: state => state.data,

    },
    mutations: {
        [NS + 'setUser'] (state, data) {
            state.data = data;
        },
    },
    actions: {
        /**
         * 进行单点登录认证
         * @param context
         * @param TICKET
         * @returns {Promise<void>}
         */
        async [NS + 'isAccessAllowed'] ({dispatch}, {TICKET}) {
            const result = await backend.request(user.user.isAccessAllowed, {TICKET});
            // if (result.data && result.data.moduleMap[window.config.systemId] && result.data.moduleMap[window.config.systemId].length > 0) {
            //     debugger;
            //     await dispatch('global.setUser', result.data);
            //     await dispatch('userProxy.initUserPrivData', {moduleMap: result.data.moduleMap});
            //     session.setModuleMap(result.data.moduleMap);
            //     Promise.resolve({user: result.data, SSO: true});
            // }
            return result;
        },
        /**
         * 权限初始化
         */
        [NS + 'initUserPrivData'] ({store}, {moduleMap, systemId}) {
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
    }
};
