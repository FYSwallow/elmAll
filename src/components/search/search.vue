<template>
    <div class="shop_search">
        <v-header goBack = 'true' headTitle = '搜索'></v-header>
        <div class="search_form">
            <input type="search" placeholder="请输入商家或美食名称" class="input_search">
            <input type="submit" value="提交" class="input_submit">
        </div>
        <div class="history" v-show="false">
            <header class="history_title">搜索历史</header>
            <ul>
                <li><span>11</span><i>x</i></li>
            </ul>
            <div class="clear_history">清空搜索历史</div>
        </div>
        <div class="search_none">很抱歉!无搜索结果</div>
        <v-footer></v-footer>
    </div>
</template>

<script>
import Header from '@/common/header/header'
import Footer from '@/common/footer/footer'

export default {
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
.search_none {
    margin-top: 2px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
}
</style>