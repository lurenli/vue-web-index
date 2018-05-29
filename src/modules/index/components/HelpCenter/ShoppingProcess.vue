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
      <span>购物流程</span>
    </div>
    <div class="helpmsg">
      <div class="itemname">
        <i class="icon"></i>
        <span class="itemtitle">购物流程</span>
      </div>
      <div class="helpcontent">
        <ul class="msg">
          <li>
            1、点击“登录”按钮，登录商城，未注册的用户点击“注册”按钮进行免费注册，注册会员后即登录。
            <img src="../../assets/helpcenter/picchuli.png" height="500" width="700"/>
          </li>
          <li>
            2、在首页的“搜索”栏中输入需要购买的产品，或在商品分类列表中直接选择需要购买的产品。
            <img src="../../assets/helpcenter/picchuli.png" height="500" width="700"/>
          </li>
          <li>
            3、<span class="red">在拟购买栏中点击“详情”按钮，了解更多信息；</span>或直接点击“购买”按钮将产品放入购物车中。
            <img src="../../assets/helpcenter/picchuli.png" height="500" width="700"/>
          </li>
          <li>
            4、输入购买数量后点击“加入购物车”。
            <img src="../../assets/helpcenter/picchuli.png" height="500" width="700"/>
          </li>
          <li>
            5、点击右上角“购物车”可查看购买产品情况。
            <img src="../../assets/helpcenter/picchuli.png" height="500" width="700"/>
          </li>
          <li>
            <span class="reds"> 6、确认无误后点击“结算”按钮进入支付页面。</span>
            <img src="../../assets/helpcenter/picchuli.png" height="500" width="700"/>
          </li>
          <li>
            7、填写收货地址、支付方式、配送方式及开票信息；确认商品清单无误后点击“提交订单”按钮进行支付。
            <img src="../../assets/helpcenter/picchuli.png" height="500" width="700"/>
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
  .msg{
    margin-top:20px;
  }
  .msg li{
    margin:20px 0;
  }
  .msg li img{
    width:700px;
   margin: 12px 0 12px 30px;
  }
  .reds{
    color: #e8000e;
  }
</style>
