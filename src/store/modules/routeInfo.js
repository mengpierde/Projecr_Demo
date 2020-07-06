const NS = 'routeInfo.'

export default {
    state: {
        data: '',
    },
    getters: {
        [NS + 'routeInfo']: state => state.data,
    },
    mutations: {
        [NS + 'routeInfo'] (state, data) {
            state.data = data
        },
    },
    actions: {
        [NS + 'setRouteInfo'] (context, data) {
            context.commit(NS + 'routeInfo', data)
        },
    }
}