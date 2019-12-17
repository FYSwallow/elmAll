<template>
    <div class="home">
        <v-header signinUp="home">
            <span slot="logo" @click="reload">elm</span>
        </v-header>
        <div class="currentCity">
            <div class="currentCity_choose">
                <span>当前定位城市:</span>
                <span>定位不准时,请在城市列表中选择</span>
            </div>
            <router-link class="guess_city" :to="'/city/' +  guessCityid">
                <a href>{{guessCity}}</a>
                <i class="fa fa-angle-right"></i>
            </router-link>
        </div>
        <div class="hot_city">
            <h3 class="hot_city_title">热门城市</h3>
            <ul class="hot_city_list clear">
                <router-link
                    v-for="(item, index) in hotCity"
                    :key="index"
                    :to="'/city/'+ item.id"
                    tag="li"
                    class="ellipsis"
                >{{item.name}}</router-link>
            </ul>
        </div>
        <div class="letter_city">
            <ul class="letter_city_category">
                <li
                    class="letter_city_category_list"
                    v-for="(value, key, index) in sortgroupCity"
                    :key="index"
                >
                    <h3 class="letter_city_category_list_title">
                        {{key}}
                        <span v-if="index === 0">(按字母排序)</span>
                    </h3>
                    <ul class="letter_city_category_list_item clear">
                        <router-link
                            tag="li"
                            :to="'/city/' + item.id"
                            v-for="(item, i) in value"
                            :key="i"
                            class="ellipsis"
                        >{{item.name}}</router-link>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import vHeader from "@/common/header/header";
import { cityGuess, hotcity, groupcity } from "@/api/index.js";
export default {
    data() {
        return {
            guessCity: "", //当前城市
            guessCityid: "", //当前城市id
            hotCity: [], //热门城市列表
            groupCity: [] //所有城市列表
        };
    },
    components: {
        vHeader
    },
    mounted() {
        this.initData();
    },
    computed: {
        sortgroupCity() {
            let sortObj = {};
            for (let i = 65; i <= 90; i++) {
                // fromCharCode该方法是 String 的静态方法，字符串中的每个字符都由单独的 Unicode 数字编码指定
                if (this.groupCity[String.fromCharCode(i)]) {
                    sortObj[String.fromCharCode(i)] = this.groupCity[
                        String.fromCharCode(i)
                    ];
                }
            }
            return sortObj;
        }
    },
    methods: {
        // 页面初始化数据
        async initData() {
            //获取当前城市所在地
            const cityGuessResult = await cityGuess();
            this.guessCity = cityGuessResult.data.name;
            this.guessCityid = cityGuessResult.data.id;

            //获取热门城市
            const hotcityResult = await hotcity();
            this.hotCity = hotcityResult.data;

            //获取所有城市
            const groupCityResult = await groupcity();
            this.groupCity = groupCityResult.data;
        },
        reload() {
            window.location.reload();
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/style/mixin";
.home {
    .currentCity {
        padding-top: 50px;
        margin-bottom: 10px;
        background-color: #fff;
        .currentCity_choose {
            @include fj;
            height: 40px;
            padding: 0 10px;
            border-bottom: 1px solid #ccc;
            line-height: 40px;
            span:nth-of-type(1) {
                @include sc(14px, #666);
            }
            span:nth-of-type(2) {
                font-weight: 700;
                @include sc(14px, #9f9f9f);
            }
        }
        .guess_city {
            @include fj;
            height: 40px;
            border-bottom: 1px solid #ccc;
            padding: 0 10px;
            line-height: 40px;
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
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
        background-color: #fff;
        .hot_city_title {
            padding: 10px;
            border-bottom: 1px solid #ccc;
            color: #666;
        }
        .hot_city_list {
            li {
                @include wh(25%, 40px);
                @include font(14px, 40px);
                float: left;
                text-align: center;
                color: $blue;
                border-right: 1px solid $bc;
                border-bottom: 1px solid $bc;
                &:nth-of-type(4n) {
                    border-right: none;
                }
            }
        }
    }
    .letter_city {
        .letter_city_category {
            .letter_city_category_list {
                margin-bottom: 10px;
                background-color: #fff;
                &:last-child {
                    margin-bottom: 0;
                }
                .letter_city_category_list_title {
                    color: #666;
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                    font-size: 16px;
                    span {
                        margin-left: 10px;
                        font-size: 14px;
                        color: #ccc;
                    }
                }
                ul {
                    li {
                        @include wh(25%, 40px);
                        @include font(14px, 40px);
                        float: left;
                        text-align: center;
                        color: #666;
                        border-right: 1px solid $bc;
                        border-bottom: 1px solid $bc;
                        padding: 0 10px;
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