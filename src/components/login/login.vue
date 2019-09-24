<template>
    <div>
        <Header headTitle = '密码登录' goBack = 'true'></Header>
        <section class="login_detail">
            <div class="login_form">
                <div class="input_container">
                    <input type="text" placeholder="账号" maxlength="11" v-model="phoneNumber">
                </div>
                <div class="input_container">
                    <input v-if="!showPassword" type="password" placeholder="密码" v-model="passWord">
                    <input v-else type="text" placeholder="密码" v-model="passWord">
                    <div class="button_switch" :class="{'showPassword': showPassword}">
                        <span>abc...</span>
                        <div class="circle_switch " :class="{'choose_show': showPassword}" @click="changePassWordType"></div>
                    </div>
                </div>
                <div class="input_container captcha_code_container">
                    <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
                    <div class="img_change_img">
                        <img :src="captchaCodeImg">
                        <div class="change_img" @click="getCaptchaCode">
                            <p>看不清</p>
                            <p>换一张</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <p class="login_tips">
            温馨提示: 为注册过的账号, 登录时将自动注册
        </p>
        <p class="login_tips">
            注册过的用户可凭账号密码登陆
        </p>
        <button class="login_button" @click="mobileLogin">登录</button>
        <router-link to="/forget" class='to_forget'>重置密码?</router-link>
        <AlertTip :alertText="alertText" @closeTip="closeTip" v-if="showAlert"></AlertTip>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Header from '@/common/header/header'
import AlertTip from '@/common/alertTip/alertTip'
import {getcaptchas, accountLogin} from '@/api/index'
export default {
    data() {
        return {
            phoneNumber: null, //账号
            passWord: null, //密码
            showPassword: false, //是否显示密码
            codeNumber: null, //验证码
            captchaCodeImg: null, //验证码地址
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            userInfo: null, //获取到的用户信息
        }
    },
    created() {
        this.getCaptchaCode()
    },
    computed: {
        // rightPhoneNumber: function() {
        //     return /^1\d{10}$/gi.test(this.phoneNumber)
        // }
    },
    methods: {
        ...mapMutations([
            'RECORD_USERINFO',
        ]),
        // 获取验证码
        async getCaptchaCode(){
            let res = await getcaptchas()
            console.log(res)
            this.captchaCodeImg = res.data.code
        },
        //是否显示密码
        changePassWordType(){
            this.showPassword = !this.showPassword;
        },
        mobileLogin(){
           if (!this.phoneNumber) {
                this.showAlert = true;
                this.alertText = '请输入手机号/邮箱/用户名';
                return
            }else if(!this.passWord){
                this.showAlert = true;
                this.alertText = '请输入密码';
                return
            }else if(!this.codeNumber){
                this.showAlert = true;
                this.alertText = '请输入验证码';
                return
            }
            //用户名登录
            // console.log(this.phoneNumber, this.passWord, this.codeNumber)
            // const res = await accountLogin(this.phoneNumber, this.passWord, this.codeNumber);
            // console.log(res)
            this.userInfo = {
                phoneNumber: this.phoneNumber,
                passWord: this.passWord,
                codeNumber: this.codeNumber
            }
            console.log(this.userInfo)
            this.RECORD_USERINFO(this.userInfo)
            this.$router.go(-1)
        },
        closeTip(){
            this.showAlert = false
        }
    },
    components: {
        Header,
        AlertTip
    }
}
</script>

<style lang="scss" scoped>
.login_detail {
    padding-top: 45px;
    .login_form {
        margin-top: 10px;
        background-color: #fff;
        .input_container{
            width: 100%;
            height: 50px;
            padding: 10px;
            border-bottom: 1px solid #eee;
            input {
                width: 80%;
                font-size: 20px;
                color: #666;
            }
            .button_switch {
                height: 16px;
                width: 12%;
                margin-left: 8%;
                text-align: center;
                background-color: #ddd;  
                font-size: 12px;
                display: inline-block;
                border-radius: 7px; 
                color: #fff;
                padding: 0 5px;
                position: relative;
                .circle_switch{
                    width: 30px;
                    height: 30px;
                    background-color: #eee;
                    border-radius: 15px;
                    position: absolute;
                    left: -5px;
                    top: -5px;
                    transition: all 0.2s linear;
                }
            }
            .showPassword {
                background-color: #4cd964;
                .choose_show {
                    transform: translateX(30px);
                }
            }
        }
        .captcha_code_container {
            display: flex;
            justify-content: space-between;
            height: 60px;
            .img_change_img {
                display: flex;
                justify-content: space-between;
                img {
                    width: 100px;
                }
                .change_img {
                    width: 50px;
                    margin-left: 10px;
                    p:nth-of-type(2){
                        color: #3190e8; 
                    }
                }
            }
            
        }
    }
}
.login_tips {
    color: red;
    padding: 10px;
    font-size: 14px;
} 
.login_button {
    width: 90%;
    height: 50px;
    margin: 0 5% 20px;
    background-color: #4CD964;
    font-size: 25px;
    color: #fff;
    border: none;
    border-radius: 5px;
}
.to_forget {
    float: right;
    color: #3b95e9;
    margin-right: 20px;
}
</style>