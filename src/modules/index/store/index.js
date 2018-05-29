import Vue from 'vue'
import Vuex from 'vuex'
import config from '../config'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 会员实例
    member:{
      id: 0
    },
    titleStoreinfo:'',
    //用户的登录状态和登录信息
    loginInfo:undefined,
    //用户的登录状态和登录信息(数据库)
    loginInfo2:undefined,
    token: undefined,
    // 用于登录后跳转
    redirect: undefined,
    //监测购物车
    shopcar:{
      num:0,
    },
    //监测搜索
    tosearch:{
      num:0,
    },
    //监测--非紧固件---搜索
    Ftosearch:{
      num:0,
    },
    Ftosearch2:{
      num:0,
    },
    pdids:'',
    type:0,
    buyGoodsInfo:{},
    payMoney:null,
    pdid2s:'',
    OrderId:'',
    orderDetail:{
      orderno:'',
      orderstate:0
    },
    //买家中心查看订单
    orderType:0,
    tiaojiao:'',
    //充值id
    chargeid:''
  },
  mutations: {
    init(state){
      let dataJson = localStorage.getItem(config.meta.app_name+"-data");
      if(dataJson===null){
        state.member=undefined;state.token=undefined;
      }else{
        let data = JSON.parse(dataJson);
        // 过期策略
        if(new Date().getTime()-data.expire>0){
          rmToken(state);
        }else{
          state.member = data.member;
          state.token = data.token;
        }
      }
    },
    updateMember(state, data){
      state.member = data.member;
      state.token = data.token;
      let localData = {};
      localData.member = data.member;
      localData.token = data.token;
      // 过期时间 20h
      localData.expire = new Date().getTime()+1000*60*60*20;
      localStorage.setItem(config.meta.app_name+"-data",JSON.stringify(localData));
    },
    rmToken(state){
      rmToken(state);
    },
    updateRedirect(state, redirect){
      state.redirect = redirect;
    },
    // 导航数据的存储
    titleStoreinfos(state,n){
      state.titleStoreinfo=n;
    },
    //使用的购物车变化；点击按钮就将值变为0；顶部就会调用方法
    newNum(state,msg){
      state.shopcar.num=msg
    },
    //监测搜索条件的变化
    search(state,msg){
      state.tosearch.num=msg
    },
    //监测--其他---搜索条件的变化
    Fsearch(state,msg){
      state.Ftosearch.num=msg
    },
    Fsearch2(state,msg){
      state.Ftosearch2.num=msg
    },
    changepdids(state,n){
      state.pdids = n;
    },
    changetype(state,n){
      state.type = n;
    },
    changeGoodsInfo(state,n){
      state.buyGoodsInfo = n;
    },
    changepdid2s(state,n){
      state.pdid2s = n;
    },
    rmPayMoney(state,n){
      state.payMoney = n;
    },
    changeOrderId(state,n){
      state.OrderId = n;
    },
    getOrderno(state,n){
      state.orderDetail.orderno = n;
    },
    changeOrderstate(state,n){
      state.orderDetail.orderstate = n;
    },
    //充值id
    chargeid(state,n){
      state.chargeid = n;
    },
    savetijiao(state,n){
      state.tijiao = n;
    },
  //  登录数据的存储
    loginStore(state,n){
      state.loginInfo=n;
    },
    //  登录数据的存储(数据库)
    loginStore2(state,n){
      state.loginInfo2=n;
    },
    //买家中心查看订单
    changeordertype(state,n){
      state.orderType = n;
    }
  }
});

function rmToken(state) {
  state.member=undefined;state.token=undefined;
  localStorage.removeItem(config.meta.app_name+"-data");
}

export default store
