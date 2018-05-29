<template>
    <div class="MyFooter">
          <!--底部文章开始-->
            <div class="fDetail" >
              <ul v-for="footMsg in footMsgs">
                <li>{{footMsg.name}}</li>
                <li v-for="fDetail in footMsg.fDetails" ><a  target="_blank"  @click="jump(fDetail.sonRouter)" style="cursor: pointer">{{fDetail.tip}}</a></li>
              </ul>
            </div>
           <div class="text_links">
            友情链接：
            <a v-for="textLink in textLinks" :href="textLink.link" target="_blank">{{textLink.title}}</a>
          </div>
        <div class="copyright">
          <p>&nbsp;2017紧商科技股份有限公司 浙ICP备16009097号，增值电信业务经营许可证：浙B2-20160606</p>
          <div style="text-align: center"><a target='_blank'  href='http://idinfo.zjaic.gov.cn//bscx.do?method=lzxx&id=3301003301000000135286'><img src='http://idinfo.zjaic.gov.cn//login.do?method=createLZ&id=3301003301000000135286'/></a></div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'MyFooter',
    data:function () {
      return{
        //          商品底部的关于我们....
        footMsgs: [
          {
            name: '关于我们',
            fDetails: [
              {tip: '关于紧商',sonRouter:"AboutJs"},
              {tip: '团队文化',sonRouter:"TeamCulture"},
              {tip: '商务合作',sonRouter:"BusinessCooperation"},
              {tip: '联系客服',sonRouter:"CustomerService"},
            ]
          },
          {
            name: '购物指南',
            fDetails: [
              {tip: '购物流程',sonRouter:"ShoppingProcess"},
//              {tip: '会员介绍',sonRouter:"MemberIntroduction"},
              {tip: '常见问题',sonRouter:"CommonProblems"},
              {tip: '积分计划',sonRouter:"IntegralPlan"}
            ]
          },  {
            name: '配送方式',
            fDetails: [
              {tip: '上门自提',sonRouter:"DoorTake"},
              {tip: '物流配送',sonRouter:"LogisticsDistribution"},
              {tip: '快递配送',sonRouter:"CourierDelivery"}
            ]
          },  {
            name: '付款方式',
            fDetails: [
              {tip: '在线支付',sonRouter:"OnlinePayment"},
              {tip: '紧商授信',sonRouter:"JsCredit"}
            ]
          },  {
            name: '售后服务',
            fDetails: [
              {tip: '售后政策',sonRouter:"SalesPolicy"},
              {tip: '退换流程',sonRouter:"ReturnProcess"},
              {tip: '退款说明',sonRouter:"RefundInstructions"},
              {tip: '取消订单',sonRouter:"CancelOrder"},
            ]
          },
        ],
//        友情链接数据
        textLinks:[
          {title:'奥展',link:'http://www.aozhan.com.cn/index.html'},
          {title:'一键通',link:'http://www.wljgj.com'},
          // {title:'中国工控网',link:'https://www.baidu.com/?tn=94563172_s_hao_pg'},
          // {title:'企汇网',link:'https://www.baidu.com/?tn=94563172_s_hao_pg'},
          // {title:'电子元器件',link:'https://www.baidu.com/?tn=94563172_s_hao_pg'},
          // {title:'久久信息网',link:'https://www.baidu.com/?tn=94563172_s_hao_pg'},
          // {title:'万商汇',link:'https://www.baidu.com/?tn=94563172_s_hao_pg'},
          // {title:'海淘',link:'https://www.baidu.com/?tn=94563172_s_hao_pg'},
          // {title:'塑料机械',link:'https://www.baidu.com/?tn=94563172_s_hao_pg'},
          // {title:'全球商务网',link:'https://www.baidu.com/?tn=94563172_s_hao_pg'},
          {title:'更多',link:'https://www.baidu.com/?tn=94563172_s_hao_pg'}
        ]
      }
    },
    methods:{
      jump:function(name){
        this.$router.push({name:name})
      },
    }
  }
</script>

<style scoped>
  /*首页底部 */
  .MyFooter{
    /*margin-top:30px;*/
    background:#fff;
    border:1px solid #f2f2f2;
    font-size: 14px;
  }
  .fDetail,.text_links{
    overflow: hidden;
    width:1200px;
    margin:16px auto;
  }
  .fDetail ul{
    float:left;
    width:85px;
    margin-right:193px;
  }
  .fDetail ul:last-child{
    margin-right: 0;
  }
  .fDetail ul li{
    margin:14px 0;
  }
  .fDetail ul li:first-child{
    font-size: 18px;
    margin:8px 0;
    font-weight: bold;
  }
  /*友情链接*/
.text_links{
  /*display: none;*/
   padding:14px;
   border-top:2px solid #eeeeee;
   border-bottom:2px solid #eeeeee;
}
.text_links a{
   padding:0 30px;
  border-right:1px solid #eee5dd;
  border-left: 1px solid #e5eeff;
}
.text_links a:first-child,.text_links a:last-child{
  border:none;
}
  /*底部备案号*/
  .copyright {
    font-size: 14px;
    background: #38383c;
    text-align: center;
    color:#fff;
    padding:10px 0;
  }
</style>
