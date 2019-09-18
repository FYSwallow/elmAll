<template>
    <div>
        <v-header></v-header>
        <div class="msite_container">
            <div class="swiper_container">
                <van-swipe :autoplay="3000" indicator-color="#3190e8">
                    <van-swipe-item>
                        <ul class="clear">
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                        </ul>
                    </van-swipe-item>
                    <van-swipe-item>
                        <ul class="clear">
                            
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
                            </li>
                            <li>
                                <img src="@/assets/nav.jpg" alt="">
                                <span>冰糖雪梨</span>
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
                <v-shoplist></v-shoplist>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
import Vue from 'vue'
import Header from '@/common/header/header'
import Footer from '@/common/footer/footer'
import ShopList from '@/common/shopList/shoplist'
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
export default {
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