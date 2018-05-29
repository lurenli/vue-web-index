<template>
  <div class="PayWeixin">
    <div class="PayWeixin_content">
      <div class="PayWeixin_content_one">
        <div class="Weixin_payfor">
          <p class="Weixin_payfor_title">微信扫码支付</p>
          <img src="../../assets/images/f_weixinpay.png" />
        </div>
        <div class="Weixin_pay">
          <img src="../../assets/images/zhifu.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .PayWeixin{
    width: 100%;
    border-top: 2px solid #e8000e;
  }
  .PayWeixin_content{
    width: 1200px;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 20px;
    background-color: #fff;
  }
  .PayWeixin_content_one{
    overflow: hidden;
    width: 730px;
    margin: 0 auto;
    padding: 20px 0 200px 0;
  }
  .PayWeixin_content_one>img{
    float: left;
    margin: 126px 46px 0 0;
  }
  .Weixin_pay{
    float: left;
    margin-left: 16px;
  }
  .Weixin_payfor{
   float: left;
    margin: 65px 0 65px 125px;
  }
  .Weixin_payfor_title{
    color: #424242;
    font-size: 18px;
    text-align: center;
    margin-bottom: 15px;
  }
</style>

<script>

  export default {
    components: {},
    name: "PayWeixin",
    data: function () {
      return {

      }
    },
    methods:{
      jump:function(MyName){
        this.$router.push({name:MyName})
      }
    }
  }
</script>
