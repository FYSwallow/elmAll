<template>
    <div class="loading">
        <div class="load_img" :style="{backgroundPositionY: -(positionY *100) + 'px'}"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            positionY: 0,
            timeid: null
        }
    },
    mounted() {
        this.timeid = setInterval(() => {
            this.positionY ++;
            if(this.positionY === 7){
                this.positionY = 0
            }
        }, 600)
    },
    // beforeDestroy(){
    //     clearInterval(this.timer);
    // }
}
</script>

<style lang="scss" scoped>
.loading {
    height: 100px;
    width: 100px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .load_img {
        width: 100%;
        height: 100%;
        background: url('../../assets/images/icon_loading.png') no-repeat;
        animation: load .6s infinite ease-in-out;
        position: relative;
    }
}
@keyframes load {
    0%   {transform: translateY(0px);}
    50%  {transform: translateY(-50px);}
    100% {transform: translateY(0px);}
}
</style>