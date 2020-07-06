import Vue from 'vue'
import router from './router'
import store from '../store'
import codes from '../conf/basedata/codes'
import api from '../conf/api'
import backend from './backend'
import utils from './utils/common'
import App from './App'
import echarts from 'echarts'

let isInit = false

/**
 * 挂载全局vue属性
 * @return {*}
 */
function initVuePrototype () {
    // 挂载全局常量，可在vue中直接使用
    Object.defineProperty(Vue.prototype, 'codes', {
        get () {
            return codes
        }
    })

    // Object.defineProperty(Vue.prototype, '$laydate', {
    //     get () {
    //         return laydate;
    //     }
    // });

    Object.defineProperty(Vue.prototype, '$api', {
        get () {
            return api
        }
    })

    Object.defineProperty(Vue.prototype, '$backend', {
        get () {
            return backend
        }
    })

    Object.defineProperty(Vue.prototype, '$utils', {
        get () {
            return utils
        }
    })

    Object.defineProperty(Vue.prototype, '$echarts', {
        get () {
            return echarts
        }
    })
}

/**
 * 应用程序全局控制
 */
module.exports = {

    /**
     * 初始化应用程序
     * @return {*}
     */
    initApp () {
        if (isInit) {
            throw new Error('应用程序重复初始化')
        }
        isInit = true

        initVuePrototype()

        /* eslint-disable no-new */
        new Vue({
            el: '#app',
            router,
            store,
            components: {App},
            template: '<App/>'
        })
    },
    /**
     * 设置loading
     */
    setLoading (flag) {
        store.dispatch('global.setLoading', flag)
    },

    /**
     * 全局loading状态
     * @return {*}
     */
    get loading () {
        return store.getters['global.loading']
    },

    /**
     * 获取登陆用户
     */
    getLoginUser () {
        return store.getters['global.user']
    },
    /**
     * 完成单点登录之后的回调（可以做初始化字典等请求）
     */
    async onAccounted () {
        let data = await backend.request(api.fastDfsFile.mergeCaseDic, {type: ''})
        if(data){
            store.commit('cases.dicData', data.data)
            sessionStorage.setItem('dicData', JSON.stringify(data.data) )
        }

    }
}