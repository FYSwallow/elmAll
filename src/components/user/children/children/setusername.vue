<template>
    <div>
          <Header></Header>
          <div class="setName">
              <input type="text" placeholder="输入用户名">
              <p>用户名只能修改一次(5~~24字符之间)</p>
              <button>确认修改</button>
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
.setName {
    padding-top: 45px;
    input {
        height: 50px;
        width: 95%;
        margin: 10px;
        background-color: #eee;
        border: 1px solid #ccc;
        padding-left: 10px;
        font-size: 18px;   
    }
    p {
        padding-left: 10px;
        color: #666;
    }
    button {
        width: 94%;
        height: 40px;
        margin-left: 3%;
        margin-top: 10px; 
        background-color: #3190e8;
        border: none;
        color: #eee;
        font-size: 16px;
    }
}
</style>