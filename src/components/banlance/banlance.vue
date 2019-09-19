<template>
    <div>
        <Header></Header>
        <section class="content_container">
            <div class="content">
                <header>
                    <p>当前余额</p>
                    <span><img src="" alt=""><a href="">余额说明</a></span>
                </header>
                <div class="money">0.00<span>元</span></div>
                <button>提现</button>
            </div>
        </section>
        <p class="deal_detail">交易明细</p>
        <section class="no_log">
            <img src="" alt="">
            <span>暂无明细记录</span>
        </section>
    </div>
</template>

<script>
import Header from '@/common/header/header'

export default {
    components: {
        Header
    }    
}
</script>
<style lang="scss" scoped>
.content_container {
    padding-top: 45px;
    padding-bottom: 1px;
    background-color: #3190E8;
    .content {
        margin: 10px;
        background-color: #fff;
        padding: 10px;
        header {
            display: flex;
            justify-content: space-between;
            a {
                color: #3190E8;
            }
        }
        .money {
            font-size: 40px;
            span {
                font-size: 14px;
                font-weight: normal;
            }
        }
        button {
            height: 60px;
            width: 100%;
            margin-top: 20px;
            background-color: #aaa;
            border: none;
            border-radius: 3px;
            font-size: 25px;
            color: #fff;
        }
    }
    
} 
.deal_detail {
    padding-left: 10px;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    color: #999;
} 
.no_log {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    font-size: 18px;
    color: #666;
}
</style>