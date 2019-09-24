import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)
const state = {
    latitude: '', //当前位置纬度
    longitude: '', //当前位置经度
    geohash: '', //地址geohash值
    userInfo: null,
    login: false,//是否登录
    avactor: 'images/avactor.jpg',
    addAddress: '',//新增地址
    removeAddress: []
}

export default new Vuex.Store({
    state,
    mutations
})