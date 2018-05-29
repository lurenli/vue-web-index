<template>
  <div class="sign_success">
    <div class="content_success">
      <div style="height: 100px"></div>
      <div class="content_info">
        <div class="text_info">
          <div style="height: 100px"></div>
          <div class="into_top">
            <img src="../../assets/icon/success_duigou.png" class="size_img"/>
            <div class="main_info">恭喜您已注册成功！</div>
          </div>
          <div class="time_info_warp"><span class="time_info">{{timeInfo}}s</span>&nbsp;后自动进入商城首页</div>
          <div class="btn_warp"><button class="btn_style" @click="jumpHome">立即进入商城首页</button></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        timeInfo:5
      }
    },

    methods:{
      jumpHome:function(){
        this.$router.push({name:'Index'})
      },

      Time2(){
        let vue = this;
        let interval = window.setInterval(function() {
          vue.timeInfo --;
          if(vue.timeInfo===0){
            if(vue && !vue._isDestroyed){
              window.clearInterval(interval);
              vue.$router.push({name:'Index'})
            }
            window.clearInterval(interval);
            return;
          }
        }, 1000);
      }

    },
    mounted(){
      this.Time2();
    },

    created(){
      let message = {info: '欢迎注册'};
      this.$emit('changeText', message);
    }
  }
</script>

<style scoped>
  .sign_success{

  }
  .content_success{
    width: 1200px;
    min-height: 600px;
    margin: 0 auto;
  }
  .content_info{
    width: 100%;
    height: 400px;
    border: 1px solid #e3e3e3;
  }
  .into_top{
    text-align: center;
    padding-top: 15px;
  }
  .size_img{
    width: 50px;
    height: 50px;
  }
  .text_info{
    margin: 0 auto;
    width: 400px;
    height: 200px;
  }
  .main_info{
    display: inline-block;
    font-size: 32px;
    color:#e8000e;
  }
  .time_info_warp{
    font-size: 14px;
    margin: 10px 0 40px 80px;
  }
  .time_info{
    color: #117EE1;
  }
  .btn_warp{
    text-align: center;
  }
  .btn_style{
    width: 320px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #fff;
    background-color: #e8000e;
    border: 0;
    outline: none;
  }
</style>
