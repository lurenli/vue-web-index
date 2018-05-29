<template>
  <div class="Pay">
    <div class="ShopCar_content">
      <div class="ShopCar_contentlist">
        <div class="keywords_content">
          <div class="keywords_title">
            <p class="keywords_titlecontent left">我的购物车</p>
            <p class="keywords_titlelist right"><img src="../../assets/icon/delete.png" @click="deleteAll"/></p>
          </div>
          <div class="toast" v-if="isToastShow">
            <div class="toast_title">
              您确认结算吗？
            </div>
            <div class="btnWarp">
              <button @click="toAccount">确认</button>
              <button @click="isToastShow = false" class="qxBtn">取消</button>
            </div>
          </div>
          <div class="toast" v-if="isDeleteShow">
            <div class="toast_title">
              您确认批量删除这些吗？
            </div>
            <div class="btnWarp">
              <button @click="clearAll">确认</button>
              <button @click="isDeleteShow = false" class="qxBtn">取消</button>
            </div>
          </div>
          <div class="keywords_content2">
            <table class="keywords_content_tbd2" style="width: 100%; border-color: #d9d9d9">
              <thead>
              <th><input type="checkbox" v-model="isSelectAll" :value="true" @change="selectAll">全选</th>
              <th v-for="aa in theads">{{aa}}</th>
              </thead>
              <tbody>
              <tr v-for="(getInformation,index) in getInformations" class="getInformation2s">
                <td class="keywords_tbd2_one"><input type="checkbox" :value="getInformation.id" v-model="selectArr"
                                                     class="checkBox" @change="ifselect"
                                                     :data-pdid="getInformation.pdid">
                  <div class="checkimg" style="position: relative">
                    <span v-if="getInformation.limitid"><img src="../../assets/icon/limitIcon.png" height="17" width="17" style="position:absolute;left: 47px;top:0;z-index:999"/></span>
                    <img
                      :src="$oss.publicUrl(getInformation.pdpicture&&getInformation.pdpicture.length>0?getInformation.pdpicture[0]:'default/imgs/defaultProductImg.jpg')"
                      style="cursor: pointer" width="64"
                      height="64" @click="click_ipt(getInformation.pdid,getInformation.producttype)">
                  </div>
                </td>
                <td class="keywords_tbd2_two">
                  <img style="vertical-align: middle" src="../../assets/images/self.png"
                       v-if="getInformation.selfsupport==true"/>
                  <span>{{getInformation.productname}}</span>
                  <span>{{getInformation.level3}}</span>
                  <span>{{getInformation.attrjson}}</span>
                  <span>{{getInformation.material}}{{getInformation.cardnum}}</span>
                  <span style="margin-left: 5px">{{getInformation.packagetype}}</span>
                </td>
                <td>
                  <div class="check_logoimg" v-if="getInformation.pic">
                    <img :src="$oss.publicUrl(getInformation.pic)"/>
                  </div>
                  <div>{{getInformation.brand}}</div>
                </td>
                <td>￥{{getInformation.price}}／{{getInformation.defaultUnit}}</td>
                <td>{{getInformation.pdstorenum}}{{getInformation.defaultUnit}}</td>
                <td>{{getInformation.storename}}</td>
                <td>{{getInformation.delivertime}}</td>
                <td style="text-align: center">
                  <div style="display: inline-block">
                    <!--<button class="num_decreae left" @click="decreaseNum(getInformation)">-</button>-->
                    <input type="text" class="num_input left" v-model="getInformation.pdnumber"
                           v-if="getInformation.producttype==1 ||getInformation.producttype==null"
                           v-on:input="inputFunc2(index,getInformation.pdnumber)"
                           @change="selectVal2($event,getInformation.id,getInformation.pdnumber ,getInformation.startnum,getInformation.selected,getInformation.pdid,getInformation.storeid,getInformation.delivertime,getInformation.protype)"
                           id="mySelect2" :data-id="getInformation.id" :data-pdnumber="getInformation.pdnumber"
                           :data-pdid="getInformation.pdid" :data-storeid="getInformation.storeid"
                           :data-delivertime="getInformation.delivertime"/>
                    <input type="text" class="num_input left" v-model="getInformation.pdnumber" v-else
                           v-on:input="inputFunc(index,getInformation.pdnumber)"
                           @change="selectVal2($event,getInformation.id,getInformation.pdnumber,getInformation.startnum,getInformation.selected,getInformation.pdid,getInformation.storeid,getInformation.delivertime,getInformation.protype)"
                           :data-id="getInformation.id" :data-pdnumber="getInformation.pdnumber"
                           :data-pdid="getInformation.pdid" :data-storeid="getInformation.storeid"
                           :data-delivertime="getInformation.delivertime"/>
                    <!--<button class="num_increas left" @click="addNum(getInformation)">+</button>-->
                  </div>
                </td>
                <td>
                  <select class="num_danwei" v-model="getInformation.selected" v-if="getInformation.producttype==1"
                          @change="selectVal(index,$event,getInformation.id,getInformation.pdnumber,getInformation.pdid,getInformation.storeid,getInformation.delivertime,getInformation.protype)"
                          id="mySelect" :data-id="getInformation.id" :data-pdnumber="getInformation.pdnumber"
                          :data-pdid="getInformation.pdid" :data-storeid="getInformation.storeid"
                          :data-delivertime="getInformation.delivertime">
                    <option v-for="item in getInformation.packages" v-model="item.unit" class="danwei">{{ item.unit }}
                    </option>
                  </select>
                  <span style="vertical-align: sub;" v-else>{{getInformation.defaultUnit}}</span>
                </td>
                <td>{{getInformation.packageStr}}</td>
                <td v-if="getInformation.protype===0">
                  ￥{{((getInformation.price * getInformation.pdnumber) + parseFloat(0.00001)).toFixed(2)}}
                </td>
                <td v-if="getInformation.protype===1">￥{{(getInformation.price *
                  getInformation.pdnumber).toFixed(2)}}/￥{{getInformation.allpay}}
                </td>
                <td v-if="getInformation.protype===2">￥{{(getInformation.price *
                  getInformation.pdnumber).toFixed(2)}}/￥{{getInformation.partpay}}
                </td>
                <td class="keywords_tbd2_last" @click="delGoods(index)">删除</td>
              </tr>
              <!--<tr v-for="keywords_tbd in keywords_tbds" style="">-->
              <!--<td class="keywords_tbd2_one"><img src="../../assets/icon/preview.png" class="keywords_tbd2_one_img" /><input type="checkbox"><div class="checkimg"></div></td>-->
              <!--<td class="keywords_tbd2_two"><img :src="keywords_tbd.msg"/>奥展外六角螺栓／不锈钢－304/螺钉GB819/M2*10/本色</td>-->
              <!--<td><div class="check_logoimg"></div><div>奥展无</div><div>2千/盒|6盒/箱</div></td>-->
              <!--<td>￥13.35／千</td>-->
              <!--<td>0支</td>-->
              <!--<td></td>-->
              <!--<td></td>-->
              <!--<td class="keywords_tbd2_nine">-->
              <!--<div class="num_decreae left">-</div>-->
              <!--<input type="text" class="num_input left" value="1000">-->
              <!--<div class="num_increas left">+</div>-->
              <!--<select class="num_danwei"><option v-for="dd in optionesd">{{dd}}</option></select>-->
              <!--</td>-->
              <!--<td class="pre_whole">-->
              <!--<ul class="money_price">-->
              <!--<li class="wholemoney" v-for="wholemoney in wholemoneies"><p class="wholeprice"><img src="../../assets/icon/select3.png"/>{{wholemoney.price}}</p><p class="wholepriced">{{wholemoney.price2}}</p></li>-->
              <!--</ul>-->
              <!--</td>-->
              <!--<td class="keywords_tbd2_last">删除</td>-->
              <!--</tr>-->
              <!--<tr v-for="keywords_tbd3 in keywords_tbd3s" style="">-->
              <!--<td class="keywords_tbd2_one"><input type="checkbox"><div class="checkimg"></div></td>-->
              <!--<td class="keywords_tbd2_two"><img :src="keywords_tbd3.msg"/>奥展外六角螺栓／不锈钢－304/螺钉GB819/M2*10/本色</td>-->
              <!--<td><div class="check_logoimg"></div><div>奥展无</div><div>2千/盒|6盒/箱</div></td>-->
              <!--<td>￥13.35／千</td>-->
              <!--<td>0支</td>-->
              <!--<td></td>-->
              <!--<td></td>-->
              <!--<td class="keywords_tbd2_nine">-->
              <!--<div class="num_decreae left">-</div>-->
              <!--<input type="text" class="num_input left" value="1000">-->
              <!--<div class="num_increas left">+</div>-->
              <!--<select class="num_danwei"><option v-for="dd in optionesd">{{dd}}</option></select>-->
              <!--</td>-->
              <!--<td class="pre_whole">-->
              <!--<ul class="money_price">-->
              <!--<li class="wholemoney" v-for="wholemoney in wholemoneies"><p class="wholeprice"><img src="../../assets/icon/select3.png"/>{{wholemoney.price}}</p><p class="wholepriced">{{wholemoney.price2}}</p></li>-->
              <!--</ul>-->
              <!--</td>-->
              <!--<td class="keywords_tbd2_last">删除</td>-->
              <!--</tr>-->
              <!--<tr v-for="keywords_tbd3 in keywords_tbd3s" class="soldout">-->
              <!--<td class="keywords_tbd2_one"><input type="checkbox"><div class="checkimg"></div></td>-->
              <!--<td class="keywords_tbd2_two"><img :src="keywords_tbd3.msg"/>奥展外六角螺栓／不锈钢－304/螺钉GB819/M2*10/本色</td>-->
              <!--<td><div class="check_logoimg"></div><div>奥展无</div><div>2千/盒|6盒/箱</div></td>-->
              <!--<td>￥13.35／千</td>-->
              <!--<td>0支</td>-->
              <!--<td class="keywords_tbd2_four">商品售罄,请联系客服！</td>-->
              <!--<td></td>-->
              <!--<td class="keywords_tbd2_nine">-->
              <!--<div class="num_decreae left">-</div>-->
              <!--<input type="text" class="num_input left" value="1000">-->
              <!--<div class="num_increas left">+</div>-->
              <!--<select class="num_danwei"><option v-for="dd in optionesd">{{dd}}</option></select>-->
              <!--</td>-->
              <!--<td class="pre_whole">-->
              <!--<ul class="money_price">-->
              <!--<li class="wholemoney" v-for="wholemoney in wholemoneies"><p class="wholeprice"><img src="../../assets/icon/select3.png"/>{{wholemoney.price}}</p><p class="wholepriced">{{wholemoney.price2}}</p></li>-->
              <!--</ul>-->
              <!--</td>-->
              <!--<td class="keywords_tbd2_last">删除</td>-->
              <!--</tr>-->
              </tbody>
              <tfoot>
              <tr v-model="getInformations">
                <td colspan="12">
                  <div class="total_contented">
                    <p class="total_content">总计（不含运费）：<span class="total_sign">￥</span>
                      <span class="total_price">{{totalX.toFixed(2)}}</span>
                    </p>
                    <button class="total_menu" :disabled="canGo" @click="gotojiesuan">去结算</button>
                  </div>
                </td>
              </tr>
              </tfoot>
            </table>
            <div class="block" style="text-align: right; padding: 15px;background-color: #f9f9f9">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    name: "Pay",
    data: function () {
      return {
//              keywords_tbd2s: [
//                {msg:require("../../assets/icon/disanfang.png")}
//              ],
//              keywords_tbd3s: [
//                {msg:require("../../assets/icon/disanfang.png")}
//              ],
        theads: [
          "商品信息", "品牌", "单价", "库存", "仓库", "发货时间", "订购量", "单位", "", "总价/预定价", "操作"
        ],
        totalMoney: 0,
        canGo:true,
        isSelectAll: false,
        pdnumber: '',
        price: '',
        currentPage: 1,
        pageSize: 100,
        total: 0,
        getInformations: [],
//        getInformation3s: [],
        deletesAll: [],
        deletes: [],
        selectArr: [],
        pdids: [],
        Index: [],
        selected: "千",
        selects: [
          {text: "千", value: '千'},
          {text: "盒", value: '盒'},
          {text: "箱", value: '箱'}
        ],
        wholemoneies: [
          {price: "￥13.35", price2: "全款9.9折"},
          {price: "￥13.35", price2: "定金10%"}
        ],
        isToastShow: false,
        isDeleteShow: false,
      }
    },
    computed: {

      totalX: function () {
        let total = 0;
        this.fetchObjectFromId(this.selectArr, this).forEach(o => {
          let price = parseFloat(o.price * o.pdnumber);
          if (o.protype === 1) {
            price = o.allpay;
          } else if (o.protype === 2) {
            price = o.partpay;
          }
          price += 0.0001;
          price = parseFloat(price.toFixed(2));
          total += price;
        });
//        console.log(this.getInformations)
        if (this.selectArr.length === this.getInformations.length) {
          this.isSelectAll = true;
        } else {
          this.isSelectAll = false;
        }
        return parseFloat(total + 0.0001);
      }
    },
    methods: {
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getInformation();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getInformation();
      },


      //点击产品图片跳转详情
      click_ipt(id, type) {
        if (type == 1) {
          this.$router.push({name: "IndustrialDetail", params: {id: id}});
        } else if (type == 2) {
          this.$router.push({name: "FastDetail", params: {id: id}});
        }

      },
      jump: function (MyName) {
        this.$router.push({name: MyName})
      },
      //获取购物车列表
      getInformation() {
        let vue = this;
        let param = this.getInformations;
        param.pageNo = this.currentPage;
        param.pageSize = this.pageSize;
        vue.$http.post(
          vue, '/rest/buyer/shopcar/loadAllShopCar', param,
          function (vue, data) {
            vue.canGo = false;
//            console.log(data.data.pageInfo.list);
            let newList = [];
            vue.total = data.data.pageInfo.total;
            for (let index in data.data.pageInfo.list) {
              let information = data.data.pageInfo.list[index];
              information.selected = information.unit;
              if (information.producttype == 1) {//jingujian
                information.defaultUnit = information.packages[0].unit;
              } else {
                information.defaultUnit = information.unit;
              }
              newList.push(information);
            }
            vue.getInformations = newList;
            vue.$store.commit("newNum", 1);
          },
          function (error, data) {
//            console.log("error")
//            vue.getInformations = data.pageInfo.list;
          }
        )
      },
      //商品信息详情
//      getInfor(){
//        let vue = this;
//        let param = this.getInformation3s;
//        vue.$http.post(
//          vue,'/rest/front/product/getProductInfo',param,
//          function (vue, data) {
//            vue.getInformatio3s=data.data.productInfo;
//            vue.addGoods=data.data.productInfo;
//            console.log(data.data.productInfo)
//          },
//          function (error, data) {
//
//          }
//        )
//      },
      //删除商品
      delGoods: function (index) {
//        let checkBox = document.getElementsByClassName("checkBox");
//        if (checkBox[index].checked === true) {
        let vue = this;
        let param = {};
        param.id = this.getInformations[index].id;
        vue.$http.post(
          vue, '/rest/buyer/shopcar/deleteShopCar', param,
          function (vue, data) {
            vue.getInformation()
          },
          function (error, data) {
          }
        )
//        }
      },
      clearAll() {

        let vue = this;
        let param = vue.selectArr.join(',');
//        console.log(param);
        param = {ids: param};
        vue.$http.post(
          vue, '/rest/buyer/shopcar/deleteAllShopCar', param,
          function (vue, data) {
            vue.selectArr = [];
            vue.isSelectAll = false;
            vue.isDeleteShow = false;
            vue.getInformation();
          },
          function (error, data) {
          }
        )

      },
      //删除所有商品
      deleteAll() {
        if (this.getInformations.length > 0) {
          let idList = this.selectArr;
          if (idList.length > 0) {
            this.isDeleteShow = true;
          } else {
            alert("先勾选");
          }
        } else {
          alert("无任何商品");
        }

      },
      //全选
      selectAll() {
        if (!this.isSelectAll) {
          this.selectArr = [];
        } else { //实现全选
//          this.selectArr.forEach(o=>{
//            this.seleteall(this.getInformations,o,this.Index);
//          });
          this.selectArr = [];
          let vue = this;
          vue.getInformations.forEach(function (getInformation) {
            vue.selectArr.push(getInformation.id);
            vue.totalMonies();
          });
//          console.log(this.selectArr);
        }
      },
      //数量增加
      addNum(obj) {
        obj.pdnumber++;
        let vue = this;
        let param = {};
        param.id = obj.id;
        param.pdnumber = obj.pdnumber;
        param.unit = obj.selected;
        param.pdid = obj.pdid;
        param.storeid = obj.storeid;
        param.delivertime = obj.delivertime;
        param.protype = obj.protype;
        vue.$http.post(
          vue, '/rest/buyer/shopcar/updateShopCar', param,
          function (vue, data) {
//            let salePrice=data.data.saleprice;
//            console.log("saleprice:"+data.data.saleprice)
//            vue.getInformations[index].price=1;
            vue.getInformation();
          },
          function (error, data) {
            vue.$message({
              showClose: true,
              message: data.message,
              type: 'error'
            });
            vue.getInformation();
          }
        )
      },
      //数量减少
      decreaseNum(obj) {
        // console.log(obj);
        // let num = obj.pdnumber;
        // let unit = obj.selected;
        // let packageList = obj.packages;
        // //默认单位为最小单位packageList[0].unit
        // for (let i = 0; i < packageList.length; i++) {
        //   if (packageList[i].unit === unit) {
        //     return num;
        //   } else {
        //     let numRate = packageList[i].num === 0 ? 1 : packageList[i].num;
        //     num = num * numRate;
        //   }
        // }
        if (obj.pdnumber > obj.startnum && obj.pdnumber > 1) {
          obj.pdnumber--;
          let vue = this;
          let param = {};
          param.id = obj.id;
          param.pdnumber = obj.pdnumber;
          param.unit = obj.selected;
          param.pdid = obj.pdid;
          param.storeid = obj.storeid;
          param.delivertime = obj.delivertime;
          param.protype = obj.protype;
          vue.$http.post(
            vue, '/rest/buyer/shopcar/updateShopCar', param,
            function (vue, data) {
//            let salePrice=data.data.saleprice;
//            console.log("saleprice:"+data.data.saleprice)
//            vue.getInformations[index].price=1;
              vue.getInformation();
            },
            function (error, data) {
              vue.$message({
                showClose: true,
                message: data.message,
                type: 'error'
              });
              vue.getInformation();
            }
          )
        }
      },
      //select的值
      selectVal: function (index, ele, id, pdnumber, pdid, storeid, delivertime, protype) {
        this.getInformations[index].selected = ele.target.value;
//        let num_qian=(this.getInformation3s.packingList[0].num);
//        let num_he=(this.getInformation3s.packingList[1].num)
//        let startnum2=Math.ceil(this.startnum2/num_qian);
//        let startnum3=Math.ceil(this.startnum3/num_qian/num_he);
//        if(this.selected==="千"){
//          let startnum=this.startnum4;
//          this.startnum=startnum;
//          this.stopAniu=startnum;
//        }
//        if(this.selected==="盒"){
//          this.startnum=startnum2;
//          this.stopAniu=startnum2;
//        }
//        if(this.selected==="箱"){
//          this.startnum=startnum3;
//          this.stopAniu=startnum3;
//        }
        let vue = this;
        let param = {};
        param.id = id;
        param.pdnumber = pdnumber;
        param.unit = ele.target.value;
        param.pdid = pdid;
        param.storeid = storeid;
        param.delivertime = delivertime;
        param.protype = protype;
        vue.$http.post(
          vue, '/rest/buyer/shopcar/updateShopCar', param,
          function (vue, data) {
//            let salePrice=data.data.saleprice;
//            console.log("saleprice:"+data.data.saleprice)
//            vue.getInformations[index].price=1;
            vue.getInformation();
          },
          function (error, data) {
            vue.$message({
              showClose: true,
              message: data.message,
              type: 'error'
            });
            vue.getInformation();
          }
        )
      },
      inputFunc(i, value) {
        this.getInformations[i].pdnumber = parseInt(value) ? parseInt(value) : 0;
      },
      inputFunc2(i, value) {
        let intValue = 0.00;
        if (value != null && !isNaN(value)) {
          //检查小数点后是否对于两位
          intValue = value;
          if (value.toString().split(".").length > 1 && value.toString().split(".")[1].length > 3) {
            // alert("小数点后不能多于两位！");
            intValue = parseFloat(value).toFixed(3);
          }
        }
        this.getInformations[i].pdnumber = intValue;
      },
      selectVal2: function (ele, id, pdnumber, startnum, unit, pdid, storeid, delivertime, protype) {
        let vue = this;
        let param = {};
        param.id = id;
        param.pdnumber = pdnumber;
        if (!param.pdnumber) {
          param.pdnumber = startnum
        }
        param.unit = unit;
        param.pdid = pdid;
        param.storeid = storeid;
        param.delivertime = delivertime;
        param.protype = protype;
        vue.$http.post(
          vue, '/rest/buyer/shopcar/updateShopCar', param,
          function (vue, data) {
//            console.log(data);
            vue.getInformation();
          },
          function (error, data) {
            vue.$message({
              showClose: true,
              message: data.message,
              type: 'error'
            });
            vue.getInformation();
          }
        )
      },
//      总价
      totalMonies() {
        let _this = this;
        this.getInformations.forEach(function (getInformation, index) {
          if (typeof getInformation.checked === "undefined") {
            _this.$set(getInformation, "checked", true);
            let price = parseFloat((getInformation.price * getInformation.pdnumber).toFixed(2));
            if (getInformation.protype === 1) {
              price = getInformation.allpay;
            } else if (getInformation.protype === 2) {
              price = getInformation.partpay;
//              console.log(price);
            }
            _this.totalMoney += price;
          }
        });
      },
      ifselect() {
//        console.log(this.selectArr);

      },
      //pdid
      findName(getInformations, value, pdid) {
        for (let i = 0; i < getInformations.length; i++) {
          if (getInformations[i].id === value) {
            this.pdids.push(getInformations[i].id);
            return;
          }
        }
      },
      //index
//      seleteall(getInformations, value, index) {
//        for (let i = 0; i < getInformations.length; i++) {
//          if (getInformations[i].id === value) {
//            this.Index.push(getInformations[i].index);
//            return;
//          }
//        }
//      },
      fetchObjectFromId(selectArr, vue) {
        let arr = [];
        selectArr.forEach(id => {
          for (let i = 0; i < vue.getInformations.length; i++) {
            if (id === vue.getInformations[i].id) {
              arr.push(vue.getInformations[i]);
              break;
            }
          }
        });
        return arr;
      },
      toAccount() {
        this.isToastShow = false;
        let type = 1;
        let pdids = this.selectArr;
        this.selectArr.forEach(o => {
          this.findName(this.getInformations, o, this.pdids);
        });
        let pdid2s = this.selectArr;

        function changeInfoType(param) {
          let aaa = '';
          for (let j = 0; j < param.length; j++) {
            if (j < param.length - 1) {
              aaa += param[j] + ',';
            } else {
              aaa += param[j];
            }
          }
          return aaa;
        };
        pdids = changeInfoType(this.selectArr);
        pdid2s = changeInfoType(this.pdids);
        this.$store.commit('changetype', type);
        this.$store.commit('changepdids', pdids);
        this.$store.commit('changepdid2s', pdid2s);
//        console.log(this.$store.state.pdid2s);
        this.$router.push({name: "PlaceOrder"})

      },
      getkucun(list,ids){
        for(let i = 0;i<ids.length;i++){
          let data = list.find((o)=> o.id===ids[i]);
          if(data.pdstorenum<data.pdnumber){
            this.isToastShow = false;
             this.$message({
               message:'所选商品库存不足！',
               type:'error',
               showClose:true
             })
          }
        }
      },
      gotojiesuan() {
        let pdids = this.selectArr;
        if (pdids.length > 0) {
          this.isToastShow = true;
        } else {
//          alert("请先勾选")
          this.$message({
            showClose: true,
            message: "请先勾选",
            type: 'warning'
          })
        }
        this.getkucun(this.getInformations,pdids);
      },

    },
    mounted() {
      this.getInformation();
//      this.getInfor();
    }
  }
  //    通过id遍历pdid

</script>
<style scoped>
  /*created by fastfan*/
  /*购物车标题 */
  .ShopCar_content {
    width: 100%;
    border-top: 2px solid #e8000e;
    padding-top: 20px;
  }

  .ShopCar_contentlist {
    width: 1200px;
    margin: 0 auto;
  }

  /*关键字*/
  .keywords_content {
    width: 1200px;
    margin: auto;
    /*font-weight: 700;*/
    overflow: hidden;
  }

  .keywords_title {
    overflow: hidden;
    /*background-color: #fff;*/
  }

  .keywords_titlecontent {
    margin: 29px 0 19px 10px;
    font-size: 18px;
    color: #333;
  }

  .keywords_titlelist {
    color: #666;
    margin: 30px 18px 22px 0;
  }

  .keywords_titlelist > img {
    cursor: pointer;
  }

  /*列表表格*/
  .keywords_content_list table tr td {
    cursor: pointer;
  }

  .keywords_content_list table tr td:first-child {
    width: 112px;
    padding-left: 14px;
  }

  .keywords_content_list table tr td:last-child {
    position: absolute;
    right: 0;
    width: 126px;
  }

  .keywords_content_list table tr td:last-child a {
    margin-left: 28px;
  }

  .keywords_content_list table tr td:nth-child(2) {
    width: 948px;
  }

  .keywords_content_list table tr {
    overflow: hidden;
    border-bottom: solid 1px #d9d9d9;
  }

  .keywords_content_list table tr:last-child {
    border-bottom: none;
  }

  /*商品排序*/
  .keywords_content2 {
    overflow: hidden;
    background-color: #fff;
  }

  .keywords_content2_ul li {
    width: 54px;
    height: 26px;
    color: #424242;
    text-align: center;
    float: left;
    border: 1px solid #d9d9d9;
    border-right: none;
  }

  .keywords_content2_ul li a {
    margin-top: 4px;
    color: #424242;
    display: block;
    float: left;
    margin-left: 9px;
  }

  .keywords_content2_ul li img {
    float: right;
    margin-top: 7px;
    margin-right: 7px;
  }

  .keywords_content2_ul li:first-child {
    background-color: #e8000e;
    color: #fff;
    border: none;
    width: 56px;
    height: 26px;
  }

  .keywords_content2_ul li:last-child {
    border-right: 1px solid #d9d9d9;
  }

  .keywords_content2_ul li:first-child a {
    color: #fff;
  }

  .keywords_shopcar span {
    color: #424242;
    margin: 0 10px 0 5px;
  }

  .keywords_content_tbd2 {
    text-align: center;
    border: 1px solid #d9d9d9;
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
    border-bottom: 1px solid #d9d9d9;
  }

  .keywords_content_tbd2 thead th input {
    vertical-align: middle;
    margin: 0 9px 0 20px;
  }

  .checkimg {
    float: left;
    width: 64px;
    height: 64px;
  }

  .keywords_content_tbd2 tbody tr td input {
    float: left;
    margin: 28px 9px 0 20px;
  }

  .keywords_tbd2_two {
    width: 130px;
    text-align: left;
  }

  .check_logoimg {
    width: 30px;
    height: 20px;
    /*background-color: blue;*/
    margin: 0 auto;
  }

  .check_logoimg > img {
    width: 30px;
    height: 20px;
  }

  .num_decreae {
    width: 14px;
    height: 26px;
    background-color: #f0f0f0;
    border: solid 1px #d9d9d9;
    line-height: 26px;
    cursor: pointer;
  }

  .num_increas {
    width: 14px;
    height: 26px;
    background-color: #f0f0f0;
    border: solid 1px #d9d9d9;
    line-height: 26px;
    cursor: pointer;
  }

  .keywords_content_tbd2 tbody tr td input.num_input {
    width: 41px;
    height: 28px;
    background-color: #ffffff;
    border: solid 1px #d9d9d9;
    margin: 0;
    /*border-left: none;*/
    /*border-right: none;*/
    text-align: center;
  }

  .keywords_content_tbd2 tbody tr {
    border-bottom: 1px solid #d9d9d9;
  }

  .keywords_content_tbd2 tbody tr:last-child {
    border-bottom: none;
  }

  .keywords_tbd2_one_img {
    position: absolute;
    top: 0;
    left: 0;
  }

  .num_danwei {
    height: 26px;
  }

  .keywords_tbd2_nine {
    /*padding-left: 20px;*/
    text-align: center;
  }

  .keywords_tbd2_nine > div {
    width: 160px;
  }

  .keywords_tbd2_one {
    padding-bottom: 14px;
    padding-top: 20px;
    width: 130px;
    position: relative;
  }

  .wholeprice {
    width: 72px;
    height: 24px;
    background-color: #fef4f4;
    color: #e60012;
    border: 1px solid #ffbbbf;
    line-height: 24px;
    margin-top: 22px;
    position: relative;
    font-size: 12px;
  }

  .wholeprice:hover {
    width: 72px;
    height: 24px;
    background-color: #fef4f4;
    color: #e60012;
    border: 1px solid #e8000e;
    line-height: 24px;
    margin-top: 22px;
    position: relative;
    font-size: 14px;
  }

  .wholeprice > img, .preprice > img {
    position: absolute;
    bottom: 0;
    right: 0;
    display: none;
  }

  .wholepriced {
    width: 72px;
    margin-top: 5px;
  }

  .wholemoney {
    margin-right: 3px;
  }

  .wholemoney {
    float: left;
  }

  .pre_whole {
    width: 150px;
    margin: 0 auto;
  }

  .keywords_tbd2_last {
    cursor: pointer;
    width: 70px;
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

  .keywords_tbd2_four {
    color: #e8000e;
    position: relative;
    top: 32px;
  }

  .soldout {
    opacity: .6;
  }

  .toast {
    z-index: 100;
    position: fixed;
    width: 300px;
    top: 40%;
    left: 42%;
    background-color: #fff;
    box-shadow: 0 0 8px 6px rgba(0, 0, 0, 0.1);
  }

  .toast_title {
    height: 80px;
    width: 100%;
    line-height: 80px;
    font-size: 16px;
    color: rgb(66, 66, 66);
    text-align: center;
  }

  .btnWarp {
    height: 50px;
    line-height: 50px;
    margin-bottom: 20px;
  }

  .btnWarp button {
    text-align: center;
    width: 80px;
    height: 30px;
    line-height: 30px;
    background-color: rgb(232, 0, 14);
    border: 1px solid rgb(232, 0, 14);
    outline: none;
    margin: 8px auto;
    color: #fff;
    border-radius: 1px;
    margin-left: 47px;
  }

  .btnWarp .qxBtn {
    color: #666;
    background-color: rgb(230, 230, 230);
    border: 1px solid rgb(230, 230, 230);
  }
</style>
