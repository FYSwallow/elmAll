<template>
    <div>
       <Header goBack = "true" headTitle="修改密码"></Header>
       <div class="change_detail">
           <section class="user_num">
               <input type="text" placeholder="账号">
           </section>
           <section class="old_password">
               <input type="password" placeholder="旧密码">
           </section>
           <section class="old_password">
               <input type="password" placeholder="旧密码">
           </section>
           <section class="new_password">
               <input type="password" placeholder="请输入新密码">
           </section>
           <section class="confrim_password">
               <input type="password" placeholder="请确认密码">
           </section>
           <section class="pattern_num">
               <input type="text" placeholder="验证码">
               <img src="" alt="">
               <p><span>看不清</span><span>换一张</span></p> 
           </section>
       </div>
      <button class="sure_change">确认修改</button>
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
        img {
           flex: 3;
        }
        p {
            flex: 2;
            text-align: center;
            span {
               display: inline-block;
               &:first-of-type {
                   color: #666;
               }
               &:last-of-type {
                   color: #3190E8;
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
    background-color: #4CD964;
    border: none;
    border-radius: 3px;
    font-size: 20px;
    color: #fff;
}
</style>