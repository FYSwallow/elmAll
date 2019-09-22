<template>
    <div class="user">
        <Header headTitle = '我的' goBack = 'true'></Header>
        <div class="user_detail">
            <img src="@/assets/images/avactor.jpg" alt="">
            <section class="user_info">
                <div class="user_login">
                    <span>登录</span>&nbsp;/
                    <span>注册</span>
                </div>
                <div class="user_tel"><i></i><span>暂无绑定手机号</span></div>
            </section>
            <span class="user_link fa fa-angle-right"></span>
        </div>
        <div class="user_data">
            <ul>
                <li><span class="num"><i class="num_banlance">0.00</i>元</span><span class="description">我的余额</span></li>
                <li><span class="num"><i class="num_offer">0</i>个</span><span class="description">我的优惠</span></li>
                <li><span class="num"><i class="num_score">0</i>分</span><span class="description">我的积分</span></li>
            </ul>
        </div>
        <section class="user_profile">
            <ul>
                <li><span><img src="@/assets/images/avactor.jpg" alt="">我的订单</span><span class="fa fa-angle-right"></span></li>
                <li><span><img src="@/assets/images/avactor.jpg" alt="">积分商城</span><span class="fa fa-angle-right"></span></li>
                <li><span><img src="@/assets/images/avactor.jpg" alt="">饿了吗会员卡</span><span class="fa fa-angle-right"></span></li>
            </ul>
        </section>
        <section class="user_profile">
            <ul>
                <li><span><img src="@/assets/images/avactor.jpg" alt="">服务中心</span><span class="fa fa-angle-right"></span></li>
                <li><span><img src="@/assets/images/avactor.jpg" alt="">下载饿了么APP</span><span class="fa fa-angle-right"></span></li>
            </ul>
        </section>
        <Footer></Footer>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from '@/common/header/header'
import Footer from '@/common/footer/footer'
export default {
    components: {
        Header,
        Footer
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin';
.user_detail {
    display: flex;
    background-color: $blue;
    padding: 45px 20px 20px;
    img {
        width: 80px;
        height: 80px;
        border-radius: 40px;
    }
    .user_info {
        flex: 1;
        color: #fff;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .user_login {
            font-size: 20px;
            font-weight: 600;
        }   
    }
    .user_link {
        line-height: 80px;
        font-size: 18px;
        font-weight: 600;
        color: #eee;
    }
}
.user_data {
    background-color: #fff;
    ul {
        display: flex;
        height: 100%;
        li {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            border-right: 1px solid #eee;
            padding-bottom: 20px;
            .num {
                font-size: 14px;
                line-height: 60px;
                i {
                    font-style: normal;
                    font-size: 30px;
                    color: #FF9900;
                    font-weight: 700;
                    &.num_offer {
                        color: #FF5F3E;
                    }
                    &.num_score{
                        color: #6AC20B;
                    }
                }
                
            }
            .description {
                font-size: 14px;
                color: #666;
            }
        }
    }
        
} 
.user_profile {
    margin-top: 10px;
    background-color: #fff;
    ul {
        li {
            padding: 10px;
            border-bottom: 1px solid #eee;
            @include fj;
            span:nth-of-type(1) {
                font-size: 18px;
                img {
                    width: 20px;
                    vertical-align: top;
                    margin-right: 5px;
                }
            }
            span:nth-of-type(2) {
                color: #999;
                font-size: 20px;
            }
        }
    }
} 
</style>