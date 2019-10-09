<template>
    <div class="tabbar">
        <ul>
            <router-link  tag="li" :to="{path: '/msite', query: {geohash}}"><i class="fa fa-home"></i><span>外卖</span></router-link>
            <router-link  tag="li" :to="'/search/' + geohash" ><i class="fa fa-search"></i><span>搜索</span></router-link>
            <router-link  tag="li" to="/confrimOrder"><i class="fa fa-shopping-cart"></i><span>订单</span></router-link>
            <router-link  tag="li" to="/user"><i class="fa fa-user"></i><span>我的</span></router-link>
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState(['geohash'])
    },
}
</script>

<style lang="scss" scoped>
.tabbar {
    width: 100%;
    position: fixed;
    bottom: 0;
    ul {
        width: 100%;
        height: 50px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        display: flex;
        background-color: #fff;
        padding: 2px;
        li {
            flex: 1;
            padding-top: 5px;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: #666;
            &.active {
                color: #3190e8;
            }
            i{
                font-size: 20px;
                display: block;
                margin: auto;
            }
            span {
                font-size: 14px;  
            }
        }
    }
}
</style>