<template>
  <div class="PlaceOrder">
    <div class="PlaceOrder_content">
      <div class="PlaceOrder_content_one">
        <div class="PlaceOrder_content_title">
          填写并核对订单信息
        </div>
        <div class="PlaceOrder_content_title2">
          收货人信息<span style="cursor: pointer" @click="writingAddress">[修改]</span>
        </div>
        <div class="recriver_info">
          <div class="recriver_info_l left"><img src="../../assets/icon/f_dingwei.png"/>送货至</div>
          <div class="recriver_info_r right">

            <div class="recriver_info_rc" v-if="defaultaddress1 ==true">
              <span>联系人：{{DefaultAddress.shipto}}</span>
              <span>联系电话：{{DefaultAddress.phone}}</span>
              <span>收货地址：{{DefaultAddress.province}}{{DefaultAddress.city}}{{DefaultAddress.citysmall}}{{DefaultAddress.address}}</span>
            </div>

            <div v-if="defaultaddress1==false">
              <div v-for="infos in addressList" class="recriver_info_rc">
                <input type="radio" v-model="addressID" :value="infos.id" style="margin-right: 5px">
                <span>联系人：{{infos.shipto}}</span>
                <span>联系电话：{{infos.phone}}</span>
                <span>收货地址：{{infos.province}}{{infos.city}}{{infos.citysmall}}{{infos.address}}</span>
              </div>
              <div class="recriver_info_rc2">
                <input type="radio" v-model='addressID' :value="addnewadress" style="margin-right: 5px">
                <span>添加新地址</span>
                <div class="recriver_info_rc2content" v-if="isShowAdd">
                  <el-form :model="addAddressInfos" :rules="rules" ref="addAddressInfos" labelWidth="100px"
                           label-position="right">
                    <el-form-item label="收件人：" prop="shipto">
                      <el-input v-model="addAddressInfos.shipto" :maxlength="6" :minlength="2" class="w_300"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区：">
                      <div style="width: 500px"><span><Addressed @recvMsg="recvMsg"
                                                                 :recmsg="addAddressInfos"></Addressed></span></div>
                    </el-form-item>
                    <el-form-item label="详细地址：" prop="address">
                      <el-input v-model="addAddressInfos.address" class="w_300"
                                placeholder="请认真填写地址,例：xx街道xx号"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：" prop="phone">
                      <el-input v-model="addAddressInfos.phone" :maxlength="11" class="w_300"></el-input>
                    </el-form-item>
                    <el-form-item label="是否默认:">
                      <div>
                        <label>是<input type="radio" class="radio-style" v-model="addAddressInfos.isdefault" :value="1"
                                       :checked="addAddressInfos.isdefault==1"></label>
                        <label>否<input type="radio" class="radio-style" v-model="addAddressInfos.isdefault" :value="0"
                                       :checked="addAddressInfos.isdefault==0"></label>
                      </div>
                    </el-form-item>
                    <el-form-item>
                      <input type="button" @click="addDetail('changeAddressInfo')" value="保存" class="save_btn"><input
                      type="button"
                      class="save_btn2 btn_qx"
                      @click="qxAddaddress"
                      value="取消">
                    </el-form-item>

                    <!--<form v-model="addaddressInfo">-->
                    <!--<div class="receiver_lable">-->
                    <!--<label>收货人：</label>-->
                    <!--<input type="text" class="ipt_pay" v-model="addaddressInfo.shipto">-->
                    <!--</div>-->
                    <!--<div class="receiver_lable">-->
                    <!--<label>电话：</label>-->
                    <!--<input type="text" class="ipt_pay" v-model="addaddressInfo.phone">-->
                    <!--</div>-->
                    <!--<div class="address_select">-->
                    <!--<label>所在地区:</label>-->
                    <!--<Addressed @recvMsg="recvMsg"></Addressed>-->
                    <!--</div>-->
                    <!--<div class="address_details">-->
                    <!--<label>详细地址:</label>-->
                    <!--<input type="text" class="ipt_pay" v-model="addaddressInfo.address">-->
                    <!--</div>-->
                    <!--<div class="address_details">-->
                    <!--<label>是否默认:</label>-->
                    <!--<label>是<input type="radio" class="radio-style" v-model="addaddressInfo.isdefault" :value="1"-->
                    <!--:checked="addaddressInfo.isdefault==1"></label>-->
                    <!--<label>否<input type="radio" class="radio-style" v-model="addaddressInfo.isdefault" :value="0"-->
                    <!--:checked="addaddressInfo.isdefault==0"></label>-->
                    <!--</div>-->

                    <!--</form>-->
                  </el-form>
                </div>
              </div>
            </div>
          </div>
          <div style="margin:0 20px 20px;font-size: 14px">
            <span style="display: inline-block">是否需要发货单：</span>
            <div style="display: inline-block">
              <label>是<input type="radio" class="radio-style" v-model="orderInfo.deliverybill" :value="1"
                             :checked="orderInfo.deliverybill==1"></label>
              <label>否<input type="radio" class="radio-style" v-model="orderInfo.deliverybill" :value="0"
                             :checked="orderInfo.deliverybill==0"></label>
            </div>
          </div>
        </div>
        <div class="PlaceOrder_content_title3">
          发票信息
        </div>
        <div style="border: 1px solid #d9d9d9">
          <div class="recriver_info3_content">
            <div>
              <label style="margin: 0 10px;display: inline-block"><input v-model="orderInfo.isbilling" type="radio"
                                                                         :value="0" :checked="orderInfo.isbilling==0"
                                                                         class="distribution"/><span
                style="display: inline-block;margin: 0 10px;vertical-align: top;line-height: 24px">不开发票</span></label>
            </div>
            <div>
              <label style="margin: 0  0 0 10px;display: inline-block"><input v-model="orderInfo.isbilling" type="radio"
                                                                              :value='1'
                                                                              :checked="orderInfo.isbilling==1"
                                                                              class="distribution"
                                                                              @change="changeTick2"/><span
                style="display: inline-block;margin: 0 0 0 10px;vertical-align: top;line-height: 24px">开发票</span></label>
              <button class="PlaceOrder_content_title3-span" @click="changeTick"
                         :disabled="orderInfo.isbilling!==1">[修改]
              </button>
            </div>
          </div>
          <div class="recriver_info_rc3content" v-if="orderInfo.isbilling==1">
            <div class="tick-border" v-if="MRtick==true&&tickList.length>0">
              <div><span>发票抬头&nbsp;:</span>{{tickInfo.invoiceheadup}}</div>
              <div><span>税号&nbsp;:</span>{{tickInfo.texno}}</div>
              <div><span>开户行&nbsp;:</span>{{tickInfo.bankofaccounts}}</div>
              <div><span>账号&nbsp;:</span>{{tickInfo.account}}</div>
              <div><span>收件人&nbsp;:</span>{{tickInfo.linkman}}</div>
              <div><span>地址&nbsp;:</span>{{tickInfo.address}}</div>
              <div><span>电话&nbsp;:</span>{{tickInfo.phone}}</div>
            </div>
            <div v-if="MRtick==false">
              <div class="tick-border"  v-for="item in tickList" style="cursor: pointer" @click="changeStyle(item.id)"
                   v-bind:class="{redborder:orderInfo.invoiceid ==item.id}">
                <div><span>发票抬头&nbsp;:</span>{{item.invoiceheadup}}</div>
                <div><span>税号&nbsp;:</span>{{item.texno}}</div>
                <div><span>开户行&nbsp;:</span>{{item.bankofaccounts}}</div>
                <div><span>账号&nbsp;:</span>{{item.account}}</div>
                <div><span>收件人&nbsp;:</span>{{item.linkman}}</div>
                <div><span>地址&nbsp;:</span>{{item.address}}</div>
                <div><span>电话&nbsp;:</span>{{item.phone}}</div>
                <img src="../../assets/icon/xuanze.png" height="16" width="27" class="img-right"
                     v-bind:class="{imgRight:orderInfo.invoiceid ==item.id}"/>
              </div>
              <button class=" save_btn_add" @click="showWrap"> + 新增发票信息</button>
              <div v-if="addWrap">
                <div class="tick-add">
                  <div><span><span style="color: #f00">*</span>&nbsp;发票抬头&nbsp;:</span><input type="text"
                                                                                              class="ipt_pay"
                                                                                              v-model="addTickInfo.invoiceheadup">
                  </div>
                  <div><span><span style="color: #f00">*</span>&nbsp;税号&nbsp;:</span><input type="text" class="ipt_pay"
                                                                                            v-model="addTickInfo.texno">
                  </div>
                  <div><span><span style="color: #f00">*</span>&nbsp;开户行&nbsp;:</span><input type="text" class="ipt_pay"
                                                                                             v-model="addTickInfo.bankofaccounts">
                  </div>
                  <div><span><span style="color: #f00">*</span>&nbsp;账号&nbsp;:</span><input type="text" class="ipt_pay"
                                                                                            v-model="addTickInfo.account">
                  </div>
                  <div><span><span style="color: #f00">*</span>&nbsp;收件人&nbsp;:</span><input type="text" class="ipt_pay"
                                                                                             v-model="addTickInfo.linkman">
                  </div>
                  <div><span><span style="color: #f00">*</span>&nbsp;地址&nbsp;:</span><input type="text" class="ipt_pay"
                                                                                            v-model="addTickInfo.address">
                  </div>
                  <div><span><span style="color: #f00">*</span>&nbsp;电话&nbsp;:</span><input type="text" class="ipt_pay"
                                                                                            v-model="addTickInfo.phone"
                                                                                            onkeyup="value=value.replace(/[^\d]/g,'')"
                                                                                            maxlength="11"></div>
                  <div style="width: 100%;display: block;margin-top: 15px">
                    <button class="save_btn2" @click="addTick">保存</button>
                    <button class="save_btn2 btn_qx" @click="closeWrap">取消</button>
                  </div>
                </div>

              </div>

            </div>

          </div>
          <table class="keywords_content_tbd2" style="width: 100%; border-color: #d9d9d9">
            <thead>
            <th></th>
            <th v-for="aa in theads">{{aa}}</th>
            </thead>
            <tbody>
            <template v-for="(item,index) in goodsList" v-if="item">
              <tr>
                <td class="keywords_tbd2_one">
                  <div style="position: relative">
                    <span v-if="item.limitid"><img src="../../assets/icon/limitIcon.png" height="17" width="17" style="position:absolute;left: 80px;top:0;z-index:999"/></span>
                    <img v-if="item.pdpicture&&item.pdpicture.length>0" class="checkimg"
                         :src="$oss.publicUrl(item.pdpicture[0])"/>
                    <img v-else class="checkimg" :src="$oss.publicUrl('default/imgs/defaultProductImg.jpg')"/>
                  </div>


                </td>
                <td class="keywords_tbd2_two"><img v-if="item.selfsupport" src="../../assets/images/self.png"
                                                   height="16" width="34"/>{{item.productname}}<span
                  v-if="item.producttype=='紧固件'">{{item.level3}}</span><span
                  v-if="item.producttype==1">{{item.level3}}</span><br> {{item.attrjson}}
                </td>
                <td><img v-if="item.pic" :src="$oss.publicUrl(item.pic)" alt="" class="check_logoimg">
                  <div>{{item.brand}}</div>
                  <div>{{item.packagetype}}</div>
                </td>
                <td>￥{{item.price}} <span v-if="item.unit">／</span>{{item.unit}}</td>
                <td>{{item.pdstorenum}}{{item.unit}}</td>
                <td>{{item.storename}}</td>
                <td>{{item.delivertime}}</td>
                <td class="keywords_tbd2_nine">
                  {{item.pdnumber}}{{item.unit}}
                  <span v-if="item.packageStr">（{{item.packageStr}}）</span>
                </td>
                <td><span v-if="item.allpay">￥{{calcmunD(item.allpay)}}</span><span
                  v-else>￥{{calcmunD(item.pdnumber * item.price)}}</span><span
                  v-if="item.partpay">/￥{{calcmunD(item.partpay)}}</span></td>
              </tr>

              <tr>
                <td colspan="9" style="padding: 0">
                  <div class="logistics_info" v-if="item.selfsupport && $store.state.type===0">
                    <label style="margin: 0 10px;display: inline-block"><input type="radio" :value="0"
                                                                               v-model="ismailornot"/>快递物流</label>
                    <label style="margin: 0 10px;display: inline-block"><input type="radio" :value="1"
                                                                               v-model="ismailornot"/>客户自提</label>
                    <span class="left" style="margin-right: 70px"
                          v-if="ismailornot===1">自提地址：{{item.storeAddress}} </span>
                    <!--<span class="left" style="margin-right: 70px">联系人：{{DefaultAddress.shipto}}</span>-->
                    <!--<span class="left">联系电话：{{DefaultAddress.phone}}</span>-->
                  </div>
                  <div class="logistics_info" v-if="item.selfsupport && $store.state.type===1">
                    <label style="margin: 0 10px;display: inline-block"><input type="radio" :value="0"
                                                                               v-model="item.ismailornot" :key="index"/>快递物流</label>
                    <label style="margin: 0 10px;display: inline-block"><input type="radio" :value="1"
                                                                               v-model="item.ismailornot" :key="index"/>客户自提</label>
                    <span class="left" style="margin-right: 70px" v-if="item.ismailornot===1">自提地址：{{item.storeAddress}} </span>
                    <!--<span class="left" style="margin-right: 70px">联系人：{{DefaultAddress.shipto}}</span>-->
                    <!--<span class="left">联系电话：{{DefaultAddress.phone}}</span>-->
                  </div>
                  <div class="pay_check">
                    <p v-if="item.partpay">定金：<span class="pay_check_sign">￥</span><span
                      class="pay_check_num">{{calcmunD(item.partpay)}}</span></p>
                    <p v-else>总商品金额：<span class="pay_check_sign">￥</span><span
                      class="pay_check_num">{{calcmunD(item.pdnumber * item.price)}}</span></p>
                    <p v-if="item.limitid">运费：<span class="pay_check_num2" >￥0.00</span></p>
                    <p v-else >运费：<span class="pay_check_num2" >￥{{calcmunD(item.totalCost)}}</span></p>

                    <p>应付金额：<span class="pay_check_sign">￥</span>
                      <span v-if="item.protype==1" class="pay_check_num">{{calcmunD(item.allpay)}}</span>
                      <span v-if="item.protype==2" class="pay_check_num">{{calcmunD(item.partpay)}}</span>
                      <span v-if="item.protype==0&&!item.limitid" class="pay_check_num">{{calcmunD(parseFloat(item.pdnumber * item.price) + parseFloat(item.totalCost))}}</span>
                      <span v-if="item.protype==0&&item.limitid" class="pay_check_num">{{calcmunD(parseFloat(item.pdnumber * item.price))}}</span>
                    </p>
                  </div>
                </td>
              </tr>
            </template>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="10">
                <div class="goback left" @click="jump('Pay')"><img src="../../assets/icon/f_back.png"/>返回购物车</div>
                <div class="total_contented"><p class="total_content">应付总金额：<span class="total_sign">￥</span><span
                  class="total_price">{{calcmun()}}</span></p>
                  <button class="total_menu" @click="commitOrder" :disabled="commitBtnState">提交订单</button>
                </div>
              </td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .w_300 {
    width: 300px;
  }

  .tick-border {
    width: 94%;
    border: 1px solid #d9d9d9;
    margin: 0 auto 20px;
    padding: 10px;
    position: relative;
  }

  .redborder {
    border: 1px solid #e8000e;
  }

  .img-right {
    display: none;
  }

  .imgRight {
    display: inline-block;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .tick-border > div {
    width: 40%;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-left: 10px;
    padding-right: 150px;
  }

  .tick-border > div > span {
    display: inline-block;
    margin-right: 4px;
  }

  .tick-add {
    width: 94%;
    margin: 0 auto 10px;
    padding: 10px;
  }

  .tick-add > div {
    width: 40%;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    margin-left: 10px;
    padding-right: 150px;
  }

  .tick-add > div > span {
    width: 80px;
    margin-right: 15px;
    display: inline-block;
    text-align: right;
  }

  .tick-add > div > input {
    width: 190px;
    padding-left: 5px;
  }

  .radio-style {
    margin-left: 15px;
    margin-right: 30px;
  }

  .PlaceOrder {
    width: 100%;
    border-top: 2px solid #e8000e;
    padding-top: 20px;
  }

  .PlaceOrder_content {
    width: 1200px;
    overflow: hidden;
    margin: 0 auto;
    background-color: #fff;
  }

  /*填写并核对订单信息*/
  .PlaceOrder_content_title {
    color: #333;
    font-size: 18px;
    padding: 30px 0 20px 0;
  }

  .PlaceOrder_content_title2 {
    height: 43px;
    line-height: 43px;
    color: #808080;
    font-size: 16px;
    background-color: #eee;
    padding-left: 15px;
    border: 1px solid #d9d9d9;
    border-bottom: none;
  }

  .PlaceOrder_content_title3 {
    height: 43px;
    line-height: 43px;
    color: #808080;
    font-size: 16px;
    background-color: #eee;
    padding-left: 15px;
    border: 1px solid #d9d9d9;
    border-bottom: none;
    border-top: none;
  }

  /*PlaceOrder_content_one*/
  .PlaceOrder_content_one {
    overflow: hidden;
  }

  .ipt_pay {
    height: 34px;
  }

  .PlaceOrder_content_title2 > span {
    color: #e8000e;
    font-size: 12px;
    margin-left: 5px;
  }

  .PlaceOrder_content_title3-span {
    border: 0;
    outline: none;
    color: #e8000e;
    font-size: 12px;
    margin-left: 5px;
    cursor: pointer;
    height: 23px;
    vertical-align: top;
  }

  .recriver_info {
    overflow: hidden;
    border: 1px solid #d9d9d9;
  }

  .recriver_info_l {
    padding: 15px 0 13px 0;
    font-size: 14px;
    color: #424242;
    width: 104px;
  }

  .recriver_info_r {
    width: 1092px;
    font-size: 14px;
    padding: 16px 0 20px 0;
  }

  .recriver_info_rc {
    margin-bottom: 10px;
  }

  .recriver_info_rc > img {
    vertical-align: sub;
    margin-right: 10px;
  }

  .recriver_info_rc > span {
    margin-right: 35px;
  }

  .recriver_info_l > img {
    margin: 0 10px 0 20px;
  }

  .recriver_info_rc2 > img {
    margin-right: 10px;
    vertical-align: sub;
  }

  /*新增信息*/
  .receiver_lable > label {
    width: 64px;
    display: inline-block;
    text-align: right;
    margin-right: 10px;
    margin-top: 20px;
  }

  .address_select {
    margin-top: 18px;
  }

  .address_select > label {
    margin-right: 10px;
  }

  .address_select > select {
    width: 138px;
  }

  .address_details {
    margin-top: 20px;
  }

  .address_details > label {
    margin-right: 10px;
  }

  .address_details > input {
    width: 500px;
  }

  .save_btn {
    width: 86px;
    height: 30px;
    line-height: 28px;
    background-color: #e8000e;
    color: #fff;
    border: none;
    margin-top: 20px;
    margin-left: 74px;
  }

  .save_btn2 {
    width: 86px;
    height: 30px;
    line-height: 28px;
    background-color: #e8000e;
    color: #fff;
    border: none;
    margin-left: 15%;
  }

  .btn_qx {
    margin-left: 10%;
    background-color: #f2f2f2;
    color: rgb(33, 33, 33);
    margin-top: 20px;
  }

  .btn_qx:hover {
    background-color: #e8000e;
    color: #fff;
  }

  .save_btn_add {
    height: 25px;
    width: 110px;
    line-height: 25px;
    margin-bottom: 20px;
    background-color: #f2f2f2;
    color: rgb(33, 33, 33);
    border: none;
    margin-left: 3%;
  }

  .save_btn_add:hover {
    background-color: #e8000e;
    color: #fff;
  }

  .recriver_info2_content > img, .recriver_info3_content > img {
    vertical-align: sub;
  }

  .distribution {
    width: 17px;
    height: 17px;
    margin-bottom: 5px;
    /*z-index: -1;*/
  }

  .recriver_info3_content {
    margin: 10px 20px;
    color: #424242;
    font-size: 14px;
  }

  .recriver_info_rc3content {
    overflow: hidden;
  }

  .info_rc3content {
    overflow: hidden;
    float: left;
    font-size: 14px;
    color: #424242;
    margin-right: 331px;
    margin-left: 20px;
  }

  .info_rc3content_title {
    overflow: hidden;
    margin-bottom: 10px;
  }

  .info_rc3content_name {
    float: left;
  }

  .info_rc3content_src {
    float: left;
  }

  .keywords_content_tbd2 {
    text-align: center;
    color: #424242;
  }

  /*商品排序表格*/
  .keywords_content_tbd2 thead {
    background-color: #eee;
  }

  .keywords_content_tbd2 thead th {
    text-align: center;
  }

  .keywords_content_tbd2 thead th:first-child {
    text-align: left;
  }

  .keywords_content_tbd2 thead {
    height: 38px;
    line-height: 38px;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }

  .keywords_content_tbd2 thead th input {
    vertical-align: middle;
    margin: 0 9px 0 20px;
  }

  .checkimg {
    width: 64px;
    height: 64px;
  }

  /*.keywords_content_tbd2 tbody tr td input{*/
  /*float: left;*/
  /*margin: 28px 9px 0 20px;*/
  /*}*/
  .keywords_tbd2_two {
    width: 130px;
    text-align: center;
  }

  .check_logoimg {
    width: 30px;
    height: 20px;
    margin: 0 auto;
  }

  .keywords_content_tbd2 tbody tr {
    border-bottom: 1px solid #d9d9d9;
  }

  .keywords_content_tbd2 tbody tr:last-child {
    border-bottom: none;
  }

  .keywords_tbd2_nine {
    width: 130px;
  }

  .keywords_tbd2_one {
    padding-bottom: 14px;
    padding-top: 20px;
    width: 130px;
    position: relative;
  }

  .wholeprice > img, .preprice > img {
    position: absolute;
    bottom: 0;
    right: 0;
    display: none;
  }

  .keywords_content_tbd2 tfoot tr {
    border-top: 1px solid #d9d9d9;
    background-color: #eee;
  }

  .total_content {
    float: left;
  }

  .total_contented {
    float: right;
    overflow: hidden;
    height: 70px;
    line-height: 70px;
  }

  .total_sign {
    color: #e8000e;
    font-size: 18px;
  }

  .total_price {
    color: #e8000e;
    font-size: 18px;
  }

  .total_menu {
    border: 0;
    float: left;
    width: 98px;
    height: 34px;
    background-color: #e8000e;
    color: #fff;
    line-height: 34px;
    text-align: center;
    margin: 18px 60px 18px 35px;
    font-size: 14px;
    cursor: pointer;
  }

  .pay_check_sign, .pay_check_num {
    font-size: 14px;
    color: #e8000e;
  }

  .pay_check_num2 {
    color: #e8000e;
  }

  .pay_check {
    text-align: right;
    padding: 15px 0;
  }

  .pay_check > p:first-child {
    margin-bottom: 20px;
  }

  .pay_check > p:nth-child(2) {
    margin-bottom: 20px;
  }

  .pay_check_num, .pay_check_num2 {
    margin-right: 30px;
  }

  .goback {
    line-height: 80px;
    color: #1d92e3;
    cursor: pointer;
  }

  .goback img {
    vertical-align: middle;
    margin: 0 10px 0 20px;
  }

  /*表格输入框物流*/
  .logistics_info {
    overflow: hidden;
    line-height: 34px;
    border-bottom: 1px solid #d9d9d9;
  }

  .logistics_info > label {
    float: left;
    margin-left: 20px;
    margin-right: 20px;
    color: #424242;
    font-size: 14px;
  }

  .logistics_info > label > input {
    vertical-align: top;
    margin-right: 10px;
    margin-top: 11px;
  }
</style>
<style>
  .recriver_info_rc2content .el-form-item__label {
    font-weight: 400;
  }
</style>
<script>
  import Addressed from './Addressed.vue'

  export default {
    components: {Addressed},
    name: "PlaceOrder",
    data: function () {
      return {
        commitBtnState: false,
        recriver_info2_contents: [
          {name: "客户自提"},
          {name: "快递物流"}
        ],
        recriver_info3_contents: [
          {name: "不开发票"},
          {name: "开发票"}
        ],
        keywords_tbds: [
          {msg: require("../../assets/images/self.png"), cang: "华北仓", time: "立即发货", mount: "1000"}
        ],
        theads: [
          "品名", "商品信息", "单价", "库存", "仓库", "发货时间", "订购量", "总价/定金"
        ],
        optionesd: ["支", "箱", "盒"],
        wholemoneies: [
          {price: "￥13.35", price2: "全款9.9折"},
          {price: "￥13.35", price2: "定金10%"}
        ],
        tickInfo: [],
        goodsList: [],
        addressList: [],
        tickList: [],
        addWrap: false,
        MRtick: true,
        addTickInfo: {
          invoiceheadup: '',
          texno: '',
          bankofaccounts: '',
          account: '',
          linkman: '',
          address: '',
          phone: ''
        },
        DefaultAddress: {},
        defaultaddress1: true,
        addaddressInfo: {
          shipto: '',
          phone: '',
          address: '',
          isdefault: 1,
        },
        addnewadress: false,
        isShowAdd: false,
        addressID: null,
        orderInfo: {
          isbilling: 1,
          billingtype: 1,
          invoiceid: '',
          deliverybill: 1
        },

        addAddressInfos: {
          isdefault: 1,
          shipto: '',
          address: '',
          phone: '',
          province: '北京',
          city: '北京',
          citysmall: '东城区',
        },
        ismailornot: 0,

        rules: {
          shipto: [
            {required: true, message: '请输入收货人', trigger: 'blur'},
            {min: 2, max: 6, message: '请输入2-6位汉字', trigger: 'blur'},
            {pattern: /^[\u0391-\uFFE5]+$/, message: '请输入2-6位汉字', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'},
          ],
          zipcode: [
            {required: true, message: '请输入邮编', trigger: 'blur'},
            {pattern: /^[1-9][0-9]{5}$/, max: 6, message: '邮编格式不正确，请输入6位数字', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {pattern: /^1[34578]\d{9}$/, message: '手机号码不合法，请输入的以139,159等开头的11位数字，', trigger: 'blur'}
          ]
        }

      }
    },
    methods: {
      jump: function (MyName) {
        this.$router.push({name: MyName})
      },
      //显示发票选择项
      changeTick() {
        this.MRtick = false;
      },
      changeTick2() {
        if (this.tickList.length === 0) {
          this.MRtick = false;
        }
      },

      //选中开票信息 改变样式 显示选中发票信息
      changeStyle(id) {
//          console.log(id);
        this.orderInfo.invoiceid = id;
        let vue = this;
        let param = {};
        vue.$http.post(
          vue, '/rest/buyer/invoiceInfo/list', param,
          function (vue, data) {
//            console.log(data);
            vue.MRtick = true;
            vue.tickInfo = data.data.find(o => o.id === id);
          },
          function (error, data) {
//            console.log(data);
          }
        )
      },

      //购物车自营商品 选择发货方式
      getSelfSend() {
        let arr = [];
        let list = this.goodsList;
        for (let i = 0; i < list.length; i++) {
          if (list[i].selfsupport && list[i].ismailornot === 0) {
            arr.push(list[i].pdid);
          }
        }
        return JSON.stringify(arr);

      },

      //提交订单
      commitOrder() {
        let vue = this;
        vue.commitBtnState = true;
//        console.log(this.$store.state.type);
        if (this.$store.state.type === 1) {
          let param = this.orderInfo;
          param.province = this.DefaultAddress.province;
          param.city = this.DefaultAddress.city;
          param.area = this.DefaultAddress.citysmall;
          param.receivingaddress = this.DefaultAddress.address;
          param.shipto = this.DefaultAddress.shipto;
          param.phone = this.DefaultAddress.phone;
          param.ids = this.$store.state.pdids;
          param.mailornotPidArray = this.getSelfSend();
          if(param.province&&param.city&&param.area&&param.receivingaddress&&param.shipto&&param.phone){
            vue.$http.post(
              vue, '/rest/buyer/orders/submitOrders', param,
              function (vue, data) {
                vue.commitBtnState = false;
                localStorage.setItem('payMoney', vue.calcmun());
//              vue.$store.commit('rmPayMoney', vue.calcmun());
                let Arr = [];
                let List = data.data.ordersList;
                for (let i = 0; i < List.length; i++) {
                  if (List[i].id) {
                    let aaa = List[i].id;
                    Arr.push(aaa);
                  }
                }
                ;
//                console.log(Arr);
                let orderId = vue.$utils.changeInfoType(Arr);
                localStorage.setItem('changeOrderId', orderId);
//              vue.$store.commit('changeOrderId', orderId);
//              if (vue.goodsList !== []) {
//                vue.$store.commit('reduceNum', vue.goodsList.length);
//              }
                vue.$router.push({name: 'Payment'});
              },
              function (error, data) {
                vue.commitBtnState = false;
                vue.$message({
                  showClose: true,
                  message: data.message,
                  type: 'error'
                });
              }
            )
          } else {
            vue.$message({
              message:'请先填写收货地址',
              type:'error',
              showClose:true
            })
          }

        } else if (this.$store.state.type === 0) {
          let param = this.orderInfo;
          let buyGoodsInfo = this.$store.state.buyGoodsInfo;
          param.pdid = buyGoodsInfo.pdid;
          param.pdno = buyGoodsInfo.pdno;
          param.limitid = buyGoodsInfo.limitid;
          param.protype = buyGoodsInfo.protype;
          param.sellerid = buyGoodsInfo.saleid;
          param.unit = buyGoodsInfo.unit;
          param.num = buyGoodsInfo.pdnumber;
          param.storeid = buyGoodsInfo.storeid;
          param.storename = buyGoodsInfo.storename;
          param.deliverytime = buyGoodsInfo.deliverytime;
          param.ismailornot = 0;
          param.isonline = buyGoodsInfo.isonline;
          param.province = this.DefaultAddress.province;
          param.city = this.DefaultAddress.city;
          param.area = this.DefaultAddress.citysmall;
          param.receivingaddress = this.DefaultAddress.address;
          param.shipto = this.DefaultAddress.shipto;
          param.phone = this.DefaultAddress.phone;
          param.ismailornot = this.ismailornot;
//          console.log(param);
          if(param.province&&param.city&&param.area&&param.receivingaddress&&param.shipto&&param.phone){
            vue.$http.post(
              vue, '/rest/buyer/orders/submitProductToOrder', param,
              function (vue, data) {
//              console.log(data.message);
                vue.commitBtnState = false;
                localStorage.setItem('payMoney', vue.calcmun());
                localStorage.setItem('changeOrderId', data.data.ordersList[0].id);
//              vue.$store.commit('rmPayMoney', vue.calcmun());
//              vue.$store.commit('changeOrderId', data.data.ordersList[0].id);
                vue.$router.push({name: 'Payment'});
              },
              function (error, data) {
                vue.commitBtnState = false;
                vue.$message({
                  showClose: true,
                  message: data.message,
                  type: 'error'
                });
              }
            );
          } else {
            vue.$message({
              message:'请先填写收货地址',
              type:'error',
              showClose:true
            })
          }

        }
      },

      //获取地址信息
      recvMsg: function (msg) {
//        console.log(msg)
        this.addAddressInfos.province = msg.prov;
        this.addAddressInfos.city = msg.city;
        this.addAddressInfos.citysmall = msg.district;
//          console.log(this.addAddressInfo.province)
      },

      //显示添加地址栏
      changeAddState() {
        if (this.addressID === false) {
          this.isShowAdd = true;
        } else {
//          console.log(this.addressID);
          let vue = this;
          let param = {};
          vue.$http.post(
            vue, '/rest/buyer/ShippingAddress/listShippingAddress', param,
            function (vue, data) {
//              console.log(data);
              vue.addressList = data.data.pageInfo.list;
              vue.DefaultAddress = data.data.pageInfo.list.find(o => o.id === vue.addressID);
              vue.getGoodsList();
              vue.defaultaddress1 = true;
            },
            function (error, data) {
//              console.log(data, 1);
            }
          )
        }

      },

      //添加新地址
      addDetail() {

        let vue = this;
        let param = this.addAddressInfos;
        if (param.shipto && param.address && param.phone && param.phone.toString().length === 11) {
          vue.$http.post(
            vue, '/rest/buyer/ShippingAddress/addShippingAddress', param,
            function (vue, data) {
//            console.log(data);
              vue.$message({
                message: '新增成功！',
                type: 'success'
              });
              vue.getDefaultAddress();
              vue.addAddressInfos = {
                shipto: '',
                phone: '',
                address: '',
                isdefault: 1,
              };
              vue.isShowAdd = false;
              vue.defaultaddress1 = true;
            },
            function (error, data) {
//              console.log(data,1)
              vue.isShowAdd = false;
            }
          )
        }

      },
      //取消添加
      qxAddaddress() {
        this.isShowAdd = false;
        this.addAddressInfos = {
          isdefault: 0,
          shipto: '',
          address: '',
          phone: '',
          province: '北京',
          city: '北京',
          citysmall: '东城区',
        }
      },

      //修改收货地址及联系人信息
      writingAddress() {
        this.defaultaddress1 = !this.defaultaddress1;
      },


      //计算单个订单列表总价
      calcmunD(item) {
        if (item) {
          return parseFloat(item + 0.000001).toFixed(2)

        } else {
          return '0.00'
        }

      },

      //计算订单列表总价
      calcmun() {
        let payFor = 0;
        for (let i = 0; i < this.goodsList.length; i++) {
          let item_price;
          let totalCost = 0;
          if(this.goodsList[i].limitid){
            totalCost = 0;
          } else {
            totalCost = this.goodsList[i].totalCost;
          }
          totalCost += 0.000001;
          if (this.goodsList[i].partpay) {
//            console.log('定金')
            item_price = this.goodsList[i].partpay;
            item_price += 0.000001;
            payFor += parseFloat(item_price.toFixed(2));
          } else if (this.goodsList[i].allpay) {
//            console.log('远期全款')
            item_price = this.goodsList[i].allpay;
            item_price += 0.000001;
            payFor += parseFloat(item_price.toFixed(2)) + parseFloat(totalCost.toFixed(2));
          } else {
            item_price = this.goodsList[i].pdnumber * this.goodsList[i].price;
            item_price += 0.000001;
            payFor += parseFloat(item_price.toFixed(2)) + parseFloat(totalCost.toFixed(2))
//            console.log(this.goodsList[i].totalCost)
//            console.log('立即发货')
          }
        }
        return (payFor + 0.000001).toFixed(2)
      },

      //获取订单确认页面商品列表
      getGoodsList() {
        let vue = this;
        let param = {};
        if (this.$store.state.type === 0) {
          param.type = this.$store.state.type;
          param.pdids = this.$store.state.buyGoodsInfo.pdid;
          param.pdnum = this.$store.state.buyGoodsInfo.pdnumber;
          param.pdunit = this.$store.state.buyGoodsInfo.unit;
          param.pdno = this.$store.state.buyGoodsInfo.pdno;
          param.pddilivery = this.$store.state.buyGoodsInfo.deliverytime;
          param.pdstoreid = this.$store.state.buyGoodsInfo.storeid;
          param.protype = this.$store.state.buyGoodsInfo.protype;
          param.uProvince = this.DefaultAddress.province;
          param.uCity = this.DefaultAddress.city;
          param.isonline = this.$store.state.buyGoodsInfo.isonline;
          param.limitid = this.$store.state.buyGoodsInfo.limitid;
        } else if (this.$store.state.type === 1) {
          param.type = this.$store.state.type;
          param.shopcarids = this.$store.state.pdid2s;
          param.uProvince = this.DefaultAddress.province;
          param.uCity = this.DefaultAddress.city;
        }
        vue.$http.post(
          vue, '/rest/buyer/shopcar/loadSelectProduct', param,
          function (vue, data) {
            vue.goodsList = data.data.list;
            vue.goodsList[0].ismailornot = 0;
          },
          function (error, data) {
            if(data.message==='同一账号超过购买数量'){
              vue.$message({
                message:data.message,
                type:'error',
                showClose:true
              });
            }
            vue.$router.go(-1);
          }
        )
      },
      //获取默认地址 联系人 电话
      getDefaultAddress() {
        let vue = this;
        let param = {};
        vue.$http.post(
          vue, '/rest/buyer/ShippingAddress/listShippingAddress', param,
          function (vue, data) {
//            console.log(data.data);
            vue.addressList = data.data.pageInfo.list;
            vue.DefaultAddress = data.data.pageInfo.list.find(o => o.isdefault === 1);
            if (vue.addressList.length === 0) {
//              console.log('未设置地址');
              vue.defaultaddress1 = false;
              vue.isShowAdd = true;
              vue.DefaultAddress = vue.addaddressInfo;
            }
            vue.getGoodsList();
          },
          function (error, data) {
//              console.log(data,1);

          }
        )
      },

      //获取开票列表
      getTickList() {
        let vue = this;
        let param = {};
        vue.$http.post(
          vue, '/rest/buyer/invoiceInfo/list', param,
          function (vue, data) {
            vue.tickList = data.data;
            if(data.data.length===0){
              vue.MRtick = false;
              vue.addWrap =true;
            }
          },
          function (error, data) {
          }
        )
      },

      //添加开票模块显示
      showWrap() {
        this.addWrap = true;
      },
      closeWrap() {
        this.addWrap = false;
        this.addTickInfo = [];
      },

      //添加新的开票信息
      addTick() {
        let successInfo = this.addTickInfo.invoiceheadup !== '' && this.addTickInfo.texno !== '' && this.addTickInfo.bankofaccounts !== '' && this.addTickInfo.account !== '' && this.addTickInfo.linkman !== '' && this.addTickInfo.address !== '' && this.addTickInfo.phone !== '';
        if (successInfo === true) {
          let vue = this;
          let param = this.addTickInfo;
          vue.$http.post(
            vue, '/rest/buyer/invoiceInfo/add', param,
            function (vue, data) {
              vue.$message({
                message: '新增开票信息成功',
                type: 'success'
              })
              vue.addTickInfo = [];
              vue.addWrap = false;
              vue.getTickList();
            },
            function (error, data) {

            }
          )
        } else {
          this.$message({
            message: '请检查必填项是否填写',
            type: 'error'
          })
        }

      },

      //获取默认开票信息
      getDefaultTick() {
        let vue = this;
        let param = {};
        vue.$http.post(
          vue, '/rest/buyer/invoiceInfo/default/detail', param,
          function (vue, data) {
//            console.log(data);
            vue.tickInfo = data.data;
            if (data.data) {
//              console.log('未设置开票信息');
              vue.orderInfo.invoiceid = data.data.id;
            } else {
              vue.tickInfo = vue.addTickInfo;
              vue.MRtick = false;
            }

          },
          function (error, data) {

          }
        )
      },
    },
    created() {
      if (this.$store.state.tijiao === '已提交') {
        this.$store.commit('savetijiao', '');
        this.$router.push({name: 'IndustrialProducts'});
      }
      this.getTickList();
      this.getDefaultTick();
      this.getDefaultAddress();

    },
    watch: {
      'addressID': 'changeAddState'
    }
  }
</script>
