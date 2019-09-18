<template>
    <div class="home">
        <v-header></v-header>
        <div class="currentCity">
            <div class="currentCity_choose">
                <span>当前定位城市:</span>
                <span>定位不准时,请在城市列表中选择</span>
            </div>
            <div class="guess_city">
                <a href="">成都</a>
                <i class="fa fa-angle-right"></i>
            </div>
        </div>
        <div class="hot_city">
            <h3 class="hot_city_title">热门城市</h3>
            <ul class="hot_city_list clear">
                <li>1234561114545645452</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
            </ul>
        </div>
        <div class="letter_city">
            <ul class="letter_city_category">
                <li class="letter_city_category_list">
                    <h3 class="letter_city_category_list_title">A<span>(按字母排序)</span></h3>
                    <ul class="letter_city_category_list_item clear">
                        <li>1234561114545645452</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                    </ul>  
                </li>
                <li class="letter_city_category_list">
                    <h3 class="letter_city_category_list_title">热门城市</h3>
                    <ul class="letter_city_category_list_item clear">
                        <li>1234561114545645452</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                    </ul>  
                </li>
                <li class="letter_city_category_list">
                    <h3 class="letter_city_category_list_title">热门城市</h3>
                    <ul class="letter_city_category_list_item clear">
                        <li>1234561114545645452</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                    </ul>  
                </li>
                <li class="letter_city_category_list">
                    <h3 class="letter_city_category_list_title">热门城市</h3>
                    <ul class="letter_city_category_list_item clear">
                        <li>1234561114545645452</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                        <li>123</li>
                    </ul>  
                </li>
            </ul>
            
        </div>
    </div>
</template>

<script>
import Header from '@/common/header/header'
export default {
    components: {
        'v-header': Header
    }
}
</script>

<style lang="scss">
@import '@/assets/style/mixin';
.home {
    .currentCity{
        padding-top: 65px;
        background-color: #fff;
        margin-bottom: 10px;
        .currentCity_choose {
            padding: 0 10px 10px;
            border-bottom:1px solid #ccc;
            @include fj;
            line-height: 20px;
            span:nth-of-type(1){
                @include sc(14px, #666);
            }
            span:nth-of-type(2){
                font-weight: 900;
                @include sc(14px, #9f9f9f);
            }
        }
        .guess_city {
            @include fj;
            height: 40px;
            border-bottom:1px solid #ccc;
            padding: 10px 10px;
            line-height: 20px;
            a {
               @include sc(20px, $blue);
            }
            i.fa-angle-right:before {
                @include sc(20px, #666);
                vertical-align: middle;
            }
        }
    }
    .hot_city {
        background-color: #fff;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
        .hot_city_title {
            color: #666;
            font-weight: normal;
            padding: 10px;
            border-bottom: 1px solid #ccc;
            font-size: 16px;
        }
        .hot_city_list {
            li {
                @include wh(25%, 28px);
                @include font(14px, 28px);
                float: left;
                text-align: center;
                color: $blue;
                border-right: 1px solid $bc;
                border-bottom: 1px solid $bc;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:nth-of-type(4n) {
                    border-right: none;
                }
            }
        }
    }
    .letter_city {
        .letter_city_category {
            .letter_city_category_list {
                background-color: #fff;
                margin-bottom: 10px;
                .letter_city_category_list_title {
                    color: #666;
                    font-weight: normal;
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                    font-size: 16px;
                    span {
                        margin-left: 10px;
                        font-size: 14px;
                        color: #ccc
                    }
                }
                ul {
                    li {
                        @include wh(25%, 28px);
                        @include font(14px, 28px);
                        float: left;
                        text-align: center;
                        color: #666;;
                        border-right: 1px solid $bc;
                        border-bottom: 1px solid $bc;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        &:nth-of-type(4n) {
                            border-right: none;
                        }
                    }
                }
            }
        }
    }
}
</style>