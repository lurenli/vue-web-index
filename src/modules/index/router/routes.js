import Home from '../components/Home/Home.vue';
/*主页*/
import Index from '../components/IndexRelative/Index.vue';
/*首页*/
import login from '../components/Login/login.vue'
/*登录*/
import login1 from '../components/Login/login1.vue'
const qqLogin =()=> import('../components/Login/qqLogin.vue')
const wxLogin =()=> import('../components/Login/wxLogin.vue')
const userBand =()=> import('../components/Login/userBand.vue')
const SignUp =()=> import('../components/SignUp/SignUp.vue')
/*注册*/
const SignUp1 =()=> import('../components/SignUp/SignUP1.vue')
const SignUpActive =()=> import('../components/SignUp/SignUpActive.vue')
const SignUpx =()=> import('../components/SignUp/SignUpx.vue')
const forget1 =()=> import('../components/SignUp/forget1.vue')
const forget2 =()=> import('../components/SignUp/forget2.vue')
const forget3 =()=> import('../components/SignUp/forget3.vue')
const IndustrialProducts =()=> import('../components/IndexRelative/SecondMenu/IndustrialProducts.vue');
/*紧固件*/
const IndustrialQuality =()=> import('../components/IndexRelative/SecondMenu/IndustrialQuality.vue');
/*工业品*/
const LifeQuality =()=> import('../components/IndexRelative/SecondMenu/LifeQuality.vue');
/*生活品*/
const FlashSell = ()=> import('../components/IndexRelative/SecondMenu/FlashSell.vue');
/*限时购*/
const CheckStand = ()=> import('../components/IndexRelative/SecondMenu/CheckStand.vue');
/*限时购*/
const LotteryArea =()=> import('../components/IndexRelative/SecondMenu/LotteryArea.vue');
/*抽奖区*/
const BuySend =()=> import('../components/IndexRelative/SecondMenu/BuySend.vue');
/*买就送*/
const TemptationZone =()=> import('../components/IndexRelative/SecondMenu/TemptationZone.vue');
/*诱惑区*/

//
const industrialXianshi =()=> import('../components/Goods/industrialXianshi.vue')
/*工业品 限时购*/

const FastXianshi =()=> import('../components/Goods/FastXianshi.vue')
/*快消品详情页*/


/*工业品详情页*/
const IndustrialDetail =()=> import('../components/Goods/IndustrialDetail.vue')

/*快消品详情页*/
const FastDetail =()=> import('../components/Goods/FastDetail.vue')
/*帮助中心*/
const HelpCenter =()=> import('../components/HelpCenter/HelpCenter.vue')
       const AboutJs =()=> import('../components/HelpCenter/AboutJs.vue') /*关于紧商*/
       const TeamCulture =()=> import('../components/HelpCenter/TeamCulture.vue')/*团队文化*/
      const BusinessCooperation =()=> import('../components/HelpCenter/BusinessCooperation.vue')/*商务合作*/
       const CustomerService =()=> import( '../components/HelpCenter/CustomerService.vue')/*联系客服*/
     const ShoppingProcess =()=> import('../components/HelpCenter/ShoppingProcess.vue')/* '购物流程'*/
     const MemberIntroduction =()=> import('../components/HelpCenter/MemberIntroduction.vue')/* '会员介绍'*/
      const CommonProblems =()=> import( '../components/HelpCenter/CommonProblems.vue')/* '常见问题'*/
      const IntegralPlan =()=> import( '../components/HelpCenter/IntegralPlan.vue')/* '积分计划'*/
       const DoorTake =()=> import('../components/HelpCenter/DoorTake.vue')/* '上门自提'*/
     const LogisticsDistribution =()=> import( '../components/HelpCenter/LogisticsDistribution.vue')  /* '物流配送'*/
     const CourierDelivery =()=> import( '../components/HelpCenter/CourierDelivery.vue')/* '快递配送'*/
     const OnlinePayment =()=> import('../components/HelpCenter/OnlinePayment.vue')/* '在线支付'*/
     const JsCredit =()=> import( '../components/HelpCenter/JsCredit.vue')/* '紧商授信'*/
      const SalesPolicy =()=> import( '../components/HelpCenter/SalesPolicy.vue')/* '售后政策'*/
     const ReturnProcess =()=> import('../components/HelpCenter/ReturnProcess.vue')/* '退换流程'*/
     const RefundInstructions =()=> import('../components/HelpCenter/RefundInstructions.vue')/* '退款说明'*/
    const CancelOrder =()=> import( '../components/HelpCenter/CancelOrder.vue')/* '取消订单'*/
//   快讯中心相关子模块
const FastCenter =()=> import('../components/FastCenter/FastCenter.vue')
     const alerts =()=> import('../components/FastCenter/alerts.vue')/*快讯列表*/
     const alertsDetail =()=> import('../components/FastCenter/alertsDetail.vue')/*快讯详情*/

/*购物车及支付相关模块*/
const ShopCar =()=> import('../components/ShopCar/ShopCar.vue')
/*购物车*/
const Pay =()=> import('../components/Pay/Pay.vue')
/*结算*/
const PlaceOrder =()=> import('../components/Pay/PlaceOrder.vue')
/*提交订单*/
const Payment =()=> import('../components/Pay/Payment.vue')
/*支付方式选择*/
const PayYinlian =()=> import('../components/Pay/PayYinlian.vue')
/*银联支付*/
const PayZhifubao =()=> import('../components/Pay/PayZhifubao.vue')
/*支付宝支付*/
const PayWeixin =()=> import('../components/Pay/PayWeixin.vue')
/*微信支付*/
const PaySuccess =()=> import('../components/Pay/PaySuccess.vue')
/*支付成功*/
const PayFail =()=> import('../components/Pay/PayFail.vue')
/*支付失败*/
export default [
  {
    path: '/login',
    component: login,
    children: [
      {
        path: '/',
        name: 'login1',
        component: login1
      },
      {
        path: '/userBand',
        name: 'userBand',
        component: userBand
      },
      {
        path: '/qqLogin',
        name: 'qqLogin',
        component: qqLogin
      },
      {
        path: '/wxLogin',
        name: 'wxLogin',
        component: wxLogin
      }
    ]
  },
  {
    path: '/SignUp',
    component: SignUp,
    children: [
      {
        path: '/',
        name: 'SignUp1',
        component: SignUp1
      },
      {
        path: 'SignUpx',
        name: 'SignUpx',
        component: SignUpx
      },
      {
        path: 'SignUpActive',
        name: 'SignUpActive',
        component: SignUpActive
      },
      {
        path: '/forget1',
        name: 'forget1',
        component: forget1
      },
      {
        path: '/forget2',
        name: 'forget2',
        component: forget2
      },
      {
        path: '/forget3',
        name: 'forget3',
        component: forget3
      },

    ]
  },
  {
    path: '/CheckStand',
    name: 'CheckStand',
    component: CheckStand
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Index',
        component: Index
      },
      {
        path: 'Index',
        component: Index
      },
      {
        path: 'IndustrialProducts/:SearchURL',
        name: 'IndustrialProducts',
        component: IndustrialProducts
      },
      {
        path: 'IndustrialQuality/:SearchURL',
        name: 'IndustrialQuality',
        component: IndustrialQuality
      },
      {
        path: 'LifeQuality/:SearchURL',
        name: 'LifeQuality',
        component: LifeQuality
      },
      {
        path: 'FlashSell',
        name: 'FlashSell',
        component: FlashSell
      },
      {
        path: 'TemptationZone',
        name: 'TemptationZone',
        component: TemptationZone
      },
      {
        path: 'LotteryArea',
        name: 'LotteryArea',
        component: LotteryArea
      },
      {
        path: 'BuySend',
        name: 'BuySend',
        component: BuySend
      },
      {
        path: 'IndustrialDetail/:id',
        name: 'IndustrialDetail',
        component: IndustrialDetail
      },
      {
        path:'industrialXianshi/:id/:active',
        name:'industrialXianshi',
        component:industrialXianshi
      },
      {
        path:'FastXianshi/:id/:active',
        name:'FastXianshi',
        component:FastXianshi
      },
      {
        path: 'FastDetail/:id',
        name: 'FastDetail',
        component: FastDetail
      },
      {
        path: 'HelpCenter',
        name: 'HelpCenter',
        component: HelpCenter,
        redirect: {name: 'AboutJs'},
        children:[
          {
            path:'AboutJs',
            alias: '',
            name:'AboutJs',
            component:AboutJs
          },
          {
            path:'TeamCulture',
            name:'TeamCulture',
            component:TeamCulture
          },
            {
            path:'BusinessCooperation',
            name:'BusinessCooperation',
            component:BusinessCooperation
          },
            {
            path:'CustomerService',
            name:'CustomerService',
            component:CustomerService
          },
            {
            path:'ShoppingProcess',
            name:'ShoppingProcess',
            component:ShoppingProcess
          },
            {
            path:'MemberIntroduction',
            name:'MemberIntroduction',
            component:MemberIntroduction
          },
            {
            path:'CommonProblems',
            name:'CommonProblems',
            component:CommonProblems
          },
            {
            path:'IntegralPlan',
            name:'IntegralPlan',
            component:IntegralPlan
          },
            {
            path:'DoorTake',
            name:'DoorTake',
            component:DoorTake
          },
            {
            path:'LogisticsDistribution',
            name:'LogisticsDistribution',
            component:LogisticsDistribution
          },
            {
            path:'CourierDelivery',
            name:'CourierDelivery',
            component:CourierDelivery
          },
            {
            path:'OnlinePayment',
            name:'OnlinePayment',
            component:OnlinePayment
          },
            {
            path:'JsCredit',
            name:'JsCredit',
            component:JsCredit
          },
            {
            path:'SalesPolicy',
            name:'SalesPolicy',
            component:SalesPolicy
          },
            {
            path:'ReturnProcess',
            name:'ReturnProcess',
            component:ReturnProcess
          },
            {
            path:'RefundInstructions',
            name:'RefundInstructions',
            component:RefundInstructions
          },
            {
            path:'CancelOrder',
            name:'CancelOrder',
            component:CancelOrder
          },

          ]
      },
      {
        path: 'FastCenter',
        name: 'FastCenter',
        component: FastCenter,
        children: [
          {
            path: 'alerts/:docid',
            name: 'alerts',
            component: alerts,
            alias: '',
          },
          {
            path: 'alertsDetail/:id',
            name: 'alertsDetail',
            component: alertsDetail,
          }
        ]
      }
    ]
  },
  {
    path: '/ShopCar',
    component: ShopCar,
    redirect: {name: 'Pay'},
    children: [
      {
        path: 'Pay',
        name: 'Pay',
        component: Pay,
        alias: '',
      },
      {
        path: 'PlaceOrder',
        name: 'PlaceOrder',
        component: PlaceOrder,
      },
      {
        path: 'Payment',
        name: 'Payment',
        component: Payment,
      },
      {
        path: 'PaySuccess',
        name: 'PaySuccess',
        component: PaySuccess,
      },
      {
        path: 'PayFail',
        name: 'PayFail',
        component: PayFail,
      },
      {
        path: 'PayWeixin',
        name: 'PayWeixin',
        component: PayWeixin,
      },
      {
        path: 'PayZhifubao',
        name: 'PayZhifubao',
        component: PayZhifubao,
      },
      {
        path: 'PayYinlian',
        name: 'PayYinlian',
        component: PayYinlian,
      }
    ]
  },
];
