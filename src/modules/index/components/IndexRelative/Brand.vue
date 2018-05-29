<template>
    <div class="MyBrand">
      <div class="MyBrand2" >
        <div class="container-wrap" v-if="contentWarp">

          <div class="list_wrap" :style="{left:leftSize + 'px'}" v-on:mouseenter="fadeIn" v-on:mouseleave="fadeOut">
            <li v-for="(item,index) in activeList" @click="jumpDetail(item.id,item.limitid,item.producttype)">
              <!--<div class="time_info"><span>剩<time-info :endTime="item.endtime" :startTime="systemtime" :callback="callback" :endText="'0小时'"></time-info>结束</span></div>-->
              <div v-if="item.state===4" class="time_info">剩<time-info :endTime="item.endtime" :startTime="systemtime" :callback="callback" :endText="'00分00秒'"></time-info>结束</div>
              <div v-if="item.state===1" class="time_info2"><time-info :endTime="item.begintime" :startTime="systemtime" :callback="callback" :endText="'00分00秒'"></time-info>后&nbsp;开始</div>
              <div>
                <img :src="$oss.publicUrl(item.pdpicture&&item.pdpicture.length>0?item.pdpicture[0]:'default/imgs/defaultProductImg.jpg')" style="width: 170px;height: 150px">
              </div>
              <p class="goods_name">{{item.productname}}&nbsp;{{item.level3}}&nbsp;{{item.stand}}&nbsp;
                {{item.material}} <span v-if="item.cardnum">/{{item.cardnum}}</span>
              </p>
              <div class="price_info"><span class="new_price">￥{{fixed2(item.limitprice)}}/{{item.unit}}</span><span class="old_price">￥{{item.prodprice}}/{{item.unit}}</span></div>
            </li>

            <li v-for="(item,index) in activeList" @click="jumpDetail(item.id,item.limitid,item.producttype)">
              <!--<div class="time_info"><span>剩<time-info :endTime="item.endtime" :startTime="systemtime" :callback="callback" :endText="'0小时'"></time-info>结束</span></div>-->
              <div v-if="item.state===4" class="time_info">剩<time-info :endTime="item.endtime" :startTime="systemtime" :callback="callback" :endText="'00分00秒'"></time-info>结束</div>
              <div v-if="item.state===1" class="time_info2"><time-info :endTime="item.begintime" :startTime="systemtime" :callback="callback" :endText="'00分00秒'"></time-info>后&nbsp;开始</div>
              <div>
                <img :src="$oss.publicUrl(item.pdpicture&&item.pdpicture.length>0?item.pdpicture[0]:'default/imgs/defaultProductImg.jpg')" style="width: 170px;height: 150px">
              </div>
              <p class="goods_name">{{item.productname}}&nbsp;{{item.level3}}&nbsp;{{item.stand}}&nbsp;
              {{item.material}} <span v-if="item.cardnum">/{{item.cardnum}}</span>
              </p>
              <div class="price_info"><span class="new_price">￥{{fixed2(item.limitprice)}}/{{item.unit}}</span><span class="old_price">￥{{item.prodprice}}/{{item.unit}}</span></div>
            </li>

          </div>

        </div>

      <div class="active_banner" v-if="show">
        <img :src="$oss.publicUrl(imgs)" height="120" width="1200" style="cursor: pointer" @click="jumpsign"/>
      </div>
    </div>
      <!--<div class="brand_new2">-->
        <!--<img src="../../assets/images/brand3.png" height="216" width="160"/>-->
      <!--</div>-->
    </div>
</template>

<script>
  import timeInfo from './SecondMenu/timeInfo.vue'
  export default {
    components:{ timeInfo },
    name: 'MyBrand',
    data: function () {
      return {
        getadsManageInfors:[],
        imgs:'',
        url:'',
        goodsList:8,
        listInfo:[],
        activeList:[],
        systemtime:0,
        show:false,
        contentWarp:false,
        leftSize:0,
        checkChooseV:true
      }
    },
    methods:{
      //限时购列表自动滚动
      scrollFn(){
        let vue = this;
        let scroll = setInterval(function(){
          if(vue.checkChooseV){
            vue.leftSize -=1;
            if(vue.leftSize===(-300*(vue.activeList.length))){
              vue.leftSize= -10
            }
          } else {
            clearInterval(scroll)
          }

        },25);

      },

      fadeIn(){
        this.checkChooseV = false;
      },
      fadeOut(){
        this.checkChooseV = true;
        if(this.activeList.length>4){
          this.scrollFn();
        }

      },


      //两位小数
      fixed2(value){
        if(value){
          return value.toFixed(2);
        } else {
          return 0.00
        }

      },

      //获取中间活动广告
      getads(){
        let vue = this;
        let param = {};
        param.position='中部广告位';
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

      //获取活动分类列表
      getfenlei(){
        let vue = this;
        let param = {};
        vue.$http.post(
          vue,'/rest/top/getTopActivityList',param,
          function (vue,data) {
            vue.listInfo =data.data.topActivities;
            vue.gettuijian();
          },
          function (error,data) {
            console.log(data);
          }
        )
      },


      //获取限时购推荐商品列表
      gettuijian(){
        this.activeList =[];
        let vue = this;
        let param = {
          topid:this.listInfo[0].id,
          activitytype:1 //限时购
        };
        vue.$http.post(
          vue,'/rest/top/getLimitProduct',param,
          function (vue,data) {
            vue.activeList =data.data.productModels;
            if(vue.activeList.length<=3){
//              console.log('无数据'+ vue.activeList)
              vue.contentWarp =false;
            } else {
//              console.log('有数据'+ vue.activeList)
              vue.contentWarp = true;
              if(vue.activeList.length>4){
                vue.fadeOut();
              }

            }

//            console.log(vue.activeList)
          },
          function (error,data) {
            console.log(data);
          }
        )
      },
      //获取系统时间
      gettime(){
        let vue = this;
        let param = {
        };
        vue.$http.post(
          vue,'/rest/top/getSystemTime',param,
          function (vue,data) {
            vue.systemtime =data.data.systemtime;
          },
          function (error,data) {
          }
        )
      },
      callback(){
//        console.log('时间到了')
//        this.checkChooseV = false;
//        this.gettime();
//        this.gettuijian();
      },



      jumpDetail(id,limitid,type){
        if(type ==='紧固件'){
//          this.$router.push({name:'industrialXianshi',params:{id:id,active:limitid}});
          window.open('/industrialXianshi/'+id +'/'+limitid);
        }else {
//          this.$router.push({name:'FastXianshi',params:{id:id,active:limitid}});
          window.open('/FastXianshi/'+id +'/'+limitid);
        }

      },
//     广告位跳转
      jumpsign:function(){
        window.open(this.url,"_blank")
      },
    },
    created (){

    },
    mounted(){
      this.gettime();
      this.getads();
      this.getfenlei();
    }
  }

</script>

<style scoped>
  .container-wrap {
    position: relative;
    width: 100%;
    height: 350px;
    background-color: #f9f9f9;
    white-space: nowrap;
    overflow: hidden;
  }



  .new_price{
    font-size: 14px;
    color: #e8000e;
  }
  .old_price{
    margin-left: 22px;
    text-decoration:line-through;
    font-size: 12px;
    color: #8a8a8a;
  }
  .price_info{
    text-align: left;
    padding: 0 15px;
    margin: 20px 0;
  }
  .goods_name{
    margin: 10px 0;
    font-size: 12px;
    color: rgb(42,42,42);
    line-height: 22px;
    text-align: center;
    padding: 0 15px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .time_info{
    text-align: left;
    font-size: 14px;
    line-height: 38px;
    color: #fff;
    font-weight: 600;
    margin-top: 8px;
    height: 41px;
    width: 146px;
    padding-left: 8px;
    background: url("../../assets/images/timeinfo.png");
  }
  .time_info2{
    text-align: left;
    font-size: 14px;
    line-height: 38px;
    color: #fff;
    font-weight: 600;
    margin-top: 8px;
    height: 41px;
    width: 155px;
    padding-left: 16px;
    background: url("../../assets/images/timeinfo2.png");
  }
  .list_wrap>li{
    cursor: pointer;
    text-align: center;
    display: inline-block;
    list-style: none;
    background-color: #fff;
    width: 278px;
    margin: 15px 10px;
    border: 1px solid #f2f2f2;
  }
  .list_wrap{
    font-size: 0;
    position: absolute;
    overflow-style: auto;
  }


  .MyBrand2{
    width: 1200px;
    margin: 0 auto;
    position: relative;
    margin-bottom: 30px;
    overflow: hidden;
    margin-top: 30px;
  }
  .MyBrand{
    overflow: hidden;
    position: relative;
  }
.brand_new2{
  clear: both;
  position: absolute;
  left: 50%;
  top: 40px;
  margin-left: -794px;
}
  .MyBrand_detail{
    font-size: 14px;
    color: #424242;
    line-height: 26px;
    margin-left: 17px;
  }
  .MyBrand_detail .MyBrand_detail_dif{
    color: #117ee1;
  }
  .MyBrand_price{
    margin: 14px 0 8px 15px;
  }
  .MyBrand_price_red{
    color: #e8000e;
    font-size: 16px;
    margin-right: 15px;
  }
  .MyBrand_price_gray{
    color: #808080;
    font-size: 16px;
    text-decoration: line-through;
  }
  .MyBrand_time{
    margin-left: 17px;
    overflow: hidden;
  }
  .MyBrand_time>img{
    margin: 15px 0;
    float: left;
    margin-right: 6px;
  }
  .MyBrand_time_msg{
    margin-top: 15px;
    float: left;
  }
  .MyBrand_section{
    width: 285px;
    border: 1px solid #f2f2f2;
    float: left;
    margin-right: 17px;
    margin-bottom: 30px;
    background-color: #fff;
  }
  .MyBrand_section:nth-child(4){
    margin-right: 0;
  }
  .MyBrand_time_num{
    width: 24px;
    height: 24px;
    color: #fff;
    font-size: 14px;
    background-color: #333;
    text-align: center;
    display: inline-block;
    line-height: 24px;
    margin-right: 7px;
  }
  .pro_ads li {height: 33px;text-align: left;}
  .active_banner{
    clear: both;
  }
  i{
    display: inline-block;
    padding: 5px 3px;
    background: #000;
    color: #fff;
    margin: 0;
    border-radius: 2px;
  }
</style>
