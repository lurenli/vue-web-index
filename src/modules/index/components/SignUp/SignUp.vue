<template>
  <div>
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
    <div id="listByChar" class="cont fix">
      <router-view v-on:changeText="changeText"></router-view>
    </div>
    <My-Footer></My-Footer>
  </div>



</template>

<script>

  import MyFooter from "../Footer/Footer"
  export default {
    components: {
      MyFooter
    },
    data:function () {
      return{
        textInfo:''
      }
    },
    methods:{
      changeText(info){
        this.textInfo = info.info
      }
    }
  }

</script>
<style>
  @import "../../res_v4.0/css/register/register.css";
  @import "../../res_v4.0/css/commonality.css";

  .png11,.png12,.png13{
    margin:0 5px;
    display:inline-block;
    width:118px;
    height:46px;
  }
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

  .text_link{
    padding-top:100px;
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


