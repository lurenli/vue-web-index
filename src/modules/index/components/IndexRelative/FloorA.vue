<template>
  <div class="FloorA">
    <div class="p_Section clearfix" v-for="item in floorData">
      <div class="p_Section_left">
        <div class="Section_title" name="floor_0" id="floor_0">
          <div class="name">
            <em>{{item.floorname}}</em>
            <span>{{item.floorsubname}}</span>
          </div>
          <!--<div class="p_link">-->
            <!--<a  style="margin-right: 10px;cursor: pointer" @click="jumpDetail(item)">更多-->
              <!--&lt;!&ndash;<img :src="" class="p_link_msg"/>&ndash;&gt;-->
            <!--</a>-->
          <!--</div>-->
        </div>
        <div class="Section_info clearfix">
          <div class="Section_info_msg">
            <a @click="jumpDetail(item.subjectimgurl)" style="cursor: pointer">
              <img :src="$oss.publicUrl(item.subjectimg)" height="391" width="240"/>
            </a>
          </div>
          <div class="Section_info_msg2">
            <a  v-for="goodsname in item.floorCategories" class="Section_info_msg_a" @click="jumpsearch(goodsname.name,item)">{{goodsname.name}}</a>
          </div>
          <div class="Section_info_msg3">
            <!--<div class="Section_info_msges" >-->
              <!--<span class="Section_info_msg_title">{{goodsinfo.catename}}<br></span>-->
              <img v-for="goodsinfo in item.floorProds" @click="level3Jump(goodsinfo.catename,goodsinfo.type)" :src="$oss.publicUrl(goodsinfo.img)" class="goodsimg"/>

            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="HotList" >
        <div class="HotList_title" >
         <div class="HotList_title_first"></div>{{item.rankingname}}
        </div>
        <div class="border_item" v-for="(rankgood,i) in item.rankingprodList" v-if="i < 3">
          <div class="HotList_msg" v-for="(HotList_msg,index) in HotList_msges" >
            <div class="HotList_msg_img">
              <img v-if="i===index" :src="HotList_msg.msg" />
            </div>
          </div>
            <div class="HotList_msg_content" >
              <div class="HotList_msg_left" @click="jumpshopdetail(rankgood.id,rankgood.producttype)">
                <p class="HotList_floorMsg">{{rankgood.productname}}&nbsp;<span v-if="rankgood.producttype=='紧固件'">{{rankgood.level3}}</span><br>{{rankgood.stand}}{{rankgood.material}}<span v-if="rankgood.cardnum">/</span>{{rankgood.cardnum}}</p>
                <p class="HotList_floorPrice" v-if="showPrice">￥{{fiexd2(rankgood.prodprice)}}/{{rankgood.unit}}</p>
                <div style="text-align: left">销量:&nbsp;{{rankgood.salenum}}&nbsp;笔</div>
              </div>
              <div class="HotList_msg_right">
                <img :src="$oss.publicUrl(rankgood.pdpicture&&rankgood.pdpicture.length>0?rankgood.pdpicture[0]:'default/imgs/defaultProductImg.jpg')" width="72" height="72" @click="jumpshopdetail(rankgood.id,rankgood.producttype)">
              </div>
            </div>

        </div>

      </div>
    </div>
    <div class="active_banner" v-if="show">
      <img :src="$oss.publicUrl(imgs)" height="120" width="1200" style="cursor: pointer" @click="jumpsign"/>
    </div>
    <div class="xuanfulouceng" v-if="showLD">
      <ul>
        <li class="last" v-for="(name,item) in floorData" v-bind:class="{ activeFloor: activeNum===item }" @click="activeFl(item)">
          <span class="num" v-if="activeNum!==item">{{name.floorname}}</span>
          <span class="word" v-else>{{name.floorsubname}}</span>
        </li>
        <li class="last last_top" @click="activeFl()">
          <!--<span class="num">{{name.floorname}}</span>-->
          <span class="word2">TOP</span>
        </li>
      </ul>
    </div>
    <div id="bottom"></div>
  </div>
</template>
<script>
  import HotGoods from "./HotGoods"
  export default {
    name: "FloorA",
    data: function () {
      return {
        HotList_msges:[
          {msg:require("../../assets/icon/floor.png")},
          {msg:require("../../assets/icon/floor2.png")},
          {msg:require("../../assets/icon/floor3.png")}
        ],
        Section_infoes: [
          {}, {}, {}, {}, {}, {}
        ],
        floorData:[],
        getadsManageInfors:[],
        imgs:'',
        url:'',
        showPrice:false,
        showLD:false,
        activeNum:0,
        floorArr:[],
        show:false
      }
    },

    methods: {

      lodingXuanfu(){
        let vue = this;
        window.onscroll = function(){
          var t =  (document.documentElement.scrollTop  || window.pageYOffset  || document.body.scrollTop) +175 ;
          let arr =[];  //每楼层距页面顶部距离数组
          let lang = document.getElementsByClassName('p_Section');
          for(let i=0;i<lang.length;i++){
            let Tlang = lang[i].offsetTop;
            arr.push(Tlang);
            Tlang = ''
          }
          vue.floorArr = arr;
          if(t>=arr[0]){
            let qujianArr = [];  //楼层距离 区间 数组
            for(let j = 0;j<arr.length-1;j++){
              let qujian =[];
              qujian[0] =arr[j];
              qujian[1] =arr[j+1];
              qujianArr.push(qujian);
            }
            for(let k = 0;k < qujianArr.length;k++){
              if(t<qujianArr[k][1]&&t>qujianArr[k][0]){
                vue.activeNum = k;
//                console.log(k);
              }
              if(t>qujianArr[qujianArr.length-1][1]){
                vue.activeNum = qujianArr.length
              }
            }
//            console.log(qujianArr);
            vue.showLD = true;
          } else {
            vue.showLD = false;
          }
//补一下首页搜索框的滚动悬浮
          var left =document.getElementById("scrollHeader");
          if(left){
            if( t >=325) {     //当拖动到距离顶部325px处时，左边导航固定，不随滚动条滚动
              left.style.position="fixed";     left.style.top="0";
            }else{
              left.style.position="static";
            }
          }
        }

      },

      //点击跳到对应 楼层
      activeFl(index){
        this.activeNum =index;
        document.documentElement.scrollTop = this.floorArr[index] - 160;
        document.body.scrollTop =  this.floorArr[index] - 160;
//        console.log(this.floorArr[index] + 160);
      },

      fiexd2(val){
        if(val){
          return val.toFixed(2)
        } else {
          return 0.00
        }
      },



      //     楼层分类跳转搜索
      //        点击目录项，作为关键词，进行页面的跳转
      jumpsearch:function(name,item){
        let SearchURL='';
        if(item.floortype=="紧固件"){
          SearchURL='/IndustrialProducts/search'+'-'+'level2'+'_'+name;
          window.open(window.location.origin+SearchURL);
//          location.href='/IndustrialProducts?level2='+name
//          this.$router.push({path:'IndustrialProducts',query:{level2:val}});
//          this.$store.commit("search", 1);
//          window.open('/IndustrialProducts');
//          localStorage.setItem("searchKey",val);
        }else if(item.floortype=="生活类"){
          SearchURL='/LifeQuality/search'+'-'+'level2'+'_'+name;
          window.open(window.location.origin+SearchURL);
//          location.href='/LifeQuality?level2='+name
//          this.$router.push({path:'LifeQuality',query:{level2:val}});
//          this.$store.commit("search", 1);
//          window.open('/LifeQuality');
//          localStorage.setItem("searchKey",val);
        }else{
          SearchURL='/IndustrialQuality/search'+'-'+'level2'+'_'+name;
          window.open(window.location.origin+SearchURL);
//          location.href='/IndustrialQuality?level2='+name
//          this.$router.push({path:'IndustrialQuality',query:{level2:val}});
        }
      },
//        紧固件列表页----传递该楼层（  查询一个点击的一级分类是否属于紧固件）
      jumpDetail(url){
//            if(item.floortype=="紧固件"){
////              this.$router.push({name:'IndustrialProducts'});
//              this.$store.commit("search", 1);
//              window.open('/IndustrialProducts');
//              localStorage.setItem("searchKey",item.floorsubname);
//            }else{
////              this.$router.push({name:"LifeQuality"})
//              this.$store.commit("search", 1);
//              window.open('/LifeQuality');
//              localStorage.setItem("searchKey",item.floorsubname);
//            }
//        window.location.href ='www.baidu.com';
        if(url){
          if(url.indexOf('IndustrialProducts')!=-1 || url.indexOf('IndustrialQuality')!=-1 ||url.indexOf('LifeQuality')!=-1){
            window.open("http:" + "//" + url+'/search');
          }else{
            window.open("http:" + "//" + url);
          }
        }

      },
//
      //     广告位跳转
      jumpsign:function(){
        window.open(this.url,'_blank');
      },
      level3Jump:function(catename,type){
        let SearchURL='';
        if(type=="紧固件"){
          SearchURL='/IndustrialProducts/search'+'-'+'level3'+'_'+catename;
          window.open(window.location.origin+SearchURL);
//          location.href='/IndustrialProducts?level3='+catename
//          this.$router.push({path:'IndustrialProducts',query:{level3:id}});
        }else if(type==="生活类"){
          SearchURL='/LifeQuality/search'+'-'+'level3'+'_'+catename;
          window.open(window.location.origin+SearchURL);
//          location.href='/LifeQuality?level3='+catename
//          this.$router.push({path:'LifeQuality',query:{level3:id}});
        }else{
          SearchURL='/IndustrialQuality/search'+'-'+'level3'+'_'+catename;
          window.open(window.location.origin+SearchURL);
//          location.href='/IndustrialQuality?level3='+catename
//          this.$router.push({path:'IndustrialQuality',query:{level3:id}});
        }
      },
//     紧固件/非紧固件详情页
      jumpshopdetail: function (id,type) {
//          console.log(type)
          if(type=="紧固件"){
//            this.$router.push({name:"IndustrialDetail",params:{id:id}})
            window.open('/IndustrialDetail/'+id);
          }else{
//            this.$router.push({name:"FastDetail",params:{id:id}})
            window.open('/FastDetail/'+id);
          }
      },
      //获取底部活动广告
      getads(){
        let vue = this;
        let param = {};
        param.position='底部广告位';
        param.count=1;
        vue.$http.post(
          vue, '/rest/front/adt ', param,
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

      //获取楼层信息
      getFloorInfo(){
        let vue  = this;
        let param = {};
        vue.$http.post(
          vue,'/rest/front/index/listFloor',param,
          function (vue,data) {
            vue.floorData = data.data.floorList;
            vue.showPrice =data.data.showPrice;

          },
          function (error,data) {
            console.log(data);
          }
        )
      }
    },
    mounted(){
      this.getFloorInfo();
      this.getads();
      this.lodingXuanfu();
    },
  }
  </script>

<style scoped>
  .border_item{
    /*border-bottom: 1px solid #f2f2f2;*/
  }
  .goodsimg{
    cursor: pointer;
    width: 181px!important;
    height:191px!important;
    margin: 2px !important;
  }
  .activeFloor{
    background-color: #e8000e;
    color: #fff;
  }
  .num{
    display: inline-block;
    width: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #e8000e;
  }
  .word2{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
    width: 50px;
  }
  .word{
    display: inline-block;
    width: 50px;
    overflow: hidden;
    text-align: center;
    font-size: 14px;
    line-height: 50px;
    padding: 0 5px;
    color: #fff;
  }
  .last{
    cursor: pointer;
    border-bottom: 1px solid #f9f9f9;
    overflow: hidden;
  }
  .last_top{
    cursor: pointer;
    border-bottom: 1px solid #f9f9f9;
    overflow: hidden;
    color: #e8000e;
    background-color: #f7e0e1;
  }
  .xuanfulouceng{
    position: fixed;
    left: 50%;
    top: 160px;
    background-color: #fff;
    z-index: 99;
    margin-left: -680px;
  }
  .xuanfulouceng .last{
    width: 50px;
    height: 50px;
  }
  .p_Section {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .p_Section_left{
    float: left;
    overflow: hidden;
    background-color: #fff;
  }
  .FloorA .Section_title, .FloorA .Section_info {
    width: 936px;
    border: 1px solid #f2f2f2;
  }

  .FloorA .Section_info {
    border-top: none;
  }

  .FloorA {
    clear: both;
  }

  .p_link_msg {
    vertical-align: unset;
    margin-left: 3px;
    margin-right: 16px;
  }

  .Section_info_msg {
    overflow: hidden;
    clear: both;
    float: left;
  }

  .Section_info_msg2 {
    float: left;
    width: 139px;
    font-size: 14px;
    line-height: 14px;
    border-left: 1px solid #f2f2f2;
    border-right: 1px solid #f2f2f2;
    height: 389px;
    overflow: hidden;
  }

  .Section_info_msg_a {
    cursor: pointer;
    display: block;
    margin-bottom: 15px;
    margin-left: 17px;
  }

  .Section_info_msg_a:first-child {
    margin-top: 20px;
  }

  .Section_info_msg3 {
    font-size: 0;
    padding: 0;
    margin: 0;
    float: left;
    background-color: #f9f9f9;
    width: 555px;
    height: 391px;
    overflow: hidden;
  }

  .Section_info_msges {
    width: 33%;
    height: 50%;
    margin: 0px;
    padding: 0px;
    float: left;
    cursor: pointer;
  }

  .Section_info_msges > img {
    margin: 3px 3px 0 3px;
  }

  .Section_info_msg_title {
    font-size: 14px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    margin-top:10px ;
    text-align: left;
    display: inline-block;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .Section_info_msg_price {
    color: #e8000e;
    font-size: 14px;
    line-height: 14px;
    margin-left: 8px;
    margin-top: 4px;
  }
  .active_banner{
    clear: both;
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .total_nun{
    font-size: 12px;
    color: #808080;
    line-height: 12px;
    margin-left: 15px;
  }

  .HotList {
    width: 234px;
    height: 441px;
    float: right;
    overflow: hidden;
    border: 1px solid #f2f2f2;
    background-color: #fff;
  }
  .HotList_msg_content{
    overflow: hidden;
    width: 218px;
    margin: 5px auto 0;
    padding: 2px;

  }
  .HotList_title {
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
  }
  .HotList_title_first{
    width: 3px;
    font-size: 0;
    display: inline-block;
    background-color: #e8000e;
    height: 16px;
    margin: -2px 10px;
  }
  .HotList_msg {
    overflow: hidden;
    /*margin-bottom: 5px;*/
  }

  .HotList_floorMsg {
    width: 122px;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .HotList_floorPrice {
    font-size: 14px;
    color: #e8000e;
    /*margin-top: 5px;*/
  }
  .HotList_msg_img{
  }
  .HotList_msg_img>img{
    margin-left: 16px;
    margin-top: 9px;
  }
  .HotList_msg_left{
    width: 136px;
    float: left;
    padding-left: 10px;
    cursor: pointer;
  }
  .HotList_msg_right{
    width: 72px;
    height: 72px;
    background: #e8000e;
    float: right;
    cursor: pointer;
  }
</style>

