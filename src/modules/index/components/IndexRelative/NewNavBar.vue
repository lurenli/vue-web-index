<template>
  <div class="NewNavBar" id="NewNavBar">
    <div id="Menu" class="clearfix">
      <div class="index_style clearfix">
        <div id="allSortOuterbox">
          <div class="t_menu_img"></div>
          <div class="Category"><span style="padding-right: 25px;">商品分类</span><img src="../../assets/icon/drop_down3.png" style="vertical-align: baseline"/></div>
          <div class="hd_allsort_out_box_new" :style="$route.name==='Index'?'display: block':''">
            <!--左侧栏目开始-->
            <ul class="Menu_list" >
              <li class="titleName" v-for="(goods,index) in goodsList">
                <div class="title_left" v-on:mouseenter="dataDetails(index)" v-on:mouseleave="hiddenDetails()" v-bind:class="{activetitle:showIndex ===index }">
                  <span class="name_info" @click="jumpsearchA(goods)">{{goods.showCate.maincategory}}</span>
                  <img src="../../assets/icon/drop_down5.png" class="right_icon"/>
                </div>
              </li>
              <div class="detail_info" v-for="(goods,index) in goodsList" v-if="showIndex===index" v-on:mouseenter="dataDetails(index)" v-on:mouseleave="hiddenDetails()">
                <!--<div class="title_top">{{goods.name}}</div>-->
                <div v-if="goods.showCate.type =='紧固件'">
                  <div class="img_warp_choose">
                    <div v-for=" (img,index) in goods.showCateFastenerDetailList" class="choose_img" v-bind:class='{choose_img2 : hover1===index}' v-on:mouseenter="chooseHover1(index)" @click="caizhiJump(img.material)">
                      <img :src="$oss.publicUrl(img.materialImg)" alt="">
                      <div style="text-align: center;height: 30px;line-height: 30px">{{img.material}}</div>
                    </div>
                  </div>
                  <div class="name_info2"  v-for="item in goods.showCateFastenerDetailList[hover1].showCateFastenerStandList">
                    <div class="info_left" @click="leiJump(item.level2category,goods.showCate.type)">{{item.level2category}}</div>
                    <div class="info_right">
                    <span v-for="items in item.showCategoryList" @click="nameJump(items.name,goods.showCate.type)" v-on:mouseenter="chooseHover2(items.img)" v-on:mouseleave="moveHover2()" class="warp_img">
                      {{items.name}}<img v-if="showImg ===items.img && items.img" class="item_img" :src="$oss.publicUrl(items.img)" alt="">
                    </span>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="name_info3"  v-for="item in goods.showCateOtherDetailList">
                    <div class="info_left" @click="leiJump(item.level2category,goods.showCate.type)">{{item.level2category}}</div>
                    <div class="info_right2">
                    <span v-for="items in item.showCategoryList" @click="nameJump(items.name,goods.showCate.type)"  class="warp_img">
                      {{items.name}}<img v-if="showImg ===items.img && items.img" class="item_img" :src="$oss.publicUrl(items.img)" alt="">
                    </span>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
        <!--菜单栏-->
        <div class="Navigation" id="Navigation">
          <ul class="Navigation_name" style="width: 1000px">
            <li class="sli"  @click="navalist.isnew==1?selected2(index):selected(index)" :class="{'active':navalist.nalink==$store.state.titleStoreinfo&&$route.name!='Index'}" v-for="(navalist,index) in navalists">
              {{navalist.natitle}}
            </li>
          </ul>
        </div>
        <div class="banner_login" v-if="$store.state.loginInfo!==undefined" :style="$route.name==='Index'?'display: block':''">
          <div class="user_loginTop">
            <div class="banner_loginImg" @click="toUserCenter" v-if="$store.state.loginInfo.favicon&&$store.state.loginInfo.favicon!=null">
              <img :src="$oss.publicUrl($store.state.loginInfo.favicon)" style="width: 58px;height: 58px;border-radius: 50%" />
            </div>
            <div class="banner_loginImg" @click="toUserCenter" v-if="$store.state.loginInfo.favicon==null || $store.state.loginInfo.favicon==''">
              <img src="../../assets/icon/logo3.png" style="width: 58px;height: 58px;border-radius: 50%"/>
            </div>
            <div class="banner_userLogin2">
              <div class="user_name">
                {{$store.state.loginInfo.username}}
              </div>
              <div class="welcome_msg">
                hi，欢迎来到紧商网
              </div>
            </div>
          </div>
          <div class="user_loginDown">
            <div class="user_loginDown_title user_loginDown_title2">
              <div class="user_loginDown_img"><img src="../../assets/images/fast_msg.png" /></div>
              <p class="user_loginDown_msg" @click="tomore">更多</p>
            </div>
            <div style="width: 100%;height: 167px">
              <div class="user_loginDown_content" v-for="msg in fastlists">
                <span @click="clickfast(msg)"><span  style="color: #808080; margin-right:10px;">[通知]</span>{{msg.doctitle}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="banner_login" v-else  :style="$route.name==='Index'?'display: block':''">
          <div class="user_loginTop">
            <div class="banner_loginImg"><img src="../../assets/icon/logo2.png" /></div>
            <div class="banner_userLogin">
              <div id="logins_btn" class=" register_login" @click="jump('login1')">登录</div>
              <div id="registers_btn" class=" register_login" @click="jump('SignUp1')">注册</div>
            </div>
          </div>
          <div class="user_loginDown">
            <div class="user_loginDown_title">
              <div class="user_loginDown_img"><img src="../../assets/images/fast_msg.png" /></div>
              <p class="user_loginDown_msg"  @click="tomore">更多</p>
            </div>
            <div class="user_loginDown_content" v-for="msg in fastlists">
              <span @click="clickfast(msg)"><span  style="color: #808080; margin-right:10px;">[通知]</span>{{msg.doctitle}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .Menu_list li{
    height: 30px;
  }
  .warp_img{
    position: relative;
  }
  .warp_img:hover{
    color:#e8000e;
  }
  .item_img{
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: #e8000e;
    top: 20px;
    left:0;
  }

  .NewNavBar{
    border-bottom: 2px solid #e8000e;
    background-color: #fff;
  }
  .sli {
    font-size: 16px;
    color: #ffffff;
    border: #fff;
    /*width: 130px;*/
    line-height: 44px;
    cursor: pointer;
  }
  .active, .active2, .active3, .active4, .active5, .active6, .active7{
    /*font-size: 18px;*/
    color: #e8000e !important;
  }
  .hd_allsort_out_box_new{
    display: none;
  }
  #allSortOuterbox:hover .hd_allsort_out_box_new{
    display: block;
  }
  .slihover{
    /*font-size: 18px;*/
    color: #e8000e !important;
  }
  .banner_login{
    width: 200px;
    height: 382px;
    position: absolute;
    top: 46px;
    right:0;
    z-index: 2;
    background: #fff;
    display: none;
  }
.user_loginDown_img{
  margin-top: -13px;
}
  .banner_userLogin{
    height: 70px;
    line-height: 70px;
    margin-top: 50px;
  }
  .banner_userLogin2{
    height: 70px;
    line-height: 46px;
    margin-bottom: 24px;
  }
  #logins_btn{
    color: #fff;
    background: #e8000e;
  }
  .register_login{
    width: 68px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #e8000e;
    text-align: center;
    font-size: 14px;
    display: inline-block;
    margin-left: 20px;
    cursor: pointer;
  }
  .register_login:hover{
    width: 68px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #e8000e;
    text-align: center;
    font-size: 14px;
    display: inline-block;
    margin-left: 20px;
    color: #fff;
    background: #e8000e;
  }
  .user_name{
    text-align: center;
  }
  .banner_loginImg{
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
  }

  .welcome_msg{
    text-align: center;
    font-size: 14px;
    color:#e8000e;
  }
  .user_loginTop{
    /*padding-bottom: 42px;*/
    border-bottom: 1px solid #ccc;
  }

  .user_loginDown_title{
    overflow: hidden;
    padding: 0 18px;
    width: 204px;
  }
  .user_loginDown_title2{
    overflow: hidden;
    /*padding: 18px;*/
    width: 204px;
  }
  .user_loginDown_img{
    float: left;
  }
  .user_loginDown_msg{
    float: right;
    color: #808080;
    cursor: pointer;
  }
  .user_loginDown_msg:hover{
    color: #e8000e;
  }
  .user_loginDown_msg>span{
    color: #908e8e;
    margin-left: 10px;
    font-size: 14px;
  }
  /*快讯模块*/
  .user_loginDown_content{
    width: 200px;
    color: #424242;
    overflow: hidden;
    line-height: 14px;
  }
  .user_loginDown_content>span{
    display: inline-block;
    padding:5px 18px;
    width: 200px;
    color: #424242;
    cursor: pointer;
    overflow: hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
.banner_userLogin{
  margin-bottom: 10px;
}
  .user_loginDown_content2{
    line-height: 28px;
  }
</style>
<script>
    export default{
        name:'NewNavBar',
        data(){
            return {
              showImg:'',
              hover1:0,
              active:50,
              showIndex:null,
              goodsList:[],
              loginState:0,
              fastlists:[],
              navalists:[],
//              快讯更多的跳转
              docid:"",
              searchKey:'',
            }
        },
      methods:{
        chooseHover1(index){
          this.hover1 = index;
        },
        chooseHover2(img){
          this.showImg =img;
        },
        moveHover2(){
          this.showImg ='';
        },

        checkEr(){
          if(this.hover1!==0){
            this.hover1 = 0;
          }
        },

        toUserCenter(){
          window.href='/usercenter';
        },
//            快讯中心更多。。。
            tomore:function(){
              this.$router.replace({ name:'alerts',params:{docid:this.docid}});
            },
//            目录切换时---清空搜索词（添加新的目录时记得调这个方法）
        keyclear:function(){
          localStorage.removeItem("searchKey");
          localStorage.removeItem("FsearchKey");
          localStorage.removeItem("Fsearch2");
        },
          //首页导航
        getnavagation(){
          let vue = this;
          let param ={
            naType:"自定义导航",
          };
          vue.$http.post(
            vue, "/rest/front/Navigation/list", param,
            function (vue, data) {
              // 成功处理
              vue.navalists=data.data;
            },function (error,data) {
              // 错误处理
            });
        },
//            快讯的获取
        faselist:function(){
          let vue = this;
          let param ={
            articleCategoryName:"快讯",
            num:5,
          };
          // console.log(param);
          vue.$http.post(
            vue, "/rest/front/ArticeFront/homepage/list", param,
            function (vue, data) {
              // 成功处理
              vue.fastlists=data.data;
              vue.docid=(data.data)[0].docid;
            },function (error,data) {
              // 错误处理
            });
        },
        clickfast:function(data){
          window.open('/FastCenter/alertsDetail/' + data.id);
//          this.$router.replace({ name:'alertsDetail',params:{ id:data.id}});
        },
        jump:function(MyName){
            this.$router.push({name:MyName});
            this.keyclear();
        },
        selected: function(index) {
            let SearchURL="search";
          this.active = index;
          if(this.navalists[index].nalink=='CheckStand'){
            location.href = "/CheckStand";
          }
          else if(this.navalists[index].nalink==='IndustrialProducts'||this.navalists[index].nalink==='LifeQuality'||this.navalists[index].nalink==='IndustrialQuality'){
            this.$router.push({path:'/'+this.navalists[index].nalink+'/'+SearchURL});
          }
          else{
            this.$router.push({name:this.navalists[index].nalink});
          }
        },
        selected2: function(index) {
          this.active = index;
          let Iurl='';
          let SearchURL="search";
          if(this.navalists[index].nalink=='CheckStand'){
            window.open('/CheckStand',"_blank")
          }
          else if(this.navalists[index].nalink==='IndustrialProducts'||this.navalists[index].nalink==='LifeQuality'||this.navalists[index].nalink==='IndustrialQuality'){
            Iurl='/'+this.navalists[index].nalink+'/'+SearchURL;
            window.open(Iurl,"_blank")
          }
          else{
            window.open(this.navalists[index].nalink,"_blank")
          }
        },
        changeState:function () {
          let state = window.localStorage.getItem('loginState');
          if(state){
            this.loginState = state
          }else{
            // console.log('未登录')
          }
        },
        //获取产品分类
        getGoodsList(){
          let vue = this;
          let param ={};
          vue.$http.post(
            vue,'/rest/front/index/listShowCate',param,
            function (vue,data) {
//               console.log(data.data.list);
              vue.goodsList = data.data.list;
//              console.log(vue.goodsList)
            },function (error, data) {
//               console.log(data.message);
//              vue.goodsList = data.data.list;
            }
          )
        },
//        第一级的跳转
        jumpsearchA:function(val){
          let SearchURL='';
          if(val.showCate.type=="紧固件"){
            this.hiddenDetails();
            SearchURL='/IndustrialProducts/search'+'-'+'searchKey'+'_'+val.showCate.maincategory;
            window.open(window.location.origin+SearchURL);
//            this.$router.push({name:'IndustrialProducts'});
//            this.$store.commit("search", 1);
//            localStorage.setItem("searchKey",val.showCate.maincategory);
          }else if(val.showCate.type=="生活类"){
            this.hiddenDetails();
            SearchURL='/LifeQuality/search'+'-'+'FsearchKey'+'_'+val.showCate.maincategory;
            window.open(window.location.origin+SearchURL);
//            this.$router.push({name:'LifeQuality'});
//            this.$store.commit("Fsearch", 1);
//            localStorage.setItem("FsearchKey",val.showCate.maincategory);
          }else{
            SearchURL='/IndustrialQuality/search'+'-'+'FsearchKey2'+'_'+val.showCate.maincategory;
            window.open(window.location.origin+SearchURL);
//            this.$router.push({name:'IndustrialQuality'});
//            this.$store.commit("Fsearch2", 1);
//            localStorage.setItem("FsearchKey2",val.showCate.maincategory);
          }
        },
//        材质的跳转
        caizhiJump:function(data){
          let SearchURL='';
          SearchURL='/IndustrialProducts/search'+'-'+'searchKey'+'_'+data;
          window.open(window.location.origin+SearchURL);
//          this.$router.push({name:'IndustrialProducts'});
//          this.$store.commit("search", 1);
//          localStorage.setItem("searchKey",data);
        },
        leiJump:function(data,type){
          let SearchURL='';
          if(type==="紧固件"){
            this.hiddenDetails();
            SearchURL='/IndustrialProducts/search'+'-'+'level2'+'_'+data;
            window.open(window.location.origin+SearchURL);
//            location.href='/IndustrialProducts?level2='+data
          }else if(type==="生活类"){
            this.hiddenDetails();
            SearchURL='/LifeQuality/search'+'-'+'level2'+'_'+data;
            window.open(window.location.origin+SearchURL);
//            location.href='/LifeQuality?level2='+data
          }else{
            this.hiddenDetails();
            SearchURL='/IndustrialQuality/search'+'-'+'level2'+'_'+data;
            window.open(window.location.origin+SearchURL);
//            location.href='/IndustrialQuality?level2='+data
          }
        },
        nameJump:function(data,type){
          let SearchURL='';
          if(type==="紧固件"){
            this.hiddenDetails();
//            location.href='/IndustrialProducts?level3='+data
            SearchURL='/IndustrialProducts/search'+'-'+'level3'+'_'+data;
            window.open(window.location.origin+SearchURL);
          }else if(type==="生活类"){
            this.hiddenDetails();
//            location.href='/LifeQuality?level3='+data
            SearchURL='/LifeQuality/search'+'-'+'level3'+'_'+data;
            window.open(window.location.origin+SearchURL);
          }else{
            this.hiddenDetails();
            SearchURL='/IndustrialQuality/search'+'-'+'level3'+'_'+data;
            window.open(window.location.origin+SearchURL);
//            location.href='/IndustrialQuality?level3='+data
          }
        },
        dataDetails(a){
          this.showIndex = a;
        },
        hiddenDetails(){
          this.showIndex = -1;
        }
      },
      mounted() {
        this.changeState();
        this.faselist();
        this.getGoodsList();
        this.getnavagation();
      },
      watch:{
          'showIndex':'checkEr'
      }
  }
</script>
<style scoped>
  .Navigation_name .sli{
    color:#76746F;
  }
  .Navigation_name .sli:hover{
    color:#e60311;
  }
  .activetitle{
    background-color: #fff;
    width: 100%;
    color: #ff0000!important;
  }
  .titleName{
    color:#fff;
    position: relative;
  }
  .title_left{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }
  .title_left:first-child{
    margin-top: 1px;
  }
  /*下拉目录的栏目*/
  .img_warp_choose{
    padding: 5px 0 5px 5px;
    width: 60px;
    overflow: hidden;
    float: left;
  }
  .img_warp_choose img{
    width: 48px;
  }
  .choose_img{
    cursor: pointer;
    padding: 10px 5px 10px 0;
    border-right:3px #fef5f4 solid ;
  }
  .choose_img:hover{
    color: #e8000e;
  }
  .choose_img2{
    border-right:3px #e8000e solid ;
  }


  .name_info{
    display: inline-block;
    height: 30px;
    margin-left: 15px;
    cursor: pointer;
  }
  .right_icon{
    float: right;
    margin: 9px 15px;
  }
  .detail_info{
    width: 800px;
    position: absolute;
    left: 200px;
    min-height: 384px;
    top:1px;
    border: 1px solid #f2f2f2;
    background-color: #fff;
  }
  .title_top{
    margin-left: 6%;
    height: 24px;
    color: black;
    font-weight: 600;
    line-height: 24px;
    font-size: 18px;
    padding-left: 8px;
    border-left: 4px solid #ff0000;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .name_info2{
    /*min-height: 30px;*/
    margin-left: 80px;
  }
  .name_info2:last-child{
    margin-bottom:20px;
  }
  .name_info3{
    /*min-height: 30px;*/
    /*margin-left: 20px;*/
  }
  .name_info3:last-child{
    margin-bottom:20px;
  }
  .info_left:hover{
    color: #e8000e;
  }
  .info_left{
    display: inline-block;
    /*vertical-align: top;*/
    width: 110px;
    min-height: 25px;
    line-height: 20px;
    text-align: right;
    font-size: 14px;
    color: #424242;
    font-weight:500;
    cursor: pointer;
  }
  .info_left2{
    display: inline-block;
    /*vertical-align: top;*/
    width: 110px;
    min-height: 25px;
    line-height: 20px;
    text-align: right;
    font-size: 14px;
    color: #424242;
    font-weight:500;
    cursor: pointer;
  }

  /*具体类目的展开的子项*/
  .info_right{
    min-height: 25px;
    line-height: 20px;
    margin-left: 20px;
    display: inline-block;
    width: 500px;
    border-bottom: 1px lavender dashed;
    vertical-align: middle;
    margin-bottom: 1px;
  }
  .info_right span{
    display: inline-block;
    margin: 0 10px;
    cursor: pointer;
  }
  .info_right2{
    min-height: 25px;
    line-height: 20px;
    margin-left: 20px;
    display: inline-block;
    width: 580px;
    border-bottom: 1px lavender dashed;
    vertical-align: middle;
    margin-bottom: 1px;
  }
  .info_right2 span{
    display: inline-block;
    margin: 0 10px;
    cursor: pointer;
  }
</style>

