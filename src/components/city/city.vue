<template>
    <div>
        <v-header goBack="true" :headTitle="cityName">
            <router-link to="/home" slot="changecity" tag="span">切换城市</router-link>
        </v-header>
        <div class="city_container">
            <div class="city_form">
                <input
                    type="search"
                    class="city_input"
                    placeholder="输入学校、商务楼、地址"
                    required
                    v-model="inputValue"
                />
                <input type="submit" value="提交" class="city_submit" @click="postSearchInfo" />
            </div>
        </div>
        <header class="history_title" v-if="historyTitle">搜索历史</header>
        <ul class="search_position">
            <li
                v-for="(item, index) in placeList"
                :key="index"
                class="ellipsis"
                @click="nextpage(index, item.geohash)"
            >
                <h4 class="ellipsis">{{item.name}}</h4>
                <p class="ellipsis">{{item.address}}</p>
            </li>
        </ul>
        <footer
            class="clear_all_history"
            v-if="historyTitle&&placeList.length"
            @click="clearAll"
        >清除所有历史记录!</footer>
        <div class="search_none_place" v-if="placeNone">抱歉!无搜索结果</div>
    </div>
</template>

<script>
import vHeader from "@/common/header/header";
import { currentcity, searchplace } from "@/api/index";
import { setStore, getStore, removeStore } from "@/api/localStorage";
export default {
    data() {
        return {
            inputValue: "", //搜索地址
            cityId: "", //当前城市id
            cityName: "", //当前城市名字
            placeList: [], //搜索城市列表
            placeHistory: [], // 历史搜索记录
            historyTitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
            placeNone: false //搜索无结果,显示提示信息
        };
    },
    mounted() {
        this.initData();
    },
    components: {
        vHeader
    },
    methods: {
        // 初始化数据
        async initData() {
            this.cityId = this.$route.params.cityid;
            const currentCityResult = await currentcity(this.cityId);
            this.cityName = currentCityResult.data.name;
            if (getStore("placeHistory")) {
                this.placeList = JSON.parse(getStore("placeHistory"));
            } else {
                this.placeList = [];
            }
        },
        async postSearchInfo() {
            // 去掉两端的空格
            const inputValue = this.inputValue.trim()
            if(!inputValue) return
            const searchPlaceResult = await searchplace(
                this.cityId,
                this.inputValue
            );

            this.placeList = searchPlaceResult.data;
            this.historyTitle = false;
            this.placeNone = searchPlaceResult.data.length ? false : true;
        },
        nextpage(index, geohash) {
            let history = getStore("placeHistory");
            let choosePlace = this.placeList[index];
            // 判断是否有历史记录, 有历史记录就需要查看曾接是否查看过,查看过就需要更新到数组的第一个元素
            if (history) {
                this.placeHistory = JSON.parse(history);
                const samegeohash = this.placeHistory.findIndex(item => {
                    return item.geohash === geohash;
                });
                if (samegeohash >= 0) {
                    this.placeHistory.splice(samegeohash, 1);
                    this.placeHistory.unshift(choosePlace);
                } else {
                     this.placeHistory.unshift(choosePlace);
                }
            } else {
                this.placeHistory.unshift(choosePlace);
            }
            setStore("placeHistory", this.placeHistory);
            this.$router.push({ path: "/msite", query: { geohash } });
        },

        clearAll() {
            removeStore("placeHistory");
            this.initData();
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin";
.city_container {
    padding-top: 50px;
    .city_form {
        margin-top: 10px;
        padding: 10px;
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        background-color: #fff;
        .city_input {
            @include wh(100%, 40px);
            padding-left: 5px;
            border-radius: 2px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            color: #000;
        }
        .city_submit {
            @include wh(100%, 40px);
            @include sc(18px, #fff);
            border-radius: 2px;
            border: none;
            background-color: $blue;
        }
    }
}
.history_title {
    padding: 2px 10px;
    font-size: 12px;
    font-weight: 200;
}
.search_position {
    background-color: #fff;
    li {
        padding: 10px;
        border-bottom: 1px solid #ccc;
        h4 {
            color: #333;
        }
        p {
            overflow: hidden;
            color: #999;
        }
    }
}
.clear_all_history {
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #666;
    background-color: #fff;
}
.search_none_place {
    height: 40px;
    padding-left: 10px;
    line-height: 40px;
    color: #000;
    background-color: #fff;
}
</style>