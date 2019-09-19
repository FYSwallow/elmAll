<template>
    <div>
        <v-header :headTitle="msiteTitle" signinUp='msite'>
            <span slot="search">
                <span class="fa fa-search search_icon"></span>
            </span>
        </v-header>
        <div class="msite_container">
            <div class="swiper_container">
                <van-swipe :autoplay="3000" indicator-color="#3190e8">
                    <van-swipe-item v-for="(value, index) in foodTypes" :key="index">
                        <ul class="clear">
                            <li v-for="item in value" :key="item.id">
                                <img :src="imgBaseUrl + item.image_url">
                                <span>{{item.title}}</span>
                            </li>
                        </ul>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="shop_list_container">
                <div class="shop_header">
                    <i class="fa fa-university"></i>
                    <span>附近商家</span>
                </div>
                <v-shoplist style="padding-bottom: 50px" v-if="hasGetData" :geohash="geohash"></v-shoplist>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
import Vue from 'vue'
import {mapMutations} from 'vuex'
import Header from '@/common/header/header'
import Footer from '@/common/footer/footer'
import ShopList from '@/common/shopList/shoplist'
import {cityGuess, msiteAddress, msiteFoodTypes} from '@/api/index'
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
export default {
    data() {
        return {
            geohash: '', //上一页传过来的地址
            msiteTitle: '请选择地址...',
            foodTypes: [], //食品分类列表
            imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
            hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
        }
    },
    created() {
        this.initData()
        this.getMsiteFoodTypes()
    },
    methods: {
        initData(){
            if(!this.$route.query.geohash){
                cityGuess().then(res => {
                    this.geohash = res.data.latitude + ',' + res.data.longitude
                })
            }else {
                this.geohash = this.$route.query.geohash
            }
            // 保存geohash到vuex
            // this.$store.commit("SAVE_GEOHASH", this.geohash)
            this.SAVE_GEOHASH(this.geohash)
            msiteAddress(this.geohash).then(res => {
                this.msiteTitle = res.data.name
                // 保存geohash到vuex
                // this.$store.commit("RECORD_ADDRESS", res.data)
                this.RECORD_ADDRESS(res.data)
            })
            this.hasGetData = true
        },
        ...mapMutations([
            'RECORD_ADDRESS', 'SAVE_GEOHASH'
        ]),
        // 获取轮播导航列表
        getMsiteFoodTypes() {
            msiteFoodTypes(this.geohash).then(res => {
                // 将获得的数据按8条分组
                console.log(res.data.length)
                let resLength = res.data.length
                let resArr = [...res.data] // 返回一个新的数组
                let foodArr = []
                for (let i = 0, j = 0; i < resLength; i += 8, j++) {
                    foodArr[j] = resArr.splice(0, 8) //splice会修改原来的数组,然后返回被删除的项目
                }
                this.foodTypes = foodArr
            })
        }
        
    },
    components: {
        'v-header': Header,
        'v-footer': Footer,
        'v-shoplist': ShopList
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin';
.msite_container {
    padding-top: 45px;
    .swiper_container {
        background-color: #fff;
        padding-bottom: 20px;
        margin-bottom: 20px;
        ul {
            width: 100%;
            li {
                width: 25%;
                float: left;
                text-align: center;
                img{
                    display: block;
					margin: 10px auto;
					width: 50px;
				}
                span {
                    color: #666;
                }
            }
        }
        .van-swipe__indicators {
            bottom: -12px;
        }
    }
    .shop_list_container {
        background-color: #fff;
        .shop_header {
            padding: 10px;
            color: #999;
            i {
                padding-right: 10px;
                font-size: 20px;
                vertical-align: bottom;
            }
        }
    }
}
</style>