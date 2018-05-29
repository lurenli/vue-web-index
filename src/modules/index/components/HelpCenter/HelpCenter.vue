<template>
    <div class="HelpCenter">
        <div class="helpSide">
          <div class="title">帮助中心</div>
        <div class="sideBar" v-for="(footMsg,index) in footMsgs">
          <div class="sideHead">
            <img v-bind:src="footMsg.img" class="pngFix">{{footMsg.name}}
          </div>
          <ul>
            <li v-for="(msg,sonindex) in footMsg.fDetails" >
              <a style="cursor: pointer" :class="{active: activeName == index+'|'+ sonindex}" @click="jump(msg.sonRouter);selected(index,sonindex)">{{msg.tip}}</a>
            </li>
          </ul>
        </div>
      </div>
        <router-view class="contentCss"></router-view>
     </div>
</template>

<script>
    export default{
        name:'HelpCenter',
        data(){
            return {
              activeName:"",
                footMsgs: [
                {
                  name: '关于我们',img:require("../../assets/helpcenter/about.png"),
                  fDetails: [
                    {tip: '关于紧商',sonRouter:"AboutJs"},
                    {tip: '团队文化',sonRouter:"TeamCulture"},
                    {tip: '商务合作',sonRouter:"BusinessCooperation"},
                    {tip: '联系客服',sonRouter:"CustomerService"},
                  ]
                },
                {
                  name: '购物指南',img:require("../../assets/helpcenter/shop.png"),
                  fDetails: [
                    {tip: '购物流程',sonRouter:"ShoppingProcess"},
//                    {tip: '会员介绍',sonRouter:"MemberIntroduction"},
                    {tip: '常见问题',sonRouter:"CommonProblems"},
                    {tip: '积分计划',sonRouter:"IntegralPlan"}
                  ]
                },  {
                  name: '配送方式',img:require("../../assets/helpcenter/about.png"),
                  fDetails: [
                    {tip: '上门自提',sonRouter:"DoorTake"},
                    {tip: '物流配送',sonRouter:"LogisticsDistribution"},
                    {tip: '快递配送',sonRouter:"CourierDelivery"}
                  ]
                },  {
                  name: '付款方式',img:require("../../assets/helpcenter/pay.png"),
                  fDetails: [
                    {tip: '在线支付',sonRouter:"OnlinePayment"},
                    {tip: '紧商授信',sonRouter:"JsCredit"}
                  ]
                },  {
                  name: '售后服务',img:require("../../assets/helpcenter/server.png"),
                  fDetails: [
                    {tip: '售后政策',sonRouter:"SalesPolicy"},
                    {tip: '退换流程',sonRouter:"ReturnProcess"},
                    {tip: '退款说明',sonRouter:"RefundInstructions"},
                    {tip: '取消订单',sonRouter:"CancelOrder"},
                  ]
                },
              ],
            }
        },

      methods:{
        selected: function(index,sonindex) {
          this.activeName = index+"|"+sonindex;
        },
        jump:function(MyName){
          this.$router.push({name:MyName})
        },
      },

      mounted: function () {

      }
    }
</script>
<style scoped>
  .HelpCenter{
    width:1200px;
    margin:0 auto;
    background: #f9f9f9;
    overflow: hidden;
  }
  /*侧边栏*/
  .helpSide{
    display: inline-block;
    width: 200px;
    min-height: 700px;
    background-color: #fff;
    border:1px solid #f2f2f2;
    font-size: 14px;
  }
  .HelpCenter  .title{
    height: 50px;
    min-height: 50px;
    text-align: center;
    color: #333;
    border: 1px solid #f2f2f2;
    font-size: 20px;
    width: 200px;
    background-color: #fff;
    padding-top: 11px;
  }
  .helpSide .sideBar{
    padding-left:66px;
    margin-top:24px;
  }
  .sideHead{
    position: relative;
    font-size: 16px;
    color:#414141;
    font-weight: bold;
  }
  .pngFix{
    position: absolute;
    left: -24px;
    top: 4px;
    display: inline-block;
    height: 15px;
    width: 15px;
  }
  .helpSide ul{
    padding: 0;
  }
  .helpSide li {
    list-style: none;
    margin: 10px 0;
  }
  /*c侧边栏悬停颜色*/
  .active{
    color:#c40000;
    border: none;
  }
.contentCss{
  font-size: 14px;
  color:#666;
}
</style>
