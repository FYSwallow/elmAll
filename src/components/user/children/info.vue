<template>
    <div>
        <Header></Header>
        <div class="user_info">
            <div class="user_info_item">
                <input type="file">
                <h3 class="item_head">头像</h3>
                <div class="item_detail">
                    <p><img src="@/assets/images/avactor.jpg" alt=""><span>&gt;</span></p>    
                </div>
            </div>
            <div class="user_info_item">
                <h3 class="item_head">用户名</h3>
                <div class="item_detail">
                    <p>15226511191<span>&gt;</span></p>
                    
                </div>
            </div>
            <div class="user_info_item">
                <h3 class="item_head">收货地址</h3>
                <div class="item_detail">
                    <span>&gt;</span>
                </div>
            </div>
            <div class="user_info_head">
                账号绑定
            </div>
            <div class="user_info_item">
                <h3 class="item_head">手机</h3>
                <div class="item_detail">
                    <span>&gt;</span>
                </div>
            </div>
            <div class="user_info_head">
                账号绑定
            </div>
            <div class="user_info_item">
                <h3 class="item_head">登录密码</h3>
                <div class="item_detail">
                    <p>修改<span>&gt;</span></p>
                    
                </div>
            </div>
            <button class="exit">退出登录</button>
            <div class="back_over"></div>
            <div class="choose_exit">
                <img src="@/assets/images/avactor.jpg" alt="" class="exit_logo">
                <h3 class="exit_title">是否退出登录</h3>
                <div class="choose">
                    <button class="exit_wait">再等等</button>
                    <button class="exit_login">退出登录</button>
                </div>
            </div>
        </div>
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
.user_info {
    padding-top: 45px;
    .user_info_item {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        padding: 0 10px; 
        border-bottom : 1px solid #ccc;
        &:first-of-type{
            margin-top: 10px;
            height: 80px;
            position: relative;
            border-top : 1px solid #ccc;
            input {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
            img {
                width: 60px;
                height: 60px;
                vertical-align: middle ;
            }
        }
        .item_head {
            font-size: 16px;
            font-weight: normal;
        }
        .item_detail {
            font-size: 18px;
            color: #999;
            font-weight: 600;
            span {
                margin-left: 10px;
            }
            
        }
    }
    .user_info_head {
        border-bottom : 1px solid #ccc;
        height: 40px; 
        line-height: 40px;  
        padding-left: 10px;
    }
    .exit {
        width: 95%;
        height: 40px;
        margin: 30px 10px 0;
        background-color: #D8584A;
        color: #fff;
        font-size: 18px;
        border: none;
        border-radius: 5px;
    }
    .back_over {
       width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        // z-index: 10;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .choose_exit {
        width: 94%;
        background-color: #fff;
        padding: 17px;
        position: absolute;
        top: 20%;
        left: 3%;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .exit_logo {
            width: 100px;
            height: 100px;
            margin: 10px;
        }
        .exit_title {
            font-size: 30px;
            margin: 10px;
            font-weight: normal;
            color: #333;
        }
        .choose {
            width: 100%;
            text-align: center;
            button {
                width: 30%;
                height: 40px;
                margin: 10px;
                border: none;
                border-radius: 5px;
                font-size: 18px;
                color: #fff;
            }
            .exit_wait {
                background-color: #999;
            }
            .exit_login {
                background-color: #D8584A;
            }
        }
    }
}   
</style>