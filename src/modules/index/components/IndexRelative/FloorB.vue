<template>
  <div class="FloorB">
      <div class="Industry_information">
        <div class="Industry_information2">
          <div class="Industry_info_title">
            <p class="Industry_info_titlemsg">行业资讯</p>
            <p class="Industry_info_titlemore" @click="tomore">更多</p>
          </div>
          <div class="Industry_info_content">
            <div class="Industry_info_contents" v-for="msg in zixunlists">
              <div @click="clickzixun(msg)" style="cursor: pointer">
                <div class="Industry_infocontent_img">
                  <img :src="$oss.publicUrl(msg.pic) "/>
                </div>
                <div class="Industry_infocontent_msg">
                  <p class="Industry_infocontent_title" >{{msg.doctitle}}</p>
                  <p class="Industry_infocontent_titlemsg">{{msg.sketch}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: "FloorB",
    data: function () {
      return {
        zixunlists:[],
        docid:"",
      }
    },
    methods:{
//        跳到更多行业资讯
        tomore:function(){
          this.$router.replace({ name:'alerts',params:{docid:this.docid}});
        },
      //    获取
      zixunlist:function(){
        let vue = this;
        let param ={
          articleCategoryName:"行业资讯",
          num:4,
        };
        vue.$http.post(
          vue, "/rest/front/ArticeFront/homepage/list", param,
          function (vue, data) {
            // 成功处理
            vue.zixunlists=data.data;
            vue.docid=(data.data)[0].docid;
          },function (error,data) {
            // 错误处理
          });
      },
      clickzixun:function(data){
        window.open('/FastCenter/alertsDetail/'+ data.id);
//        this.$router.replace({ name:'alertsDetail',params:{ id:data.id}});
      },
    },
    mounted() {
      this.zixunlist();
    }

  }
  </script>

<style scoped>
  .rcd_list>h4 {
    font-size: 14px;
    color: #434343;
    border-left: 3px solid #E60012;
    margin-left: 15px;
    margin-top: 12px;
    padding-left: 10px;
    float: left;
  }
  .rcd_list>a {
    float: right;
    font-size: 12px;
    line-height: 44px;
    margin-right: 15px;
    color: #666;
  }
  /*.productline_imglists {*/
    /*overflow: hidden;*/
    /*width: 295px;*/
  /*}*/
  /*.productline_img {*/
    /*margin-top: 20px;*/
    /*margin-left: 15px;*/
  /*}*/
  /*ul.standardul {*/
    /*padding: 15px 0;*/
    /*color: #333;*/
    /*margin-right: 15px;*/
    /*line-height: 24px;*/
  /*}*/
  .standardul>li:first-child {
    color: #111;
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 13px;
    margin-top: 10px;
  }
  .standardul>li {
    font-size: 14px;
  }
  .Industry_information{
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .Industry_information2{
    width: 1200px;
    border: 1px solid #f2f2f2;
    float: left;
    overflow: hidden;
    background-color: #fff;
  }
  .Industry_info_title{
    height: 45px;
    overflow: hidden;
    line-height: 45px;
    padding-right: 15px;
    border-bottom: 1px solid #F2F2f2;
  }
  .Industry_info_titlemsg{
   float: left;
    font-size: 18px;
    color: #333;
    line-height: 18px;
    margin-top: 15px;
    border-left: 3px solid #e80008;
    margin-left: 16px;
    padding-left: 10px;
  }
  .Industry_info_titlemore{
    float: right;
    font-size: 12px;
    color: #666;
    cursor: pointer;
  }
  .Industry_info_content{
    margin-top: 10px;
    overflow: hidden;
  }
  .Industry_info_contents{
    width: 290px;
    float: left;
    overflow: hidden;
    margin-right: 8px;
  }
  .Industry_infocontent_img{
    margin-left: 20px;
    width: 270px;
    height: 186px;
    background-color: #e8000e;
  }
  .Industry_infocontent_img>img{
    width: 270px;
    height: 186px;
  }
  .Industry_infocontent_msg{
    width: 290px;
    padding-left: 20px;
  }
  .Industry_infocontent_title{
    font-size: 16px;
    color: #111;
    line-height: 21px;
    margin-top: 20px;
    cursor: pointer;
    font-weight: 600;
  }
  .Industry_infocontent_titlemsg{
    width:250px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    font-size: 14px;
    color: #333;
    line-height: 14px;
    margin-top: 10px;
    margin-bottom: 15px;
  }
</style>

