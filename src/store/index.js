import Vue from 'vue';
import Vuex from 'vuex';
import userProxy from './modules/userProxy';
import {actions, getters, mutations, state} from './global';

import template from './modules/template';
import routeInfo from './modules/routeInfo';

Vue.use(Vuex);

const store = new Vuex.Store({
    actions,
    state,
    getters,
    mutations,
    modules: {
        template,
        userProxy,
        routeInfo,
    }
});

export default store;
