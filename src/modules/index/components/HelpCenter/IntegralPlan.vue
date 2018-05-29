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
      <span>积分计划</span>
    </div>
    <div class="helpmsg">
      <div class="itemname">
        <i class="icon"></i>
        <span class="itemtitle">积分信息</span>
      </div>
      <div class="helpcontent">
        <p>
          (1)在紧商网成功购物即可获取积分。
          除特价商品、团购商品、非紧商品牌商品外，所有商品购物积分为“实际商品支付金额”；
          商品添加至“我的购物车”后即可查看该商品的积分；
        </p>
        <p>
          (2)完善个人资料获取积分
          注册成功后，在紧商网完善个人信息即可获得一定积分。
        </p>
        <ul class="msg">
          <li class="lititle">提示：</li>
          <li>1、商品购物积分为“实际商品支付金额”，所有积分如计算后出现小数点后一位，小数点后位不计入积分。</li>
          <li>2、此规则自2016年9月1日起执行，感谢您对紧商网的支持，紧商网将为您提供最优质的商品及服务。</li>
        </ul>
        <div class="content">
          <div class="itemname">
            <i class="icon"></i>
            <span class="itemtitle">积分的状态</span>
          </div>
          <p>由于紧商网承诺7天退换货，因此，积分的累积将在相关订单确认收货7天后开始计算。例如：某用户订单的确认收货时间为2017年7月20日，则积分的累积和会员级别都将从7天以后，即2017年7月27日开始计算。</p>
        </div>
        <div class="content">
          <div class="itemname">
            <i class="icon"></i>
            <span class="itemtitle">积分的有效期</span>
          </div>
          <p>任何账户中的积分，其有效期为终身。</p>
        </div>
        <div class="content">
          <div class="itemname">
            <i class="icon"></i>
            <span class="itemtitle">积分查询</span>
          </div>
          <p>会员可拨打客服电话或登录网站“我的帐户”查询积分。</p>
        </div>
        <div class="content">
          <div class="itemname">
            <i class="icon"></i>
            <span class="itemtitle"> 积分换购</span>
          </div>
          <ul class="msg">
            <li>1、积分换购商品均采用“积分兑换”的方式，会员帐户中的积分不用于直接兑换现金。</li>
            <li>2、购买积分换购商品由紧商网提供包邮服务。</li>
            <li>3、购买积分换购商品时，所需积分将自动扣除。</li>
            <li>4、积分换购商品不享受现行的退换货政策和保障。</li>
          </ul>
        </div>
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
  .content{
    margin-top:30px;
  }
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
