<template>
  <div class="helpDetail">
    <div class="bread">
      <span>您的位置：</span>
      <a>首页</a>
      <span>&gt;</span>
      <span>帮助中心</span>
      <span>&gt;</span>
      <span>关于我们</span>
      <span>&gt;</span>
      <span>联系客服</span>
    </div>
    <div class="helpmsg">
      <div class="itemname">
        <i class="icon"></i>
        <span class="itemtitle">联系客服</span>
      </div>
      <div class="helpcontent">
         <table class="helptable">
           <tr class="title">
             <td colspan="3">客服联系表</td>
           </tr>
           <tr class="tablethead">
             <td>客服</td>
             <td>电话</td>
             <td>QQ</td>
           </tr>
           <tr>
             <td>客服小钉钉</td>
             <td>0571-57173777</td>
             <td>486665879</td>
           </tr>
           <tr>
             <td>客服小圈圈</td>
             <td>0571-83693827</td>
             <td>587654236</td>
           </tr>
           <tr>
             <td>客服小美美</td>
             <td>0571-83693827</td>
             <td>4855596324</td>
           </tr>
         </table>
      </div>
    </div>
  </div>
</template>

<script>

  export default{
    data(){
      return {

      }
    }
  }
</script>
<style scoped>
  @import "../../css/helpcentercommon.css";
  .helptable .title td{
    text-align: center;
    font-size: 16px;
    color: #424242;
    height: 54px;
    background-color: #f8f8f8;
    letter-spacing: 20px;
  }

</style>
