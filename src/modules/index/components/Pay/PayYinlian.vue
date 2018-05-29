<template>
    <div class="PayYinlian">
        <div class="PayYinlian_content">
          <div class="PayYinlian_content_one">
            <p class="PayYinlian_title" v-on:click="addMood">＋添加新的银行卡</p>
            <div class="PayYinlian_card" v-for="PayYinlian_card in PayYinlian_cards">
              <div class="card_information">
                <img src="../../assets/images/bank2.png" />
                <div class="card_info">
                  <p class="card_name">建设银行<span class="card_number">6217.............3236</span></p>
                  <p class="card_type">卡类型：借记卡</p>
                </div>
              </div>
              <div class="card_set">
                设为默认支付账户
              </div>
            </div>
            <div class="next_pay" v-on:click="addMood2">下一步</div>
            <div v-if="addBank" class="bg-mood">
              <div class="addBankInfo">
                <div class="add-title">添加银行卡</div>
                <div><span class="add-left-text"><span class="impot_icon">*</span>开户银行：</span><input type="text" class="add-input-item"></div>
                <div><span class="add-left-text"><span class="impot_icon">*</span>开户支行：</span><input type="text" class="add-input-item"></div>
                <div><span class="add-left-text"><span class="impot_icon">*</span>开户账户：</span><input type="text" class="add-input-item"></div>
                <div><span class="add-left-text"><span class="impot_icon">*</span>开户名：</span><input type="text" class="add-input-item" maxlength="11"></div>
                <div class="button-wrap"><button class="add-btn add-btn-style" v-on:click="qxAdd">确定</button><button class="qx-btn add-btn-style" v-on:click="qxAdd">取消</button></div>
              </div>
            </div>
          </div>
        </div>
      <div class="popup_box" v-if="addSure">
        <div class="popup">
          <div class="alert_title"><p class="alert_title_content">确认支付</p><img src="../../assets/icon/close.png" class="alert_title_img" @click="alert_title_img"/></div>
          <div>
            <p class="pay_password">支付密码：</p>
            <input type="password" maxlength="20" class="pay_password_ipt">
          </div>
          <div class="btn_group">
            <div class="save_btn2" @click="jump('PaySuccess')">确认</div>
            <div class="cancel_btn2" @click="cancel_btn2">取消</div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped >
  .PayYinlian{
    width: 100%;
    border-top: 2px solid #e8000e;
  }
.PayYinlian_content{
  width: 1200px;
  overflow: hidden;
  margin: 0 auto;
  padding-bottom: 149px;
  margin-top: 20px;
  background-color: #fff;
}
.PayYinlian_title{
  padding: 30px 30px 25px 0;
  color: #808080;
  float: right;
  cursor: pointer;
}
  .PayYinlian_card{
   clear: both;
    border: 1px solid #ccc;
    overflow: hidden;
    padding: 20px 0 15px 20px;
    margin: 30px;
  }
  .PayYinlian_card:hover{
    clear: both;
    border: 1px solid #e8000e;
    overflow: hidden;
    padding: 20px 0 15px 20px;
    margin-bottom: 30px;
  }
  .card_information{
   overflow: hidden;
    width: 270px;
  }
  .card_information>img{
   float: left;
  }
  .card_info{
   float: right;
  }
  .card_number{
    margin-left: 50px;
  }
  .card_type{
    margin-top: 5px;
  }
  .card_set{
    float: right;
    padding: 2px 10px;
    background: #f2f2f2;
    text-align: center;
    color: #808080;
    border-radius: 3px;
    margin: -38px 10px 0 0;
    cursor: pointer;
  }
  .next_pay{
    width: 84px;
    height: 30px;
    color: #fff;
    background-color: #e8000e;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    margin-left: 132px;
    cursor: pointer;
  }
  .BankInfo>span{
    color: #808080;
  }
  .add-btn-style{
    width: 64px;
    height: 32px;
    border: none;
    border-radius: 1px;
    font-size: 14px;
    cursor: pointer;
  }
  .add-btn{
    background-color:#e8000e;
    color: #fff;
  }
  .qx-btn{
    margin-left: 70px;
    background-color: rgb(247,247,247);
    color: rgb(66,66,66);
  }
  .addBankInfo .button-wrap{
    text-align: center;
    margin-top: 30px;
  }
  .addBankInfo{
    width: 523px;
    height: 355px;
    margin: 15% auto;
    background-color: #fff;
    border-radius: 3px;
    padding-bottom: 20px;
  }
  .bg-mood{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    background-color: rgba(0,0,0,.3);
    z-index: 200;
  }
  .add-title{
    height: 60px;
    font-size: 16px;
    line-height: 60px;
    color: rgb(50,50,50);
    margin-left: 22px;
  }
  .addBankInfo>div{
    margin-top: 12px;
  }
  .add-input-item{
    width: 200px;
    height: 30px;
    border: 1px solid rgb(191,191,191);
    margin-left: 15px;
    padding-left: 10px;
  }
  .add-left-text{
    font-size: 14px;
    color: rgb(66,66,66);
    text-align: right;
    display: inline-block;
    width: 186px;
  }
  .impot_icon{
    color: red;
    margin-right: 5px;
    vertical-align: sub;
  }
  /*弹出框*/
  .popup_box{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    min-width: 1200px;
    background-color: rgba(0,0,0,.3);
    z-index: 999;
  }
  .popup{
    width: 240px;
    position: absolute;
    top: 35%;
    background-color: #fff;
    left: 50%;
    margin-left: -120px;
    box-shadow: 0px 5px 40px #1A1A1A;
    padding-bottom: 30px;
  }
  .btn_group {
    width: 154px;
    margin: auto;
  }
  .cancel_btn2 {
    float: right;
    background-color: #f2f2f2;
  }
  .cancel_btn2, .save_btn2 {
    margin-top: 25px;
    width: 64px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
  }
  .save_btn2 {
    float: left;
    background-color: #e8000e;
    color: #ffffff;
  }
  .alert_title{
    overflow: hidden;
  }
  .alert_title_content{
    float: left;
    width: 216px;
    text-align: center;
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .alert_title>img{
    float: right;
    margin: 8px 10px 0 0;
    cursor: pointer;
  }
  .pay_password{
    padding: 20px 0 20px 43px;
  }
  .pay_password_ipt{
    margin-left: 44px;
    width: 150px;
    height: 30px;
    padding-left: 5px;
  }
</style>

<script>

    export default {
      components: {},
      name: "PayYinlian",
      data: function () {
        return {
          PayYinlian_cards:[
            {},{}
          ],
          addBank:'',
          addSure:''
        }
      },
      methods:{
        jump:function(MyName){
          this.$router.push({name:MyName})
        },
        addMood:function(){
          this.addBank = true;
        },
        addMood2:function(){
          this.addSure = true;
        },
        qxAdd:function () {
          this.addBank = false;
        },
        cancel_btn2:function () {
          this.addSure = false;
      },
      alert_title_img:function () {
        this.addSure = false;
      }
      }
    }
</script>
