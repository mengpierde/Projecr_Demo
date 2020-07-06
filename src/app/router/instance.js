import Vue          from 'vue'
import VueRouter    from 'vue-router'
import routesConfig from '../../conf/routes'

Vue.use(VueRouter)

const routes = [] // 路由配置表

// 处理路由配置
routesConfig.map(nav => {
    const route = handleRouterConfig(nav)
    routes.push(route)
})

// 定义路由实例
const router = new VueRouter({
    // mode: 'history',
    routes
})

/**
 * 处理路由配置项
 * @param {} conf 配置项
 */
function handleRouterConfig (conf) {
    const path = '/' + conf.path
    const name = conf.path.replace(new RegExp('\\/', 'g'), '_')
    const component = resolve => require(['../../views/' + conf.component], resolve)

    const route = {path, name, component}

    if (conf.children && conf.children instanceof Array) {
        route.children = []
        for (const child of conf.children) {
            const childRoute = handleRouterConfig(child)
            if (typeof childRoute !== 'undefined') {
                route.children.push(childRoute)
            }
        }
    }
    return route
}

export default router
