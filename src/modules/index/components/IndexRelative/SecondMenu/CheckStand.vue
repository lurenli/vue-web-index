<template>
    <div class="CheckStand">
      <my-top></my-top>
      <div class="stand_top">
          <div class="stand_wrap"><span class="js_logo" @click="jump"></span></div>
          <div class="stand_search">
              <div class="search_box">
                <input name="searchType" id="search_act" value="keywordSearch" type="hidden">
                <div class="search_bg"></div>
                <span>
                    <input type="text" name="keyword" class="search_input" placeholder="搜索词" v-model="listSearch.titleName" >
                    <button  class="search_bt" value="搜索" @click="listPost">标准查询</button>
                  </span>
              </div>
          </div>
        <div class="stand_result">共找到<span style=" color: #e60311;font-weight: bold">{{maxtotal}}个</span>标准查询结果</div>
      </div>
      <div class="stand_border"></div>
       <div class="content">
          <div class="top_left">
            <ul class="topBar">
                <li @click="allclick" :class="{active: activeName == allid}">
                  <span>所有标准</span>
                  <img src="../../../assets/arrow.png">
                </li>
              <li v-for="(msg,index) in topBar" @click="showContent(msg.id);selected(index)"  :class="{active: activeName == index}">
                <span>{{msg.docname}}</span>
                <img src="../../../assets/arrow.png">
              </li>
            </ul>
          </div>
         <div class="top_mid">
              <ul class="show_ul" v-show="showType==0">
                <li v-for="son in showMsg" @click="standDetail(son.id)">
                  <span>{{son.doctitle}}</span>
                  <div>
                     <img :src="$oss.publicUrl(son.pic)">
                  </div>
                </li>
              </ul>
           <div class="standPage" v-show="showType==0">
             <el-pagination   v-if="maxtotal!=0"
               style="text-align: right"
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="listSearch.pageNo"
               :page-sizes="[10, 20, 50, 100]"
               :page-size="listSearch.pageSize"
               layout="total, sizes, prev, pager, next, jumper"
               :total="maxtotal">
             </el-pagination>
           </div>
           <div v-show="showType==1">
             <div class="docDetail">
               <div style="text-align: center;">
                 <span style="font-size: 18px;display: inline-block">{{showDetail.doctitle}}</span>
               </div>
               <div v-html="showDetail.doccontent">
                 {{showDetail.doccontent}}
               </div>
             </div>
           </div>
         </div>
       </div>
      <My-Footer ></My-Footer>
    </div>
</template>

<script>
  import MyFooter from "../../Footer/Footer"
  import MyTop from "../../IndexRelative/MyTop.vue";
  export default{
    components: {
      MyTop,MyFooter
    },
        name:"CheckStand",
        data(){
            return {
              activeName:"",
              maxtotal:0,
              listSearch:{
                pageNo:1,
                pageSize:10,
                titleName:"",
                articleCategoryId:"",
              },
//            侧边栏数据
              topBar:[],
              showMsg:[],
              allid:"",
              showDetail:"",
//              显示列表还是详情
              showType:0,
            }
        },
    methods:{
      selected: function(index) {
        this.activeName = index;
      },
      //分页
      handleSizeChange(val) {
        this.listSearch.pageSize = val;
        this.listPost();
      },
      handleCurrentChange(val) {
        this.listSearch.pageNo = val;
        this.listPost();
      },
      jump:function(){
        window.location.href ='/';
      },
//     获取侧边栏信息
      childList:function(){
        let vue = this;
        let param ={
          docName:"标准查询"
        };
        vue.$http.post(
          vue, "/rest/front/ArticeFront/articleType/childList", param,
          function (vue, data) {
            // 成功处理
            vue.topBar=data.data.child;
            vue.allid=data.data.parent.id;
            vue.activeName=data.data.parent.id;
            vue.allclick();
          },function (error,data) {
            // 错误处理
            console.log(error);
          });
      },
      listPost:function(){
          this.showType=0;
        let vue = this;
        let param =vue.listSearch;
        vue.$http.post(
          vue, "/rest/front/ArticeFront/article/pc/list", param,
          function (vue, data) {
            // 成功处理
            vue.showMsg=data.data.pageInfo.list;
            vue.maxtotal=data.data.pageInfo.total;
          },function (error,data) {
            // 错误处理
            console.log(error);
          });
      },
//      点击侧边栏获取相关的信息
      showContent:function(id){
        this.listSearch.articleCategoryId=id;
        this.listPost();
      },
//      点击所有标准
      allclick:function(){
          this.listSearch={
            pageNo:1,
            pageSize:10,
            titleName:"",
            articleCategoryId:"",
        };
        this.listSearch.articleCategoryId=this.allid;
        this.activeName=this.allid;
        this.listPost();
      },
//      显示标准的详情
      standDetail:function(id){
        let vue = this;
        let param ={
          articleId:id
        };
        vue.$http.post(
          vue, "/rest/front/ArticeFront/article/detail", param,
          function (vue, data) {
            // 成功处理
            vue.showDetail=data.data;
            vue.showType=1;
          },function (error,data) {
            // 错误处理
            console.log(error);
          });
      },
    },
    mounted: function () {
          this.childList();
    },
    }
</script>
<style scoped>
  .CheckStand{
    font-size: 12px;
    background-color: #fff;
  }
  /*顶部*/
  .stand_top{
    width: 1200px;
    margin:0 auto;
    padding: 30px 0;
    overflow: hidden;
  }
  .stand_wrap{
    width: 259px;
    float: left;
  }
  /*搜索框样式*/
  .stand_search{
    width: 575px;
    overflow: hidden;
    float: left;
    margin-left: 50px;
  }
  .search_box{
    height: 40px;
    background-color: #e8000e;
    padding: 3px;
    position: relative;
    margin-top: 12px;
  }
  .search_bg{
    width: 495px;
    height: 34px;
    background-color: #fff;
    position: absolute;
    left: 3px;
    top: 3px;
    z-index: 1;
  }
  .search_input{
    width: 440px;
    height: 34px;
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
  }
  .search_bt{
    width: 70px;
    height: 34px;
    line-height: 34px;
    position: absolute;
    right: 3px;
    top: 3px;
    border: 0;
    z-index: 6;
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    background: none;
    outline: none;
  }
  /**/
  .stand_result{
    float: right;
    height:60px;
    line-height: 60px;
  }
  .stand_border {
    width: 100%;
    height: 3px;
    background-color: rgb(232,0,14);
  }
  .js_logo{
    display: inline-block;
    width: 198px;
    height: 60px;
    background: url(../../../assets/images/logo2.png) no-repeat;
    background-size: 252px 60px;
    cursor: pointer;
  }
  /*中间内容*/
  .content{
    width:1200px;
    margin: 30px auto;
    min-height: 500px;
    overflow: hidden;
  }
/*侧边栏*/
  .top_left .topBar{
    float: left;
    display: inline-block;
    width: 200px;
    min-height: 700px;
    background-color: #fff;
    border:1px solid #f2f2f2;
    font-size: 14px;
  }
  .top_left .topBar li{
    height: 42px;
    border-bottom: 1px solid #f2f2f2;
    line-height: 42px;
    padding-left:12px;
    cursor: pointer;
  }
  .top_left .topBar li img {
    float: right;
    margin-right: 13px;
    margin-top: 18px;
  }
  .top_left .topBar li:hover{
    background: #9c9a9c;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }
  .active{
    background: #9c9a9c;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }
  /*中间展示*/
  .top_mid{
    float: left;
    background-color: #fff;
    padding:20px 50px;
    width:970px;
    border:1px solid #f2f2f2;
    min-height: 390px;
    margin-left: 20px;
  }
  /*展示列表*/
  .top_mid .show_ul li{
      width: 40%;
      text-align: center;
      float: left;
      margin:30px 40px;
     cursor: pointer;
  }
  .top_mid .show_ul li span{
    font-weight: bold;
    display: block;
    margin: 12px 0;
  }
  .top_mid .show_ul li img{
    width:340px;
    height: 200px;
    overflow: hidden;
  }
  /*分页*/
  .standPage{
        margin-top:20px;
  }
</style>
