<template>
  <div class="helpDetail">
    <div class="bread">
      <span>您的位置：</span>
      <a>首页</a>
      <span>&gt;</span>
      <span>帮助中心</span>
      <span>&gt;</span>
      <span>付款方式</span>
      <span>&gt;</span>
      <span>在线支付</span>
    </div>
    <div class="helpmsg">
      <div class="itemname">
        <i class="icon"></i>
        <span class="itemtitle">在线支付</span>
      </div>
      <div class="helpcontent">
          <ul  class="pay">
            <li>在线银行卡支付</li>
            <li>支付宝支付</li>
            <li>微信支付</li>
            <li>余额支付</li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>

  export default{
    data(){
      return {

      }
    }
  }
</script>
<style scoped>
  @import "../../css/helpcentercommon.css";
  .pay{
    margin:30px 0 0 15px;
  }
  .pay li{
    margin:20px 0;
  }
</style>
