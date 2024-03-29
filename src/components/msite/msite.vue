<template>
    <div>
        <v-header signinUp="msite">
            <span slot="search">
                <router-link to="/search" class="fa fa-search search_icon" tag="span"></router-link>
            </span>
            <router-link to="/home" slot="msite-title" class="msite_title" tag="span">
                <span class="title_text ellipsis">{{msiteTitle}}</span>
            </router-link>
        </v-header>
        <div class="msite_container">
            <div class="swiper_container">
                <van-swipe :autoplay="3000" indicator-color="#3190e8">
                    <van-swipe-item v-for="(value, index) in foodTypes" :key="index">
                        <ul class="clear">
                            <router-link
                                v-for="item in value"
                                :key="item.id"
                                tag="li"
                                :to="{path: '/food', query: {geohash, title: item.title, restaurant_category_id: getCategoryId(item.link)}}"
                            >
                                <img :src="imgBaseUrl + item.image_url" />
                                <span>{{item.title}}</span>
                            </router-link>
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
import Vue from "vue";
import { mapMutations } from "vuex";
import vHeader from "@/common/header/header";
import vFooter from "@/common/footer/footer";
import vShoplist from "@/common/shopList/shoplist";
import { cityGuess, msiteAddress, msiteFoodTypes } from "@/api/index";
import { getStore } from "@/api/localStorage";
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe).use(SwipeItem);
export default {
    data() {
        return {
            geohash: "", //上一页传过来的地址
            msiteTitle: "请选择地址...",
            foodTypes: [], //食品分类列表
            imgBaseUrl: "https://fuss10.elemecdn.com", //图片域名地址
            hasGetData: false //是否已经获取地理位置数据，成功之后再获取商铺列表信息
        };
    },
    created() {
        this.initData();
        this.getMsiteFoodTypes();
    },
    methods: {
        ...mapMutations(["RECORD_USERINFO", "RECORD_ADDRESS", "SAVE_GEOHASH"]),
        async initData() {
            //获取之前的用户信息
            const userInfo = getStore("userInfo");
            if (userInfo) {
                this.RECORD_USERINFO(JSON.parse(userInfo));
            }
            if (!this.$route.query.geohash) {
                const res = await cityGuess();
                this.geohash = res.data.latitude + "," + res.data.longitude;
            } else {
                this.geohash = this.$route.query.geohash;
            }
            // 保存geohash到vuex
            // this.$store.commit("SAVE_GEOHASH", this.geohash)
            this.SAVE_GEOHASH(this.geohash);
            const msiteAddressResult = await msiteAddress(this.geohash);
            this.msiteTitle = msiteAddressResult.data.name;

            this.RECORD_ADDRESS(msiteAddressResult.data);
            this.hasGetData = true;
        },
        // 获取轮播导航列表
        async getMsiteFoodTypes() {
            const res = await msiteFoodTypes(this.geohash);
            // 将获得的数据按8条分组
            let resLength = res.data.length;
            let resArr = [...res.data]; // 返回一个新的数组
            let foodArr = [];
            for (let i = 0, j = 0; i < resLength; i += 8, j++) {
                foodArr[j] = resArr.splice(0, 8); //splice会修改原来的数组,然后返回被删除的项目
            }
            this.foodTypes = foodArr;
        },
        // 解码url地址,去求restaurant_category_id值
        getCategoryId(url) {
            let urlData = decodeURIComponent(
                url.split("=")[1].replace("&target_name", "")
            );
            if (/restaurant_category_id/gi.test(urlData)) {
                return JSON.parse(urlData).restaurant_category_id.id;
            } else {
                return "";
            }
        }
    },
    components: {
        vHeader,
        vFooter,
        vShoplist
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin";
.msite_title {
    @include cl;
    width: 50%;
    .title_text {
        width: 100%;
        display: inline-block;
    }
}
.msite_container {
    padding-top: 45px;
    .swiper_container {
        background-color: #fff;
        padding-bottom: 20px;
        margin-bottom: 20px;
        ul {
            width: 100%;
            li {
                float: left;
                width: 25%;
                text-align: center;
                img {
                    display: block;
                    width: 50px;
                    margin: 10px auto;
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