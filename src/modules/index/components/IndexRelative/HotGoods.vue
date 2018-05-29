<template>
    <div class="HotGoods">
      <div class="HotList" style="overflow: hidden">
        <div class="HotList_title">
          <p>热销商品排行</p>
        </div>
        <div class="HotList_msg" v-for="HotList_msg in HotList_msges">
          <div class="HotList_msg_img">
            <img :src="HotList_msg.msg" />
          </div>
          <div class="HotList_msg_content">
            <div class="HotList_msg_left">
              <p class="HotList_floorMsg">奥展内六角螺母/不锈钢304/螺钉DI...</p>
              <p class="HotList_floorPrice">￥373.00/千</p>
            </div>
            <div class="HotList_msg_right">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
  .HotList {
    width: 234px;
    float: right;
    overflow: hidden;
    border: 1px solid #f2f2f2;
    background-color: #fff;
  }
  .HotList_msg_content{
    overflow: hidden;
    width: 218px;
    margin: 0 auto;

  }
  .HotList_title {
    height: 34px;
    padding-top: 14px;
    font-size: 14px;
  }
  .HotList_title>p{
    border-left: 3px solid #e8000e;
    margin: 0px 0 0 16px;
    padding-left: 10px;
  }
  .HotList_msg {
    overflow: hidden;
    margin-bottom: 5px;
  }

  .HotList_floorMsg {
    width: 122px;
    line-height: 27px;
    margin-top: -5px;
  }

  .HotList_floorPrice {
    font-size: 14px;
    color: #e8000e;
    margin-top: 5px;
  }
  .HotList_msg_img{
    margin-bottom: 4px;
    margin-top: 12px;
  }
  .HotList_msg_img>img{
    margin-left: 16px;
  }
  .HotList_msg_left{
    width: 136px;
    float: left;
    padding-left: 10px;
  }
  .HotList_msg_right{
    width: 72px;
    height: 72px;
    background: #e8000e;
    float: right;
  }


</style>

<script>
    export default {
        name: "HotGoods",
        data: function () {
            return {
              HotList_msges:[
                {msg:require("../../assets/icon/floor.png")},
                {msg:require("../../assets/icon/floor2.png")},
                {msg:require("../../assets/icon/floor3.png")}
              ]
            }
        }
    }
</script>
