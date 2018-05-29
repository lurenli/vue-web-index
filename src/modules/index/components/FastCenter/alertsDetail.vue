<template>
  <div class="alertsDetail" >
    <div>
      <div class="docDetail">
        <button class="doc_back" @click="goback()">更多</button>
        <div style="text-align: center;"><span style="font-size: 18px;display: inline-block;font-weight: bold">{{docDetails.doctitle}}</span> </div>
        <div v-html="docDetails.doccontent">
          {{docDetails.doccontent}}
        </div>
      </div>
      <a class="docLink" :href="docDetails.docaddress">原文链接</a>
      <span style="display:block;text-align: right">
         <span>所在分类:{{docDetails.docname}}</span>
         <span>发文日期：{{docDetails.creattime | formatTime}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '../../../../utils/common.js'
  export default{
    name:'alertsDetail',
    // props: ['doctitle','doccontent'],
    data() {
      return {
        doctitle: "",
        doccontent: "",
        docDetails: [],
        backid: '',
        docid:''
      }
    },
    metaInfo() {
      return {
        title: this.doctitle?this.doctitle + ' - 紧商网':"紧商网",
        meta: [
          { name: 'keywords', content: this.doctitle + ' - 紧商网'},
          {
             name: 'description',
            content: this.doccontent
          }
        ]
      }
    },
    filters: {
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
      //        点击显示对应的文章
      showDoc:function(){
        let vue = this;
        let param ={
          articleId:vue.$route.params.id,
        };
        // console.log(param)
        vue.$http.post(
          vue, "/rest/front/ArticeFront/article/detail", param,
          function (vue, data) {
            // 成功处理
            vue.docDetails=data.data;
//            console.log(data);
            vue.docid = data.data.docid;
//            console.log(vue.docid);
            vue.doctitle = data.data.doctitle;
            vue.doccontent = data.data.doccontent.substring(0, 30) + "...";
          },function (error,data) {
            // 错误处理
          });
      },
      goback(){
        this.$router.push({name:'alerts',params:{docid:this.docid}});
      }
    },

    mounted () {
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
<style scoped >
  .alertsDetail{
    width:980px;
    overflow: hidden;
    border:1px solid #f2f2f2;
    padding:20px;
    /*margin-top:20px;*/
  }
  .doc_back{
    width: 40px;
    height: 30px;
    color: #E8000E;
    border: 1px solid #E8000E;
    border-radius: 1px;
    line-height: 30px;
    background-color: #fff;
    font-size: 12px;
    cursor: pointer;
  }
  /*文章标题*/
  .alertsDetail .text_title {
    margin-top: 15px;
    display: block;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  /*文章详情*/
  .docDetail{
    text-indent:2em;
    font-size: 14px;
    line-height: 30px;
  }
  /*文章链接*/
  a.docLink{
    display: block;
    margin:20px 0;
  }
</style>
