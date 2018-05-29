import Vue from 'vue'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import store from './store/index'

import './res_v4.0/css/common.css';
import './res_v4.0/css/commonality.css';
import './res_v4.0/css/head.css';
import './res_v4.0/css/fonts/iconfont.css';
import './res_v4.0/css/style.css';
import './res_v4.0/css/lrtk0.css';
import 'swiper/dist/css/swiper.css'
import './css/city.css';
Vue.config.productionTip = false;
import http from '../../utils/http';
import utils from '../../utils/common';
Vue.use(http);
Vue.use(utils);
//elementUI  按需引入
import {
  Select, Pagination,
  Option,Rate,Tag,Message,Button,Loading,
  InputNumber,Radio,RadioGroup,RadioButton,Dialog,Form,Input,FormItem
} from 'element-ui'
Vue.prototype.$message = Message;//消息弹框（不要加vue.use(message),否则会报错）
Vue.use(Select);
Vue.use(Pagination);//分页
Vue.use(Option);
Vue.use(Rate);//评分
Vue.use(Tag);//标签
Vue.use(Button);//按钮
Vue.use(InputNumber);//计数器
Vue.use(Radio);//单选框
Vue.use(RadioGroup);//单选框组
Vue.use(RadioButton);//单选框组
Vue.use(Dialog);//弹出框
Vue.use(Form);//表单
Vue.use(Input);//输入框
Vue.use(FormItem)//表单元素
Vue.use(Loading)//数据加载效果

import oss from '../../utils/oss';
Vue.use(oss);
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);
router.beforeEach((to,from,next)=>{
  var To=to.name;
  store.commit('titleStoreinfos',To);
  next();
});
// router.beforeEach((to,from,next)=>{
//   if(store.state === undefined){
//     store.commit('init');
//   }
//   // next();
//   // 处理需要auth的
//   if (to.matched.some(record => record.meta.login===true)) {
//     // 判断store里有无logininfo，没有则跳转
//     console.log(to);
//     next();
//     // if(store.state.token === undefined){
//     //   store.commit("updateRedirect",to.path);
//     //   next({name:"login"});
//     // }else{
//     //   next();
//     // }
//   } else if(to.name=== "login" && store.state.token !== undefined){
//     // 直接访问login的
//     // 说明是已经登录的就回原处
//     next(from.path);
//   }else {
//     next();
//   }
// });


/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
