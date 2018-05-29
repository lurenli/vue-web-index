<template>
  <div class="LiveBroadcast">
    <My-Header ></My-Header>
    <New-NavBar></New-NavBar>
    <My-Footer ></My-Footer>
  </div>
</template>

<style>
  @import "../../../res_v4.0/css/fonts/iconfont.css";
  @import "../../../res_v4.0/css/commonality.css";
  @import "../../../res_v4.0/css/head.css";
  .hd_allsort_out_box_new{
    display: none;
  }
  #allSortOuterbox:hover .hd_allsort_out_box_new{
    display: block;
  }
</style>

<script>
  import MyHeader from "../../Header/Header"
  import NewNavBar from "../NewNavBar"
  import MyFooter from "../../Footer/Footer"
  export default{
    components: {
      MyHeader,NewNavBar,MyFooter
    },
    name:"LiveBroadcast",
    data:function(){
      return{

      }
    }
  }
</script>
