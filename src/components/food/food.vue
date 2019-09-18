<template>
    <div class="food">
        <v-header></v-header>
        <div class="food_container">
            <section class="sort_container">
                <div class="sort_item">
                    <span>甜品饮料</span>
                    <i class="fa fa-angle-down"></i>
                </div>
                <div class="sort_item">
                    <span>排序</span>
                    <i class="fa fa-angle-down"></i>
                </div>
                <div class="sort_item">
                    <span>筛选</span>
                    <i class="fa fa-angle-down"></i>
                </div>
            </section>
            <section class="category_container">
                <div class="sort_item_category_type" v-show="false">
                    <div class="sort_item_category_left">
                        <ul>
                            <li class="active">
                                <section><img src="@/assets/nav.jpg" alt="">小吃</section>
                                <section><span>123</span>&gt;</section>
                            </li>
                            <li>
                                <section><img src="@/assets/nav.jpg" alt="">小吃</section>
                                <section><span>123</span>&gt;</section>
                            </li>
                            <li>
                                <section><img src="@/assets/nav.jpg" alt="">小吃</section>
                                <section><span>123</span>&gt;</section>
                            </li>
                        </ul>
                    </div>
                    <div class="sort_item_category_right">
                        <ul>
                            <li>
                                <span>饺子</span>
                                <span>10</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="sort_item_category_order" v-show="false">
                    <ul>
                        <li>
                            <img src="@/assets/nav.jpg" alt="">
                            <p>智能排序</p>
                        </li>
                        <li>
                            <img src="@/assets/nav.jpg" alt="">
                            <p>智能排序</p>
                        </li>
                    </ul>
                </div>
                <div class="sort_item_category_filter" >
                    <section>
                        <div class="filter_style">配送方式</div>
                        <div class="filter_style_detail">
                            <ul>
                                <li><i></i><span>蜂鸟配送</span></li>
                            </ul>
                        </div>
                    </section>
                    <section>
                        <div class="filter_style">商家属性(可以多选)</div>
                        <div class="filter_style_detail">
                            <ul>
                                <li><i></i><span>蜂鸟配送</span></li>
                                <li><i></i><span>蜂鸟配送</span></li>
                                <li><i></i><span>蜂鸟配送</span></li>
                                <li><i></i><span>蜂鸟配送</span></li>
                                <li><i></i><span>蜂鸟配送</span></li>
                                <li><i></i><span>蜂鸟配送</span></li>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <button class="clear_all">清空</button>
                        <button class="make_sure">确定</button>
                    </footer>
                </div>
            </section>    
        </div>
        <div class="shoplist">
            <v-shopList></v-shopList>
        </div>
        <div class="back_cover"></div>
    </div>
    
</template>

<script>
import Header from '@/common/header/header'
import ShopList from '@/common/shopList/shoplist'


export default {
    components: {
        'v-header': Header,
        'v-shopList': ShopList
    }    
}
</script>

<style lang="scss" scoped> 
@import '@/assets/style/mixin';
.food {
    width: 100%;
    height: 100%;
    .food_container {
        padding-top: 45px;
        position: fixed;
        z-index: 11;
        .sort_container {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            text-align: center;
            position: fixed;
            top: 45px;
            background-color: #fff;
            border-bottom: 1px solid #f1f1f1;
            .sort_item {
                flex: 1;
                border-right: 1px solid #f1f1f1;
                @include sc(14px, #444);
            }
        }
        .category_container {
            position: fixed;
            top: 95px;
            width: 100%;
            .sort_item_category_type {
                display: flex;
                .sort_item_category_left {
                    flex: 1;
                    background-color: #F1F1F1;
                    ul {
                        li {
                        @include fj;
                        padding: 10px;
                        @include sc(14px, #666);
                        &.active {
                            background-color: #fff;
                        }
                        section:nth-of-type(1){
                            img {
                                    width: 30px;
                                    height: 14px;
                                }
                        }
                        section:nth-of-type(2) {
                            span {
                                    border: 1px solid #ccc;
                                    border-radius: 14px;
                                    padding: 0 5px;
                                    background-color: #ccc;
                                    @include sc(14px, #fff); 
                                    margin-right: 10px;      
                            }
                                
                        }
                        }
                    }
                }
                .sort_item_category_right {
                    flex: 1;
                    background-color: #fff;
                    padding-left: 10px;
                    @include sc(14px,#333);
                    ul {
                        li {
                            @include fj;
                            border-bottom: 1px solid #ccc;
                            padding: 10px 0;
                        }
                    }
                }
            }
            .sort_item_category_order {
                ul {
                    background-color: #fff;
                    li {
                        height: 50px;
                        display: flex;
                        align-items: center;
                        @include sc(14px, #666);
                        img {
                            height: 20px;
                            width: 40px;
                            padding-right: 10px;
                        }
                        p {
                            flex: 1;
                            height: 50px;
                            border-bottom: 1px solid #ccc;
                            line-height: 50px;
                            &:last-of-type{
                                border-bottom: none;
                            }
                        }
                    }
                }
            }
            .sort_item_category_filter {
                background-color: #fff;
                @include sc(12px, #333);
                padding: 10px;
                section {
                    .filter_style{
                        height: 40px;
                        line-height: 40px;
                    }
                    .filter_style_detail {
                        line-height: 30px;
                        ul {
                            @include fj;
                            flex-wrap: wrap;
                            li {
                                height: 30px;
                                width: 30%;
                                border: 1px solid #eee;
                                margin: 5px;
                                border-radius: 3px;
                            }
                        }
                    }
                }
                footer {
                    @include fj;
                    padding: 5px 10px;
                    background-color: #F5F5F5;
                    button {
                        width: 48%;
                        height: 40px;
                        border-radius: 3px;
                        border: none;
                        font-size: 18px;
                        &:nth-of-type(1) {
                            background-color: #fff;
                            color: #333;
                        }
                        &:nth-of-type(2) {
                            background-color: #56D176;
                            color: #fff;
                        }
                    }
                }
            }
        }  
    } 
    .shoplist {
        padding-top: 50px;
        z-index: 9;
    }
    .back_cover {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.3);
    }
}
 
</style>