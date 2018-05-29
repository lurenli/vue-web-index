<template>
  <div class="wrap">
    <div class="signUp" v-model="SignInfo">
      <div class="item-a">
        <span class="a-left"><span class="red">*</span>&nbsp;&nbsp;账户名：</span>
        <input type="text" class="input-a" v-model="SignInfo.username">
        <span class="a-right"><span class="error-a"></span>账户名已存在，请输入其他用户名</span>
      </div>
      <div class="item-a">
        <span class="a-left"><span class="red">*</span>&nbsp;&nbsp;设置密码：</span>
        <input type="password" class="input-a" v-model="SignInfo.password">
        <span class="a-right"><span class="error-a"></span>密码长度只能在6-20位字符之间，不能包含空格</span>
      </div>
      <div class="item-a">
        <span class="a-left"><span class="red">*</span>&nbsp;&nbsp;确认密码：</span>
        <input type="password" class="input-a" v-model="SignInfo.againPassword">
        <span class="a-right"><span class="error-a"></span>确认密码和设置密码不一致</span>
      </div>
      <div class="item-a">
        <span class="a-left"><span class="red">*</span>&nbsp;&nbsp;手机号：</span>
        <input type="text" class="input-a" v-model="SignInfo.mobile">
        <span class="a-right"><span class="error-a"></span>手机号格式不对，请重新输入</span>
      </div>
      <div  class="item-a">
        <span class="a-left"><span class="red">*</span>&nbsp;&nbsp;验证码：</span>
        <input type="text" class="input-b" v-model="SignInfo.imgCode">
        <img class="get-check" :src="srcImageCode" @click="changeImage">
        <span class="a-right" v-on:click="changeImage"><a>看不清楚，换一张？</a></span>
      </div>
      <div  class="item-a">
        <span class="a-left"><span class="red">*</span>&nbsp;&nbsp;填写手机验证码：</span>
        <input type="text" class="input-b" v-model="SignInfo.mobileCode">
        <button class="get-check" v-on:click="getMobileCode">获取短信验证码</button>
        <span class="a-right"><span class="error-a"></span>短信验证码不正确，请重新输入</span>
      </div>
      <div  class="item-a">
        <span class="a-left">&nbsp;&nbsp;邀请码：</span>
        <input type="text" class="input-a" v-model="SignInfo.invitecode">
        <span class="a-right"><span class="error-a"></span>邀请码不正确，请重新输入</span>
      </div>
      <div  class="item-a item-c">
        <span class="a-left"></span>
        <input type="checkbox" class="check-a">&nbsp;&nbsp;我已阅读并同意<<<span v-on:click="goToUserAgreement" class="blue">用户注册协议</span>>>
      </div>
      <div  class="item-a item-d">
        <span class="a-left"></span>
        <button  class="sign-up-x" v-on:click="SignUp">注册并绑定</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        SignInfo:{
          username:'',
          password:'',
          againPassword:'',
          mobileCode:'',
          imgCode:'',
          mobile:'',
          invitecode:''
        },
        srcImageCode: this.$http.getUrl() + '/rest/common/ImgCode'

      }
    },
    methods:{
      //跳转用户协议
      goToUserAgreement:function(){
        this.$router.push({ path: '/Login' });
      },
      //检测两次密码是否相同
      checkFun:function () {

      },
      //图片验证码
      changeImage:function () {
        let numberSJ = Math.round(Math.random()*100);
        let srcPath= this.$http.getUrl() + "/rest/common/ImgCode?";
        this.srcImageCode = srcPath + numberSJ;
      },

      //手机验证码
      getMobileCode:function () {
        let imgCode = this.SignInfo.imgCode;
//        console.log(this.SignInfo.imgCode);
        if(imgCode ===''){
          alert("请先输入验证码");
        }
        else{
          let vue = this;
          let param = {
            mobile:this.SignInfo.mobile,
            imgCode:this.SignInfo.imgCode,
            type:'register'
          };
          vue.$http.post(
            vue, '/rest/front/genMobileCode', param,
            function (vue, data) {
              // 成功处理
//              console.log(data);
            },function (error,data) {
              // 错误处理
              console.log(error);
            });

        }
      },

      //注册
      SignUp:function () {
//      console.log(this.SignInfo);
        let vue = this;
        let param = this.SignInfo;
        param.password = vue.$utils.Base64(this.SignInfo.password);
        vue.$http.post(
          vue, '/rest/buyer/registerMember', param,
          function (vue, data) {
            // 成功处理
//            console.log(data);
            if(data.result == 1){
//              console.log('注册成功');
              vue.$message({
                message:'注册成功！',
                type:'success'
              })
              vue.$router.push({ path: '/Login' });
            }

          },function (error,data) {
            // 错误处理
            console.log(error);
          });
      }
    },
    mounted(){

    },
    created(){
      let message = {info: '欢迎注册'};
      this.$emit('changeText', message);
    }
  }
</script>

<style scoped>
  .signUp {
    height: 700px;
    width: 1200px;
    margin: 30px auto 0;
    padding-top: 40px;
    background-color: #fff;
  }
  .item-a{
    margin-bottom: 30px;
  }
  .a-left{
    font-size: 14px;
    display: inline-block;
    width: 200px;
    text-align: right;
    padding-right: 10px;
  }
  .red{
    font-size: 14px;
    color: red;
    vertical-align: middle;
  }
  .input-a{
    height: 40px;
    width: 320px;
    margin-right: 10px;
    border: 1px solid #e5e5e5;
  }
  .input-b{
    vertical-align: top;
    height: 40px;
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
  .item-c{
    height: 14px;
    font-size: 14px;
    vertical-align: top;
    position: relative;
  }
  .blue{
    color:rgb(17,126,225);
  }
  .check-a{
    position: absolute;
    bottom: -3px;
    left: 202px;
  }
  .item-d{
    margin-top: 50px;
  }
  .sign-up-x{
    display: inline-block;
    width: 320px;
    height: 40px;
    background-color:rgb(232,0,14) ;
    font-size: 14px;
    text-align: center;
    color: #fff;
    border: none;
  }

</style>
