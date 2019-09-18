<template>
    <div>
        <header class="head_nav">
            <div class="tab_left active"><span>商品</span></div>
            <div class="tab_right">评价</div>
        </header>
        <section>
            <aside class="tab_nav">
                <ul>
                    <li class="active">热销榜</li>
                    <li>热销榜</li>
                    <li>热销榜</li>
                    <li>热销榜</li>
                    <li>热销榜</li>
                    <li>热销榜</li>
                    <li>热销榜</li>
                    <li>热销榜</li>
                    <li>热销榜</li>
                    <li>热销榜</li>
                </ul>
            </aside>
            <section class="food_detail">
                <ul>
                    <li>
                        <header class="food_detail_title"><h3>热销榜</h3><span class="head_middle">是分身无术的放</span> <span class="head_right">...</span></header>
                    </li>
                    <li>
                        <img src="" alt="">
                        <section class="food_detail">
                            <h3 class="food_name">1</h3>
                            <p class="food_description">2</p>
                            <p class="food_rating"><span>月售120份</span><span>好评率50%</span></p>
                            <div class="food_logo"><span>买什么都不送</span></div>
                            <div class="food_price"><span>￥</span><span>20 元</span></div>
                        </section>
                        <div class="food_choose">5</div>
                    </li>
                    <li>3</li>
                    <li></li>
                    <li></li>
                </ul>
            </section>
        </section>
        
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin';
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
section {
    @include fj;
    .tab_nav{
        width: 20%;
        ul li {
            display: flex;
            align-items: center;
            height: 80px;
            padding-left: 10px;
            border-left: 3px; 
            border-bottom: 1px solid #ddd; 
            &.active {
                border-left: 3px solid $blue;
            }  
        }
    }
    .food_detail {
        flex: 1;
        background-color: #fff;
        ul {
            width: 100%;
            li {
                width: 100%;
                padding: 10px;
                background-color: #fff;
                display: flex;
                position: relative;
                &:first-of-type {
                    background-color: #f1f1f1;
                }
                .food_detail_title {
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
                    width: 80px;
                }
                .food_detail {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    padding-left: 10px;
                    .food_name {

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
                        transform: scale(.8) translateX(-20px);
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
                }
                .food_choose {
                    position: absolute;
                    right: 10px;
                    bottom: 10px;
                }
                
            }
        }
        
    }
}

</style>