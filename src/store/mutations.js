import {
    RECORD_ADDRESS, 
    SAVE_GEOHASH,
    RECORD_USERINFO,
    OUT_LOGIN,
    RETSET_NAME,
    ADD_ADDRESS,
    SAVE_ADDDETAIL,
    DELECT_ADDRESS,
    SAVE_FOODS
} from './mutation-types'
import {getStore, setStore} from '@/api/localStorage'
export default {
    //记录当前经纬度
    [RECORD_ADDRESS](state, {
        latitude,
        longitude
    }) {
        state.latitude = latitude
        state.longitude = longitude
    },
    //记录当前geohash
    [SAVE_GEOHASH](state, geohash) {
        state.geohash = geohash
    },
    // 记录用户信息
    [RECORD_USERINFO](state, info){
        state.userInfo = info
        state.login = true
        setStore('userInfo', info.phoneNumber)
    },
    //退出登录
	[OUT_LOGIN](state) {
		state.userInfo = null;
		state.login = false;
    },
    //修改用户名
	[RETSET_NAME](state,username) {
        // Object.assign 合并对象,前者和后者如果有相同的,则会被覆盖
		state.userInfo = Object.assign({}, state.userInfo,{username})
    },
    //增加地址
	[ADD_ADDRESS](state, obj) {
		state.removeAddress = [obj, ...state.removeAddress];
    },
    //添加地址name
	[SAVE_ADDDETAIL](state, addAddress){
		state.addAddress=addAddress;
    },
    [DELECT_ADDRESS](state, index){
        state.removeAddress.splice(index, 1)
    },
    // 添加选中的商品
    [SAVE_FOODS](state, foods){
        state.selectedFoods.unshift(foods)
    }
}