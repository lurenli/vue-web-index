<template>
    <div class="FastCenter">
        <div id="bread">
           <a href="/">首页</a>
          <span>&gt;</span>
          <span>资讯中心</span>
        </div>
        <div class="helpSide">
          <div class="sideBar">
            <div class="sideHead">
              <i class="pngFix"></i>资讯中心
            </div>
            <ul>
              <li v-for="(msg,index) in sideDatas"><a @click="jump(msg);selected(index)" style="cursor: pointer" :class="{active: docName == index}">{{msg.docname}}</a></li>
            </ul>
          </div>
          <!--<ul class="sideBar">-->
            <!--<li v-for="(msg,index) in sideDatas" @click="jump(msg);selected(index)"  :class="{active: docName == index}">-->
              <!--<span style="cursor: pointer">{{msg.docname}}</span>-->
              <!--<img src="../../assets/arrow.png">-->
            <!--</li>-->
          <!--</ul>-->
      </div>
      <div class="helpDetail">
        <router-view ></router-view>
      </div>
     </div>
</template>

<script>
    export default{
        name:'FastCenter',
        data(){
            return {
                docName:"",
                sideDatas:[ ],
            }
        },
      methods:{
        selected: function(index) {
          this.docName = index;
        },
        jump:function(data){
          this.$router.replace({ name:'alerts',params:{ docid:data.id}})
    },
//        加载侧边栏---文章所有分类
 classRequest:function(){
          let vue = this;
          let param ={
            docName:"资讯中心"
          };
          vue.$http.post(
            vue, "/rest/front/ArticeFront/articleType/childList", param,
            function (vue, data) {
              // 成功处理
              vue.sideDatas=data.data.child;
            },function (error,data) {
              // 错误处理
              console.log(error);
            });
        },
      },
 mounted: function () {
        this.classRequest();
      }
    }
</script>
<style scoped>
  .FastCenter{
    width:1200px;
    margin:27px auto;
    background: #f9f9f9;
    overflow: hidden;
  }
  /*侧边栏*/
  .helpSide{
    display: inline-block;
    margin-top:20px;
    width: 170px;
    min-height: 700px;
    background-color: #fff;
    border: solid 1px #f2f2f2;
    font-size: 14px;
  }
  .helpSide{
    padding-left: 44px;
  }
  .helpSide>div:first-child{
    margin-top:24px;
  }
  .sideHead{
    position: relative;
    font-size: 16px;
    color:#414141;
    font-weight: bold;
  }
  .pngFix{
    position: absolute;
    left: -24px;
    top: 4px;
    display: inline-block;
    height: 15px;
    width: 15px;
    background: url(../../assets/images/jian.png) no-repeat;
  }
  .helpSide ul{
    padding: 0;
  }
  .helpSide li {
    list-style: none;
    margin: 10px 0;
  }
  /*、、、*/
  /*.helpSide{*/
    /*margin-top:20px;*/
    /*font-size: 14px;*/
  /*}*/
 /*.helpSide .sideBar{*/
   /*float: left;*/
   /*display: inline-block;*/
   /*width:200px;*/
   /*min-height: 700px;*/
   /*background-color: #fff;*/
   /*border:1px solid #f2f2f2;*/
   /*font-size: 14px;*/
 /*}*/
  /*.helpSide .sideBar li{*/
    /*height: 42px;*/
    /*border-bottom: 1px solid #f2f2f2;*/
    /*line-height: 42px;*/
    /*padding-left:12px;*/
    /*cursor: pointer;*/
  /*}*/
  /*.helpSide .sideBar li img {*/
    /*float: right;*/
    /*margin-right: 13px;*/
    /*margin-top: 18px;*/
  /*}*/
  /*.helpSide .sideBar li:hover{*/
    /*background: #e81342;*/
    /*color: #fff;*/
    /*font-weight: bold;*/
    /*cursor: pointer;*/
  /*}*/
  .active{
    /*background: #e81342;*/
    /*color: #fff;*/
    /*font-weight: bold;*/
    cursor: pointer;
    color:#e8000e;
  }
  #bread{
    font-size:16px;
    margin: 0;
    padding: 0;
  }
  /*z正文显示部分*/
  .helpDetail{
    float: right;
    background-color: #fff;
    margin-top:20px;
  }
</style>
