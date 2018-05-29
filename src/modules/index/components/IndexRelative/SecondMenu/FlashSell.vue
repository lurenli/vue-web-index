<template>
  <div class="FlashSell">
    <div style="width: 100%;cursor: pointer" class="flashmain">
      <div class="active_banner" v-if="show">
        <img :src="$oss.publicUrl(imgs)"  style="cursor: pointer" @click="jumpsign" width="100%" height="382"/>
      </div>
    </div>
    <div class="main_content">
      <div class="top_info">
        <div class="top_info_one">
          <span v-for="(item,index) in listInfo2" v-bind:class="{activeinfo:activeNum2==item.value}" @click="searchGoods2(item.value)">{{item.name}}</span>
        </div>
        <div class="top_info_two">
          <li  class="top_info_two_li" v-bind:class="{activeinfo:activeNum===0}" @click="searchGoods(0)">全部</li>
          <li v-for="(item,index) in listInfo" class="top_info_two_li" v-bind:class="{activeinfo:activeNum==item.id}" @click="searchGoods(item.id)">{{item.name}}</li>
        </div>
      </div>

      <div class="list_wrap">
        <li v-for="(item,index) in activeGoods" @click="jumpDetail(item.pdid,item.id,item.producttype)">
          <div v-if="item.state===4" class="time_info">剩<time-info :endTime="item.endtime" :startTime="item.systemTime" :callback="callback" :endText="'00分00秒'"></time-info>结束</div>
          <div v-if="item.state===1" class="time_info2"><time-info :endTime="item.begintime" :startTime="item.systemTime" :callback="callback" :endText="'00分00秒'"></time-info>后&nbsp;开始</div>
          <div>
            <img :src="$oss.publicUrl(item.pdpicture&&item.pdpicture.length>0?item.pdpicture[0]:'default/imgs/defaultProductImg.jpg')" style="width: 150px;height: 150px">
          </div>
          <p class="goods_name">{{item.productname}}&nbsp;{{item.level3}}&nbsp;{{item.stand}}&nbsp;{{item.material}}&nbsp;<span v-if="item.cardnum">/</span>{{item.cardnum}}</p>
          <div class="price_info"><span class="new_price">￥{{transFor2(item.minprice)}}/{{item.unit}}</span><span class="old_price">￥{{transFor2(item.normalprice)}}/{{item.unit}}</span></div>
        </li>
      </div>

      <div style="text-align: right">
        <el-pagination :page-sizes="[8, 16, 32, 64]"  @size-change="SizeChange"
                       @current-change="CurrentChange"
                       :page-size="pageSize" :current-page="pageNo" layout="total,sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<style scoped>
  .new_price{
    font-size: 16px;
    color: #e8000e;
  }
  .old_price{
    margin-left: 22px;
    text-decoration:line-through;
    font-size: 14px;
    color: #8a8a8a;
  }
  .price_info{
    text-align: left;
    padding: 0 15px;
    margin: 20px 0;
  }
  .goods_name{
    margin: 10px 0;
    font-size: 14px;
    color: rgb(42,42,42);
    line-height: 22px;
    text-align: center;
    padding: 0 5px;
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
    background: url("../../../assets/images/timeinfo.png");
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
    background: url("../../../assets/images/timeinfo2.png");
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
    margin-top: 30px;
  }
  .top_info_two_li{
    cursor: pointer;
    list-style: none;
    display: inline-block;
    padding-left: 20px;
    margin-right: 30px;
  }
  .top_info_two{
    height: 38px;
    line-height: 38px;
    font-size: 14px;
  }
  .top_info_one span{
    display: inline-block;
    padding-left: 20px;
    margin-right: 50px;
    cursor: pointer;
  }
  .top_info_one{
    min-height: 38px;
    line-height: 38px;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
  }
  .top_info{
    color:rgb(42,42,42);
    background-color: #fff;
    border: 1px solid #f2f2f2;
  }
  .FlashSell{
    background-color: #f9f9f9;
  }
  .main_content{
    width: 1200px;
    margin: 20px auto;
    min-height: 800px;
  }
  .activeinfo{
    color: #e8000e;
  }
</style>

<script>
  import Flash from '../Flash.vue'
  import TimeInfo from './timeInfo.vue'
  export default{
    components:{TimeInfo},
    metaInfo: {
      title: '限时购_最新限时购买活动商品行情及交易价格-紧商网',
      meta: [
        {name: 'keywords', content: '紧固件 促销采购 紧固件活动 紧固件尾货 '},
        {
          name: 'description',
          content: '限时购 - 紧商网'
        }
      ]
    },
    data(){
      return{
//        swiperOption: {
//          // swiper options 所有的配置同swiper官方api配置
//          autoplay: 2000,
//          autoHeight:true,
////              direction: 'horizontal',
//          pagination: '.swiper-pagination',
//          paginationClickable: true,
////              slidesPerView: 1,
//          loop: true,
//          autoplayDisableOnInteraction:false
//        },
        show:false,
        imgs:'',
        url:'',
        getadsManageInfors:[],
        pageSize:8,
        pageNo:1,
        total:0,
        activeGoods:[],
        activeNum:0,
        activeNum2:0,
        listInfo:[],
        goodsList:8,
        listInfo2:[
          {
            name:'所有活动',
            value:0,
          },
          {
            name:'活动进行中',
            value:4,
          },
          {
            name:'活动预热中',
            value:9,
          }
        ],

      }
    },

    methods:{
      //     广告位跳转
      jumpsign:function(){
        window.open(this.url,"_blank")
      },
      //获取限时购活动广告
      getads(){
        let vue = this;
        let param = {};
        param.position='限时购广告位';
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
      //两位小数
      transFor2(val){
        return val.toFixed(2);
      },

      //callback
      callback(){
        let vue =this;
        setTimeout(function () {
          location.reload()
        },500);
//        this.getActiveList();
      },

      //获取活动产品类目列表
      getFenList(){
        let vue = this;
        let param ={};
        vue.$http.post(
          vue, '/rest/front/activity/limittime/listCategory', param,
          function (vue, data) {
            vue.listInfo = data.data;
          },function (error,data) {

          });
      },

      //获取活动商品列表
      getActiveList(){
        this.activeGoods=[];
        let vue = this;
        let param = {
          pageNo:this.pageNo,
          pageSize:this.pageSize,
          activitycateid:this.activeNum,
          state:this.activeNum2
        };
        if(this.activeNum===0){
          param.activitycateid =''
        }
        vue.$http.post(
          vue,'/rest/front/activity/limittime/list',param,
          function (vue,data) {
            vue.activeGoods=data.data.pageInfo.list;
            vue.total =data.data.pageInfo.total;
          },
          function (error,data) {

          }
        )
      },


      //显示红色（选择类目）
      searchGoods(val){
        this.activeNum = val;
        this.getActiveList();
      },

      searchGoods2(val){
        this.activeNum2 = val;
        this.getActiveList();
      },

      jumpDetail(id,active,type){
        if(type==='紧固件'){
          window.open(window.location.origin +'/industrialXianshi/'+id + '/'+active);
        } else {
          window.open(window.location.origin +'/FastXianshi/'+id + '/'+active);
        }

      },

      //分页
      SizeChange(val){
        this.pageSize =val;
        this.getActiveList();
      },
      CurrentChange(val){
        this.pageNo =val;
        this.getActiveList();
      }
    },

    mounted(){
      this.getads();
      this.getFenList();
      this.getActiveList();
    }
  }
</script>
