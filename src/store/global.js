import { SessionUtils } from '../app/utils/business/index.js';

const NS = 'global.';

export const state = {
    global: {
        user: null,
        loading: false, // 默认不加载进度条
    }
};

export const getters = {
    [NS + 'user']: state => {
        state.global.user = SessionUtils.getLoginUser();
        return state.global.user;
    },
    [NS + 'loading']: state => state.global.loading,
};

export const mutations = {
    [NS + 'user'] (state, user) {
        state.global.user = user;
        SessionUtils.setLoginUser(user);
    },
    [NS + 'loading'] (state, loading) {
        state.global.loading = loading;
    },
};

export const actions = {
    [NS + 'setUser'] (context, user) {
        context.commit(NS + 'user', user);
    },
    [NS + 'setLoading'] (context, loading) {
        context.commit(NS + 'loading', loading);
    },
};
