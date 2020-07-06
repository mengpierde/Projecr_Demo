<!--
    文件：src/views/default/login.vue
    作者：
    时间：2017-5-25
    描述：用户登陆
-->
<template>
    <div v-loading="loading" element-loading-text="正在登陆">
        <form v-on:submit.prevent>
            <ul>
                <li><input type="text" v-model="user.userName"/></li>
                <li><input type="password" v-model="user.password"/></li>
                <li>
                    <button @click="onLogin()">登陆</button>
                </li>
            </ul>
        </form>
    </div>
</template>

<script>
    import CryptoJS                 from 'crypto-js';
    import {mapActions, mapGetters} from 'vuex';

    export default {
        data () {
            return {
                loading: false,
                // 登陆输入参数
                user: {
                    userName: 'tydic',
                    password: '123456'
                }
            };
        },
        computed: {
            ...mapGetters({
                globalUser: 'global.user',
            })
        },
        methods: {
            ...mapActions({
                setUser: 'global.setUser'
            }),
            async onLogin () {
                // 将密码进行md5加密
                const password = CryptoJS.MD5(this.user.password).toString();
                const loginInput = {
                    account: this.user.userName,
                    password: password.toString(CryptoJS.enc.Utf8).toUpperCase(),
                    systemId: window.config.systemId
                };
                try {
                    this.loading = true;
                    const result = await this.$backend.request(this.$api.user.login, loginInput);
                    await this.isAccessAllowed(result.data.ticket || result.data.ticketId);
                } catch (err) {
                    console.error('login.onLogin', err);
                } finally {
                    this.loading = false;
                }
            },
            redirect () {
                if (typeof (this.$route.query.redirect) !== 'undefined') {
                    const redirect = decodeURIComponent(this.$route.query.redirect);
                    this.$router.push({path: redirect});
                } else {
                    this.$router.push({path: '/'});
                }
            },
            /**
             * 执行单点登录认证
             */
            async isAccessAllowed (ticket) {
                // 模拟执行平台门户跳转方式打开新页面
                const url = `http://${window.location.host}/#/?TICKET=${ticket}`;
                console.log('url', url);
                window.location.href = url;
            }
        }
    };
</script>
