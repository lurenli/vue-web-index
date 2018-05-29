<template>
  <div class="helpDetail">
    <div class="bread">
      <span>您的位置：</span>
      <a>首页</a>
      <span>&gt;</span>
      <span>帮助中心</span>
      <span>&gt;</span>
      <span>售后服务</span>
      <span>&gt;</span>
      <span>退款说明</span>
    </div>
    <div class="helpmsg">
      <div class="itemname">
        <i class="icon"></i>
        <span class="itemtitle">退款说明</span>
      </div>
      <div class="helpcontent">
        <ul class="intrtip">
          <li style="margin-top: 20px">
            <span>(1)可以将我的退款退到我指定的账户吗？ </span>
            <p>考虑到您的资金安全，紧商网还是会退回到您原来的支付卡上。</p>
          </li>
          <li>
            <span>(2)什么情况下会收取退换货的运费？</span>
            <p>因产品质量问题造成的退换货，紧商网将承担运费；但因非产品质量问题由客户发起的退换货行为，将由客户承担返回供应商的运费。</p>
          </li>
          <li>
            <span>(3)我的退款会退到哪里？</span>
            <table class="helptable">
              <tr class="tablethead">
                <td>支付方式</td>
                <td>退款方式</td>
                <td>银行退款处理周期</td>
              </tr>
              <tr>
                <td>网银支付</td>
                <td>退回原支付卡</td>
                <td>1-7个工作日</td>
              </tr>
              <tr>
                <td>支付宝</td>
                <td>退回原支付卡</td>
                <td>1-7个工作日</td>
              </tr>
              <tr>
                <td>微信支付</td>
                <td>退回微信账户余额</td>
                <td>1-15个工作日</td>
              </tr>
            </table>
            <p>温馨提示：退款周期仅供您参考，具体退款周期可能会受银行、支付机构等相关因素影响。</p>
          </li>
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
  .intrtiptip{
    margin-top:20px;
  }
  .intrtiptip li{
    margin:20px 12px;
  }
</style>
