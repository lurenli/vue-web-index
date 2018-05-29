<template>
    <div class="PaySuccess">
        <div class="PaySuccess_content">
          <div class="PaySuccess_content_one">
            <img src="../../assets/images/s_smile.png" height="228" width="147"/>
            <div class="smile_success">
              <p class="smile_success_six">恭喜您已支付成功！</p>
              <p class="smile_success_one">您可以:<span class="smile_success_two" @click="jump('IndustrialProducts')">继续购买</span></p>
              <p class="smile_success_thr">将在<span class="smile_success_four">{{timeInfo}}</span>s后自动跳至<span class="smile_success_five" @click="jump2">个人中心</span>，请稍后...</p>
            </div>
          </div>
        </div>
    </div>
</template>

<style scoped>
  .PaySuccess{
    width: 100%;
    border-top: 2px solid #e8000e;
  }
.PaySuccess_content{
  width: 1200px;
  overflow: hidden;
  margin: 0 auto;
  padding-bottom: 130px;
  background-color: #fff;
  margin-top: 20px;
}
.PaySuccess_content_one{
  overflow: hidden;
  width: 600px;
  margin: 0 auto;
}
  .PaySuccess_content_one>img{
   float: left;
    margin: 126px 46px 0 0;
  }
  .smile_success{
    float: left;
    padding: 40px 30px 33px 50px;
    background-color: #f1f1f1;
    margin-top: 156px;
  }
.smile_success_one{
  font-size: 14px;
  color: #424242;
  margin-bottom: 15px;
}
  .smile_success_two{
   color: #2f95ec;
    cursor: pointer;
  }
  .smile_success_thr{
   font-size:14px;
    color: #424242;
  }
  .smile_success_four{
    color: #e8000e;
  }
  .smile_success_five{
    color:#2f95ec;
    cursor: pointer;
  }
  .smile_success_six{
    font-size: 16px;
    color: #e8000e;
    margin-bottom: 17px;
  }
</style>

<script>

    export default {
      components: {},
      name: "PaySuccess",
      data: function () {
        return {
          timeInfo:4
        }
      },
      methods:{
        jump:function(MyName){
          this.$router.push({name:MyName})
        },
        jump2(){
          window.location.href = '/usercenter/ManagementOrder'
        },
        Time2(){
          let vue = this;
          let interval = window.setInterval(function() {
            vue.timeInfo --;
            if(vue.timeInfo===0){
              if(vue && !vue._isDestroyed){
                window.clearInterval(interval);
                window.location.href = '/usercenter/ManagementOrder'
              }
              window.clearInterval(interval);
              return;
            }
          }, 1000);
        }
      },
      mounted(){
        this.Time2();
      }
    }
</script>
