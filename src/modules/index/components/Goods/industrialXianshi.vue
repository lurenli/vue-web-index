<template>
  <div>
    <div class="IdDetail">
      <!--主体内容! -->
      <section id="main" class="clear">
        <!--产品的类别导航路径-->
        <div class="bread-crumb">
          <a href="/">首页</a>
          <span>&gt;</span>
          <a href="/IndustrialProducts">{{getInformations.level1}}</a>
          <span>&gt;</span>
          <a href="/IndustrialProducts">{{getInformations.level2}}</a>
          <span>&gt;</span>
          <a>{{getInformations.level3}}</a>
          <span>/</span>
          <a>{{getInformations.material}}</a>
          <span>/</span>
          <a>{{getInformations.mark}}</a>
          <span>/</span>
          <a>{{getInformations.stand}}</a>
          <span>/</span>
          <a>{{getInformations.surfacetreatment}}</a>
        </div>
        <!--产品简介-->
        <div id="product_intro">
          <div id="preview">
            <div class="smallpic" id="box">
              <img v-model="showPic" style="width: 350px;height: 350px" :src="$oss.publicUrl(showPic)" v-if="showPic!=null"/>
              <img  :src="$oss.publicUrl('default/imgs/defaultProductImg.jpg')" style="width: 350px;height: 350px" v-else>
              <div id="move"></div>
              <div id="bimg">
                <img id="b_bimg" :src="$oss.publicUrl(showPic)"/>
              </div>
            </div>
            <h1>
              <a class="backward" @click="backward"></a>
              <a class="forward" @click="forward"></a>
              <ul id="icon_list">
                <li v-for="item in getInformations.pdpicture" @click="choosePic(item)">
                  <img  :src="$oss.publicUrl('default/imgs/defaultProductImg.jpg')"  style="width:80px;height:80px;" v-if="(getInformations.pdpicture==null)||(getInformations.pdpicture.length==0)">
                  <img :src="$oss.publicUrl(item)" v-bind:style="listenPic(item,showPic)"
                       :alt="getInformations.productname" v-else/>
                </li>
              </ul>
            </h1>
            <ul class="share">
              <li :class="[this.states == true ? 'collection2' : 'collection']" @click="addcollect"
                  style="cursor: pointer;"
                  v-if="isreal"><i style="margin-left: 36px">收藏商品</i></li>
              <li :class="[this.states == true ? 'collection2' : 'collection']" @click="qxcollect"
                  style="cursor: pointer;"
                  v-if="isreal2"><i style="margin-left: 36px">已收藏</i></li>
              <li class="shareson" style="display: none">
                <i style="margin-left:30px;">分享到：</i>
                <a class="jiathis_button_weixin" style="margin-right: 10px">
                  <img class="shareWX" src="../../assets/images/wx.png" style="cursor: pointer;">
                </a>
                <a class="jiathis_button_cqq" style="margin-right: 10px">
                  <img class="shareQQ" src="../../assets/images/qq.png" style="cursor: pointer;">
                </a>
              </li>
            </ul>
          </div>

          <!--商品信息-->
          <div class="product_detail">
            <ul>
              <li><img class="self" src="../../assets/images/self.png"><span class="title">{{getInformations.productname}}&nbsp;{{getInformations.level3}}</span></li>
              <li style="background:#fff7f8 ">
                <span class="priceTitle">限时价：</span><span class="nowprice"
                                                          id="nowprice">￥{{activeGoodsInfo.limitprice}}/{{productInfo.unit}}</span><s>￥{{activeGoodsInfo.originalprice}}/{{productInfo.unit}}</s>
              </li>
              <li style="background:#fff7f8"  class="purchase">
                <img src="../../assets/images/purchase.png">
                <span v-if="limitTimeProd.state===4">剩<countdown  :endTime="limitTimeProd.endtime" :startTime="systemTime" :callback="callback" :endText="''"></countdown>结束</span>
                <span v-if="limitTimeProd.state===1"><countdown  :endTime="limitTimeProd.begintime" :startTime="systemTime" :callback="callback" :endText="''"></countdown>后开始</span>
              </li>
            </ul>
            <ul id="summary" v-model="getInformations">
              <li>
              <span>
                  <i class="i">标准:</i>
                  <b class="s1">{{getInformations.level2}}{{getInformations.level3}}</b>
              </span>
              </li>
              <li>
              <span>
                  <i class="i">品名:</i>
                  <b class="s1">{{getInformations.productname}}</b>
              </span>
              </li>
              <li>
              <span>
                  <i class="i">品牌:</i>
                  <b class="s1">{{getInformations.brand}}</b>
              </span>
              </li>
              <li>
              <span>
                  <i class="i">材质:</i>
                  <b class="s1">{{getInformations.material}}</b>
              </span>
              </li>
              <li>
              <span>
                  <i class="i">牌号:</i>
                  <b class="s1">{{getInformations.cardnum}}</b>
              </span>
              </li>
              <li>
              <span>
                  <i class="i">印记:</i>
                  <b class="s1">{{getInformations.mark}}</b>
              </span>
              </li>
              <li>
              <span>
                  <i class="i">表面处理:</i>
                  <b class="s1">{{getInformations.surfacetreatment}}</b>
              </span>
              </li>
              <li>
              <span>
                  <i class="i">规格:</i>
                  <b class="s1">{{getInformations.stand}}</b>
              </span>
              </li>
              <li>
              <span>
                  <i class="i">包装方式:</i>
                  <b class="s1">{{getInformations.packagetype}}</b>
              </span>
              </li>
              <li>
              <span>
                  <i class="i">活动库存:</i>
                  <b class="s1">{{activeGoodsInfo.storenum}}{{getInformations.unit}}</b>
              </span>
              </li>
              <li>
              <span>
                  <i class="i">重量/计量单位:</i>
                  <b class="s1">{{getInformations.weight}}kg/千</b>
              </span>
              </li>
              <li>
              <span>
                  <i class="i">起订量:</i>
                  <b class="s1">{{getInformations.productStore.startnum}}{{getInformations.unit}}</b>
              </span>
              </li>
              <li class="choose">
                <span>交货时间：</span>
                <b class="s1">立即发货</b>
              </li>
              <li class="choose">
              <span>
                  <i class="i">仓库选择:</i>
                  <b class="s1">{{getInformations.productStore.storename}}</b>
              </span>
              </li>
              <li class="amount" style="position: relative">
                <span class="left" style="margin-right: 3px">购买数量：</span>
                <button class="num_decreae left" @click="handleReduce"> -</button>
                <input type="text" class="left num_car" id="startnum" v-model="startnum"
                       v-on:input="inputFunc(startnum)"
                       v-on:blur="inputBlur(startnum)">
                <button class="num_increas left" @click="handleAdd"> +
                </button>
                <select class="num_danwei" id="mySelect"  v-model="selected">
                  <option class="danwei" :value="productInfo.unit" :label="productInfo.unit">
                    {{productInfo.unit}}
                  </option>
                </select>
                <span>每人限购<span>{{limitTimeProd.buylimit}}{{productInfo.unit}}</span></span>
              </li>
              <li class="bts" @click="toBuyNow" v-if="limitTimeProd.state===4">
                <a class="bt-buy">
                  立即购买
                </a>
              </li>
              <li class="bts3"  v-if="limitTimeProd.state===1">
                <a class="bt-buy">
                  即将开始
                </a>
              </li>
              <li class="bts2" @click="adds" v-if="limitTimeProd.state===4">
                <a class="bt-add">
                  <i></i>加入购物车
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div class="toast" v-if="isCartShow">
        <div class="toast_title">
          您确认加入购物车吗？
        </div>
        <div class="btnWarp">
          <button @click="toAddShopcart" :disabled="canBuy">确认</button>
          <button @click="isCartShow = false" class="qxBtn">取消</button>
        </div>
      </div>
      <div class="toast" v-if="isBuyShow">
        <div class="toast_title">
          立即购买？
        </div>
        <div class="btnWarp">
          <button @click="toBuyNow">确认</button>
          <button @click="isBuyShow = false" class="qxBtn">取消</button>
        </div>
      </div>
      <div class="detail_down">
        <div class="right_tab">
          <ul class="tabs">
            <li v-for="(tabsData,index) in tabsDatas" @click="toggle(index)" :class="{active:active==index}"
                style="cursor: pointer">
              {{tabsData}}
            </li>
          </ul>
          <div class="proDetails" v-show="isShow1">
            <div v-html="pddes" class="pddes">
              {{pddes}}
            </div>
            <!--<img src="../../assets/images/proDetail.png">-->
          </div>
          <div class="appraise" v-show="isShow2">
            <ul>
              <li>
                <span>宝贝与描述相符：</span>
                <span class="eva_rates"><el-rate v-model="eva1" disabled show-score text-color="#ff9900"
                                                 score-template="{value}"></el-rate></span>
              </li>
              <li>
                <span>卖家服务：</span>
                <span class="eva_rates"><el-rate v-model="eva2" disabled show-score text-color="#ff9900"
                                                 score-template="{value}"></el-rate></span>
              </li>
              <li>
                <span>物流服务：</span>
                <span class="eva_rates"><el-rate v-model="eva3" disabled show-score text-color="#ff9900"
                                                 score-template="{value}"></el-rate></span>
              </li>
              <li class="pingjia" v-for="listson in evalutes">
                <div class="pj_left" v-if="listson.isanonymous===2">
                  <span>
                    <img src="../../assets/icon/morentouxiang.png" style="width: 62px;height: 62px">
                  </span>
                  <div class="pj_name">匿名评价</div>
                </div>
                <div class="pj_left" v-else>
                  <span>
                    <!--<img :src="$oss.publicUrl(listson.pdpic)" style="width: 62px;height: 62px">-->
                    <img src="../../assets/icon/morentouxiang.png" style="width: 62px;height: 62px">
                  </span>
                  <div class="pj_name">{{listson.membername}}</div>
                </div>
                <div class="pj_right">
                  <span class="pj_msg">{{listson.buyersexperience}}</span>
                  <span class="pj_img"
                        v-if="$oss.publicUrl(listson.pic)==!null ||$oss.publicUrl(listson.pic)!==''"></span>
                  <span class="pj_img" v-else><img :src="$oss.publicUrl(listson.pic)"></span>
                  <span class="pj_time">{{listson.evatime | formatTime(listson.evatime)}}</span>
                </div>
              </li>
            </ul>
            <div class="block" style="text-align: right; margin-top: 20px;">
              <el-pagination style="text-align: right" :page-sizes="[10, 20, 50, 100]"
                             :page-size="10" :current-page="currentPage"
                             layout="total, sizes, prev, pager, next, jumper" :total="maxtotal"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="drawing" v-show="this.showDrawing">
      <div class="right">
        <img @click="closeDrawing" class="drawing_cancel" src="../../assets/images/dialog_quxiao.png"/>
      </div>
      <div style="text-align: center">
        <div class="drawing_img">
          <img :src="$oss.publicUrl(getInformations.pddrawing[0])" v-if="getInformations.pddrawing!=null"/>
          <img  :src="$oss.publicUrl('default/imgs/defaultProductImg.jpg')" v-else>
        </div>
      </div>
      <div class="drawing_des">
        <ul>
          <li>材质：{{getInformations.material}}</li>
          <li>品名：{{getInformations.productname}}&nbsp;{{getInformations.level3}}</li>
          <li>规格：{{getInformations.stand}}</li>
        </ul>

        <ul>
          <li>条码：{{getInformations.pdno}}</li>
          <li>描述：{{getInformations.pddes}}</li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '../../../../utils/common.js'
  import countdown from './Countdown.vue'
  export default {
    components: { countdown },
    name: 'IndustrialDetail',
    data() {
      return {
        canBuy:false,
        isCartShow: false,
        isBuyShow: false,
        pddes: "",
        //是否预定
        booking: false,
        payType: 0,
        showPic: "",
        showDrawing: false,
        //变量起订量
        startnum: '',
        startnum2: '',
        startnum3: '',
        startnum4: '',
        //变量价格
        prodprice: '',
        threeprice: '',
        sevenprice: '',
        thirtyprice: '',
        sixtyprice: '',
        prodprice2: '',
        y: 1,
        selected: "千",
        selecte2d: "立即发货",
        preUnit: "",
        getInformations: {
          id: '',
          pddrawing: [""],
          productStore: [
            {marketprice: ''}
          ]
        },
        addGoods: {
          productStore: [
            {pdid: ''}
          ]
        },
        selects: [],
        select2s: [
//           {text: "立即发货", value: '立即发货'},
//           {text: "30天后发货", value: '30天后发货'},
//           {text: "60天后发货", value: '60天后发货'},
//          {text: "90天后发货", value: '90天后发货'},
        ],
        HotList_msges: [
          {msg: require("../../assets/icon/floor.png")},
          {msg: require("../../assets/icon/floor2.png")},
          {msg: require("../../assets/icon/floor3.png")}
        ],
        wholemoneies: [
          {price: "全款9.9折",},
          {price: "定金",}
        ],
        rate: "",
        aaa: [{}],
        //停止按钮
        stopAniu: '',
        active: 0,
        isShow1: true,
        isShow2: false,
        tabsDatas: ['商品详情', '商品评价'],
        evalutes: [],
        currentPage: 1,
        pageNo: 1,
        pageSize: 10,
        maxtotal: 0,
        //宝贝与描述相符评分
        eva1: 0,
        //卖家服务
        eva2: 0,
        //物流服务
        eva3: 0,
        isreal: true,
        isreal2: false,
        //收藏状态
        states: false,
        activeGoodsInfo:[],
        limitTimeProd:{},
        productInfo:{},
        systemTime:0,
      }
    },
    methods: {
//正在开发中
      opening: function () {
        this.$message({showClose: true,
          message: '此功能正在开发中。。。',
          type: 'warning'
        });
      },

      //获取活动规则信息
      getActiveDetail(){
        let vue =this;
        let param = {
          id:vue.$route.params.active
        };
        vue.$http.post(
          vue,'/rest/front/activity/limittime/limitTimeDetail',param,
          function (vue,data) {
            vue.activeGoodsInfo = data.data.limitTimeStoreList[0];
            vue.limitTimeProd = data.data.limitTimeProd;
            vue.productInfo = data.data.productInfo;
            vue.systemTime = data.  data.systemTime;
          },
          function (error,data) {

          }
        )
      },

      callback(){
        let vue = this;
        setTimeout(function () {
          location.reload()
        },500)
//        this.getActiveDetail();
      },



      //检测是否被收藏
      checkcollect() {
        let vue = this;
        let param = {};
        param.pid = vue.$route.params.id;
        vue.$http.post(
          vue, '/rest/front/product/favorite/state', param,
          function (vue, data) {
            vue.states = data.data.state;
            if (vue.states === true) {
              vue.isreal = false;
              vue.isreal2 = true
            } else {
              vue.isreal = true;
              vue.isreal2 = false
            }
          },
          function (error, data) {
            console.log(error)
          }
        )
      },
      //添加收藏
      addcollect() {
        let vue = this;
        let param = {};
        param.pid = vue.$route.params.id;
        vue.$http.post(
          vue, '/rest/buyer/favorite/add', param,
          function (vue, data) {
            vue.$message({showClose: true,
              message: '已收藏',
              type: 'success'
            });
            vue.isreal2 = true;
            vue.isreal = false;
            vue.checkcollect()
          },
          function (error, data) {
            vue.$message({showClose: true,
              message: data.message,
              type: 'error'
            })
          }
        )
      },
      //取消收藏
      qxcollect() {
        let vue = this;
        let param = {};
        param.pid = vue.$route.params.id;
        vue.$http.post(
          vue, '/rest/buyer/favorite/delete', param,
          function (vue, data) {
            vue.$message({showClose: true,
              message: '已取消收藏',
              type: 'success'
            });
            vue.isreal2 = false;
            vue.isreal = true;
            vue.checkcollect()
          },
          function (error, data) {
            vue.$message({showClose: true,
              message: data.message,
              type: 'error'
            })
          }
        )
      },
      //评分详情
      evaluteRate() {
        let vue = this;
        let param = {
          pdid: vue.$route.params.id
        };
//        console.log(param)
        vue.$http.post(
          vue, '/rest/producteva/getSingleProductEva', param,
          function (vue, data) {
            vue.eva1 = data.data.evaPageModel.eva1;
            vue.eva2 = data.data.evaPageModel.eva2;
            vue.eva3 = data.data.evaPageModel.eva3;
          },
          function (error, data) {
            console.log(error)
          }
        )
      },
      //评价详情
      evalute() {
        let vue = this;
        let param = {
          pdid: this.$route.params.id,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          pdno: this.getInformations.pdno,
        }
//        console.log(param)
        vue.$http.post(
          vue, '/rest/producteva/getSingleProductEvaList', param,
          function (vue, data) {
            vue.evalutes = data.data.pageInfo.list;
            vue.maxtotal = data.data.pageInfo.total;
          },
          function (error, data) {
            console.log(error)
          }
        )
      },
      handleCurrentChange(val) {
        this.pageNo = val;
        this.evalute()
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.evalute()
      },
      //放大镜
      bigimg() {
        var bbox = document.getElementById("box");
        var bmove = document.getElementById("move");
        var bbimg = document.getElementById("bimg");
        var b_bimg = document.getElementById("b_bimg");
        bbox.onmouseover = function () {//鼠标移动到box上显示大图片和选框
          bbimg.style.display = "block";
          bmove.style.display = "block";
        }
        bbox.onmouseout = function () {//鼠标移开box不显示大图片和选框
          bbimg.style.display = "none";
          bmove.style.display = "none";
        }
        bbox.onmousemove = function (e) {//获取鼠标位置
          var x = e.clientX;//鼠标相对于视口的位置
          var y = e.clientY;
          var t = bbox.offsetTop;//box相对于视口的位置
          var l = bbox.offsetLeft;
          var _left = x - l - bmove.offsetWidth / 2;//计算move的位置
          var _top = y - t - bmove.offsetHeight / 2;
          if (_top <= 0)//滑到box的最顶部
            _top = 0;
          else if (_top >= bbox.offsetHeight - bmove.offsetHeight)//滑到box的最底部
            _top = bbox.offsetHeight - bmove.offsetHeight;
          if (_left <= 0)//滑到box的最左边
            _left = 0;
          else if (_left >= bbox.offsetWidth - bmove.offsetWidth)//滑到box的最右边
            _left = bbox.offsetWidth - bmove.offsetWidth;
          bmove.style.top = _top + "px";//设置move的位置
          bmove.style.left = _left + "px";
          var w = _left / (bbox.offsetWidth - bmove.offsetWidth);//计算移动的比例
          var h = _top / (bbox.offsetHeight - bmove.offsetHeight);
          var b_bimg_top = (b_bimg.offsetHeight - bbimg.offsetHeight) * h;//计算大图的位置
          var b_bimg_left = (b_bimg.offsetWidth - bbimg.offsetWidth) * w;
          b_bimg.style.top = -b_bimg_top + "px";//设置大图的位置信息
          b_bimg.style.left = -b_bimg_left + "px";
        }
      },

      openDrawing() {
        this.showDrawing = true;
      }
      ,
      closeDrawing() {
        this.showDrawing = false;
      }
      ,
      choosePic(src) {
        this.showPic = src;
      }
      ,
      backward() {
        for (let i = 1; i < this.getInformations.pdpicture.length; i++) {
          if (this.getInformations.pdpicture[i] === this.showPic) {
            this.showPic = this.getInformations.pdpicture[i - 1];
          }
        }
      }
      ,
      forward() {
        for (let i = 0; i < this.getInformations.pdpicture.length - 1; i++) {
          if (this.getInformations.pdpicture[i] === this.showPic) {
            this.showPic = this.getInformations.pdpicture[i + 1];
          }
        }
      }
      ,
      listenPic(src1, src2) {
        if (src1 === src2) {
          return {border: '1px solid red'};
        } else {
          return {border: 'none'};
        }
      }
      ,
      selectPayment(index) {
        this.payType = index;
      }
      ,
      checkPayTime(index) {
        if (this.selecte2d.name === "立即发货") {
          return false;
        } else {
          return true;
        }

      },
      inputFunc(val) {
        let intValue = 0.00;
        if (val != null && !isNaN(val)) {
          //检查小数点后是否对于两位
          intValue = val;
          if (val.toString().split(".").length > 1 && val.toString().split(".")[1].length > 3) {
            // alert("小数点后不能多于两位！");
            intValue = parseFloat(val).toFixed(3);
          }
        }
        if(intValue > this.limitTimeProd.buylimit){
          intValue = this.limitTimeProd.buylimit;
        }  else if(intValue < 0){
          intValue = this.limitTimeProd.buylimit;
        }
        this.startnum = intValue;
//        if (this.checkNumber(intValue) < this.getInformations.productStore.startnum) {
//          this.startnum = Math.floor(this.getNumber(this.getInformations.productStore.startnum, this.selected));
//          this.prodprice = this.singlePrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.startnum);
//          this.wholemoneies[0].price = this.totalPrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.startnum, 0.99);
//          this.wholemoneies[1].price = this.totalPrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.startnum, 0.1);
//        } else if (this.checkNumber(intValue) > this.getInformations.productStore.pdstorenum) {
//          this.startnum = Math.floor(this.getNumber(this.getInformations.productStore.pdstorenum, this.selected));
//          this.prodprice = this.singlePrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.pdstorenum);
//          this.wholemoneies[0].price = this.totalPrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.pdstorenum, 0.99);
//          this.wholemoneies[1].price = this.totalPrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.pdstorenum, 0.1);
//        }else{
        this.updatePrice(this.prodprice, intValue);
//        }

      }
      ,
      inputBlur(val) {
        if (this.checkNumber(val) <= 0) {
          this.startnum = this.getNumber(this.limitTimeProd.buylimit, this.selected);
          // this.prodprice = this.singlePrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.startnum);
          // this.wholemoneies[0].price = this.totalPrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.startnum, 99);
          // this.wholemoneies[1].price = this.totalPrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.startnum, this.rate);
        } else if (this.checkNumber(val) > this.limitTimeProd.buylimit) {
          this.startnum = this.getNumber(this.limitTimeProd.buylimit, this.selected);
          // this.prodprice = this.singlePrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.pdstorenum);
          // this.wholemoneies[0].price = this.totalPrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.pdstorenum, 99);
          // this.wholemoneies[1].price = this.totalPrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.pdstorenum, this.rate);
        }
      }
      ,
      updatePrice(newP, newNum,) {//更新价格
        let newPrice = newP ? newP : this.prodprice;
        let num = newNum ? newNum : this.startnum;
        // this.wholemoneies[0].price = this.totalPrice(newPrice, this.checkNumber(num), 99);//9.9折
        // this.wholemoneies[1].price = this.totalPrice(newPrice, this.checkNumber(num), this.rate);
      }
      ,
      getNumber(num, unit) {
        let packageList = this.getInformations.packingList?this.getInformations.packingList:[];
        for (let i = 0; i < packageList.length; i++) {
          if (packageList[i].unit === unit) {
//            console.log("getNumber:" + num);
            return num;
          } else {
            let numRate=packageList[i].num===0?1:packageList[i].num;
            num = (num / numRate).toFixed(2);
          }
        }
        return num;
      }
      ,
      checkNumber(num) {//判断num
        let unit = this.selected;
        let storeUnit = this.getInformations.unit;
        let packageList = this.getInformations.packingList;
        //默认单位为最小单位packageList[0].unit
        for (let i = 0; i < packageList.length; i++) {
          if (packageList[i].unit === unit) {
            return num;
          } else {
            let numRate=packageList[i].num===0?1:packageList[i].num;
            num = num * numRate;
          }
        }
        return num;
      }
      ,
      totalPrice(price, num, percent) {//单价，数量，优惠
        let rate = 1.0;
        let start1 = JSON.parse(this.getInformations.productStore.intervalprice);
        if (start1.length > 0) {
          if (num <= start1[0].start) {
            rate = 1.0;
          } else if (start1[0].start < num && num <= start1[0].end) {
            rate = start1[0].rate / 100;
          } else if (start1[1].start < num && num <= start1[1].end) {
            rate = (start1[1].rate) / 100;
          } else if (num > start1[2].start) {
            rate = (start1[2].rate) / 100;
          }
        }
        if (rate === "" || rate === undefined) {
          rate = 1.0;
        }
        let total_price = (price * num * rate).toFixed(2);
        if (percent) {
          total_price = (price * num * rate * percent / 100).toFixed(2);
        }
        return total_price;
      }
      ,
      singlePrice(price, num,) {//计算单价
        let rate = 100;
        let range = JSON.parse(this.getInformations.productStore.intervalprice);
        if (range.length > 0) {
          if (num <= range[0].start) {
            rate = 100;
          } else if (range[0].start < num && num <= range[0].end) {
            rate = range[0].rate;
          } else if (range[1].start < num && num <= range[1].end) {
            rate = range[1].rate;
          } else if (num > range[1].end) {
            rate = range[2].rate;
          }
        }
        range = [];

        let single_price = (price * rate / 100).toFixed(2);
//        console.log(price, rate);
        return single_price;
      }
      ,
      //            tab的切换
      toggle: function (index) {
        this.active = index;
        if (this.active === 0) {
          this.isShow1 = true;
          this.isShow2 = false;
        } else {
          this.isShow1 = false;
          this.isShow2 = true;
          this.evaluteRate();
          this.evalute();
        }
      }
      ,
      //select的值
      selectVal: function (ele) {
        let unit = ele.target.value;
        this.selected = unit;
//        console.log(unit, this.startnum);
        if (this.checkNumber(this.startnum) < this.getInformations.productStore.startnum) {
          this.startnum = this.getNumber(this.getInformations.productStore.startnum, unit);
          // this.prodprice = this.singlePrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.startnum);
          // this.wholemoneies[0].price = this.totalPrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.startnum, 99);
          // this.wholemoneies[1].price = this.totalPrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.startnum, this.rate);
        } else if (this.checkNumber(this.startnum) > this.getInformations.productStore.pdstorenum) {
          this.startnum = this.getNumber(this.getInformations.productStore.pdstorenum, unit);
          // this.prodprice = this.singlePrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.pdstorenum);
          // this.wholemoneies[0].price = this.totalPrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.pdstorenum, 99);
          // this.wholemoneies[1].price = this.totalPrice(this.getInformations.productStore.prodprice, this.getInformations.productStore.pdstorenum, this.rate);
        } else {
          // this.updatePrice(null, this.getNumber(this.startnum));
        }
      }
      ,
      selectVal2: function (val) {
        this.prodprice = val;
//        console.log(val);
        this.updatePrice(this.prodprice);
      },
      unique(arr) {//数组去重
        var tmp = new Array();
        for (var m in arr) {
          tmp[arr[m]] = 1;
        }
        //再把键和值的位置再次调换
//        console.log(tmp);
        var tmparr = new Array();
        for (var n in tmp) {
          tmparr.push(n);
        }
        return tmparr;
      },
      //商品信息详情
      getInformation() {
        let vue = this;
        let param = {
          id: vue.$route.params.id,
          productStore: [
            {marketprice: ''}
          ]
        };
        vue.$http.post(
          vue, '/rest/front/product/getProductInfo', param,
          function (vue, data) {
            vue.getInformations = data.data.productInfo;
            vue.pddes = vue.getInformations.pddes;
            vue.addGoods = data.data.productInfo;
            vue.getInformations.pdpicture = vue.unique(data.data.productInfo.pdpicture&& data.data.productInfo.pdpicture.length > 0?data.data.productInfo.pdpicture:['default/imgs/defaultProductImg.jpg']);
            vue.showPic = vue.getInformations.pdpicture[0];
            vue.prices = data.data.productInfo.prices;
            vue.prodprice = vue.getInformations.productStore.prodprice;
            vue.prodprice2 = vue.getInformations.productStore.prodprice;
            vue.threeprice = vue.getInformations.productStore.threeprice;
            vue.sevenprice = vue.getInformations.productStore.sevenprice;
            vue.thirtyprice = vue.getInformations.productStore.thirtyprice;
            vue.sixtyprice = vue.getInformations.productStore.sixtyprice;
            vue.stopAniu = vue.getInformations.productStore.startnum;
            vue.startnum = vue.getInformations.productStore.startnum;
            vue.startnum2 = vue.getInformations.productStore.startnum;
            vue.startnum3 = vue.getInformations.productStore.startnum;
            vue.startnum4 = vue.getInformations.productStore.startnum;
            //价格区间list
            vue.selecte2d = data.data.productInfo.prices[0];
//            vue.selected = data.data.productInfo.packingList[0].unit;
            vue.selects = data.data.productInfo.packingList;
            // let start1 = JSON.parse(vue.getInformations.productStore.intervalprice);
            // if (start1.length > 0) {
            //   if (vue.startnum <= start1[0].start) {
            //     vue.y = 1;
            //     console.log(vue.y)
            //   } else if (start1[0].start < vue.startnum && vue.startnum <= start1[0].end) {
            //     vue.y = (start1[0].rate) / 100;
            //     console.log(vue.y)
            //   } else if (start1[1].start < vue.startnum && vue.startnum <= start1[1].end) {
            //     vue.y = (start1[1].rate) / 100;
            //   } else if (vue.startnum > start1[2].start) {
            //     vue.y = (start1[2].rate) / 100;
            //   }
            // } else {
            //   vue.y = 1;
            // }
            // vue.updatePrice(vue.prodprice, vue.startnum);
//            console.log(vue.prodprice, vue.y);
          },
          function (error, data) {
            vue.$message({showClose: true,
              message: data.message,
              type: 'error'
            })
          }
        )
      }
      ,
      jump: function (MyName) {
        this.$router.push({name: MyName})
      }
      ,
      toAddShopcart() {
        this.isCartShow = false;
        this.$store.commit("newNum", this.aaa.length);
        let param = {};
        this.addGoods.memberid = localStorage.getItem('userInfo');
        param.saleid = this.addGoods.memberid;
        param.pdid = this.addGoods.productStore.pdid;
        param.pdno = this.activeGoodsInfo.pdno;
        param.limitid=this.$route.params.active;
        // param.producttype=this.addGoods.producttype;
        param.pdnumber = this.startnum;
        param.storeid = this.addGoods.productStore.storeid;
        param.delivertime = this.selecte2d.name;
        param.isonline = 2;
        param.unit = this.selected;
        let protype = 0;
        if (this.selecte2d.name === "立即发货") {
          protype = 0;
        } else {
          if (this.payType === 0) {
            protype = 1;
          } else {//==1
            protype = 2;
          }
        }
        param.protype = protype;
        let vue = this;
        vue.canBuy = true;
        vue.$http.post(
          vue, '/rest/buyer/shopcar/insertShopCar', param,
          function (vue, data) {
            vue.canBuy = false;
            vue.$message({showClose: true,
              message: "添加成功",
              type: 'success'
            })
          },
          function (error, data) {
            vue.canBuy = false;
            vue.$message({showClose: true,
              message: data.message,
              type: 'error'
            })
          }
        )
      }
      ,
      //添加购物车
      adds() {
        this.isCartShow = true;
      }
      ,
      //价格换算
      handleReduce() {
        if (this.checkNumber(this.startnum) > this.getInformations.productStore.startnum && this.startnum > 1) {
          let num = this.startnum + ".00";
          let fval = num.toString().split(".")[0];
          fval--;
          let sval = num.toString().split(".")[1];
          let numStr = fval + "." + sval;
          this.startnum = numStr;
          this.inputBlur(this.startnum);
          // this.updatePrice(this.prodprice, this.getNumber(this.startnum));
        }
      }
      ,
      handleAdd() {
//        console.log(this.startnum,this.selected);
        if (this.checkNumber(this.startnum) < this.getInformations.productStore.pdstorenum) {
          let num = this.startnum + ".00";
          let fval = num.toString().split(".")[0];
          fval++;
          let sval = num.toString().split(".")[1];
          let numStr = fval + "." + sval;
          this.startnum = numStr;
          this.inputFunc(numStr);
          this.inputBlur(this.startnum);
          // this.updatePrice(this.prodprice, this.getNumber(this.startnum));
        }
        if(this.checkNumber(this.startnum)>this.limitTimeProd.buylimit){
          this.startnum = this.limitTimeProd.buylimit
        }
      }
      ,
      toBuyNow() {
        this.isBuyShow = false;
        let goodsInfo = {
          pdid: this.getInformations.id,
          saleid: this.addGoods.memberid,
          protype: 0,
          isonline:2,
          pdno:this.activeGoodsInfo.pdno,
          limitid:this.$route.params.active,
          unit: this.selected,
          pdnumber: this.startnum,
          storeid: this.addGoods.productStore.storeid,
          storename: this.getInformations.productStore.storename,
          deliverytime: this.selecte2d.name
        };
        let type = 0;
        this.$store.commit('changetype', type);
        this.$store.commit('changeGoodsInfo', goodsInfo);
//        console.log(this.$store.state.buyGoodsInfo);
        this.$router.push({name: "PlaceOrder"})

      },
//      立即购买
      toBuy() {
        if (this.getInformations.productStore.pdstorenum - this.getInformations.productStore.startnum <= 0) {
          this.$message({showClose: true,
            message: "该商品库存不足",
            type: 'error'
          });
        } else {
          this.isBuyShow = true;
        }
      },
      //分享功能
      init: function () {
        let url = 'http://v3.jiathis.com/code/jia.js';
        let script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script)
      },
      //获取定金比率
      getRate() {
        let vue = this;
        let param = {};
        vue.$http.post(
          vue, '/rest/transaction/loadAllTransactionSetting', param,
          function (vue, data) {
            vue.rate = data.data.transactionSettings.remotepurchasingmargin;

          },
          function (error, data) {
            vue.$message({showClose: true,
              message: data.message,
              type: 'error'
            })
          }
        )
      },
    },
    created(){
      this.getActiveDetail();
    },
    mounted() {
      this.bigimg();
      this.getRate();
      this.getInformation();
      this.checkcollect();
      this.init();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.$store.commit('savetijiao', '');
    },
    watch: {
      "selecte2d":
        function (val) {
          if (val === "立即发货") {
            this.payType = 0;
          }
        },
    },
    filters: {
      //时间转换
      formatTime(value) {
        if (!value) {
          return ''
        } else {
          let date = new Date(value);
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
      },
    },
  }
</script>
<style>
  .IdDetail .pddes > p > img {
    display: block;
    text-align: center;
    margin: auto;
    margin-bottom: 50px;
  }

  .IdDetail .pddes > p {
    text-align: center;
  }
</style>
<style scoped>
  /*放大镜*/
  #box {
    width: 350px;
    height: 350px;
    cursor: move;
    display: inline-block;
    margin: 20px;
    position: relative;
  }

  #move {
    background-color: yellow;
    opacity: 0.2;
    width: 175px;
    height: 175px;
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  #bimg {
    width: 350px;
    height: 350px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 365px;
    display: none;
    z-index: 99;
  }

  #bimg img {
    width: 700px;
    height: 700px;
    position: absolute;
    top: 0;
    left: 0;
  }

  /*定金、远期*/
  .wholeprice {
    /*width: 72px;*/
    /*height: 24px;*/
    background-color: #fef4f4;
    color: #e60012;
    border: 1px solid #ffbbbf;
    line-height: 24px;
    margin-top: 26px;
    text-align: center;
    position: relative;
    font-size: 12px;
  }

  .wholeprice:hover {
    /*width: 72px;*/
    /*height: 24px;*/
    background-color: #fef4f4;
    color: #e60012;
    border: 1px solid #e8000e;
    line-height: 24px;
    margin-top: 26px;
    text-align: center;
    position: relative;
    font-size: 14px;
  }

  .payImg {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .wholepriced {
    /*width: 72px;*/
    margin-top: 5px;
  }

  .wholemoney {
    margin-right: 3px;
  }

  .wholemoney {
    float: left;
  }

  .IdDetail {
    width: 1200px;
    margin: 14px auto;
    font-size: 14px;
    background: #f9f9f9;
    overflow: hidden;
  }

  /*商品详情的左边预览*/
  #product_intro {
    width: 100%;
    margin-top: 10px;
    background: white;
  }

  /*商品图片，文字简介页面*/
  #preview {
    display: inline-block;
  }

  #preview > #mediumDiv img {
    vertical-align: middle;
    width: 350px;
    height: 350px;
  }

  #preview h1 {
    width: 352px;
    height: 54px;
    overflow: hidden;
    padding: 0;
    position: relative;
    margin: 20px;
  }

  /*产品的图标列表*/
  #preview #icon_list {
    height: 54px;
    position: absolute;
    left: 20px;
    top: 0px;
  }

  #preview #icon_list li {
    width: 62px;
    text-align: center;
    float: left;
  }

  #preview #icon_list li img {
    width: 50px;
    height: 50px;
  }

  #preview #icon_list li img:hover {
    border: 1px solid #e8000e;
    padding: 0;
    box-sizing: border-box;
  }

  /*!*前后移动的按钮*!*/
  #preview a.backward, #preview a.forward {
    width: 17px;
    height: 54px;
    background: url(../../assets/images/arrow.png) no-repeat;
    display: block;
    z-index: 20;
    position: absolute;
    top: 10px;
  }

  #preview a.backward {
    left: 0;
    background-position: 0 0;
  }

  #preview a.forward {
    right: 0;
    background-position: -324px 0;
  }

  /*商品右侧介绍*/
  .product_detail {
    display: inline-block;
    vertical-align: top;
  }

  #summary {
    width: 700px;
    padding: 10px 0;
  }

  #summary li {
    padding: 6px 0;
    height: 18px;
  }

  .product_detail .title {
    display: inline-block;
    margin: 26px 14px 24px;
    font-size: 18px;
    font-weight: bold;
  }

  /*小图标的引入*/
  .product_detail .self {
    display: inline-block;
    margin: 26px 1px;
    /*height:10px;*/
    /*width:17px;*/
    /*background: url(../../assets/images/self.png) no-repeat 0 0;*/
  }

  .product_detail .priceTitle {
    letter-spacing: 6px;
    padding-left: 20px;
  }

  .product_detail .nowprice {
    display: inline-block;
    font-size: 18px;
    color: #e8000e;
    margin: 10px 5px;
  }

  .product_detail .purchase {
    padding: 0 0 10px 20px;
    background-color: rgb(255, 247, 248);
  }

  .product_detail .purchase .endtime_msg {
    margin: 2px 10px;
  }

  .product_detail .purchase i {
    display: inline-block;
    padding: 5px 3px;
    background: #000;
    color: #fff;
    margin: 0;
    border-radius: 2px;
  }

  .product_detail .purchase img {
    display: inline-block;
    margin: 5px 0;
  }

  /*商品的规格以及参数*/
  #summary li {
    float: left;
    width: 33%;
    padding: 4px 0;
    line-height: 2em;
    height: 2em;
    letter-spacing: inherit;
  }

  #summary li:nth-child(9) {
    width: 34%;
  }

  #summary li i {
    letter-spacing: 2px;
  }

  #summary li b {
    font-weight: normal;
  }

  /*发货时间以及仓库的选择*/
  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .drawing {
    width: 410px;
    /*height: 400px;*/
    position: fixed;
    box-shadow: 1px 1px 10px 5px #888888;
    margin: auto;
    padding: 5px;
    left: 40%;
    top: 30%;
    background: white;
    z-index: 100;
  }

  .drawing_cancel {
    width: 15px;
    height: 15px;
    margin: 2px;
    cursor: pointer;
  }

  .drawing ul {
    display: flex;
    margin: 4px;
  }

  .drawing_img {
    display: inline-block;
    width: 360px;
    height: 420px;
    line-height: 420px;
  }

  .drawing img {
    max-width: 360px;
    max-height: 420px;
    vertical-align: middle;
  }

  .drawing li {
    flex: 1;
    float: left;
    background: white;
  }

  .drawing_des {
    border: 1px solid #eeeeee;
  }

  .drawing_button {
    padding: 0px 10px;
    cursor: pointer;
  }

  .drawing_button:hover {
    /*background: red;*/
    /*color: #ffff;*/
  }

  #summary li.choose, #summary li.cangku {
    margin-top: 11px;
    height: 50px;
  }

  #summary li.amount {
    width: 100%;
    margin: 0 0 30px 0;
  }

  #summary li.amount .num_decreae, #summary li.amount .num_increas {
    display: inline-block;
    padding: 0 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    background: #f0f0f0;
    cursor: pointer;
  }

  #summary li.amount .num_decreae {
    border-right: none;
    margin-right: -4px;
    padding: 0 15px;
  }

  #summary li.amount input {
    border: 1px solid #ccc;
    width: 80px;
    text-align: center;
  }

  #summary li.amount .num_increas {
    margin-left: -4px;
  }

  #summary li.amount select {
    width: 55px;
    margin-left: 5px;
    padding: 3px;
  }

  /*收藏和分享的列表*/
  .share {
    overflow: hidden;
    margin: 12px 0;
  }

  .share li {
    float: left;
    height: 20px;
    padding: 15px 20px 18px 0;
    margin: 0 12px;
    cursor: pointer;
  }

  .share .collection > img {
    padding: 3px 5px;
  }

  /*.shareson{*/
  /*display: none;*/
  /*background: url("../../assets/images/share.png") 12px bottom no-repeat;*/
  /*}*/

  /*.shareWX {*/
  /*height: 18px;*/
  /*width: 15px;*/
  /*}*/

  /*.shareQQ {*/
  /*height: 18px;*/
  /*width: 15px;*/
  /*}*/

  .share .collection {
    background: url("../../assets/icon/shoucang.png") 12px bottom no-repeat;
  }

  .share .collection2 {
    background: url("../../assets/icon/shoucang2.png") 12px bottom no-repeat;
  }

  .share .collection img {
    display: inline-block;
    margin: 2px 6px;
    padding: 1px 8px;
  }

  /*购买以及加入购物车按钮*/
  #summary li.bts, #summary li.bts2 {
    margin: 36px 0 0 72px;
  }

  #summary li.bts a {
    width: 150px;
    padding: 9px 46px;
    border: 1px solid #e8000e;
    cursor: pointer;
    font-size: 18px;
  }
  #summary li.bts3 a {
    width: 150px;
    padding: 9px 46px;
    border: 1px solid #808080;
    background-color: #808080;
    cursor: pointer;
    left: 50px;
    top: 30px;
    font-size: 18px;
  }

  #summary li.bts2 a {
    width: 150px;
    padding: 9px 28px 9px 50px;
    border: 1px solid #e8000e;
    cursor: pointer;
    font-size: 18px;
  }

  #summary li.bts a.bt-buy {
    background: #e8000e;
    color: #fff;
  }

  #summary li.bts2 a.bt-add {
    color: #e8000e;
    position: relative;
  }
  #summary li.bts3 a.bt-buy {
    color: #fff;
    position: relative;
  }

  #summary li.bts2 a.bt-add i {
    position: absolute;
    z-index: 5;
    left: 23px;
    top: 12px;
    width: 20px;
    height: 20px;
    margin-right: 6px;
    background: url(../../assets/images/cart.png) no-repeat;
  }

  /*热销品位置*/
  .IdDetail .detail_down {
    margin-top: 10px;
    width: 1200px;
    float: left;
    overflow: hidden;
  }

  /*.HotList {*/
  /*width: 293px;*/
  /*float: left;*/
  /*overflow: hidden;*/
  /*border: 1px solid #f2f2f2;*/
  /*background: white;*/
  /*}*/

  /*.HotList_msg_content {*/
  /*overflow: hidden;*/
  /*width: 250px;*/
  /*margin-left: 10px;*/

  /*}*/

  /*.HotList_title {*/
  /*height: 34px;*/
  /*!*padding-top: 14px;*!*/
  /*margin: 10px 0;*/
  /*border-bottom: 1px solid #f2f2f2;*/
  /*font-size: 14px;*/
  /*}*/

  .HotList_title > p {
    border-left: 3px solid #e8000e;
    margin: 0px 0 0 16px;
    padding-left: 10px;
  }

  /*.HotList_msg {*/
  /*overflow: hidden;*/
  /*margin-bottom: 13px;*/
  /*}*/

  /*.HotList_floorMsg {*/
  /*width: 122px;*/
  /*line-height: 27px;*/
  /*margin-top: -5px;*/
  /*}*/

  /*.HotList_floorPrice {*/
  /*font-size: 14px;*/
  /*color: #e8000e;*/
  /*margin-top: 5px;*/
  /*}*/

  /*.HotList_msg_img {*/
  /*margin-bottom: 5px;*/
  /*}*/

  .HotList_msg_img > img {
    margin-left: 16px;
  }

  /*.HotList_msg_left {*/
  /*width: 136px;*/
  /*float: left;*/
  /*padding-left: 10px;*/
  /*}*/

  /*.HotList_msg_right {*/
  /*width: 72px;*/
  /*height: 72px;*/
  /*background: #e8000e;*/
  /*float: right;*/
  /*}*/

  /*底部商品详情和评价*/
  /*底部商品详情和评价*/
  .right_tab {
    float: left;
    width: 1200px;
    margin-left: 20px;
  }

  .right_tab ul li {
    display: inline-block;
    font-weight: bold;
    font-size: 14px;
    padding: 16px 20px;
    cursor: pointer;
  }

  .active {
    border-bottom: 2px solid #e8000e;
  }

  /*评价的设置*/
  .appraise .pingjia {
    overflow: hidden;
  }

  .appraise .pingjia .pj_left {
    float: left;
    margin-right: 50px;
  }

  .pj_left {
    text-align: center;
  }

  .appraise .pingjia .pj_left .member {
    display: block;
    color: #e9b050;
    margin: 15px;
  }

  .appraise .pingjia .pj_right {
    float: left;
    width: 690px;
  }

  .appraise .pingjia .pj_right span.pj_img {
    display: block;
    margin: 40px 0;
  }

  .tool {
    width: 100px;
    height: 100px;
    background-color: cornflowerblue;
    opacity: 0.3;
    filter: alpha(opacity=30);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .tool.active2 {
    display: block;
  }

  .bigpic {
    width: 350px;
    height: 350px;
    border: 1px #ccc solid;
    overflow: hidden;
    float: left;
    left: 420px;
    position: absolute;
    display: none;
    background-color: #fff;
  }

  .bigpic.active2 {
    display: block;
  }

  .bigpic img {
    width: 700px;
    height: 700px;
    position: absolute;
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

  .eva_rates {
    display: inline-block;
  }
</style>
