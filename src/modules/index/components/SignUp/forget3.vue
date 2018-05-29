<template>
  <div style="border:1px solid #f2f2f2;width: 1200px;margin: 0 auto;background-color: #fff;margin-top: 30px">
  <div class="forget-main">
    <div class="top-ui">
      <div id="top-ui-1">填写账户名，验证身份<span></span><span>1</span></div>
      <div id="top-ui-2">设置新密码<span></span><span>2</span></div>
      <div id="top-ui-3">完成<span></span><span>3</span></div>
    </div>
    <!--<form action="" class="signUp">-->
    <div class="signUp">
      <span class="duigou"></span>
      <div class="right-a">
        <span class="red">新密码设置成功！</span>
        <span>新密码设置成功.<span class="left-20" v-on:click="mmLogin">返回登录</span></span>
      </div>
    </div>
    <!--</form>-->
  </div>
  </div>
</template>

<script>
  export default {
    data:function () {
      return{

      }
    },
    methods:{
      mmLogin:function () {
        this.$router.push({ path: '/login' });
      }

    },
    mounted(){

    },
    created(){
      let message = {info: '找回密码'};
      this.$emit('changeText', message);
    }
  }
</script>

<style scoped>
  .forget-main{
    width: 880px;
    height: 260px;
    margin: 0 auto;
  }
  .top-ui{
    margin: 50px 0;
    font-size: 0;
    padding-left: 104px;
  }
  .top-ui>div{
    position: relative;
    text-align: center;
    font-size: 12px;
    color: rgb(255,73,87);
    display: inline-block;
    height: 35px;
    width: 214px;
    border-bottom: 5px solid rgb(255,73,87);
  }
  .top-ui>div>span:first-child{

    position: absolute;
    bottom: -50%;
    right: 45%;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    font-size: 12px;
    color: #fff;
    background-color: rgb(255,73,87);
  }
  .top-ui>div>span:last-child{

    position: absolute;
    bottom: -65%;
    right: 45%;
    width: 24px;
    height: 24px;
    font-size: 12px;
    color: #fff;
  }
  #top-ui-1{
    color:  rgb(255,123,133);
    border-bottom-color:  rgb(255,123,133);
  }
  #top-ui-1 span:first-child{
    background-color: rgb(255,123,133) ;
  }
  #top-ui-2{
    color:  rgb(255,123,133);
    border-bottom-color:  rgb(255,123,133);
  }
  #top-ui-2 span:first-child{
    background-color: rgb(255,123,133) ;
  }
  .signUp{
    padding-left: 104px;
    margin: 110px auto 0;
  }
  .duigou{
    margin: 10px 25px;
    display: inline-block;
    width: 46px;
    height: 46px;
    background: url(../../assets/login/image/duigou.png) no-repeat left top;
  }
  .red{
    font-size: 16px;
    margin-bottom: 20px;
  }
  .right-a{
    width: 225px;
    display: inline-block;
    vertical-align: top;
  }
  .right-a>span:first-child{
    display: block;
  }
  .right-a>span:last-child{
    font-size: 14px;
    color:rgb(128,128,128);
  }
  .left-20{
    padding-left: 20px;
    cursor: pointer;
    color:#f00;
  }

</style>

