/**
 文件：src/utils/backend.vue
 作者：
 时间：2017-5-20
 描述：请求后端的工具
 */
import axios        from 'axios';
import axiosHandler from './axiosHandler';

/**
 * 读取api配置
 * @param {*} value
 */
function getApiConf (value) {
    if (!value) {
        throw new Error('Api path is null');
    }
    if (typeof (value) === 'string') {
        return {
            path: value,
            method: 'GET',
        };
    } else {
        if (!value) {
            throw new Error('Api未配置' + JSON.stringify(value));
        }
        if (typeof (value) !== 'object') {
            throw new Error('Api配置错误' + JSON.stringify(value));
        }
        if (!value.method) {
            throw new Error('Api配置错误，缺少method属性' + JSON.stringify(value));
        }
        if (!value.path) {
            throw new Error('Api配置错误，缺少path属性' + JSON.stringify(value));
        }
        return {
            path: value.path,
            method: value.method.toLowerCase(),
            server: value.server,
        };
    }
}

/**
 * 根据api.path获取完整的url
 * @param {*} api
 */
function getUrl (api) {
    if (process.env.NODE_ENV === 'development') {
        // 同站点截取url的path
        const pathName = window.location.origin;
        const appName = api.server || 'default';
        // console.log('default:', appName, process.env[`VUE_APP_DEV_${appName}`]);
        // return `${pathName}${process.env[`VUE_APP_DEV_${appName}`]}${api.path}`;
        return `${pathName}/${appName}${api.path}`;
    } else {
        const server = api.server || 'default';
        return window.config.servers[server] + api.path;
    }
}

/**
 * 构建url参数
 * @param {*} json
 */
function buildQuery (json) {
    if (!json) {
        return '';
    }
    let query = '?';
    const paramConcat = '&';

    for (const i in json) {
        query += (i + '=' + encodeURIComponent(json[i]) + paramConcat);
    }
    if (query.charAt(query.length - 1) === paramConcat) {
        query = query.substr(0, query.length - 1);
    }
    return query;
}

/**
 * 发送http请求
 * @param {*} settings
 */
function request (settings) {
    let api = settings.api;
    const data = settings.data;
    const options = settings.options || {};
    let query = settings.query;
    const restful = settings.restful || true;
    const isMessageError = settings.isMessageError;

    api = getApiConf(api);
    let url = getUrl(api);

    const isDataAsQuery = (api.method === 'get' || api.method === 'delete') && !query && data;
    if (isDataAsQuery) {
        query = data;
    }
    let params = null;
    if (restful) {
        params = query;
    } else {
        url += buildQuery(query);
    }
    const axiosInstance = axios.create({
        baseURL: url,
        timeout: 45000,
        headers: Object.assign({
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
        }, options),
        responseType: settings.responseType || options.responseType || 'json',
    });

    if (isMessageError && typeof axiosHandler === 'function') {
        axiosHandler(axiosInstance, settings);
    }

    return new Promise((resolve, reject) => {
        axiosInstance.request({
            method: api.method,
            params: params,
            data: data,
        }).then(response => {
            // 此处一定要判断，因为拦截器可能什么也没有返回
            if (response) {
                resolve(response.data);
            }
        }).catch(error => {
            reject(error);
        });
    });
}

/**
 * 请求代理类
 */
export default {
    /**
     * 获取url
     */
    getUrl (apiKey, data) {
        const api = getApiConf(apiKey);
        let url = getUrl(api);
        if (typeof data === 'object') {
            url += buildQuery(data);
        }
        return url;
    },
    /**
     * 请求后端
     * @param api 获取URL用，即定义在src/conf/api.js中的api的Key
     * @param data JSON数据
     * @param options ajax附件参数，主要是http header，用的比较少
     * @param isMessageError 当出现错误，是否弹窗提示
     * @returns {*}
     */
    request (api, data, options, isMessageError = true) {
        return request({
            api,
            data,
            options,
            isMessageError,
        });
    },
    /**
     * 转换错误
     * @param {*} error
     */
    convertError (error) {
        const ret = {code: -1};
        const response = error.response;
        if (response) {
            ret.code = response.status;
            const url = response.config.url;
            if (response.status === 504) {
                ret.msg = '服务器网关超时，请联系管理员，请求：' + url;
            } else if (response.status === 404) {
                ret.msg = '服务未启动或未找到接口，请求：' + url;
            } else {
                ret.msg = '服务器繁忙，请稍后再试，请求：' + url;
            }
        } else {
            ret.msg = '无法连接服务器，请检查您的网络';
        }
        return ret;
    },
};
