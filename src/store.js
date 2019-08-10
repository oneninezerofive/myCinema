import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: 'n_login',
        orderList: [],
        city: ["广州"],
        cinema: null,
        username: ""
    },
    mutations: {
        setLogin(state, name) {
            state.isLogin = name;
        },
        setOrder(state, item) {
            state.orderList.push(item);
            // if (window.localStorage.getItem("order") != undefined) {
            //     window.localStorage.removeItem('order')
            // }
            // window.localStorage.setItem('order', state.orderList)
        },
        setCity(state, city) {
            state.city.unshift(city)
        },
        setCinema(state, cinema) {
            state.cinema = cinema
        },
        setUsername(state, name) {
            state.username = name
        }
    },
    getters: {
        getLogin(state) {
            return state.isLogin;
        },
        getOrder(state) {
            return state.orderList;
        },
        getCity(state) {
            return state.city;
        },
        getCinema(state) {
            return state.cinema;
        },
        getUsername(state) {
            return state.username;
        }
    },
    actions: {
        setLogin(context) {
            context.commit('setLogin');
        }
    }
});