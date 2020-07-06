import store     from '../store';
import $router   from './router';
import backend   from './backend';
import {Message} from 'element-ui';

/**
 * 对http请求拦截
 * @param axiosInterceptors
 * @param setting
 */
export default (axiosInterceptors, setting) => {
    // 添加响应拦截器
    axiosInterceptors.interceptors.response.use(response => {
        const result = response.data;
        if (!result.success) {
            if (Number(result.code) === 120000) {
                Message.error('未登录或登录超时，请重新登陆');
                store.dispatch('global.setUser', null); // 清空前端session
                $router.push({name: 'login'});
            } else {
                Message.error(result.msg || result.message || '业务操作失败，系统未提供错误消息');
            }
            store.dispatch('global.setLoading', false);
            return Promise.reject(response);
        } else {
            return response;
        }
    }, error => {
        store.dispatch('global.setLoading', false);
        const err = backend.convertError(error);
        Message.error(err.msg || err.message);
        return Promise.reject(error);
    });
}