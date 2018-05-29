<template>
  <div class="helpDetail">
    <div class="bread">
      <span>您的位置：</span>
      <a>首页</a>
      <span>&gt;</span>
      <span>帮助中心</span>
      <span>&gt;</span>
      <span>购物指南</span>
      <span>&gt;</span>
      <span>常见问题</span>
    </div>
    <div class="helpmsg">
      <div class="itemname">
        <i class="icon"></i>
        <span class="itemtitle">购买咨询</span>
      </div>
      <div class="helpcontent">
         <ul class="helptip">
           <li>
             <span>(1)下单后可修改或者取消订单吗？ </span>
             <p>由紧商网发货的订单，在订单打印之前可以修改，打开“订单详情”页面，点击右上角的“修改订单”即可，若没有修改订单按钮，则表示订单无法修改。</p>
             <ul>
               <li>注：</li>
               <li>1. 修改订单可能影响送货时间。</li>
               <li>2、修改时将以当前商品信息为准，修改时需要注意查看活动信息。</li>
             </ul>
           </li>
           <li>
             <span>(2)我能修改订单的哪些内容？</span>
             <p>您好，订单一般可以修改的内容包括收货人姓名、联系电话、收货地址、配送时间。具体修改内容以页面显示为准。 </p>
           </li>
           <li>
             <span>(3)我的订单已经取消了，何时给我退款？</span>
             <p>一般情况下，订单取消后系统将在<span class="reds">1-3个工作日</span>自动退回账户；如若超出时间未处理，请联系客服帮您处理。</p>
           </li>
           <li>
             <span>(4) 订单提交成功，多久可以发货？</span>
             <p>紧商网网站上的产品分为现货和远期，可直接购买的两类，一般情况下，
               订单提交并付款成功后，现货交易产品将在<span class="reds">72小时内</span>发货；远期的产品在产品出厂后进行发货，具体时间以下单时与客服沟通确认的为准。
               如有延迟，紧商网客服专员将会和您联系沟通。</p>
           </li>
           <li>
             <span>(5)有哪些订单状态？</span>
             <p>一个新订单从下单到订单完成，会经历各种状态，我们会将各种状态显示在订单详情页面，
               希望以此种方式让您更好的了解订单情况，及时跟踪订单状态，打消疑虑并顺利完成购物。
            </p>
             <p>
               <span class="reds">状态包括：</span>
               等待处理-------等待付款------付款成功--------商品出库----等待收货-----订单完成
             </p>
           </li>
           <li>
             <span>(6)可以开发票吗？</span>
             <p>紧商网可以开具普通发票和增值税发票，客户在点击结算后可修改开具发票的相关信息。
               发票信息一旦选择确定后不可更改，紧商网只提供唯一发票。
               因客户失误造成开票信息错误而产生的损失由客户自行承担，紧商网提醒客户在提交订单前仔细检查开票信息。</p>
           </li>
           <li>
             <span class="reds">(7)如何获得增值税发票?</span>
             <p>下单时选择“增值税发票 ”自助开取。首次开具增值税专用发票的顾客，需要提供加盖公章的 ①税务登记证副本复印件
               ②一般纳税人资格证书或认定文件复印件，填写资质信息后选择上传资质证件扫描件，
               收到您的开票资料后，会尽快审核。</p>
             <ul>
               <li>具体操作路径（资质上传地址）：会员---账户中心-账户信息-增票资质，
                 您提供的增票资质信息也可以在此路径下查询获取。</li>
               <li> <span class="reds">注意：有效增值税开票资质仅为一个。</span></li>
             </ul>
           </li>
           <li>
             <span class="reds">(8)我想办理退换货如何操作？</span>
             <p >紧商网为您提供了自助申请退换货的服务，符合退换要求的商品可登录后进入"会员中心—我的订单"点击"申请退换货"自助完成退换货的申请。</p>
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
  .reds{
    color: #e8000e;
  }
  .helptip{
    margin-top:20px;
  }
  .helptip li{
    margin:20px 12px;
  }
</style>
