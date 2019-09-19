<template>
    <div>
        <v-header  goBack = "true" :headTitle="cityName">
            <router-link to="/home" slot="changecity" tag="span">切换城市</router-link>
        </v-header>
        <div class="city_container">
            <div class="city_form">
                <input type="search" class="city_input" placeholder="输入学校、商务楼、地址" required v-model="inputValue">  
                <input type="submit" value="提交" class="city_submit" @click="postSearchInfo">
            </div>
        </div>
        <header class="history_title" v-if="historyTitle">搜索历史</header>
        <ul class="search_position">
            <li v-for="(item, index) in placeList" :key="index" class="ellipsis" @click="nextpage(index, item.geohash)">
                <h4>{{item.name}}</h4>
                <p>{{item.address}}</p>
            </li>
        </ul>
        <footer class="clear_all_history" v-if="historyTitle&&placeList.length" @click="clearAll">清除所有历史记录!</footer>
        <div class="search_none_place" v-if="placeNone">抱歉!无搜索结果</div>
    </div>
</template>

<script>
import Header from '@/common/header/header'
import {currentcity, searchplace} from '@/api/index'
import {setStore, getStore, removeStore} from '@/api/localStorage'
export default {
    data() {
        return {
            inputValue: '', //搜索地址
            cityId: '', //当前城市id
            cityName: '', //当前城市名字
            placeList: [], //搜索城市列表
            placeHistory: [], // 历史搜索记录
            historyTitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
            placeNone: false //搜索无结果,显示提示信息
        }
    },
    created() {
        this.cityId = this.$route.params.cityid
        currentcity(this.cityId).then(res => {
            console.log(res.data)
            this.cityName = res.data.name
        })
        this.initData()
    },
    components: {
        'v-header': Header
    },
    methods: {
        initData() {
            if(getStore('placeHistory')) {
                this.placeList = JSON.parse(getStore('placeHistory'))
            }else {
                this.placeList = []
            }
        },
        postSearchInfo() {
            if(this.inputValue){
                searchplace(this.cityId, this.inputValue).then(res => {
                    this.placeList = res.data
                    this.historyTitle = false
                    this.placeNone = res.data.length ? false : true 
                    console.log(res)
                })
            }
            
        },
        nextpage(index, geohash){
            let history = getStore('placeHistory');
            let choosePlace = this.placeList[index];
            if (history) {
                let flag = true;
                this.placeHistory = JSON.parse(history);
                console.log(history)
                console.log(this.placeHistory )
                this.placeHistory.forEach(item => {
                    if (item.geohash == geohash) {
                        flag = false;
                    }
                })
                if (flag) {
                    this.placeHistory.push(choosePlace)
                }
            }else {
                this.placeHistory.push(choosePlace)
            }
            setStore('placeHistory', this.placeHistory)
            this.$router.push({path:'/msite', query: {geohash}})
        },
        
        clearAll() {
            removeStore('placeHistory')
            this.initData()
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin';
   .city_container {
       padding-top: 45px;
        .city_form {
            background-color: #fff;
            margin-top: 10px;
            padding: 10px;
            border-top: 1px solid $bc;
            border-bottom: 1px solid $bc;
            .city_input {
                padding-left: 5px;
                border-radius: 2px;
                margin-bottom: 10px;
                @include wh(100%, 40px);
                border: 1px solid #ccc;
                color: #000;
            }
            .city_submit {
                background-color: $blue;
                border-radius: 2px;
                @include wh(100%, 40px);
                @include sc(18px, #fff);
                border: none;
            }
        }
   } 
   .history_title {
        font-size: 12px;
        padding: 2px 10px;
        font-weight: 200;
    }
    .search_position {
        background-color: #fff;
        li {
            padding: 10px;
            border-bottom: 1px solid #ccc;
            h4 {
                font-weight: normal;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #333;
            }
            p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
                color: #999;
            }
        }
    }
    .clear_all_history {
        height: 40px;
        background-color: #fff;
        text-align: center;
        line-height: 40px;
        color: #666; 
    }
    .search_none_place {
        padding-left: 10px;
        height: 40px;
        background-color: #fff;
        line-height: 40px;
        color: #000; 
    }
</style>