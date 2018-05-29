<template>
  <div style="border:1px solid #f2f2f2;width: 1200px;margin: 0 auto;background-color: #fff;margin-top: 30px">
  <div class="forget-main">
    <div class="top-ui">
      <div id="top-ui-1">填写账户名，验证身份<span></span><span>1</span></div>
      <div id="top-ui-2">设置新密码<span></span><span>2</span></div>
      <div id="top-ui-3">完成<span></span><span>3</span></div>
    </div>
    <div action="" class="signUp">
      <div class="item-a">
        <span class="a-left">请输入您的新密码：</span>
        <input type="password" class="input-a" v-model="password1" @blur="checkPsd" onkeyup="this.value=this.value.replace(/\s+/g,'')">
        <span class="a-right" v-show="errorInfo1 ==1"><span class="error-a"></span>密码长度只能在6-20位字符之间，不能包含空格</span>
      </div>

      <div class="item-a">
        <span class="a-left">请再次输入您的新密码：</span>
        <input type="password" class="input-a"  v-model="password2" @blur="checkPsd" onkeyup="this.value=this.value.replace(/\s+/g,'')">
        <span class="a-right" v-show="errorInfo2 ==1"><span class="error-a"></span>密码不一致</span>
      </div>
      <div  class="item-a item-d">
        <span class="a-left"></span>
        <button onsubmit="" class="sign-up" v-on:click="goTo3">下一步</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    data:function () {
      return{
        errorInfo1:0,
        errorInfo2:0,
        password1:'',
        password2:''

      }
    },
    methods:{
      goTo3:function () {
        let username = window.localStorage.getItem('username');
        let token = window.localStorage.getItem('token');
//        console.log(token);
        let vue = this;
        let param = {
          username:username,
          token:token,
          password:vue.$utils.Base64(this.password2)
        };
//        param.password = vue.$utils.Base64(this.password2);
        if(this.errorInfo1===0 && this.errorInfo2===0){
          vue.$http.post(
            vue, '/rest/forgetPassword/step2', param,
            function (vue, data) {
              // 成功处理
//              console.log(data + '0000');
              vue.$router.push({ path: '/forget3' });

            },function (error,data) {
              // 错误处理
              vue.$message.error(data.message);
            }
          );
        }
      },
      checkPsd:function () {
        if(this.password1 ==="") {

        } else{
          if(!/^[0-9A-Za-z]{6,20}$/.test(this.password1)) {
            this.errorInfo1 = 1;
//            this.password1='';
          } else {
            this.errorInfo1 = 0;
          }
        }

        if(this.password1 && this.password2){
          if(this.password1 == this.password2){
            this.errorInfo2 = 0;
          }else{
            this.errorInfo2 = 1;
          }
        }
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
    height: 380px;
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
  #top-ui-3{
    color:  rgb(204,204,204);
    border-bottom-color:  rgb(204,204,204);
  }
  #top-ui-3 span:first-child{
    background-color: rgb(204,204,204) ;
  }
  .signUp{
    height: 700px;
    width: 1200px;
    margin: 85px auto 0;
  }
  .item-a{
    margin-bottom: 30px;
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
    padding-left: 10px;
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

</style>
