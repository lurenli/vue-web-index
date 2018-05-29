<template>
  <div class="main" >
    <div id="login_form" class="login_box">
      <div  v-model="loginInfo">
        <div class="login_top" v-show="!errorinfo">账号绑定
        </div>
        <div class="login_top errorInfo" v-show="errorinfo"><span class="error-a"></span>您输入的账号或密码有误</div>
        <div>
          <div class="number forerror">
            <label id="username"></label>
            <input  v-model="loginInfo.username"  class="focus" type="text" placeholder="请输入您的用户名" autocomplete="off" maxlength="12" minlength="6">
          </div>
          <div id="pwd_intensity">
                <span class="label">
                    <span class="ph_display"></span>
                </span>
          </div>
        </div>
        <div>
          <div class="password forerror">
            <label id="password"></label>
            <input  v-model="loginInfo.password" class="focus" type="password" placeholder="请输入您的密码" autocomplete="off" maxlength="20" minlength="6">
          </div>
        </div>
        <div>
          <div class=" password forerror" id="yanzhengsize">
            <label id="yanzheng"></label>
            <input  v-model="loginInfo.yanzheng" class="focus" id="yanzhengfcus" type="text" placeholder="请输入验证码" autocomplete="off" maxlength="20" minlength="6">
          </div>
          <div class="float-right">
            <img class="get-check" :src="srcImageCode" @click="changeImage">
            <span v-on:click="changeImage" style="cursor: pointer">刷新</span>
          </div>

        </div>

        <div class="auto_log">
          <!--<input type="checkbox" id="remember_me" value="1">记住用户名-->
          <div class="forget">
            <router-link  to="/SignUp">
              <a class="reg" href="/signUp">立即注册</a>
            </router-link>
            <router-link  to="/Forget1">
              <a href="/Forget1">忘记密码</a>
            </router-link>
          </div>
        </div>
        <button  class="loginButton" v-on:click="loginFun">立即绑定</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .error-a{
    margin-left: 15px;
    margin-top: 2px;
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 10px;
    vertical-align: text-bottom;
    background: url(../../assets/login/image/error-a.png);
  }
  .errorInfo{
    width: 300px;
    background-color: #fef2f2;
    line-height: 40px;

    font-size: 14px;
  }

  .number {
    width: 303px;
    height: 38px;
    border: 1px solid #C2BEB7;
    position: relative;
  }

  .number label {
    width: 40px;
    height: 36px;
    display: inline-block;
    background: #DFDDD8 url(../../assets/icon/username.png) 12px 11px no-repeat;
    position: absolute;
    left: 0;
    top: 0;
  }

  .number_text, .password_text {
    position: absolute;
    left: 60px;
    height: 36px;
    line-height: 38px;
    top: 0;
    color: #93908B;
  }
  .password label{
    height: 36px;
  }

  .number input, .password input {
    width: 258px;
    height: 36px;
    line-height: 36px;
    vertical-align: middle;
    padding-left: 45px;
    border: none;
  }

  .login_box{
    width: 350px;
  }
  .login_top{
    margin: 30px 0;
  }
  .forerror .focus{
    width: 301px;
    height: 36px;
  }
  .loginButton{
    color: #fff;
    height: 40px;
    margin-left: 6px;
    margin-bottom: 25px;
    width: 300px;
    font-size: 16px;
    border: none;
    background-color:rgb(232,0,14) ;
  }
  .auto_log{
    margin-bottom: 30px;
  }
  #username{
    width: 40px;
    height: 36px;
    background: url("../../assets/icon/username.png");
  }
  #password{
    width: 40px;
    height: 36px;
    background: url("../../assets/icon/password.png");
  }
  #yanzheng{
    width: 40px;
    height: 36px;
    background: url(../../assets/login/safe.png);
  }
  #yanzhengsize{
    width: 150px;
    display: inline-block;
    margin-top: 20px;
  }
  #yanzhengfcus{
    width: 148px;
  }
  .float-right{
    float: right;
    margin: 20px 25px 0 0;
  }

</style>

<script>
  export default {
    data:function () {
      return{
        errorinfo:false,
        loginInfo:{
          openid:'',
          type:'',
          nickname:'',
          username:'',
          password:'',
          yanzheng:''
        },
        srcImageCode:this.$http.getUrl() + '/rest/common/ImgCode'
      }
    },
    methods:{

      //图片验证码
      changeImage:function () {
        let numberSJ = Math.round(Math.random()*100);
        let srcPath= this.$http.getUrl() + "/rest/common/ImgCode?";
        this.srcImageCode = srcPath + numberSJ;
      },

      loginFun:function(){
        let vue = this;
        let param = this.loginInfo;
        param.password = vue.$utils.Base64(this.loginInfo.password);
        vue.$http.post(
          vue, '/rest/thirdpart/login/bind', param,
          function (vue, data) {
            // 成功处理
            localStorage.removeItem('loginState');
            localStorage.setItem('loginState',1);
            localStorage.removeItem('openid');
            localStorage.removeItem('nicktype');
            localStorage.removeItem('nickname');
            vue.$router.push({ name: 'Index' });
          },function (error,data) {
            // 错误处理
            vue.changeImage();
            console.log(error);
            vue.errorinfo = true;
          });
      },
    },
    mounted(){
      this.loginInfo.openid = localStorage.getItem('openid');
      this.loginInfo.type = localStorage.getItem('nicktype');
      this.loginInfo.nickname = localStorage.getItem('nickname');

    },
    created(){
      let message = {info: '账号绑定'};
      this.$emit('changeText', message);
    }
  }
</script>
