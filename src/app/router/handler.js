import accountHandler from './accountHandler';

export default function (router) {
    router.beforeEach((to, from, next) => {
        try {
            beforeRouteEnter(to, from, next);
        } catch (e) {
            console.error(e);
        }
    });
}

/**
 * 是否在过滤范围内
 */
function isFilter (name) {
    return filterMap.get(name);
}

// 是否已经加载
let isLoad = true;

// 过滤的路由name
const filters = ['login', 'error', '500', '400', 'noPermission'];

// 过滤的路由map
let filterMap = new Map();
filters.forEach(item => {
    filterMap.set(item, true);
});

/**
 * 路由跳转之前
 */
async function beforeRouteEnter (to, from, next) {
    document.body.scrollTop = 0;
    // 适应第三方应用跳转到某个路由
    if (!isLoad) {
        isLoad = true;
        if (typeof (to.query.redirect) !== 'undefined') {
            const redirect = decodeURIComponent(to.query.redirect);
            next(redirect);
            return;
        }
    }

    // 后台用户信息错误，前端拦截器等会自动跳转到登录页面/平台门户
    if (process.env.NODE_ENV !== 'development' && to.name === 'login') {
        // 生产环境默认没有登录页面
        accountHandler.onAccountError();
        return;
    }

    // 某些过滤的请求，包括login,error等
    if (isFilter(to.name)) {
        next();
        return;
    }

    // 是否需要进行单点登录验证，（情报墙类似应用不需要登录验证）
    if (accountHandler.config.isAccessAllowed) {
        const response = await accountHandler.getAccount();
        if (!response) {
            throw new Error('单点登录返回错误');
        }
        const { user, msg, nextTo } = response;
        if (nextTo) {
            next(nextTo);
        } else if (user) {
            doNext(next, to);
        } else {
            accountHandler.onAccountError(msg);
        }
    } else {
        doNext(next, to);
    }
}

/**
 * 执行跳转
 * @param {*} next
 */
function doNext (next, to) {
    // 如果跳转到admin做权限控制
    if (/^\/admin/.test(to.path)) {
        const loginUser = require('../application').getLoginUser();
        if (loginUser.yhid !== 'admin') {
            redirect('403', next, to);
            return;
        }
    }
    next();
}

/**
 * 跳转到某个页面
 */
function redirect (name, next, to) {
    if (typeof (to.query.redirect) === 'undefined') {
        to.query.redirect = encodeURIComponent(to.path);
    }
    next({ name: name, query: to.query });
}