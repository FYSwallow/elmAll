<template>
    <div class="shop_search">
        <v-header goBack = 'true' headTitle = '搜索'></v-header>
        <div class="search_form">
            <input type="search" placeholder="请输入商家或美食名称" class="input_search" v-model="searchValue" @input="checkInput">
            <input type="submit" value="提交" class="input_submit" @click="searchTarget()">
        </div>
        <div class="history" v-show="searchHistory.length&&showHistory">
            <header class="history_title">搜索历史</header>
            <ul>
                <li v-for="(item, index) in searchHistory" :key="index" @click="searchTarget(item)">
                    <span>{{item}}</span>
                    <i @click="deleteHistory">x</i>
                </li>
            </ul>
            <div class="clear_history" @click="clearAllHistory">清空搜索历史</div>
        </div>
        <div class="searchList" v-if="restaurantList.length">
            <h4>商家</h4>
            <ul>
                <router-link :to="{path:'/shop', query:{id:item.id}}" v-for="item in restaurantList" :key="item.id" tag="li">
                    <img :src="imgBaseUrl + item.image_path">
                    <section class="shopContainer">
                        <span class="ellipsis logo">{{item.name}}</span>
                        <span class="seller_num">月售{{item.recent_order_num}}单</span>
                        <span class="price_distance">
                            <span class="send_price">{{item.float_minimum_order_amount}}元起送</span>&nbsp;/
                            <span class="distance">距离{{item.distance}}</span>
                        </span>
                    </section>
                 </router-link>
            </ul>
            
        </div>
        <div class="search_none" v-if="emptySearch">很抱歉!无搜索结果</div>
        <v-footer></v-footer>
    </div>
</template>

<script>
import Header from '@/common/header/header'
import Footer from '@/common/footer/footer'
import {searchRestaurant} from '@/api/index'
import {setStore, getStore} from '@/api/localStorage'
export default {
    data() {
        return {
            geohash: '', //地址信息
            searchValue: '', //搜索的内容
            restaurantList: [], // 搜索返回的结果
            imgBaseUrl: 'http://elm.cangdu.org/img/', 
            searchHistory: [], //搜索历史记录
            showHistory: true, //是否显示历史记录
            emptySearch: false //搜索结果为空
        }
    },
    created() {
        this.geohash = this.$route.params.geohash
        console.log(this.geohash)
        if(getStore('searchHistory')){
            this.searchHistory = JSON.parse(getStore('searchHistory'))
            console.log(this.searchHistory)
        }
    },
    methods: {
        // 点击搜索
        async searchTarget(historyValue) {
            if (historyValue) {
                this.searchValue = historyValue;
            }else if (!this.searchValue) {
                return 
            }
            this.showHistory = false
            const res = await searchRestaurant(this.geohash, this.searchValue)
            console.log(res.data)
            this.restaurantList = res.data
            this.emptySearch = !this.restaurantList.length
            // 判断本地存储中是否已经存在这一项,如果存在,则不操作,如果不存在,则添加
            let history = JSON.parse(getStore('searchHistory'))
            if(history){
                let flag = false
                history.forEach(item => {
                    if(item === this.searchValue) {
                        flag = true
                    }
                })
                if(!flag){
                    this.searchHistory.push(this.searchValue)
                }
            }else {
                this.searchHistory.push(this.searchValue)
            }
            setStore('searchHistory', this.searchHistory)
        },
        // 清除数据,显示历史记录
        checkInput() {
            if(this.searchValue === '') {
                this.showHistory = true; //显示历史记录
                this.restaurantList = []; //清空搜索结果
                this.emptyResult = false; //隐藏搜索为空提示 
            }
        },
        // 点击删除按钮,删除当前历史记录
        deleteHistory(index){
            this.searchHistory.splice(index, 1)
            setStore('searchHistory', this.searchHistory)
        },
        //清除所有历史记录
        clearAllHistory(){
            this.searchHistory = [];
            setStore('searchHistory',this.searchHistory);
        }
    },
    components: {
        'v-header': Header,
        'v-footer': Footer
    }  
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin';
.search_form {
    padding: 55px 10px 10px;
    background-color: #fff;
    display: flex;
    input {
        height: 40px;
        border-radius: 3px;
    }
    .input_search {
        background-color: #f1f1f1;
        flex: 1;
        font-weight: 600;
        padding-left: 5px;
        font-size: 18px;
    }
    .input_submit {
        width: 100px;
        background-color: $blue;
        margin-left: 3px;
    }
} 
.history {
    .history_title {
        height: 50px;
        line-height: 50px;
        padding-left: 10px;
    }
    ul{
        background-color: #fff;
        li {
           @include fj;
           padding: 0 10px;
           height: 50px;
           line-height: 50px;
           font-size: 18px;
           border-bottom: 1px solid #eee;
           i {
               font-style: normal;
               font-weight: 600;
               color: #999;
           } 
        }
    }
    .clear_history {
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        font-size: 18px;
        font-weight: 700;
        color: $blue;
        text-align: center;
    }
}
.searchList {
    h4 {
        height: 40px;
        font-size: 20px;
        padding-left: 10px;
        line-height: 40px;
        color: #666;
    }
    ul li {
        display: flex;
        justify-content: flex-start;
        padding: 10px;
        font-size: 14px;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }
        .shopContainer{
            display: flex;
            flex-direction: column;
            .logo::after{
                content: '支付';
                color: orange;
                border: 1px solid orange;
                font-size: 12px;
                margin-left: 5px;
                transform: scale(.8, .8);
            }
        }
    }
}
.search_none {
    margin-top: 2px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
}
</style>