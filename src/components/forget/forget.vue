<template>
    <div>
        <v-header goBack="true" headTitle="修改密码"></v-header>
        <div class="change_detail">
            <section class="user_num">
                <input type="text" placeholder="账号" v-model="phoneNumber" />
            </section>
            <section class="old_password">
                <input type="password" placeholder="旧密码" v-model="old_password" />
            </section>
            <section class="new_password">
                <input type="password" placeholder="请输入新密码" v-model="new_password" />
            </section>
            <section class="confrim_password">
                <input type="password" placeholder="请确认密码" v-model="confirm_password" />
            </section>
            <section class="pattern_num">
                <input type="text" placeholder="验证码" v-model="codeNumber" />
                <div class="getcaptchaCode" v-if="show" @click="getcaptchaCode">
                    <p>获取验证码</p>
                </div>
                <div class="changecaptchaCode" v-else>
                    <img :src="captchaCodeImg" />
                    <p>
                        <span>看不清</span>
                        <span @click="changecaptchaCode">换一张</span>
                    </p>
                </div>
            </section>
        </div>
        <button class="sure_change" @click="confirmChange">确认修改</button>
        <v-alertTip :alertText="alertText" @closeTip="closeTip" v-show="showAlert"></v-alertTip>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getcaptchas } from "@/api/index";
import vHeader from "@/common/header/header";
import vAlertTip from "@/common/alertTip/alertTip";

export default {
    data() {
        return {
            show: true, //获取验证码
            showAlert: false, //展示提示框
            alertText: null, //提示文字
            phoneNumber: null, //账号
            old_password: null, //旧密码
            new_password: null, //新密码
            confirm_password: null, //确认密码
            codeNumber: null, //验证码数字
            captchaCodeImg: null //验证码图片
        };
    },
    components: {
        vHeader,
        vAlertTip
    },
    methods: {
        ...mapMutations(["RECORD_USERINFO"]),
        // 获取验证码
        async getCaptchaCode() {
            let res = await getcaptchas();
            this.captchaCodeImg = res.data.code;
        },
        async confirmChange() {
            if (!this.phoneNumber) {
                this.showAlert = true;
                this.alertText = "请输入手机号/邮箱/用户名";
                return;
            }

            if (!this.old_password) {
                this.showAlert = true;
                this.alertText = "请输入旧密码";
                return;
            }
            if (!this.new_password) {
                this.showAlert = true;
                this.alertText = "请输入新密码";
                return;
            }
            if (!this.confirm_password) {
                this.showAlert = true;
                this.alertText = "请确认密码";
                return;
            }
            if (this.confirm_password !== this.new_password) {
                this.showAlert = true;
                this.alertText = "两次密码不一致";
                return;
            }
            if (!this.codeNumber) {
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
            this.showAlert = true;
            this.alertText = "修改成功";

            setTimeout(() => {
                this.showAlert = false;
                this.alertText = null;

                this.$router.go(-1);
            }, 2000);
        },
        closeTip() {
            this.showAlert = false;
        },
        getcaptchaCode() {
            this.show = false;
            this.getCaptchaCode();
        },
        //获取新的验证码
        changecaptchaCode() {
            this.getCaptchaCode();
        }
    }
};
</script>

<style lang="scss" scoped>
.change_detail {
    padding-top: 65px;
    section {
        input {
            width: 100%;
            height: 50px;
            border-bottom: 1px solid #eee;
            padding: 0 10px;
            font-size: 18px;
        }
    }
    .pattern_num {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        input {
            flex: 5;
        }
        .getcaptchaCode {
            height: 50px;
            line-height: 50px;
            padding-right: 10px;
        }
        .changecaptchaCode {
            flex: 3;
            display: flex;
            justify-content: space-between;
            height: 50px;
            img {
                width: 60px;
            }
            p {
                width: 60px;
                text-align: center;
                margin-right: 10px;
                span {
                    display: inline-block;
                    line-height: 25px;
                    &:first-of-type {
                        color: #666;
                    }
                    &:last-of-type {
                        color: #3190e8;
                    }
                }
            }
        }
    }
}
.sure_change {
    margin-left: 3%;
    margin-top: 20px;
    width: 94%;
    height: 50px;
    background-color: #4cd964;
    border: none;
    border-radius: 3px;
    font-size: 20px;
    color: #fff;
}
</style>