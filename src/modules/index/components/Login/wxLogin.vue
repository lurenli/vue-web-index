<template>
  <div class="main" >
    <div id="login_form" class="login_box">
      <form id="loginform">
        <div class="login_top">微信扫码，安全登录
          <router-link  to="/SignUp">
            <a class="reg" href="/signUp">立即注册</a>
          </router-link>
        </div>
        <div id="erweima">
          <img :src="wxUrl" alt="" width="150" height="150">
        </div>
        <div class="saoma">
          <span class="saoma1" ></span>
          <div class="a-right">
            <span>打开<span class="red">手机微信</span></span>
            <span>扫一扫登录</span>
          </div>

        </div>
        <div class="log_bom">
          <!--<span class="qqLogin D3" v-on:click="qqLogin"><span></span>QQ登录</span>-->
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
    margin-top: 2px;
    display: inline-block;
    background: url("../../assets/login/image/saoma.png") no-repeat left top;
  }
  .saoma{
    display: inline-block;
    width: 120px;
    height: 30px;
    margin: 20px 0 0 100px;
    position: relative;
    vertical-align: top;
  }
  .a-right{
    float: right;
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
  }
</style>

<script>
  export default {
    data:function () {
      return{
        wxUrl:this.$http.getUrl() +'/rest/common/erm?url=https://open.weixin.qq.com/connect/qrconnect?appid=wx3e4de0fae28317d3&redirect_uri=http://new.jinshang9.com&response_type=code&scope=snsapi_login&state=2018#wechat_redirect&size=150'
      }
    },
    methods:{
      //切换登录方式
      mmLogin:function(){
        this.$router.push({ path:'/login' });
      },
      qqLogin:function () {
        this.$router.push({ path:'/qqLogin' });
      },
      jumpUserBand:function () {
//        console.log(111);
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
