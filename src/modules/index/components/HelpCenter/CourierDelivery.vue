<template>
  <div class="helpDetail">
    <div class="bread">
      <span>您的位置：</span>
      <a>首页</a>
      <span>&gt;</span>
      <span>帮助中心</span>
      <span>&gt;</span>
      <span>配送方式</span>
      <span>&gt;</span>
      <span>快递配送</span>
    </div>
    <div class="helpmsg">
      <div class="itemname">
        <i class="icon"></i>
        <span class="itemtitle">快递配送</span>
      </div>
      <div class="helpcontent">
        <p>
          为了保证全国各地的客户都能在紧商网购物，除采取物流配送外，紧商网委托专业的第三方快递公司进行配送。
        </p>
        <ul class="msg">
          <li class="lititle">服务说明：</li>
          <li>1.紧商网委托第三方快递公司为客户提供送货上门服务，客户无须向快递公司支付额外的费用。</li>
          <li>2.客户可以在紧商网网站“我的订单”查询货物配送信息，也可以登录第三方快递网站查询快递信息。</li>
          <li>3.第三方快递支持客户打开运输包装验货，商品包装完好，客户可以先签收，如果发现商品有质量问题可以致电紧商网客服进行售后处理。</li>
        </ul>
        <ul class="msg">
          <li class="lititle">注意事项：</li>
          <li>1.请在提交订单时准确选择地址信息，否则有可能导致货到付款订单无法送达和配送超时。</li>
          <li>2.签收时请注意检查外包装是否完好，配件是否齐全，签收后如果发现异常可以致电紧商网客服。</li>
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
  .msg{
    margin-top:20px;
  }
  .msg li{
    margin:20px;
  }
  .msg li.lititle{
    margin:20px 0;
  }
</style>
