<template>
  <div class="Payment">
    <div class="Payment_content">
      <div class="Payment_contentlist">
        <div class="order_success">订单提交成功，请您尽快付款！</div>
        <div class="order_price">应付金额：<span>¥</span><span class="">{{payInfo.payMoney}}</span></div>
        <div class="order_numcount">请您在提交订单{{unpaidtimeout}}小时内完成支付，否则订单会自动取消</div>
      </div>
      <div class="Payment_contentlist2">
        <div class="order_success">使用当前账户支付</div>
        <div class="recriver_info3_content">
          <!--<img src="../../assets/icon/f_select.png" class="recriver_info3_select"/>-->
          <label style="position: relative" v-model="payment">
            <input v-model="payInfo.type" type="radio" :value="1" class="distribution" checked/>
            当前账户可用授信额度{{payment.value}}元
          </label>
          <span v-if="payment.value===0">
              （您当前授信额度不足，可<span class="shouxin" style="cursor: pointer" @click="Application">立即申请</span>）
            </span>

        </div>
        <div class="recriver_info3_content">
          <!--<img src="../../assets/icon/f_select.png" class="recriver_info3_select"/>-->
          <label style="position: relative">
            <input v-model="payInfo.type" type="radio" :value="0" class="distribution"/>
            当前账户可用余额{{payment2.value}}元
          </label>
        </div>
        <div class="order_success" style="margin-top: 30px">使用第三方平台支付</div>
        <div class="recriver_info3_content">
          <!--<img src="../../assets/icon/f_select.png" />-->
          <img src="../../assets/icon/f_zhifubao.png" height="18" width="18" class="recriver_info3_icon"/>
          <label style="position: relative">
            <input v-model="payInfo.type" type="radio" :value="3" class="distribution2"/>
            支付宝支付
          </label>
        </div>
        <div class="recriver_info3_content">
          <!--<img src="../../assets/icon/f_select.png"  />-->
          <img src="../../assets/icon/f_weixin.png" height="18" width="18" class="recriver_info3_icon"/>
          <label style="position: relative">
            <input v-model="payInfo.type" type="radio" :value="4" class="distribution2"/>
            微信支付
          </label>
        </div>
        <div class="recriver_info3_content">
          <!--<img src="../../assets/icon/f_select.png" />-->
          <img src="../../assets/icon/bank.png" height="18" width="18" class="recriver_info3_icon recriver_info3_icon2"/>
          <label style="position: relative">
          <input v-model="payInfo.type" type="radio" :value="5" class="distribution2"/>
            银联支付
          </label>
        </div>
        <div class="recriver_info3_content">
          <!--<img src="../../assets/icon/f_select.png" />-->
          <img src="../../assets/icon/bank.png" height="18" width="18" class="recriver_info3_icon recriver_info3_icon2"/>
          <label style="position: relative">
            <input v-model="payInfo.type" type="radio" :value="6" class="distribution2"/>
            银联支付（对公）
          </label>
        </div>
        <div class="payment_next" @click="next_select">下一步</div>
      </div>
    </div>
    <div v-show="zfbBox" class="zfbBoxclass">
      <div class="zfbson">
        <div class="alert_title"><p class="alert_title_content">支付宝支付</p><img src="../../assets/icon/close.png" class="alert_title_img" @click="zfbBox=false"/></div>
        <div>
          <p class="pay_password">该订单是否已经支付完毕？</p>
        </div>
        <div class="btn_group">
          <div class="save_btn2" @click="orderpaystate">完成</div>
          <div class="cancel_btn2" @click="zfbBox=false">取消</div>
        </div>
      </div>
    </div>
    <div v-show="wxBox" class="wxBoxclass">
      <div class="wxson">
        <div class="alert_title"><p class="wx_content">微信支付</p><img src="../../assets/icon/close.png" class="alert_title_img" @click="wxBox=false"/></div>
        <div style="text-align: center;">
          <img :src="uploadurl" />
        </div>
        <div class="btn_group">
          <div class="save_btn2" @click="orderpaystate">完成</div>
          <div class="cancel_btn2"  @click="wxBox=false">取消</div>
        </div>
      </div>
    </div>

    <div v-show="ylBox" class="wxBoxclass">
      <div class="wxson">
        <div class="alert_title"><p class="wx_content">银联支付</p><img src="../../assets/icon/close.png" class="alert_title_img" @click="ylBox=false"/></div>
          <div style="font-size: 14px;height: 50px;line-height: 50px;margin: 10px;text-align: center">是否确认支付完成？</div>
        <div class="btn_group">
          <div class="save_btn2" @click="orderpaystate">完成</div>
          <div class="cancel_btn2"  @click="ylBox=false">取消</div>
        </div>
      </div>
    </div>

    <div v-show="ylBox2" class="wxBoxclass">
      <div class="wxson">
        <div class="alert_title"><p class="wx_content">银联支付（对公）</p><img src="../../assets/icon/close.png" class="alert_title_img" @click="ylBox=false"/></div>
        <div style="font-size: 14px;height: 50px;line-height: 50px;margin: 10px;text-align: center">是否确认支付完成？</div>
        <div class="btn_group">
          <div class="save_btn2" @click="orderpaystate">完成</div>
          <div class="cancel_btn2"  @click="ylBox2=false">取消</div>
        </div>
      </div>
    </div>

    <div class="popup_box">
      <div class="popup">
        <div class="alert_title"><p class="alert_title_content">确认支付</p><img src="../../assets/icon/close.png" class="alert_title_img" @click="alert_title_img"/></div>
        <div>
          <p class="pay_password">支付密码：</p>
          <input type="password" maxlength="20" class="pay_password_ipt" v-model="payInfo.paySecret">
        </div>
        <div class="btn_group">
          <div class="save_btn2" @click="payMoneyFn">确认</div>
          <div class="cancel_btn2" @click="cancel_btn2">取消</div>
        </div>
      </div>
    </div>

    <div class="popup_box2" v-if="gotoSetting">
      <div class="popup">
        <div class="alert_title"><p class="alert_title_content">设置支付密码</p><img src="../../assets/icon/close.png" class="alert_title_img" @click="cancel_gotoSet"/></div>
        <div class="text-style">
          您还未设置支付密码，是否前往设置？
        </div>
        <div class="btn_group">
          <div class="save_btn2" @click="gotoSet">确认</div>
          <div class="cancel_btn2" @click="cancel_gotoSet">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /*created by fastfan*/
  /*支付方式 */
  .Payment_content{
    width: 100%;
    border-top: 2px solid #e8000e;
  }
  .Payment_contentlist,.Payment_contentlist2{
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0 38px 30px;
    border: 1px solid #d9d9d9;
    margin-top: 20px;
    background-color: #fff;
  }
  .Payment_contentlist2{
    margin-top: 0;
    border-top: none;
  }
  /*订单信息*/
  .order_success{
    font-size: 16px;
    color: #424242;
    line-height: 16px;
    margin-bottom: 22px;
  }
  .order_price{
    color: #424242;
  }
  .order_price>span{
    color: #e60012;
  }
  .order_price,.order_num,.order_numcount{
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 14px;
  }
  /*微信支付*/
  .recriver_info3_content{
    margin: 10px 0px;
    color: #424242;
    font-size: 14px;
  }
  /*微信的弹出框*/
  .wxBoxclass{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    min-width: 1200px;
    background-color: rgba(0,0,0,.3);
    z-index: 999;
  }
  .wxBoxclass .wxson{
    width: 500px;
    position: absolute;
    top: 15%;
    background-color: #fff;
    left: 50%;
    margin-left: -120px;
    box-shadow: 0 5px 40px #1A1A1A;
    padding-bottom: 30px;
  }
  .wx_content{
    float: left;
    text-align: center;
    padding-left:28px ;
  }
  /*支付宝支付弹框*/
  .zfbBoxclass{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    min-width: 1200px;
    background-color: rgba(0,0,0,.3);
    z-index: 999;
  }
  .zfbBoxclass .zfbson{
    width: 250px;
    position: absolute;
    top: 35%;
    background-color: #fff;
    left: 50%;
    margin-left: -120px;
    box-shadow: 0 5px 40px #1A1A1A;
    padding-bottom: 30px;
  }
  .distribution{
    left: -30px;
    /*z-index: -1;*/
  }
  .distribution,.distribution2,.distribution3{
    width: 17px;
    height: 17px;
    position: absolute;
    top: -2px;
  }
  .distribution2,.distribution3{
    left: -81px;
  }
  .recriver_info3_content>img{
    vertical-align: sub;
    position: relative;left: 30px;
  }
  .shouxin{
    color: #3a8cf1;
  }
  .recriver_info3_icon{
    margin: 0 20px 0 10px;
    vertical-align: text-top;
  }
  .payment_next{
    width: 84px;
    height: 30px;
    background-color: #e8000e;
    line-height: 30px;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    margin: 30px 0 0 240px;
    cursor: pointer;
  }
  label{
    font-weight: normal;
    cursor: pointer;
    margin-left: 30px;
  }
  .alert_title{
    line-height: 30px;
    text-align: center;
    background-color: #f2f2f2;
    overflow: hidden;
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
  .popup_box2{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    min-width: 1200px;
    background-color: rgba(0,0,0,.3);
    z-index: 999;
  }
  .text-style{
    text-align: center;
    height: 30px;
    line-height:30px;
    margin-top: 20px;
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
  .popup_box{
    display: none;
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
  .alert_title_content{
    float: left;
    width: 216px;
    padding-left: 28px;
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
    name: "Payment",
    data: function () {
      return {
        unpaidtimeout:0,
        gotoSetting:false,
        isShow:true,
        payment:{
          type:1,
          value:'0.00'
        },
        payment2:{
          type:0,
          value:'0.00'
        },
        //提交支付相关信息
        payInfo:{
          paySecret:'',
          payMoney:'',
          orders:'',
          type:0
        },
        orderno:'',
        paypassword:'',
//              用户调用第三方支付的一组订单id
        orderId:"",
        zfbBox:false,
        uploadurl:"",
        wxBox:false,
        ylBox:false,
        ylBox2:false,
      }
    },
    methods:{
      jump:function(MyName){
        this.$router.push({name:MyName})
      },
      Application(){
        let URL='/usercenter/Application/null';
        window.open(URL,"_blank")
      },
      //付款
      payMoneyFn(){
        let vue = this;
        let param = this.payInfo;
//        console.log(param)
        param.paySecret = vue.$utils.Base64(param.paySecret);
        param.recordid = 0;
        param.isBilling = 0;
        vue.$http.post(
          vue,'/rest/buyer/orders/payByBanlance',param,
          function (vue,data) {
//            console.log(data);
//            vue.changestate(vue.orderno);
            localStorage.removeItem('PayMoney');
            localStorage.removeItem('changeOrderId');
            vue.$router.push({name:'PaySuccess'});
          },
          function (error,data) {
            vue.$message({showClose: true,
              message:data.message,
              type:'error'
            })
          }
        )
      },
//      //付款成功后 改变订单状态
//      changestate(orderno){
//        let vue = this;
//        let param = {
//          orderno:orderno,
//          state:1
//        };
//        vue.$http.post(
//          vue,'/rest/orders/updateOrderState',param,
//          function (vue,data) {
//            console.log(data);
//          },
//          function (error,data) {
//            console.log(data,2);
//          }
//        )
//      },

      //授信额度金额
      select_pay(){
        let vue = this;
        let param = {};
        param.type = this.payment.type;
        vue.$http.post(
          vue,'/rest/buyer/orders/getUserBanlance',param,
          function (vue, data) {
//            console.log(data);
            vue.payment.value=data.data.bigDecimal;
          },
          function (error, data) {

          }
        )
      },
      //余额
      select_pay2(){
        let vue = this;
        let param = {};
        param.type = this.payment2.type;
        vue.$http.post(
          vue,'/rest/buyer/orders/getUserBanlance',param,
          function (vue, data) {
//            console.log(data);
            vue.payment2.value=data.data.bigDecimal;
          },
          function (error, data) {

          }
        )
      },
      //弹出框取消按钮
      cancel_btn2 (){
        let popup_box=document.getElementsByClassName("popup_box");
        let cancel_btn2=document.getElementsByClassName("cancel_btn2");
        popup_box[0].style.display='none';
      },
      //弹出框关闭图片
      alert_title_img (){
        let popup_box=document.getElementsByClassName("popup_box");
        let alert_title_img=document.getElementsByClassName("alert_title_img");
        popup_box[0].style.display='none';
      },
      //前往设置支付密码
      gotoSet(){
//        console.log("前往设置支付密码");
        localStorage.setItem('setpay','setpay');
        location.href = '/usercenter/AccountSafe'
      },
      //取消
      cancel_gotoSet(){
        this.gotoSetting = false;
      },
      //检测用户支付密码是否存在
      getUserInfo(){
        let vue = this;
        let param ={};
        vue.$http.post(
          vue,'/rest/common/db/userInfo',param,
          function (vue,data) {
//            console.log(data,1);
            vue.paypassword = data.data.paypassword;
//            console.log(vue.paypassword);

          },
          function (error,data) {
//            console.log(data);
          }
        )
      },
      //下一步弹出框
      next_select(){
        if(this.paypassword===''|| this.paypassword===null){
          this.gotoSetting = true;
        }else{
          let ipts=document.getElementsByTagName("input");
          if(ipts.item(4).checked===true || ipts.item(3).checked===true){
            let payment_next=document.getElementsByClassName("payment_next");
            let popup_box=document.getElementsByClassName("popup_box");
            let alert_title_img=document.getElementsByClassName("alert_title_img");
            popup_box[0].style.display='block';
          }
          if(ipts.item(5).checked===true){
            this.orderId=this.payInfo.orders;
            if(this.orderId.toString().indexOf(",")!=-1){
              this.orderId= this.orderId.replace(/,/ig,'%2');
            }
////              去往支付宝支付（获取支付宝的支付路径）
            window.open(this.$http.getUrl()+"/rest/alipay/toPay?type=1&&orders="+this.orderId)
            this.zfbBox=true;
//            this.$router.push({name:"PayZhifubao"})
          }
          else if(ipts.item(6).checked===true) {
            this.orderId=this.payInfo.orders;
            if(this.orderId.toString().indexOf(",")!=-1){
              this.orderId= this.orderId.replace(/,/ig,'%2');
            }
            let vue = this;
            let param = {
              orders:vue.orderId,
              type:1
            };
//            console.log(param)
            vue.$http.post(
              vue,'/rest/wxpay/toPay',param,
              function(vue,data){
                vue.uploadurl=vue.$http.getUrl()+'/rest/wxpay/url2qr?url='+data.data.url;
                vue.wxBox=true;
              },
              function (error,data) {
                vue.$message({showClose: true,
                  message:data.message,
                  type: 'error'
                });
              }
            )
//            window.open(this.$http.getUrl()+"/rest/wxpay/toPay?orders="+this.orderId)
//            this.$router.push({name:"PayWeixin"})
          }
          else if(ipts.item(7).checked===true) {
            this.orderId=this.payInfo.orders;
            if(this.orderId.toString().indexOf(",")!=-1){
              this.orderId= this.orderId.replace(/,/ig,'%2');
            }
            let vue = this;
            let param = {
              orders:vue.orderId,
              isCompany:false,
              type:1
            };
//            console.log(param)
            vue.$http.post(
              vue,'/rest/bankpay/toPay',param,
              function(vue,data){
                vue.ylBox =true;
//                window.open(data.data.url);
                window.location.href=data.data.url;
              },
              function (error,data) {
              }
            )

//            this.$router.push({name:"PayYinlian"})
          }
          else if(ipts.item(8).checked===true) {
            this.orderId=this.payInfo.orders;
            if(this.orderId.toString().indexOf(",")!=-1){
              this.orderId= this.orderId.replace(/,/ig,'%2');
            }
            let vue = this;
            let param = {
              orders:vue.orderId,
              isCompany:true,
              type:1
            };
//            console.log(param)
            vue.$http.post(
              vue,'/rest/bankpay/toPay',param,
              function(vue,data){
                vue.ylBox2 =true;
//                window.open(data.data.url);
                window.location.href=data.data.url;
              },
              function (error,data) {
              }
            )

//            this.$router.push({name:"PayYinlian"})
          }
        }

      },
//获取订单的是否支付
      orderpaystate:function(){
        let vue = this;
        let param = {
          orders:vue.payInfo.orders
        };
//        console.log(param);
        vue.$http.post(
          vue,'/rest/buyer/orders/validateOrderPayFinish',param,
          function(vue,data){
            vue.$message({showClose: true,
              message:data.message,
              type: 'success'
            });
            vue.$router.push({name:'PaySuccess'});
            vue.wxBox=false;
            vue.zfbBox=false;
            vue.ylBox =false;
            vue.ylBox2 =false;
          },
          function (error,data) {
            vue.$message({showClose: true,
              message:data.message,
              type: 'error'
            });
            vue.wxBox=false;
            vue.zfbBox=false;
            vue.ylBox =false;
            vue.ylBox2=false;
          })
      },
      //获取交易设置
      getJYSZ(){
        let vue = this;
        let param = {};
        vue.$http.post(
          vue,'/rest/transaction/loadAllTransactionSetting',param,
          function(vue,data){
            vue.unpaidtimeout = data.data.transactionSettings.unpaidtimeout
          },
          function (error,data) {
//            console.log(data);
          }
        )

      },

      //支付金额
      addMoneyValue(){
        this.payInfo.payMoney =  localStorage.getItem('payMoney');
        this.payInfo.orders = localStorage.getItem('changeOrderId');
      }
    },
    mounted(){
      this.$store.commit('savetijiao','已提交');
      this.getUserInfo();
      this.select_pay();
      this.select_pay2();
      this.addMoneyValue();
      this.getJYSZ();
    }
  }
</script>
