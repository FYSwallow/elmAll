<template>
    <div>
        <ul class="shop_list" v-if="shopListArr.length">
            <li class="shop_list_item" v-for="(item, index) in shopListArr" :key="index">
                <img :src="imgBaseUrl + item.image_path">
                <section>
                    <header class="shop_detail">
                        <div class="shop_detail_left">
                            <h4 class="shop_title ellipsis" :class="item.is_premium? 'premium': ''">{{item.name}}</h4>
                        </div>
                        <div class="shop_detail_right">
                            <span v-for="supportItem in item.supports" :key="supportItem.id">{{supportItem.icon_name}}</span>
                        </div>
                    </header>
                    <div class="rating">
                        <div class="rating_left">
                            <div class="rating_star">
                                <div class="rating_star_white">★★★★★</div>
                                <div class="rating_star_orange" :style="'width:' +item.rating / 5 * 48+ 'px' ">★★★★★</div>
                            </div>
                            <div class="rating_score">{{item.rating}}</div>
                            <div class="seller_num">月售{{item.recent_order_num}}单</div>
                        </div>
                        <div class="rating_right">
                            <span v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
                            <span v-if="zhunshi(item.supports)">准时达</span>
                        </div>
                    </div>
                    <div class="distance">
                        <div class="distance_left">
                            ¥{{item.float_minimum_order_amount}}起送 / {{item.piecewise_agent_fee.tips}}
                        </div>
                        <div class="distance_right">
                            <span>{{item.distance}}</span>/
                            <span>{{item.order_lead_time}}</span>
                        </div>
                    </div>
                </section>
            </li>
        </ul>
        <ul v-else class="shop_list">
			<li class="shop_list_item" v-for="item in 10" :key="item">
				<img src="@/assets/images/shopback.svg" class="list_back_svg">
			</li>
		</ul>
        <p class="empty_end" v-if="touchend">没有更多了</p>
        <transition name="loading">
            <Loading v-show="showLoading"></Loading>
        </transition> 
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {shopList} from '@/api/index'
import Loading from '@/common/loading/loading'
import {getStore} from '@/api/localStorage'
export default {
    props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
    data() {
        return {
            offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
            shopListArr:[], // 店铺列表数据
            imgBaseUrl: '//elm.cangdu.org/img/', //
            touchend: false, //没有更多数据
            showLoading: true, //显示加载动画
        }
    },
    created() {
        this.initData()
    },
    mounted() {
        document.body.addEventListener('scroll', this.loadMore)
    },
    computed: {
        ...mapState([
            'latitude', 'longitude'
        ]),    
    },
    methods: {
        async initData() {
            // 获取商家列表
            const res = await shopList(this.latitude, this.longitude, this.offset)
            this.hideLoading()
            this.shopListArr = res.data
            if(this.shopListArr.length < 20) {
                this.touchend = true
            }
            console.log(this.shopListArr)
            
        },
        async loadMore(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let clientHeight = document.body.clientHeight 
            let scrollHeight = document.body.scrollHeight
            // 到达页面底部时,加载数据
            if(this.shopListArr.length >= 20 && scrollTop === scrollHeight - clientHeight) {
                this.showLoading = true;
                this.offset += 20;
                const res = await shopList(this.latitude, this.longitude, this.offset)
                this.hideLoading()
                this.shopListArr = [...this.shopListArr, ...res.data]
               
            }
        },
        // 判断是否能准时送达
        zhunshi(supports) {
            let falg = false
            if(supports.length){
                supports.forEach(item => {
                    if(item.icon_name === '准'){
                        falg = true
                    }
                })
            }
            return falg
        },
        hideLoading() {
            this.showLoading = false
        },
        // 监听父级组件传来的数据变化函数
        async listenPropChange() {
            this.showLoading = true
            this.offset = 0
            const res = await shopList(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds)
            console.log(1)
            this.hideLoading()
            this.shopListArr = [...res.data]
        }
    },
    watch: {
        //监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
		restaurantCategoryIds: function (value){
			this.listenPropChange();
		},
		//监听父级传来的排序方式
		sortByType: function (value){
			this.listenPropChange();
		},
		//监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
		confirmSelect: function (value){
			this.listenPropChange();
		}
    },
    components: {
        Loading,
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin';
.shop_list {
    background-color: #fff;
    .shop_list_item{
        display: flex;
        border-bottom: 1px solid #eee;
        padding: 16px 10px;
        .list_back_svg {
            width: 100%;
            height: 100%;
        }
        img {
            width: 70px;
            height: 70px;
            display: inline-block;
            padding-right: 10px;
        }
        section {
            flex: 1;
            font-size: 12px;
            color: #666;
            .shop_detail {
                @include fj;
                .shop_detail_left {
                    transform: scale(.7) translateX(-60px);
                    .shop_title {
                        width: 200px;
                        font-weight: 700;
                        font-size: 22px;
                        padding-left: 10px;
                        color: #000;
                    }
                    .premium::before {
                        content: '品牌';
                        background-color: #FFD930;
                        font-size: 12px;
                        padding: 0 5px;
                        line-height: 12px;
                        margin-right: 10px;
                    }
                }
                .shop_detail_right {
                    span {
                        border: 1px solid #f1f1f1;
                        margin-left: 5px;
                        color: #999;
                    }
                }

            }
            .rating {
                @include fj;
                margin-top: 8px;
                .rating_left{
                    transform: translate(.7);
                    div {
                        display: inline-block;
                    }
                    .rating_star {
                        position: relative;
                        width: 48px;
                        .rating_star_white {
                            color: #999;
                        }
                        .rating_star_orange {
                            position: absolute;
                            top: 0;
                            left: 0;
                            color: #FF9A0D;
                            overflow: hidden;
                        }
                    }
                    .rating_score {
                        padding-left: 10px;
                        color: #FF9A0D;
                    }
                    .seller_num {
                        padding-left: 10px;
                        color: #999;
                    }
                } 
                .rating_right {
                    transform: scale(.7) translateX(18px);
                    span:nth-of-type(1){

                        background-color: $blue;
                        border: 1px solid $blue;
                        color: #fff;
                    }
                    span:nth-of-type(2){
                        color: $blue;
                        border: 1px solid $blue;
                        margin-left:2px;
                    }     

                }
            }
            .distance {
                @include fj;
                margin-top: 8px;
                .distance_right {
                    span:nth-of-type(2){
                        color: $blue;
                    }
                }
            }
        }
    }
    
}
.loading-enter-active, .loading-leave-active {
    transition: opacity 1s
}
.loading-enter, .loading-leave-active {
    opacity: 0
}
</style>