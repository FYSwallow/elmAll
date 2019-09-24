<template>
    <div class="alert_container">
        <section class="tip_text_container">
            <div class="tip_icon">
                <span></span>
                <span></span>
            </div>
            <p class="tip_text">{{alertText}}</p>
            <button class="confrim" @click="closeTip">确认</button>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: ['alertText'],
    methods: {
        closeTip() {
            this.$emit('closeTip')
        }
    },
}
</script>

<style lang="scss" scoped>
    
    .alert_container {
        width: 70%;
        position: fixed;
        top: 100px;
        left: 15%;
        background-color: #ddd;
        font-size: 18px;
        animation: tipMove .4s;
        .tip_text_container {
            text-align: center;
            .tip_icon {
                height: 80px;
                width: 80px;
                border: 3px solid #f8cb86;
                border-radius: 40px;
                margin: auto;
                margin-top: 20px;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                span {
                    display: inline-block;
                    background-color: #f8cb86;
                }
                span:nth-of-type(1){
                    width: 3px;
                    height: 40px;
                }
                span:nth-of-type(2){
                    width: 3px;
                    height: 3px;
                    margin-top: 5px;
                }
            }
            .tip_text {
                padding: 20px;
            }
            .confrim {
                width: 100%;
                height: 40px;
                line-height: 40px;
                background-color: #4cd964;
                color: #fff;
                font-size: 20px;
                border: none;
            }
        }
    }
    @keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }  
</style>