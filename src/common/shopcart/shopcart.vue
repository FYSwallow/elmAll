<template>
    <div>
        <div class="shopCart">
            <div class="content" >
                <div class="content-left">
                    <div class="logo-wrapper"  ref="num">
                        <div class="logo" :class="{'highlight': true}">
                            <i class="fa fa-shopping-cart" :class="{'highlight': true}"></i>
                        </div>
                        <div class="num"  v-show="true">1</div>
                    </div>
                    <div class="price" :class="{'highlight': true}">￥10</div>
                    <div class="desc">另需配送费￥10元</div>
                </div>
                <div class="content-right">
                    <div class="pay" >
                        <div v-if="true">10元起送</div>
                        <div v-if="true">还差￥20元起送</div>
                        <div v-if="true">去结算</div>
                    </div>
                </div>
                <div class="ball-container">
                    <!-- <transition
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @after-enter="afterEnter"> -->
                        <div class="ball" v-show="flag" ref="ball">
                            <div class="inner inner-hook"></div>
                        </div>
                    <!-- </transition> -->
                </div>
            </div>
            <transition name="fade">
                <div class="shopcart-list">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" >清空</span>
                    </div>
                    <div class="list-content">
                        <ul>
                            <!-- <li class="shopcart-food"  v-for="index in 10" :key="index" v-show="true">
                                <span class="name">10</span>
                                <div class="price">￥20</div>
                                <div class="cartControl-wrapper">
                                    <div class="cartControl">
                                        <cartControl :food='food'></cartControl>
                                    </div>
                                </div>
                            </li> -->
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import cartControl from '@/common/cartControl/cartControl'
export default {
    // props:['selectFood', 'deliveryPrice', 'minPrice', 'pos'],
    props: ['pos'],
    data(){
        return{
            food: [
                {name: '123', count: 123}
            ],
            flag: false
        }
    },
    created() {
        console.log(this.pos)
    },
    computed: {
        pos(){
            this.flag = true
        }
    },
    // computed:{
    //     totalPrice(){
    //         let total = 0;
    //         this.selectFood.forEach(food => {
    //             total += food.price * food.count
    //         })
    //         return total
    //     },
    //     totalCount(){
    //         let count = 0
    //         this.selectFood.forEach(food => {
    //             count += food.count
    //         })
    //         return count
    //     },
    //     slowCount() {
    //         return this.totalPrice -this.totalCount
    //     },
    //     payClass() {
    //         if (this.totalPrice < this.minPrice) {
    //             return 'not-enough';
    //         } else {
    //             return 'enough';
    //         }
    //     },
    //     listShow() {
    //         console.log(!this.totalCount)
    //         if(!this.totalCount){
    //             return false;  
    //         }
    //         let show = !this.fold;
    //         return show
    //     }
    // },
    methods:{
        toggleList(){
            if(!this.totalCount) {
                return
            }
            this.fold = ! this.fold
        },
        empty() {
            this.selectFood.forEach((food) => {
                food.count = 0;
            });
        },
        beforeEnter(el) {
            // 获取小球的 在页面中的位置
            el.style.left = this.pos.posX +'px'
            el.style.top = this.pos.posY+ 'px'
            el.style.transform = "translate(0, 0)"
            
        },
        enter(el, done) {
            el.offsetWidth
            const ballPosition = this.$refs.num.getBoundingClientRect()
            const xDist = this.pos.posX - ballPosition.left;
            const yDist = this.pos.posY - ballPosition.top;
            el.style.transform = `translate(${-xDist}px, ${-yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done();
        },
        afterEnter(el) {
            this.pos.ballFlag = !this.pos.ballFlag;
        },
        pay(){
            window.alert(this.totalPrice)
        }
    },
    components:{
        cartControl
    }
}
</script>
<style lang="scss">
.shopCart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content {
        display: flex;
        background: #141d27;
        .content-left {
            flex: 1;
            .logo-wrapper {
                display: inline-block;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                vertical-align: top;
                border-radius: 50%;
                background: #141d27;
                .num {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    border-radius: 16px;
                    font-size: 9px;
                    font-weight: 700;
                    color:#fff;
                    background: rgb(240, 20 ,20);
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
                }
                .logo{
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    border-radius: 50%;
                    background: #2b343c;
                    &.highlight {
                        background: rgb(0, 160,220);
                    }
                    i {
                        line-height: 44px;
                        font-size: 24px;
                        color: #80858a;
                        &.highlight {
                            color: #fff;
                        }
                    }
                }
               
            }
             .price{
                display: inline-block;
                vertical-align: top;
                margin-top: 12px;
                line-height: 24px;
                padding-right: 12px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 16px;
                font-weight: 700;
                color: rgba(255, 255, 255, 0.4);
                &.highlight{
                    color: #fff;
                }
            }
            .desc {
                display: inline-block;
                vertical-align: top;
                line-height: 24px;
                margin-left: 12px;
                margin-top: 12px;
                color: rgba(255, 255, 255, 0.4);
                font-size: 10px;
            }
        }
        .content-right {
            flex: 0 0 105px;
            width: 105px;
            .pay {
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 12px;
                color: rgba(255, 255, 255, 0.4);
                font-weight: 700;
                background: #2b333b;
                &.not-enough {
                    background: #2b333b;
                }
                &.enough {
                    background: #00b43c;
                    color:#fff;
                }
            }
        }
    }
    .ball-container {
        .ball {
            position: fixed;
            z-index: 200;
            //transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41)
            .inner {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: rgb(0, 160, 220);
            }
        }
    }
    .shopcart-list {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        transform: translateY(-100%);
        &.fade-enter-active,&.fade-leave-active{
            transition: all 0.5s;
            transform: translateY(-100%)
        }
        &.fade-enter, &.fade-leave-active {
            transform: translateY(0)
        }
        .list-header{
            height: 40px;
            line-height: 40px;
            padding: 0 18px;
            background: #f3f5f7;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .title {
                float: left;
                font-size: 14px;
                color: rgb(7, 17, 27);
            }
            .empty {
                float: right;
                font-size: 12px;
                color: rgb(0, 160, 220);
            }
        }
        .list-content{
            padding: 0 18px;
            max-height: 217px;
            overflow: auto;
            background: #fff;
            .shopcart-food {
                padding: 12px 0;
                box-sizing: border-box;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                .name {
                    line-height: 24px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .price {
                    position: absolute;
                    right: 90px;
                    bottom: 12px;
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                }
                .cartControl-wrapper {
                    position: relative;
                    .cartControl {
                        position: absolute;
                        right: -10px;
                        bottom: 3px;
                        width: 100px;
                    }
                    
                }
            }
        }
    }
}
</style>