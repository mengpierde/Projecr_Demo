// import menus from './menus';
//
// const listMenuOne = []; // 一级目录
// const listMenuTwo = []; // 二级目录
// let pathSet = new Set();
// for (const item of menus) {
//     getPath(item, listMenuTwo);
// }
//
// function getPath (item, listMenuTwo) {
//     if (item.path && item.component) {
//         if (item.children && item.children.length > 0) {
//             console.error('请不要在父菜单上定义组件', item)
//             throw new Error('请不要在父菜单上定义组件 label:' + item.label);
//         }
//         const temp = {
//             path: item.path,
//             component: item.component,
//         };
//
//         if (pathSet.has(item.path)) {
//             throw new Error(`路径${item.path}已经定义`);
//         }
//         pathSet.add(item.path);
//
//         // set.has()
//
//         // item属性isRoot是否是根目录
//         if (item.isRoot) {
//             listMenuOne.push(temp)
//         } else {
//             listMenuTwo.push(temp)
//         }
//     }
//     if (item.children && item.children.length > 0) {
//         for (const itemTemp of item.children) {
//             getPath(itemTemp, listMenuTwo);
//         }
//     }
// }

/**
 * 路由配置项
 */
export default [
    // 解构一级目录
    // ...listMenuOne,
    {
        path: '/',
        component: 'home/index',
        label: '测试',
        children: [
            // 通过menu.js合并
            // ...listMenuTwo,
        ]
    },
    {
        path: 'testLine',
        component: 'testLine/line',
        label: '画线',
    },  
     {
        path: 'pointTrac',
        component: 'pointTrac/point',
        label: '偏移轨迹',
    },   
     {
        path: 'lineAnimation',
        component: 'lineAnimation/index',
        label: '偏移轨迹',
    },
    {
        path: 'testLine',
        component: 'testLine/line',
        label: '单点追踪',
    },
    {
        path: 'login',
        component: 'default/login'
    },
    {
        path: 'error',
        component: 'default/error',
        label: '通用错误页面'
    },
    {
        path: '403',
        component: 'default/403',
        label: '没有权限访问当前页面'
    },
    {
        path: 'noPermission',
        component: 'default/noPermission',
        label: '没有权限访问当前页面'
    },
    {
        path: '*',
        component: 'default/404',
        label: '资源未找到',
        comments: '这项配置一定要放到最后面'
    }
];
