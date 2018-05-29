<template>
    <div class="FloatFloor">
      <div class="fixedBox">
        <ul class="fixedBoxList">
          <li class="fixeBoxLi Home" @click="MyAccount">
              <img src="../../assets/icon/self_center.png" />
              <p class="slide_box">个人中心</p>
          </li>
          <li class="fixeBoxLi Home" @click="jump('Pay')">
            <img src="../../assets/icon/shopcar.png" />
            <p class="slide_box">购物车</p>
            <div class="slide_box_history" >
              <div class="slide_box_title">
                <p></p>
                <img src="../../assets/icon/close.png" class="slide_box_titleimg"/>
              </div>
              <div class="slide_box_content" >
                <div class="slide_box_content_img">
                </div>
                <div class="slide_box_content_msg">
                  奥展外六角螺栓／不
                  锈钢－304/螺钉GB
                  819/M2*10/本色
                </div>
                <div class="slide_box_content_price">
                  ￥13.35
                </div>
              </div>
              <div class="look_btn">
                查看更多商品<span>>></span>
              </div>
            </div>
          </li>
          <li class="fixeBoxLi Home" @click="myCollection">
            <img src="../../assets/icon/shoucang.png" />
            <p class="slide_box">我的收藏</p>
            <div class="slide_box_history" >
              <div class="slide_box_title">
                <p></p>
                <img src="../../assets/icon/close.png" class="slide_box_titleimg"/>
              </div>
              <div class="slide_box_content" >
                <div class="slide_box_content_img">
                </div>
                <div class="slide_box_content_msg">
                  奥展外六角螺栓／不
                  锈钢－304/螺钉GB
                  819/M2*10/本色
                </div>
                <div class="slide_box_content_price">
                  ￥13.35
                </div>
              </div>
              <div class="look_btn">
                查看更多收藏商品<span>>></span>
              </div>
            </div>
          </li>
          <li class="fixeBoxLi Home" @click="browseRecords">
            <img src="../../assets/icon/liulanlishi.png" />
            <p class="slide_box">浏览记录</p>
            <div class="slide_box_history" >
              <div class="slide_box_title">
                <p></p>
                <img src="../../assets/icon/close.png" class="slide_box_titleimg"/>
              </div>
              <div class="slide_box_content" >
                <div class="slide_box_content_img">
                </div>
                <div class="slide_box_content_msg">
                  奥展外六角螺栓／不
                  锈钢－304/螺钉GB
                  819/M2*10/本色
                </div>
                <div class="slide_box_content_price">
                  ￥13.35
                </div>
              </div>
              <div class="look_btn">
                查看更多历史记录<span>>></span>
              </div>
            </div>
          </li>
          <li class="fixeBoxLi Home">
            <img src="../../assets/icon/qq.png" />
            <p class="slide_box" >
              <a target="_blank" class="lianxiQQ" href="http://wpa.qq.com/msgrd?v=3&amp;uin=18473986&amp;site=qq&amp;menu=yes">客服1</a >
              <a target="_blank" class="lianxiQQ" href="http://wpa.qq.com/msgrd?v=3&amp;uin=525861570&amp;site=qq&amp;menu=yes">客服2</a >
            </p>
          </li>
          <li class="fixeBoxLi BackToTop" id="btn-top" @click="gototop">
              <img src="../../assets/icon/top.png" />
              <span class="fixeBoxLi_top">TOP</span>
          </li>
        </ul>
      </div>

    </div>
</template>

<script>
  export default{
    name:"FloatFloor",
    data:function(){
      return{

      }
    },
    methods:{
      MyAccount(){
        window.open("usercenter/MyAccount","_blank");
      },
      browseRecords(){
        window.open("usercenter/browseRecords","_blank");
      },
      myCollection(){
        window.open("usercenter/myCollection","_blank");
      },
      jump:function(MyName){
        this.$router.push({name:MyName})
      },
      //正在开发中
      opening:function(){
        this.$message({
          message: '此功能正在开发中。。。',
          type: 'warning'
        });
      },
      gototop(){
        let top=document.getElementById("btn-top");
//        let bottom=document.getElementById("btn-top");
        let timer=setInterval(function(){
          let scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
          let ispeed=Math.floor(-scrollTop/6);
//            console.log(ispeed)
          if(scrollTop==0){
            clearInterval(timer);
          }
          document.documentElement.scrollTop=document.body.scrollTop=scrollTop+ispeed;
        },30)
      },
    }
  }

</script>

<style scoped>
  .lianxiQQ{
    color: #fff;
  }
  .lianxiQQ:hover{
    color: grey;
  }
  .fixedBox{
    z-index: 9999999;
  }
  .fixeBoxLi{
    cursor: pointer;
  }
  .fixeBoxLi:hover .slide_box{
    display: block;
  }
  .slide_box_titleimg{
    cursor: pointer;
  }
  .look_btn{
    width: 137px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border: 1px solid #d9d9d9;
    background: #f0f0f0;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .look_btn>span{
    margin-left: 5px;
  }
  .slide_box_content{
    overflow: hidden;
    width: 250px;
    padding: 20px 0;
    margin: 0 auto;
  }
  .slide_box_content_img{
    float: left;
    width: 70px;
    height: 70px;
    background-color: #e8000e;
    margin-right: 10px;
  }
  .slide_box_content_msg{
    float: left;
    width: 100px;
    line-height: 18px;
  }
  .slide_box_content_price{
    float: left;
    width: 70px;
    text-align: center;
    line-height: 70px;
    color: #e8000e;
  }
  .fixeBoxLi.Home>p{
    /*display: none;*/
  }
  .slide_box_title{
    overflow: hidden;
    height: 46px;
    line-height: 46px;
    width: 260px;
    margin-left: 10px;
    border-bottom: 1px solid #d9d9d9;
    font-size: 16px;
  }
  .slide_box_title>p{
    float: left;
  }
  .slide_box_title>img{
    float: right;
    margin-top: 15px;
  }
.slide_box{
  position: absolute;
  right: 30px;
  top: 0;
  z-index: -1;
  width: 100px;
  height: 40px;
  line-height: 40px;
  padding: 0 8px;
  border-radius: 3px 0 0 3px;
  background-color: #000;
  border: 1px solid #000;
  border-right: none;
  font-size: 14px;
  text-align: center;
  display: none;
}
.slide_box_history{
  position: fixed;
  right: 30px;
  top: 0;
  z-index: -1;
  width: 280px;
  border-radius: 3px 0 0 3px;
  color: #424242;
  text-align: left;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(152,152,152,.75);
  display: none;
}
</style>
