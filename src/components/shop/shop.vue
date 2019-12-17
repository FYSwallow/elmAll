<template>
    <div id="food">
        <header class="head_nav">
            <div class="tab_left active">
                <span>商品</span>
            </div>
            <div class="tab_right">评价</div>
        </header>
        <section class="food">
            <aside class="tab_nav">
                <ul>
                    <li
                        v-for="(item, index) in menuList"
                        :key="index"
                        :class="{'active': selected === index}"
                        class="ellipsis"
                        @click="chooseSelected(index)"
                    >
                        {{item.name}}
                        <div class="num"></div>
                    </li>
                </ul>
            </aside>
            <section class="food_container">
                <ul>
                    <li>
                        <header class="food_container_title">
                            <h3>{{foodList.name}}</h3>
                            <span class="head_middle ellipsis">是分身无术的放</span>
                        </header>
                    </li>
                    <li v-for="(item, index) in foodList.foods" :key="index" class="food_list">
                        <img :src="imgBaseUrl + item.image_path" />
                        <section class="food_detail">
                            <h3 class="food_name">{{item.name}}</h3>
                            <p class="food_description">{{item.description}}</p>
                            <p class="food_rating">
                                <span>{{item.month_sales}}</span>
                                <span>好评率{{item.satisfy_rate}}%</span>
                            </p>
                            <div class="food_logo" v-if="item.activity">
                                <span>{{item.activity.image_text}}</span>
                            </div>
                            <div class="food_price">
                                <span>￥</span>
                                <span>20 元</span>
                            </div>
                            <div class="shopChoose">
                                <cartControl @func="position" :food="item" @result="resultFoods"></cartControl>
                            </div>
                        </section>
                    </li>
                </ul>
            </section>
        </section>
        <ShopCart :pos="ballPosition" :selectFood="resultfoods"></ShopCart>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { foodMenu } from "@/api/index";
import ShopCart from "@/common/shopcart/shopcart";
import cartControl from "@/common/cartControl/cartControl";
import Loading from "@/common/loading/loading";
export default {
    data() {
        return {
            geohash: "", //地理位置信息
            shopId: null, //商店id值
            menuList: [], //商铺列表
            selected: 0, //选中项
            foodList: [],
            imgBaseUrl: "https://elm.cangdu.org/img/", //图片域名地址
            food: [],
            ballPosition: { ballFlag: false },
            resultfoods: [],
            showLoading: true //显示加载动画
        };
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState(["latitude", "longitude"]),
    },
    methods: {
        async initData() {
            this.geohash = this.$route.query.geohash;
            this.shopId = this.$route.query.id;
            // const res = await shopDetails(this.shopId, this.latitude, this.longitude)
            const resMenuList = await foodMenu(this.shopId);
            this.showLoading = false;
            this.menuList = resMenuList.data;
            if (this.menuList.length) {
                this.foodList = this.menuList[this.selected];
            }
        },
        chooseSelected(index) {
            this.selected = index;
            this.foodList = this.menuList[this.selected];
        },
        resultFoods(foods) {
            if (this.resultfoods.length) {
                const samefoods = this.resultfoods.findIndex(item => {
                    return item.name === foods.name;
                    //如果食物名字相同,则只改变数量
                });
                if (samefoods >= 0) {
                    this.resultfoods.splice(samefoods, 1);
                    this.resultfoods.unshift(foods);
                } else {
                    this.resultfoods.unshift(foods);
                }
            } else {
                this.resultfoods.unshift(foods);
            }
        },
        position(obj) {
            this.ballPosition = Object.assign({}, this.ballPosition, obj);
        }
    },
    components: {
        ShopCart,
        cartControl,
        Loading
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin";
#food {
    display: flex;
    flex-direction: column;
    height: 100%;
    .head_nav {
        @include fj;
        align-items: center;
        height: 50px;
        text-align: center;
        font-size: 18px;
        border-bottom: 1px solid #eee;
        background-color: #fff;
        div {
            flex: 1;
            &.active {
                span {
                    display: inline-block;
                    height: 30px;
                    border-bottom: 3px solid $blue;
                    color: $blue;
                }
            }
        }
    }
    .food {
        @include fj;
        flex: 1;
        height: 100%;
        overflow: hidden;
        padding-bottom: 50px;
        .tab_nav {
            width: 25%;
            ul {
                @include wh(100%, 100%);
                overflow-y: auto;
                li {
                    @include wh(100px, 80px);
                    padding: 0 10px;
                    border-left: 3px;
                    border-bottom: 1px solid #ddd;
                    line-height: 80px;
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
            width: 75%;
            overflow: hidden;
            background-color: #fff;
            ul {
                @include wh(100%, 100%);
                overflow-y: auto;
                li {
                    padding: 10px;
                    display: flex;
                    border-bottom: 1px solid #eee;
                    background-color: #fff;
                    &:first-of-type {
                        background-color: #f1f1f1;
                    }
                    .food_container_title {
                        h3 {
                            color: #666;
                        }
                        .head_middle {
                            @include font(14px, 25px);
                            padding-left: 10px;
                            color: #999;
                        }
                        .head_right {
                            text-align: right;
                            color: #999;
                        }
                    }
                    img {
                        @include wh(60px, 80px);
                    }
                    .food_detail {
                        flex: 1;
                        position: relative;
                        padding-left: 10px;
                        .food_list {
                            @include wh(50px, 100px);
                        }
                        .food_description {
                            @include sc(13px, #999);
                        }
                        .food_rating {
                            @include sc(13px, #333);
                            span:nth-of-type(1) {
                                padding-right: 10px;
                            }
                        }
                        .food_logo {
                            transform: scale(0.8) translateX(-13%);
                            color: #f1884f;
                            span {
                                border: 1px solid #f1884f;
                                border-radius: 11px;
                                padding: 0 5px;
                                font-size: 12px;
                            }
                        }
                        .food_price {
                            color: #ff6600;
                            span:nth-of-type(1) {
                                font-size: 12px;
                            }
                            span:nth-of-type(2) {
                                font-weight: 700;
                            }
                        }
                        .shopChoose {
                            position: absolute;
                            bottom: 10px;
                            right: 10px;
                            width: 100px;
                        }
                    }
                }
            }
        }
    }
}
.loading-enter-active,
.loading-leave-active {
    transition: opacity 0.7s;
}
.loading-enter,
.loading-leave-active {
    opacity: 0;
}
</style>