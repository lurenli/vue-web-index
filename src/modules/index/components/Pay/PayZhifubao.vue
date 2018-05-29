<template>
  <div class="PayZhifubao">
    <div class="PayZhifubao_content">
      <div class="PayZhifubao_content_one">
        <div class="Zhifubao_payfor">
          <p class="Zhifubao_payfor_title">支付宝扫码支付</p>
          <img src="../../assets/images/f_pay.png" />
        </div>
        <div class="Zhifubao_pay">
          <img src="../../assets/images/zhifuicon.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped >
  .PayZhifubao{
    width: 100%;
    border-top: 2px solid #e8000e;
  }
  .PayZhifubao_content{
    width: 1200px;
    overflow: hidden;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 20px;
  }
  .PayZhifubao_content_one{
    overflow: hidden;
    width: 600px;
    margin: 0 auto;
    padding: 20px 0 200px 0;
  }
  .PayZhifubao_content_one>img{
    float: left;
    margin: 126px 46px 0 0;
  }
  .Zhifubao_pay{
    float: left;
    margin: 115px 0 0 16px;
  }
  .Zhifubao_payfor{
    float: left;
    margin: 65px 0 65px 50px;
  }
  .Zhifubao_payfor_title{
    color: #424242;
    font-size: 18px;
    text-align: center;
    margin-bottom: 15px;
  }
</style>

<script>

  export default {
    components: {},
    name: "PayZhifubao",
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
