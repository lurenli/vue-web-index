<template>
  <div id='loginBG'>
    <div class="small_nav-a">
      <div class="nav_logo-a">
        <a href="/">
          <img src="../../assets/images/logo2.png" width="252" height="60">
        </a>
        <div class="nav_text">
          {{textInfo}}
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="main_wrap">
      <img src="../../assets/login/image/loginBG.png" style="height: 500px;width: 100%" />
      <router-view v-on:changeText="changeText"></router-view>
    </div>
    <div class="text_link">
      <p>Copyright(c) 2008-2018 www.jinshang9.com 紧商科技股份有限公司</p>
    </div>
  </div>



</template>

<script>
//  import "../../res_v4.0/js/jquery-1.9.1.min"
  export default {
    data:function () {
      return{
        textInfo:'',
        screenWidth:document.body.clientWidth,
      }
    },
    methods:{
      changeText(info){
        this.textInfo = info.info
      },

      checkWith(){
//        console.log(this.screenWidth);
        if(this.screenWidth<1200) {
//          console.log("1200" + this.cWidth);
          if(document.getElementById('loginBG')){
            document.getElementById('loginBG').style.width = '1200px';
          }
        }
        if(this.screenWidth>1200){
          if(document.getElementById('loginBG')){
            document.getElementById('loginBG').style.width = '100%';
          }
        }
      }
    },
    watch:{
      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
//            console.log(that.screenWidth)
            that.checkWith()
            that.timer = false
          }, 400)
        }
      }
    },
    mounted(){
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
    }
  }

</script>
<style>
  @import "../../res_v4.0/css/commonality.css";
  @import "../../res_v4.0/css/login/login.css";


  .small_nav-a{
    background-color: #fff;
  }
  .nav_logo-a{
    width: 1200px;
    margin: 0 auto;
    padding: 40px 0;
  }
  .nav_text{
    display: inline-block;
    font-size: 28px;
    color:rgb(66,66,66);
    height: 60px;
    line-height: 60px;
    /*margin-left: 30px;*/
    padding-left: 30px;
    border-left: 1px solid rgb(230,230,230);
  }
  .png11,.png12,.png13{
    margin:0 5px;
    display:inline-block;
    width:118px;
    height:46px;
  }
  .auto_log{
    height: 40px;
    font-size:14px;
    padding-bottom: 25px;
    vertical-align: text-top;
  }
  .login_box{
    left: 60% !important;
  }
  .login_top{
    margin: 40px 0;
    padding: 0 0 ;
  }
  .focus{
    font-size:14px;
  }
  #pwd_intensity{
    height: 22px;
  }
  .text_link{
    padding-top:100px;
  }
  .forget{
    display: inline;
    text-align: right;
  }
  .forget>a{
    height: 16px;
    padding-right:25px ;
  }
  .log_bom{
    height: 17px;
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .log_bom span{
    display: inline-block;
    vertical-align: top;
  }
  .D3 span{
    width: 21px;
    height: 17px;
  }
  .qqLogin{
    padding-right:20px;
  }
  .qqLogin span{
    background: url(../../assets/login/image/qq.png) no-repeat left;
    vertical-align: middle;
  }
  .wxLogin span{
    background: url(../../assets/login/image/weixin.png) no-repeat left;
    vertical-align: middle;
    margin-right: 3px;
  }
  .number label{
    background: url(../../assets/login/image/user.png) ;
  }
  .password label{
    background: url(../../assets/login/image/pwd.png);
  }
  .main_wrap{
    width: 100%;
    /*background: url(../../assets/login/image/bg.png) no-repeat left 100%;*/
  }
  .png11{
    background: url(../../res_v4.0/images/footer_bg.jpg) no-repeat -180px 0;
  }
  .png12{
    background: url(../../res_v4.0/images/footer_bg.jpg) no-repeat -180px -49px;
  }
  .png13{
    background: url(../../res_v4.0/images/footer_bg.jpg) no-repeat -180px -153px;
  }
</style>


