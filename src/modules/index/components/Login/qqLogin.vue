<template>
  <div class="main" >
    <div id="login_form" class="login_box">
      <form id="loginform">
        <div class="login_top">QQ扫码，安全登录
          <router-link  to="/SignUp">
            <a class="reg" href="/signUp">立即注册</a>
          </router-link>
        </div>
        <div id="erweima" v-on:click="jumpUserBand"></div>
        <div class="saoma">
          <span class="saoma1" ></span>
          <div class="a-right">
            <span>打开<span class="red">手机QQ</span></span>
            <span>扫一扫登录</span>
          </div>

        </div>
        <div class="log_bom">
          <span class="wxLogin D3" v-on:click="wxLogin"><span></span>微信登录</span>
          <span class="zhLogin" v-on:click="mmLogin">密码登录</span>
          <div class="clear"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
  .D3{
    cursor: pointer;
  }
  .zhLogin{
    cursor: pointer;
  }
  .login_box{
    width: 350px;
  }
  .login_top{
    margin: 30px 0;
  }
  .saoma1{
    width: 30px;
    height: 30px;
    display: inline-block;
    background: url("../../assets/login/image/saoma.png") no-repeat left top;
  }
  .saoma{
    display: inline-block;
    width: 100px;
    height: 30px;
    margin: 20px 0 0 100px;
    position: relative;
    vertical-align: top;
  }
  /*.a-right{*/
    /*font-size: 14px;*/
    /*position: absolute;*/
    /*right: -10px;*/
    /*bottom: -3px;*/
  /*}*/
  .a-right>span {
    display: block;
  }
  .zhLogin{
    margin-right: 22px;
    float: right;
  }
  #erweima{
    padding-right: 20px;
    margin: 0 auto;
    width: 150px;
    height: 150px;
    background: url("../../assets/login/image/2Dma.png") no-repeat left top;

  }
</style>

<script>
  export default {
    data:function () {
      return{

      }
    },
    methods:{
      //切换登录方式
      mmLogin:function(){
        this.$router.push({ path:'/login' });
      },
      wxLogin:function () {
        this.$router.push({ path:'/wxLogin' });
      },
      jumpUserBand(){
        this.$router.push({ path:'/userBand' });
      }

    },
    mounted(){

    },
    created(){
      let message = {info: '第三方登录'};
      this.$emit('changeText', message);
    }
  }
</script>
