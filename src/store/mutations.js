import {
    RECORD_ADDRESS, 
    SAVE_GEOHASH
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
    }

}