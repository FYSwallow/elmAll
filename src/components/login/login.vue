<template>
    <div>
        <Header headTitle="密码登录" goBack="true"></Header>
        <section class="login_detail">
            <div class="login_form">
                <div class="input_container">
                    <input type="text" placeholder="账号" maxlength="11" v-model="phoneNumber" />
                </div>
                <div class="input_container">
                    <input v-if="!showPassword" type="password" placeholder="密码" v-model="passWord" />
                    <input v-else type="text" placeholder="密码" v-model="passWord" />
                    <div class="button_switch" :class="{'showPassword': showPassword}">
                        <span>abc...</span>
                        <div
                            class="circle_switch"
                            :class="{'choose_show': showPassword}"
                            @click="changePassWordType"
                        ></div>
                    </div>
                </div>
                <div class="input_container captcha_code_container">
                    <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber" />
                    <div class="img_change_img">
                        <img :src="captchaCodeImg" />
                        <div class="change_img" @click="getCaptchaCode">
                            <p>看不清</p>
                            <p>换一张</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <p class="login_tips">温馨提示: 为注册过的账号, 登录时将自动注册</p>
        <p class="login_tips">注册过的用户可凭账号密码登陆</p>
        <button class="login_button" @click="mobileLogin">登录</button>
        <router-link to="/forget" class="to_forget">重置密码?</router-link>
        <AlertTip :alertText="alertText" @closeTip="closeTip" v-if="showAlert"></AlertTip>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import Header from "@/common/header/header";
import AlertTip from "@/common/alertTip/alertTip";
import { getcaptchas} from "@/api/index";

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
            userInfo: null //获取到的用户信息
        };
    },
    mounted() {
        this.getCaptchaCode();
    },
    methods: {
        ...mapMutations(["RECORD_USERINFO"]),
        // 获取验证码
        async getCaptchaCode() {
            let res = await getcaptchas();
            this.captchaCodeImg = res.data.code;
        },
        //是否显示密码
        changePassWordType() {
            this.showPassword = !this.showPassword;
        },
        async mobileLogin() {
            if (!this.phoneNumber) {
                this.showAlert = true;
                this.alertText = "请输入手机号/邮箱/用户名";
                return;
            } else if (!this.passWord) {
                this.showAlert = true;
                this.alertText = "请输入密码";
                return;
            } else if (!this.codeNumber) {
                this.showAlert = true;
                this.alertText = "请输入验证码";
                return;
            }
            // 用户名登录
            // console.log(this.phoneNumber, this.passWord, this.codeNumber)
            // const res = await accountLogin(this.phoneNumber, this.passWord, this.codeNumber);
            // console.log(res)
            this.userInfo = {
                phoneNumber: this.phoneNumber
            };
            this.RECORD_USERINFO(this.userInfo);
            this.$router.push('/user');
        },
        closeTip() {
            this.showAlert = false;
        }
    },
    components: {
        Header,
        AlertTip
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin";
.login_detail {
    padding-top: 45px;
    .login_form {
        margin-top: 10px;
        background-color: #fff;
        .input_container {
            @include wh(100%, 50px);
            padding: 10px;
            border-bottom: 1px solid #eee;
            input {
                width: 80%;
                @include sc(20px, #666);
            }
            .button_switch {
                position: relative;
                display: inline-block;
                @include wh(12%, 16px);
                margin-left: 8%;
                padding: 0 5px;
                border-radius: 7px;
                text-align: center;
                @include sc(12px, #fff);
                background-color: #ddd;
                .circle_switch {
                    position: absolute;
                    top: -7px;
                    left: -15px;
                    @include wh(30px, 30px);
                    background-color: #eee;
                    border-radius: 15px;
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
            input {
                width: 70%;
            }
            .img_change_img {
                @include fj;
                img {
                    display: inline-block;
                    width: 60px;
                }
                .change_img {
                    width: 60px;
                    margin-left: 10px;
                    transform: translateY(-5px);
                    p:nth-of-type(2) {
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
    background-color: #4cd964;
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