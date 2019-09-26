<template>
    <div id="food">
        <header class="head_nav">
            <div class="tab_left active"><span>商品</span></div>
            <div class="tab_right">评价</div>
        </header>
        <section class="food">
            <aside class="tab_nav">
                <ul>
                    <li v-for="(item, index) in menuList" :key="index" :class="{'active': selected === index}" class="ellipsis" @click="chooseSelected(index)">
                        {{item.name}}
                    </li>
                </ul>
            </aside>
            <section class="food_container">
                <ul>
                    <li>
                        <header class="food_container_title"><h3>{{foodList.name}}</h3><span class="head_middle ellipsis">是分身无术的放</span></header>
                    </li>
                    <li v-for="(item, index) in foodList.foods" :key="index" class="food_list">
                        <img :src="imgBaseUrl + item.image_path">
                        <section class="food_detail">
                            <h3 class="food_name">{{item.name}}</h3>
                            <p class="food_description">{{item.description}}</p>
                            <p class="food_rating"><span>{{item.month_sales}}</span><span>好评率{{item.satisfy_rate}}%</span></p>
                            <div class="food_logo" v-if="item.activity"><span>{{item.activity.image_text}}</span></div>
                            <div class="food_price">
                                <span>￥</span>
                                <span>20 元</span>
                            </div>
                            <div class="shopChoose">
                                <cartControl @func='position'></cartControl>
                            </div>
                        </section>
                    </li>
                </ul>
            </section>
        </section> 
        <ShopCart :pos="ballPosition"></ShopCart>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {shopDetails, foodMenu} from '@/api/index'
import ShopCart from '@/common/shopcart/shopcart'
import cartControl from '@/common/cartControl/cartControl'
export default {
    data() {
        return {
            geohash: '', //地理位置信息
            shopId: null, //商店id值
            menuList: [], //商铺列表
            selected: 0, //选中项
            foodList: [],
            imgBaseUrl: '//elm.cangdu.org/img/', //图片域名地址
            food: [],
            ballPosition: {}
        }
    },
    created() {
        this.geohash = this.$route.query.geohash
        this.shopId = this.$route.query.id
        this.initData()
    },
    computed: {
        ...mapState([
            'latitude','longitude'
        ])
    },
    methods: {
        async initData() {
            // const res = await shopDetails(this.shopId, this.latitude, this.longitude)
            const resMenuList = await foodMenu(this.shopId)
            this.menuList = resMenuList.data
            this.foodList = this.menuList[this.selected]
            console.log(this.foodList)
        },
        chooseSelected(index){
            this.selected = index
            this.foodList = this.menuList[this.selected]
            console.log(this.foodList)

        },
        position(obj){
            console.log(1)
            this.ballPosition = obj
            console.log(this.ballPosition)
        }
    },
    components: {
        ShopCart,
        cartControl
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin';
#food {
    display: flex;
    flex-direction: column;
    .head_nav {
        @include fj;
        text-align: center;
        height: 50px;
        align-items: center;
        background-color: #fff;
        font-size: 18px;
        border-bottom: 1px solid #eee;
        div {
            flex: 1;
            &.active {
                span {
                    color: $blue;
                    display: inline-block;
                    height: 30px;
                    border-bottom: 3px solid $blue;
                }  
            }
        }
    }
    .food {
        @include fj;
        flex: 1;
        .tab_nav{
            ul {
                width: 100px;
                height: 617px;
                overflow-y: auto;
                li {
                    width: 100px;
                    height: 80px;
                    line-height: 80px;
                    padding: 0 10px;
                    border-left: 3px; 
                    border-bottom: 1px solid #ddd;
                    color: #666;
                    &.active {
                        border-left: 3px solid $blue;
                        color: #333;
                        background-color: #fff;
                    }  
                }
            }
        }
        .food_container {
            flex: 1;
            background-color: #fff;
            ul {
                height: 617px;
                width: 100%;
                overflow-y: auto;
                li {
                    padding: 10px;
                    background-color: #fff;
                    display: flex;
                    border-bottom: 1px solid #eee;
                    &:first-of-type {
                        background-color: #f1f1f1;
                    }
                    .food_container_title {
                        h3 {
                            color: #666;
                            display: inline-block;
                        }
                        .head_middle {
                            font-size: 14px;
                            line-height: 25px;
                            color: #999;
                            padding-left: 10px;
                        }
                        .head_right {
                            text-align: right;
                            position: absolute;
                            right: 10px;
                            color: #999;
                        }
                    }
                    img {
                        width: 60px;
                        height: 80px;
                    }
                    .food_detail {
                        flex: 1;
                        padding-left: 10px;
                        position: relative;
                        .food_list {
                            width: 50px;
                            height: 100px;
                        }
                        .food_description {
                            font-size: 13px;
                            color: #999;
                        }
                        .food_rating {
                            font-size: 14px;
                            color: #333;
                            span:nth-of-type(1){
                                padding-right: 10px;
                            }
                        }
                        .food_logo{
                            transform: scale(.8) translateX(-13%);
                            color: #F1884F;
                            span {
                                font-size: 12px;
                                border: 1px solid #F1884F;
                                border-radius: 11px; 
                                padding: 0 5px;
                            }
                            
                        }
                        .food_price {
                            color: #FF6600;
                            span:nth-of-type(1){
                                font-size: 12px;
                            }
                            span:nth-of-type(2){
                                font-weight: 700;
                            }
                        }
                        .shopChoose {
                            position: absolute;
                            bottom: 10px;
                            left: 120px;
                            width: 100px;
                        }
                    }
                }
            }   
        }
    }
}
</style>