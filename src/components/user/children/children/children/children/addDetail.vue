<template>
    <div>
        <Header></Header>
        <div class="input_form">
            <input type="search" placeholder="请输入小区/写字楼/学校等" class="input_search">
            <input type="submit" value="确认" class="input_submit">
        </div>
        <section>
            <div class="advise">为了满足商家的送餐要求,建议您从列表中选择地址</div>
            <div class="question">
                <p>找不到地址?</p>
                <p>请尝试输入小区、写字楼或学校名</p>
                <p>详细地址(如门牌号)可稍后输入哦</p>
            </div>
        </section>
    </div>
</template>

<script>
import Header from '@/common/header/header';
export default {
    components: {
        Header
    }
    
}
</script>

<style lang="scss" scoped>
.input_form {
    padding: 65px 20px 20px;
    background-color: #fff;
    display: flex;
    input {
        height: 50px;
        border-radius: 3px;
    }
    .input_search {
        flex: 1;
        background-color: #eee;
        padding: 10px;
        margin-right: 20px;
        border: 1px solid #ccc;
        font-size: 16px;
    }
    .input_submit {
        width: 80px;
        background: #3190e8;
        font-size: 16px;
        color: #fff;
    }
}
section {
    .advise {
        text-align: center;
        height: 30px;
        line-height: 30px;
        background-color: #FFF6E4;
        color: #FF883F;
    }
    .question {
        text-align: center;
        margin-top: 100px;
        font-size: 20px;
        color: #999;
        p {
            margin-bottom: 10px;
        }
    }
}  
</style>