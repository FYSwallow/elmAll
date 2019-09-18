<template>
    <div>
        <v-header></v-header>
        <div class="city_container">
            <div class="city_form">
                <input type="search" class="city_input" placeholder="输入学校、商务楼、地址" required>  
                <input type="submit" value="提交" class="city_submit">
            </div>
        </div>
        <header class="history_title">搜索历史</header>
        <ul class="search_position">
            <li>
                <h4>123456</h4>
                <p>46512308456123856412156156521323231021231</p>
            </li>
            <li>
                <h4>123456</h4>
                <p>46512308456123856412156156521323231021231</p>
            </li>
        </ul>
        <footer class="clear_all_history">清除所有历史记录!</footer>
        <div class="search_none_place">抱歉!无搜索结果</div>
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