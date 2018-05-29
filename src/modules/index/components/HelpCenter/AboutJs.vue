<template>
  <div class="helpDetail">
    <div class="bread">
        <span>您的位置：</span>
       <a>首页</a>
      <span>&gt;</span>
      <span>帮助中心</span>
        <span>&gt;</span>
      <span>关于我们</span>
      <span>&gt;</span>
      <span>关于紧商</span>
    </div>
    <div class="helpmsg">
      <div class="itemname">
          <i class="icon"></i>
        <span class="itemtitle">关于紧商</span>
      </div>
      <div class="helpcontent">
        <p>
          紧商科技的前身是杭州一键通电子商务有限公司，
          成立于2009年，主要从事互联网资讯和网上贸易信息服务，
          2016年，紧商科技股份有限公司在一键通的基础上进行组建，注册资本6000万元，完成第一轮增资，实收资本1.47亿元。计划投资15亿元人民币。
        </p>
        <p>
          紧商网以紧固件行业为后盾，市场需求为导向，应用互联网+紧固件产业模式，为用户提供工业品网上交易服务，形成工业品销售结算中心，打造全球工业品供应链第一品牌。
        </p>
        <p>建立长三角以杭州湾为中心的仓储中心，集仓储、配套服务为一体的综合性管理总部，仓储中心，形成完整的供应链，从而为用户提高效率，一体化综合性服务，
          逐步辐射全国。未来在珠三角、长三角、渤海湾以及西南地区建立基地，形成一中心四基地，实现全国紧固件产业服务全覆盖。降底客户采购成本，为客户提升价值服务
        </p>
        <div class="content">
          <div class="itemname">
            <i class="icon"></i>
            <span class="itemtitle">联系方式</span>
          </div>
          <ul  class="msg">
            <li>座机：0571-57173777、 0571-83693827、  0571-83693828</li>
            <li>地址：浙江省杭州市萧山区党湾镇镇中路9号</li>
            <li>公众号：紧商网</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default{
        name:"AboutJs",
        data(){
            return {

            }
        }
    }
</script>
<style scoped>
  @import "../../css/helpcentercommon.css";
  /*中心内容*/
  /*联系方式*/
  .content{
    margin-top:30px;
  }
  .msg{
    margin-top:20px;
  }
  .msg li{
    margin:20px 0;
  }
</style>
