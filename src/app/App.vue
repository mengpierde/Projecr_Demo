<!--
    文件：src/app.vue
    作者：
    时间：2018-05-02
    描述：主界面
-->
<template>
    <div id="app" v-loading="loading" element-loading-text="玩命加载中">

        <!--路由切换不清空页面-->
        <!--<keep-alive>-->
        <!--<router-view></router-view>-->
        <!--</keep-alive>-->

        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                loading: 'global.loading'
            })
        },
        watch: {
            $route (to, from) {
                // console.log('route', to.path);
                // document.title = `路由地址:${to.path}`;
            }
        }
    };
</script>

<style lang="scss">
    /*less样式库*/
    @import url('../assets/css/index.css');
    /* tydic公共组件样式库 */
    @import '../assets/scss/index';
    // XXX element-ui 主题的两种方式
    @import '~element-ui/lib/theme-chalk/index.css';
    /*@import '../../theme/index.css';*/
    @import "~ol/ol.css";

    #app {
        width: 100%;
        height: 100%;
    }
</style>
