<template>
    <div class="alerts">
       <ul class="docmsg" v-for="mainData in mainDatas">
         <li class="main_right">
           <ul class="dochang">
             <li style="font-size: 18px;text-align: left;font-weight: bold">{{mainData.doctitle}}</li>
             <li class="alerts_detail">
               <img :src="$oss.publicUrl(mainData.pic) " style="width:100px;height:100px;"/>
               <div class="jieshao">
                 <p >{{mainData.sketch}}</p>
                 <span>
                   <a style="color: #e8000e;cursor:pointer;" @click="jump(mainData)">[ 更多详情 ]</a>
                    <span>发文日期：{{mainData.creattime |  formatTime}}</span>
                 </span>
               </div>
             </li>
           </ul>
         </li>
       </ul>
      <el-pagination :page-sizes="[10, 20, 50, 100]"  @size-change="SizeChange"  v-if="Total!=0"
                     @current-change="CurrentChange"
                     :page-size="pageSize" :current-page.sync="pageNo" layout="total,sizes, prev, pager, next, jumper" :total="Total">
      </el-pagination>
    </div>
</template>

<script>
  import { formatDate } from '../../../../utils/common.js'
    export default{
        name:'alerts',
        data(){
            return {
              mainDatas:[],
              docid:'',
              pageNo:1,
              pageSize:10,
              Total:0,
            }
        },
      filters:{
        //时间转换
        formatTime(value){
          if (!value) {
            return ''
          }else{
            let date = new Date(value);
            return formatDate(date,'yyyy-MM-dd hh:mm:ss');
          }
        },
      },
      methods:{
        jump:function(data){
          this.$router.replace({ name:'alertsDetail',params:{ id:data.id}});
        },
        //        页码的变化
        SizeChange(val) {
          this.pageSize=val;
          this.showDoc();
        },
        CurrentChange(val) {
          this.pageNo=val;
          this.showDoc();
        },
        //        点击显示对应的文章
        showDoc:function(){
          let vue = this;
          let param ={
            articleCategoryId:vue.$route.params.docid,
            pageNo:vue.pageNo,
            pageSize:vue.pageSize,
          };
          vue.$http.post(
            vue, "/rest/front/ArticeFront/article/pc/list", param,
            function (vue, data) {
              // 成功处理
              vue.mainDatas=data.data.pageInfo.list;
              vue.Total=data.data.pageInfo.total;
            },function (error,data) {
              // 错误处理
              // console.log(error);
            });
        },
      },
      mounted: function () {
        this.showDoc();
      },
      watch: {
        '$route' (to, from) {
          // console.log(this.$route.params);
          this.showDoc();
        }
      }
    }
</script>
<style scoped>
  .alerts{
    width:980px;
    margin:0 auto;
    overflow: hidden;
    text-overflow :ellipsis;
    border: 1px solid #f2f2f2;
    padding:20px;
  }
   .alerts ul.docmsg>li{
      float:left;
   }
   .dochang{
     border-bottom: 1px dashed #f2f2f2;
   }
  .alerts .main_right{
    width:950px;
    overflow: hidden;
    margin-bottom: 20px;
    border-bottom: 1px solid #f2f2f2;
  }
  .alerts ul.docmsg li:last-child{
    border-bottom:none;
  }
  .alerts ul.docmsg li.alerts_detail{
    margin:25px 0;
    overflow: hidden;
  }
  .alerts_detail img{
    float: left;
    width:20%;
  }
  /*介绍和日期*/
  .jieshao{
    margin-left:12px;
    float: left;
    width:80%;
    height: 100px;;
  }
  .alerts_detail .jieshao p{
    height: 80px;;
  }
  .alerts_detail .jieshao span{
    display: inline-block;
    float:right;
    margin-bottom: 10px
  }
  /*页码的编辑*/
  .alerts .el-pagination {
    margin-top: 20px;
    float: right;
  }
</style>
