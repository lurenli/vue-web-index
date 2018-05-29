<template>

  <div class="PayFail">
    <div class="PayFail_content">
      <div class="PayFail_content_one">
        <img src="../../assets/images/f_cry.png" height="228" width="147"/>
        <div class="smile_fail">
          <p class="smile_fail_six">很抱歉，支付失败！</p>
          <p class="smile_fail_thr">将在<span class="smile_fail_four">4</span>s后自动跳至<span class="smile_fail_five" @click="jump('Index')">订单详情页</span></p>
          <p class="smile_fail_one">请重新选择支付方式</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .PayFail{
    width: 100%;
    border-top: 2px solid #e8000e;
  }
  .PayFail_content{
    width: 1200px;
    overflow: hidden;
    margin: 0 auto;
    padding-bottom: 130px;
    background-color: #fff;
    margin-top: 20px;
  }
  .PayFail_content_one{
    overflow: hidden;
    width: 600px;
    margin: 0 auto;
  }
  .PayFail_content_one>img{
    float: left;
    margin: 126px 46px 0 0;
  }
  .smile_fail{
    float: left;
    padding: 40px 60px 33px 50px;
    background-color: #f1f1f1;
    margin-top: 156px;
  }
  .smile_fail_one{
    font-size: 14px;
    color: #424242;
    margin:12px 0 15px 0;
  }
  .smile_fail_thr{
    font-size:14px;
    color: #424242;
  }
  .smile_fail_four{
    color: #e8000e;
  }
  .smile_fail_five{
    color:#2f95ec;
    cursor: pointer;
  }
  .smile_fail_six{
    font-size: 16px;
    color: #e8000e;
    margin-bottom: 17px;
  }
</style>

<script>

  export default {
    components: {},
    name: "PayFail",
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
