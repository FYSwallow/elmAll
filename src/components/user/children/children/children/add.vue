<template>
    <div>
        <Header></Header>
        <section>
            <div class="address_detail">
                <input type="text" class="input_style" placeholder="请填写你的姓名">
                <input type="text" class="input_style" placeholder="s">
                <input type="text" class="input_style" placeholder="请填写详细送餐地址">
                <input type="text" class="input_style" placeholder="请填写能够联系到你的手机号">
                <input type="text" class="input_style" placeholder="备用联系电话">
            </div>
        </section>
        <button>新增地址</button>
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
section {
    padding-top: 45px;
    .address_detail {
        margin-top: 10px;
        padding: 10px 15px;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        .input_style {
            height: 40px;
            margin-bottom: 10px;
            padding-left: 10px;
            background-color: #F2F2F2;
            border: 1px solid #ccc;
            border-radius: 3px;
        }
    }
    
} 
button {
    width: 94%;
    height: 40px;
    background-color:  #4CD964;
    border: none;
    border-radius: 3px;
    margin-top: 10px;
    margin-left: 3%;
    font-size: 16px;
    color: #eee;
} 
</style>

