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
      <span>会员介绍</span>
    </div>
    <div class="helpmsg">
      <div class="itemname">
        <i class="icon"></i>
        <span class="itemtitle">会员等级</span>
      </div>
      <div class="helpcontent">
        <table class="helptable">
          <tr class="tablethead">
            <td>会员级别</td>
            <td>一级会员</td>
            <td>二级会员</td>
            <td>三级会员</td>
            <td>四级会员</td>
            <td>五级会员</td>
          </tr>
          <tr>
            <td>成长值要求</td>
            <td>0—5999</td>
            <td>6000—49999</td>
            <td>50000—199999</td>
            <td>200000—399999</td>
            <td>400000—无上限</td>
          </tr>
        </table>
        <ul class="tip">
          <li class="lititle">说明：</li>
          <li>1、成长值可通过成功下达订单后获取，订单金额1元等于1成长值。</li>
          <li>2、成长值在订单审核通过后即可获得，平台每季度会对成长值进行一次扣减，具体扣减方法见下列第三表格。</li>
        </ul>
        <div class="content">
          <div class="itemname">
            <i class="icon"></i>
            <span class="itemtitle">会员服务</span>
          </div>
          <table class="helptable">
            <tr class="tablethead">
              <td>紧商会员专属特权</td>
              <td>一级会员</td>
              <td>二级会员</td>
              <td>三级会员</td>
              <td>四级会员</td>
              <td>五级会员</td>
            </tr>
            <tr>
              <td>会员专属价</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
            </tr>
            <tr>
              <td>专属积分兑换</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
            </tr>
            <tr>
              <td>专属促销活动</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
            </tr>
            <tr>
              <td>神秘礼券</td>
              <td>x</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
            </tr>
            <tr>
              <td>会员客服</td>
              <td>x</td>
              <td>x</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
            </tr>
            <tr>
              <td>服务优先</td>
              <td>x</td>
              <td>x</td>
              <td>√</td>
              <td>√</td>
              <td>√</td>
            </tr>
          </table>
          <ul class="tip">
            <li class="lititle">说明：</li>
            <li>1、会员价：不同的产品各级会员价不尽相同，部分产品可能存在不同级别会员价一致的现象。</li>
            <!--<li>2、其他会员福利：正在开发，尽情期待!</li>-->
          </ul>
        </div>
        <div class="content">
          <div class="itemname">
            <i class="icon"></i>
            <span class="itemtitle">会员升级与降级</span>
          </div>
          <p>
            会员的升级为实时进行，当会员成长值达到各等级所要求的数值后会及时自动升级。
            会员的降级是每季度进行一次成长值扣减，以确定新一季度的会员等级。
            每年1月1号、5月1号、9月1号进行一次成长值扣减，具体扣减方式如下：
          </p>
          <table class="helptable">
            <tr class="tablethead">
              <td>会员级别</td>
              <td>一级会员</td>
              <td>二级会员</td>
              <td>三级会员</td>
              <td>四级会员</td>
              <td>五级会员</td>
            </tr>
            <tr>
              <td>应减值</td>
              <td>2000/次</td>
              <td>8000/次</td>
              <td>40000/次</td>
              <td>120000/次</td>
              <td>250000/次</td>
            </tr>
          </table>
          <ul class="tip">
            <li class="lititle">说明：</li>
            <li>1、用“当前会员值减去当前会员应减值”与“当前会员等级最小值减去当前会员前一级会员应减值”做比较，取大的值作为扣减后的会员值。</li>
            <li>2、如果会员在成长值扣减日前一个月内有过升级情况，则本次不做成长值扣减。</li>
          </ul>
        </div>
        <div class="content">
          <div class="itemname">
            <i class="icon"></i>
            <span class="itemtitle">特殊说明</span>
          </div>
          <ul class="tip">
            <li>1、上述各级会员对应的所需成长值及扣减成长值标准会随着平台发展适时进行调整。</li>
            <li>2、关于会员体系的最终解释权归紧商网所有。</li>
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
    margin-top:20px;
  }
  .tip{
    margin-top:20px;
  }
  .tip li{
    margin:20px;
  }
  .tip li.lititle{
    margin:20px 0;
  }
</style>
