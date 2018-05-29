<template>
  <div style="border:1px solid #f2f2f2;width: 1200px;margin: 0 auto;background-color: #fff;margin-top: 30px">
  <div class="forget-main">
    <div class="top-ui">
      <div id="top-ui-1">填写账户名，验证身份<span></span><span>1</span></div>
      <div id="top-ui-2">设置新密码<span></span><span>2</span></div>
      <div id="top-ui-3">完成<span></span><span>3</span></div>
    </div>
    <div class="signUp" v-model="forget1">
      <div class="item-a">
        <span class="a-left"><span class="red">*</span>&nbsp;&nbsp;账户名：</span>
        <input type="text" class="input-a" v-model="forget1.username" @blur="checkUser">
        <span class="a-right" v-if="errorInfo1"><span class="error-a"></span>请输入您的用户名</span>
        <span class="a-right" v-if="errorInfo11"><span class="error-a"></span>用户不存在,请输入其他用户名</span>
        <span class="a-right" v-if="success1"><span class="success-a"></span></span>
      </div>

      <div class="item-a">
        <span class="a-left"><span class="red">*</span>&nbsp;&nbsp;输入手机号：</span>
        <input type="text" class="input-a" v-model="forget1.mobile"  @blur="checkMoile"  >
        <span class="a-right" v-if="errorInfo2"><span class="error-a"></span>请输入您的手机号</span>
        <span class="a-right" v-if="errorInfo22"><span class="error-a"></span>输入手机号和账户名不一致</span>
        <span class="a-right" v-if="errorInfo23"><span class="error-a"></span>手机号不合法，请重新输入</span>
        <span class="a-right" v-if="success2"><span class="success-a"></span></span>
      </div>
      <div  class="item-a">
        <span class="a-left"><span class="red">*</span>&nbsp;&nbsp;验证码：</span>
        <input type="text" class="input-b" v-model="imgCode" >
        <img class="get-check" :src="srcImageCode" @click="changeImage">
        <span class="a-right" v-on:click="changeImage"><a style="cursor: pointer">看不清楚，换一张？</a></span>
      </div>
      <div  class="item-a">
        <span class="a-left"><span class="red">*</span>&nbsp;&nbsp;请填写手机验证码：</span>
        <input type="text" class="input-b" v-model="forget1.mobileCode" >
        <button class="get-check" value="获取短信验证码" v-on:click="getMobileCode" :disabled="sendMsg">
          <span v-if="sendMsgDisabled">{{time + '秒后重新获取'}}</span>
          <span v-if="!sendMsgDisabled">获取短信验证码</span>
        </button>
      </div>
      <div  class="item-a item-d">
        <span class="a-left"></span>
        <button class="sign-up" v-on:click="goTo2">下一步</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        textinfo:'密码找回',
        time:60,
        imgCode:'',
        forget1:{
          username:'',
          mobile:'',
          mobileCode:'',
        },
        sendMsg: true,
        sendMsgDisabled: false,
        errorInfo1:false,
        errorInfo11:false,
        errorInfo2:false,
        errorInfo22:false,
        errorInfo23:false,
//        errorInfo3:false,
//        errorInfo4:false,
//        errorInfo41:false,
        success1:false,
        success2:false,
        srcImageCode:this.$http.getUrl() + '/rest/common/ImgCode',
        disabled:false,
//        disabled2:false
      }
    },
    methods:{
      //下一步
      goTo2:function () {
        let imgCode = this.imgCode;
//        console.log(this.imgCode);
        if(this.forget1.username===''){
          this.errorInfo1=true;
        } else if(this.forget1.mobile===''){
          this.errorInfo2=true;
        }else if (imgCode === ''){
          this.$message.error('请输入图片验证码');
        }
        else if (this.forget1.mobileCode === ''){
          this.$message.error('请输入手机验证码');
        } else{
          let vue = this;
          let param = this.forget1;
          localStorage.removeItem('username');
          localStorage.setItem('username', this.forget1.username);
          vue.$http.post(
            vue, '/rest/forgetPassword/step1', param,
            function (vue, data) {
              // 成功处理
//              console.log(data);
              localStorage.removeItem('token');
              localStorage.setItem('token', data.token)
              if(data.result ==1){
                vue.$router.push({ path: '/forget2' });
              }
            },function (error,data) {
              // 错误处理
//              console.log(data);
              vue.$message.error(data.message);
              vue.changeImage();
            }
          );
        }
      },
      //图片验证码
      changeImage:function () {
        let numberSJ = Math.round(Math.random()*100);
        let srcPath= this.$http.getUrl() + "/rest/common/ImgCode?";
        this.srcImageCode = srcPath + numberSJ;
      },

      //手机验证码
      getMobileCode: function () {
        let imgCode = this.imgCode;
//        console.log(this.imgCode);
      if(this.forget1.username===''){
          this.errorInfo1=true;
        }else if(this.forget1.mobile===''){
        this.errorInfo2=true;
      } else if (imgCode === '') {
        this.$message.error('请输入图片验证码');
        }
        else {
          let vue = this;
          let param = {
            mobile: this.forget1.mobile,
            imgCode: this.imgCode,
            type: 'findpwd'
          };
          vue.$http.post(
            vue, '/rest/front/genMobileCode', param,
            function (vue, data) {
              // 成功处理
              vue.changeImage();
//              console.log(data);
              vue.$message({
                type: 'success',
                message: '图片验证码匹配成功，已向手机发送短信验证码'
              });
              vue.lalala();
            }, function (error, data) {
              // 错误处理
//              console.log(error);
              vue.$message.error(data.message);
              vue.changeImage()
            });
        }
      },
      lalala(){
        let me = this;
        me.sendMsgDisabled = true;
        me.sendMsg = true;
        let interval = window.setInterval(function () {
          if ((me.time--) <= 0) {
            me.time = 60;
            me.sendMsgDisabled = false;
            me.sendMsg = false;
            window.clearInterval(interval);
          }
        }, 1000);
      },
      checkUser(){
        let vue = this;
        let param = {
          username: this.forget1.username,
        };
        vue.$http.post(
          vue, '/rest/common/exisUsername', param,
          function (vue, data) {
            // 成功处理
            if(vue.forget1.username===''){
              vue.sendMsg=true;
              vue.errorInfo1=true;
              vue.errorInfo11=false;
              vue.success1=false;
            }
            else if(data.result !=='0'){
              vue.sendMsg=true;
              vue.errorInfo1=false;
              vue.errorInfo11=true;
              vue.success1=false;
            }
          }, function (error, data) {
            // 错误处理
            vue.sendMsg=false;
            vue.errorInfo11=false;
            vue.errorInfo1=false;
            vue.success1=true;
            vue.$message({
              type: 'success',
              message: '用户检测成功'
            });
          });
      },
      checkMoile(){
        this.checkUserMobil();
        var input=document.getElementsByTagName('input');
        let vue = this;
        let param = {
          mobile: this.forget1.mobile,
        };
        vue.$http.post(
          vue, '/rest/common/exisMobile', param,
          function (vue, data) {
            // 成功处理
            if(vue.forget1.mobile !==vue.mobiles){
//              console.log(input);
              input[1].disabled=false;
              input[2].disabled=true;
              input[3].disabled=true;
              vue.errorInfo22=true;
              vue.errorInfo2=false;
              vue.errorInfo23=false;
              vue.success2=false;
            }
          }, function (error, data) {
            // 错误处理
            if(vue.forget1.mobile===''){
              vue.errorInfo2=true;
              vue.errorInfo22=false;
              vue.errorInfo23=false;
              vue.success2=false;
            }
            else if(data.message ==='手机号不合法'){
//              console.log(input);
              input[1].disabled=false;
              input[2].disabled=true;
              input[3].disabled=true;
              vue.errorInfo23=true;
              vue.errorInfo22=false;
              vue.errorInfo2=false;
              vue.success2=false;
            }
           else if (data.message ==='手机号已存在'){
              vue.disabled=false;
              input[2].disabled=false;
              input[3].disabled=false;
              vue.errorInfo2=false;
              vue.errorInfo22=false;
              vue.errorInfo23=false;
              vue.success2=true;
              vue.$message({
                type: 'success',
                message: '用户名与手机号匹配成功'
              });
            }
          });
      },
      checkUserMobil(){
        let vue = this;
        let param = {
          username:this.forget1.username
        };
        vue.$http.post(
          vue, '/rest/forgetPassword/getMobile', param,
          function (vue, data) {
            // 成功处理
            vue.mobiles=data.mobile;
//            console.log( vue.mobiles)
          },function (error,data) {
            // 错误处理
//            vue.$message.error(data.message);

          }
        );
      }
    },
    created(){
      let message = {info: '找回密码'};
      this.$emit('changeText', message);
    },
    mounted(){

    }
  }
</script>

<style scoped>
  .forget-main{
    width: 880px;
    height: 520px;
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
    color: rgb(204,204,204);
    display: inline-block;
    height: 35px;
    width: 214px;
    border-bottom: 5px solid rgb(204,204,204);
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
    background-color: rgb(204,204,204);
  }
  .top-ui>div>span:last-child{
    position: absolute;
    bottom: -55%;
    right: 45%;
    width: 24px;
    height: 24px;
    font-size: 12px;
    color: #fff;
  }
  #top-ui-1{
    color:  rgb(255,73,87);
    border-bottom-color:  rgb(255,73,87);
  }
  #top-ui-1 span:first-child{
    background-color:  rgb(255,73,87);
  }
  .signUp{
    height: 700px;
    width: 1200px;
    margin: 85px auto 0;
  }
  .item-a{
    margin-bottom: 30px;
    position: relative;
    padding-left: 104px;
  }
  .a-left{
    font-size: 14px;
    display: inline-block;
    width: 200px;
    text-align: right;
    padding-right: 10px;
  }
  .input-a{
    height: 40px;
    width: 320px;
    padding-left: 10px;
    margin-right: 10px;
    border: 1px solid #e5e5e5;
  }
  .input-b{
    vertical-align: top;
    height: 40px;
    padding-left:10px ;
    width: 176px;
    margin: 0 15px 0 0;
    border: 1px solid #e5e5e5;
  }
  .get-check{
    margin-right: 10px;
    display: inline-block;
    width: 122px;
    height: 40px;
    text-align: center;
    vertical-align: middle;
    color: rgb(66,66,66);
    border: 1px solid #e5e5e5;
  }
  .a-right{
    color: red;
    font-size: 12px;
    height: 42px;
    line-height: 42px;
    text-align: center;
  }
  .error-a{
    margin-top: 2px;
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 10px;
    vertical-align: text-bottom;
    background: url(../../assets/login/image/error-a.png);
  }
  .item-d{
    margin-top: 50px;
  }
  .sign-up{
    display: inline-block;
    width: 320px;
    height: 40px;
    background-color:rgb(232,0,14) ;
    font-size: 14px;
    text-align: center;
    color: #fff;
    border: none;
  }
  .success-a {
    margin-top: 2px;
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 10px;
    vertical-align: text-bottom;
    background: url(../../assets/login/image/greencheck.png);
  }
</style>
