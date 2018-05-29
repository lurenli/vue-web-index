<template>
    <div class="MyHeader" id="MyHeader">
      <my-top></my-top>
      <div class="brand_new" :style="$route.name==='Index'?'display: block':''">
        <div class="brand_new_img" v-if="show">
          <img :src="$oss.publicUrl(imgs)" height="80" width="100%" style="cursor: pointer" @click="jumping"/>
        </div>
      </div>
      <div id="scrollHeader">
      <div id="header" class="header page_style">
        <div class="logo">
            <img src="../../assets/images/logo2.png" @click="jump('Index')" style="cursor: pointer"/>
        </div>
        <!--结束图层-->
        <!--<el-select v-model="searchType" placeholder="请选择">-->
          <!--<el-option label="紧固件" value="1"></el-option>-->
          <!--<el-option label="其他" value="2"></el-option>-->
        <!--</el-select>-->
        <!--<div class="lanren-search-form">-->
          <!--<div id="search-hd" class="search-hd">-->
            <!--<input name="searchType" id="search_act" value="keywordSearch" type="hidden">-->
            <!--<div class="search-bg"></div>-->
            <!--<span>-->
              <!--<input type="text" name="keyword" id="keyword" class="search-input" placeholder="搜索词" v-model="searchKey">-->
              <!--<button id="submit" class="btn-search" value="搜索" @click="gosearch">搜索</button>-->
              <!--</span>-->
          <!--</div>-->
        <div class="lanren-search-form">
        <div id="search-hd" class="search-hd">
           <input name="searchType" id="search_act" value="keywordSearch" type="hidden">
        <div class="search-bg"></div>
        <span>
       <!--<select style="position:relative">-->
          <!--<option value="volvo">Volvo</option>-->
          <!--<option value="saab">Saab</option>-->
          <!--<option value="opel">Opel</option>-->
          <!--<option value="audi">Audi</option>-->
        <!--</select>-->
           <el-select v-model="searchType" placeholder="请选择" class="chooseType" size="small">
            <el-option label="紧固件" :value="1"></el-option>
            <el-option label="工业品" :value="2"></el-option>
            <el-option label="生活类" :value="3"></el-option>
          </el-select>
          <input type="text" name="keyword" id="keyword" class="search-input" placeholder="搜索词" v-model="searchKey" @keyup="searchCommit($event)">
          <button id="submit" class="btn-search" value="搜索" @click="gosearch">搜索</button>
        </span>
        </div>
          <div class="sousuox-lb" v-show="searchType==1">
            <a v-for="(aa,index) in hotword" @click="jumpsearch(aa)">{{aa}}</a>
          </div>
          <div class="sousuox-lb" v-show="searchType==3">
            <a v-for="aa in Fhotword" @click=" jumpsearch(aa)">{{aa}}</a>
          </div>
          <div class="sousuox-lb" v-show="searchType==2">
            <a v-for="aa in Fhotword2" @click=" jumpsearch(aa)">{{aa}}</a>
          </div>
        </div>
        <!--代码部分end-->
        <!--购物车样式-->
        <div class="hd_Shopping_list" id="Shopping_list">
          <div class="s_cart" @click="jump('Pay')">
            <img src="../../assets/icon/shop_car.png" />
            <span>我的购物车</span>(<span class="s_cart_num" >{{getnum}}</span>)
          </div>
          </div>
        </div>
      </div>
      </div>
</template>
<script>
   import MyTop from "../IndexRelative/MyTop.vue";
  export default {
    components: {MyTop},
    name: 'MyHeader',
    data:function () {
      return{
        getnum:0,
        searchKey:'',
        hotword:[],
        Fhotword:[],
        Fhotword2:[],
        getadsManageInfors:[],
        imgs:'',
        searchType:1,
        url:'',
        show:false
      }
    },
   methods:{
     searchCommit(ev){
       if(ev.keyCode==13){
         this.gosearch();
       }
     },
     jumping(){
       window.open(this.url,"_blank");
     },
//     获取紧固件搜索框热搜词
   gethotword:function(){
     let vue = this;
     let param = {
         name:"紧固件热搜"
     };
     vue.$http.post(
       vue, '/rest/common/getcommonDataValue ', param,
       function (vue, data) {
       vue.hotword=data.data.stringList;
       },
       function (error, data) {

       }
     )
   },
     //     获取其他搜索框热搜词
     Fgethotword:function(){
       let vue = this;
       let param = {
         name:"生活类热搜"
       };
       vue.$http.post(
         vue, '/rest/common/getcommonDataValue ', param,
         function (vue, data) {
           vue.Fhotword=data.data.stringList;
         },
         function (error, data) {

         }
       )
     },
     Fgethotword2:function(){
       let vue = this;
       let param = {
         name:"工业品热搜"
       };
       vue.$http.post(
         vue, '/rest/common/getcommonDataValue ', param,
         function (vue, data) {
           vue.Fhotword2=data.data.stringList;
         },
         function (error, data) {

         }
       )
     },
     //获取顶部广告
     getads(){
       let vue = this;
       let param = {};
       param.position='顶部广告位';
       param.count=1;
       vue.$http.post(
         vue, '/rest/front/adt', param,
         function (vue, data) {
           if(data.data==null){
             return false
           }else if(data.data!=''){
           vue.getadsManageInfors = data.data;
           vue.imgs=vue.getadsManageInfors[0].imgs;
           if(vue.url!=''){
             vue.url=vue.getadsManageInfors[0].url;
           }else{
             vue.url='';
           }
             vue.show=data.show;
           }
           else{
             return false
           }
         },
         function (error, data) {

         }
       )
     },
//        点击搜索
     gosearch:function(){
//         console.log(this.searchType)
       let SearchURL="";
       if(this.searchType==1){
         SearchURL="/IndustrialProducts/search"+"-"+"searchKey"+"_"+this.searchKey;
         window.open(window.location.origin+SearchURL);
       }else if(this.searchType==3){
         SearchURL="/LifeQuality/search"+"-"+"searchKey"+"_"+this.searchKey;
         window.open(window.location.origin+SearchURL);
       }else if(this.searchType==2){
         SearchURL="/IndustrialQuality/search"+"-"+"searchKey"+"_"+this.searchKey;
         window.open(window.location.origin+SearchURL);
       }
     },
//     热词的跳转搜索
     //        点击目录项，作为关键词，进行页面的跳转
     jumpsearch:function(val){
        let hotURL="";
       if(this.searchType==1){
         hotURL="/IndustrialProducts/search"+"-"+"searchKey"+"_"+val;
         window.open(window.location.origin+hotURL);
       }else if(this.searchType==3){
         hotURL="/LifeQuality/search"+"-"+"searchKey"+"_"+val;
         window.open(window.location.origin+hotURL);
         this.$router.push({name:'LifeQuality'});
       } else if(this.searchType==2){
         hotURL="/IndustrialQuality/search"+"-"+"searchKey"+"_"+val;
         window.open(window.location.origin+hotURL);
         this.$router.push({name:'LifeQuality'});
       }
     },
     //        获取购物车商品的数量
     getcarnum() {
       let vue = this;
       let param ={
         pageNo:1,
         pageSize:10
       };
       vue.$http.post(
         vue, '/rest/buyer/shopcar/loadAllShopCar', param,
         function (vue, data) {
           vue.getnum=data.data.pageInfo.total;
           vue.$store.commit("newNum", 0);
         },
         function (error, data) {
           console.log(error)
         }
       )
     },
     jump:function(MyName){
       this.$router.push({name:MyName})
     },

   },
    computed: {
      num:function() {
          return this.$store.state.shopcar.num;
      }
    },
    watch: {
      num(val) {
        if(this.$store.state.loginInfo) {
          this.getcarnum();
        }else{
          this.getnum=0;
        }
      }
    },
    mounted() {
      if(this.$store.state.loginInfo) {
        this.getcarnum();
      }
      this.getads();
      this.gethotword();
      this.Fgethotword();
      this.Fgethotword2();
    }
  }
</script>
<style>
 .MyHeader .lanren-search-form .search-hd  .chooseType   .el-input--small .el-input__inner {
    height: 33px;
    vertical-align: top;
    border: none;
  }
 .MyHeader  .el-select .el-input .el-select__caret {
   /*transform: rotateZ(360deg);*/
   transform: rotateX(180deg);
 }
 .MyHeader .el-select .el-input .el-select__caret.is-reverse{
   transform: rotateX(0deg);
 }
</style>
<style scoped>
  #scrollHeader{
    width:100%;
    /*position: fixed;*/
    background-color: #fff;
    z-index:1500;
  }
  .MyHeader{
    background-color: #fff;
  }
  .brand_new{
    background-color: #35046a;
    display: none;
  }
  .brand_new_img{
    width: 100%;
    margin: 0 auto;
  }
   #top .clearfix .hd_menu_tit a {
     line-height: 21px;
   }
  #header{
    overflow: hidden;
    margin: 0 auto;
    /*margin-top: 30px;*/
  }
  .logo{
    cursor: pointer;
  }
  /*搜索框的热词*/
  .sousuox-lb a{
    cursor: pointer;
    font-size: 12px;
  }
  /*搜索框样式的调整*/
  .lanren-search-form .search-hd  .chooseType{
    width: 100px;
    height: 38px;
    line-height: 33px;
    padding-top: 0;
    background: none;
    text-indent: 10px;
    border: 0;
    outline: none;
    position: relative;
    left: 5px;
    top: 0;
    z-index: 5;
    margin-left: -15px;
  }
  .lanren-search-form .search-hd .search-input{
    vertical-align: top;
    width: 440px;
    height: 38px;
    line-height: 33px;
    padding-top: 0;
    background: none;
    text-indent: 10px;
    border: 0;
    outline: none;
    position: relative;
    left: 5px;
    top: 0;
    z-index: 5;
    margin-left: -16px;
  }
</style>
