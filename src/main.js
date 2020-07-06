import Vue from 'vue';
import ElementUI from 'element-ui';

// 加载其他第三方库
import './app/filters/index';
import application from './app/application';
import mixins from './app/minixs'
// 树组件
// import TydicGaUI from 'tydic-ga-ui';
// import 'tydic-ga-ui/css/tydic-ga-ui.css';
// import laydate from '../lib/laydate/laydate.js';

Vue.use(ElementUI);
Vue.mixin(mixins)
// Vue.use(TydicGaUI);

// 启动时生成生产提示
// Vue.config.productionTip = false;
application.initApp();