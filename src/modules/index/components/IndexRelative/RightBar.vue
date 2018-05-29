<template>
    <div class="RightBar">
        <div class="right_bar">
      <div class="productline">
        <div class="rcd_list">
          <h4>产品标准</h4>
          <a href="javascript:;">更多 &gt;</a>
        </div>
        <div class="productline_imglists">
          <div class="left productline_img">
            <img src="../../assets/images/fastening2.jpg">
          </div>
          <ul class="standardul right">
            <li>六角头螺栓</li>
            <li>GB/T 5782-2000 </li>
            <li>机械性能：钢 14H 22H</li>
            <li>螺纹精度：6G</li>
          </ul>
        </div>
        <div class="productline_imglists">
          <div class="left productline_img">
            <img src="../../assets/images/fastening2.jpg">
          </div>
          <ul class="standardul right">
            <li>六角头螺栓</li>
            <li>GB/T 5782-2000 </li>
            <li>机械性能：钢 14H 22H</li>
            <li>螺纹精度：6G</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
</template>

<style scoped>
  .right_bar {
    overflow: hidden;
    float: right;
    width: 295px;
    background-color: #fff;
    border: 1px solid #f2f2f2;
  }
  .rcd_list {
    border-bottom: 1px solid #efefef;
    overflow: hidden;
    width: 295px;
  }
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
  .productline_imglists {
    overflow: hidden;
    width: 295px;
  }
  .productline_img {
    margin-top: 20px;
    margin-left: 15px;
  }
  ul.standardul {
    padding: 15px 0;
    color: #333;
    margin-right: 15px;
    line-height: 24px;
  }
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


</style>

<script>
    export default {
      name:"RightBar",
        data: function () {
            return {}
        }
    }
</script>
