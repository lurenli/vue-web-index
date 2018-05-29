<template>
  <div class="main" >
    <div id="login_form" class="login_box">
      <div  v-model="loginInfo">
        <div class="login_top" v-show="!errorinfo">会员登录
        </div>
        <div class="login_top errorInfo" v-show="errorinfo"><span class="error-a"></span>{{data}}</div>
        <div>
          <div class="number forerror">
            <label id="username"></label>
            <input  v-model="loginInfo.username" @keyup="keyLogin($event)"  class="focus" type="text" placeholder="请输入您的用户名" autocomplete="off" maxlength="20" minlength="6" @blur="changeSave()">
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
            <input  v-model="loginInfo.password" @keyup="keyLogin($event)" class="focus" type="password" placeholder="请输入您的密码" autocomplete="off" maxlength="20" minlength="6">
          </div>
        </div>
        <div>
          <div class=" password forerror" id="yanzhengsize">
            <label id="yanzheng"></label>
            <input  v-model="loginInfo.yanzheng" @keyup="keyLogin($event)" class="focus" id="yanzhengfcus" type="text" placeholder="请输入验证码" autocomplete="off">
          </div>
          <div class="float-right">
            <img class="get-check" :src="srcImageCode" @click="changeImage">
            <span @click="changeImage" style="cursor: pointer">刷新</span>
          </div>
        </div>

        <div class="auto_log">
          <input type="checkbox" id="remember_me" v-model="saveUser" :checked="saveUser===1" @change="changeSave">记住用户名
          <div class="forget">
            <router-link  to="/Forget1">
              <a href="/Forget">忘记密码</a>
            </router-link>
            <router-link  to="/SignUp">
              <a class="reg" href="/signUp">立即注册</a>
            </router-link>
          </div>
        </div>
        <button  class="loginButton" v-on:click="loginFun">立即登录</button>
        <div class="log_bom">
          <!--<span class="qqLogin D3" v-on:click="qqLogin"><span></span>QQ登录</span>-->
          <span class="wxLogin D3" v-on:click="wxLogin"><span></span>微信登录</span>

        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data:function () {
      return{
        saveUser:0,
        errorinfo:false,
        errorinfo2:false,
        loginInfo:{
          username:'',
          password:'',
          yanzheng:''
        },
        srcImageCode: this.$http.getUrl() + '/rest/common/ImgCode',
        data:'',
        redirect:undefined
      }
    },
    methods:{
      keyLogin(ev) {
        if(ev.keyCode==13){
          this.loginFun();
        }
      },
      //第三方登录
      qqLogin:function(){
        this.$router.push({ path:'/qqLogin' });
      },
      wxLogin:function(){
           location.href='https://open.weixin.qq.com/connect/qrconnect?appid=wx3e4de0fae28317d3&redirect_uri=http://new.jinshang9.com&response_type=code&scope=snsapi_login&state=2018#wechat_redirect'
        // location.href="https://open.weixin.qq.com/connect/qrconnect?appid=wx3e4de0fae28317d3&redirect_uri=http://www.jinshang9.com&response_type=code&scope=snsapi_login&state=2018#wechat_redirect"
      },
      //图片验证码
      changeImage:function () {
        let vue = this;
        let numberSJ = Math.round(Math.random()*100);
        let srcPath = vue.$http.getUrl() +  "/rest/common/ImgCode?";
        this.srcImageCode = srcPath + numberSJ;
      },
      loginFun:function(){
        let vue = this;
        let param = this.loginInfo;
        param.password = vue.$utils.Base64(this.loginInfo.password);
        vue.$http.post(
          vue, '/rest/buyer/login', param,
          function (vue, data) {
            vue.$http.post(
              vue, '/rest/common/userInfo', {_cannot:false},
              function (vue, data) {
                var data =data.data;
                vue.$store.commit('loginStore',data);
                if(vue.redirect!==undefined) window.location.href=vue.redirect;
                else vue.$router.push({ name: 'Index' });
              },function (error,data) {
                console.log(error)
              });
          },function (error,data) {
            // 错误处理
//            console.log(data.message);
            vue.data=data.message;
            vue.loginInfo.password ='';
            vue.errorinfo=true;
            vue.changeImage();
          });
      },

      //记住用户名
      changeSave(){
        if(this.saveUser){
          localStorage.removeItem('username');
          localStorage.setItem('username',this.loginInfo.username)
        } else{
          localStorage.removeItem('username');
        }
      }
    },
    mounted(){
      //判断有无缓存name信息
      if(window.localStorage.getItem('username')){
        this.saveUser = true;
        this.loginInfo.username = window.localStorage.getItem('username');
      } else{
        this.loginInfo.username ='';
        this.saveUser = false;
      }
    },
    created(){
      let message = {info: '会员登录'};
      this.$emit('changeText', message);
      this.redirect= this.$route.query.redirect;
    }
  }
</script>
<style scoped>
  #remember_me{
    margin: 0 4px 0 0;
    top: 0;
    cursor: pointer;
  }
  .D3{
    cursor: pointer;
  }
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
    margin-top: 13px;
    width: 350px;
  }
  .login_top{
    margin: 30px 0;
    padding: 0 0;
  }
  .forerror .focus{
    width: 301px;
    height: 36px;
    box-shadow: none;
  }
  .loginButton{
    color: #fff;
    height: 40px;
    margin-left: 6px;
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
