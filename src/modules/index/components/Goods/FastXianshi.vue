<template>
  <div class="IdDetail">
    <!--主体内容! -->
    <section id="main" class="clear">
      <!--产品的类别导航路径-->
      <div class="bread-crumb">
        <a href="/">首页</a>
        <span>&gt;</span>
        <a href="/LifeQuality">{{fenlei}}</a>
        <span>&gt;</span>
        {{summaryDates.productname}}&nbsp;&nbsp;{{summaryDates.productalias}}&nbsp;&nbsp;{{summaryDates.subtitle}}
      </div>
      <!--产品简介-->
      <div id="product_intro">
        <div id="preview">
          <div  class="smallpic" id="box">
            <img  v-model="showPic"  style="width: 350px;height: 350px" :src="$oss.publicUrl(showPic)"/>
            <div id="move"></div>
            <div id="bimg">
              <img id="b_bimg" :src="$oss.publicUrl(showPic)"/>
            </div>
          </div>
          <div id="largeDiv"></div>
          <h1>
            <a class="backward" @click="backward"></a>
            <a class="forward" @click="forward"></a>
            <div style="display:inline-block;width: 500px">
              <ul id="icon_list">
                <!--<li v-for="item in getInformations.pdpicture" @click="choosePic(item)">-->
                <!--<img :src="$oss.publicUrl(item)" v-bind:style="listenPic(item,showPic)"-->
                <!--:alt="getInformations.productname"/>-->
                <!--</li>-->
                <li v-for="item in summaryDates.pdpicture"  @click="choosePic(item)" >
                  <img :src="$oss.publicUrl(item)" v-bind:style="listenPic(item,showPic)"
                       :alt="summaryDates.productname" style="cursor: pointer"/>
                </li>
              </ul>
            </div>
          </h1>
          <ul class="share">
            <li :class="[this.states == true ? 'collection2' : 'collection']" @click="addcollect"
                style="cursor: pointer;"
                v-if="isreal"><i style="margin-left: 36px">收藏商品</i></li>
            <li :class="[this.states == true ? 'collection2' : 'collection']" @click="qxcollect"
                style="cursor: pointer;"
                v-if="isreal2"><i style="margin-left: 36px">已收藏</i></li>
            <li style="display:none;">
              <img src="../../assets/images/share.png">
              <i>分享到：</i>
              <img src="../../assets/images/wx.png">
              <img src="../../assets/images/qq.png">
            </li>
          </ul>
        </div>
        <div class="product_detail">
          <div class="gooddetail">
            <ul>
              <li><img class="self" src="../../assets/images/self.png">
                <span class="title">{{summaryDates.productname}}&nbsp;&nbsp;{{summaryDates.level3}}&nbsp;&nbsp;{{summaryDates.productalias}}&nbsp;&nbsp;{{summaryDates.subtitle}}</span>
              </li>
              <li style="background-color:rgb(255, 247, 248);"><span class="priceTitle">限时价：</span><span class="nowprice"
                                                            id="nowprice">￥{{showprice}}/{{ summaryDates.unit}}</span><s>￥{{showoldprice}}/{{ summaryDates.unit}}</s>
              </li>
              <li class="purchase"><img src="../../assets/images/purchase.png">
                <span v-if="limitTimeProd.state===4">剩<countdown  :endTime="limitTimeProd.endtime" :startTime="systemTime" :callback="callback" :endText="'结束'"></countdown>结束</span>
                <span v-if="limitTimeProd.state===1"><countdown  :endTime="limitTimeProd.begintime" :startTime="systemTime" :callback="callback" :endText="'结束'"></countdown>后开始</span>
              </li>
            </ul>
            <ul id="summary" v-model="summaryDates">
              <li>
                <span>品牌</span>
                <div>
                  <span>{{summaryDates.brand}}</span>
                </div>
              </li>
              <li v-for="(items,index) in allattr" :key="index">
                <span>{{items.name}}</span>
                <div>
                  <ul class="attrUI">
                    <li v-for="(item,sonIndex) in items.son"  @click="clickattr(item.paramvalue,index,sonIndex)"
                        :class='item.show === 1 ? "checkedLi": item.show === 2 ? "disableLi":"normalLi"'
                    >{{item.paramvalue}}</li>
                  </ul>
                </div>
              </li>
              <li class="choosetime">
                <span>交货时间</span>
                立即发货
              </li>
              <li class="amount">
                <span>购买数量</span>
                <div>
                  <el-input-number v-model="getnum" :min="1" :max="limitTimeProd.buylimit" size="medium"></el-input-number>
                  <span>每人限购<span>{{limitTimeProd.buylimit}}{{summaryDates.unit}}</span></span>
                  <span>（库存：<span>{{showstroenum}}）</span></span>
                </div>
              </li>
            </ul>
          </div>
          <ul class="operate">
            <li class="bts" v-if="limitTimeProd.state===4" style="margin-left: 0">
              <button id="bt-buy"  @click="toBuy">
                立即购买
              </button>
              <button id="bt-add"  @click="addCart">
                <span><i></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加入购物车</span>
              </button>
            </li>
            <li class="bts" v-if="limitTimeProd.state===1">
              <button id="bt-buy2">
                即将开始
              </button>
            </li>
          </ul>
        </div>

      </div>
      <!--商品信息-->

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
    <div class="detail_down">
      <div class="right_tab">
        <ul class="tabs">
          <li v-for="(tabsData,index) in tabsDatas" @click="toggle(index)" :class="{active:active==index}" style="cursor: pointer">
            {{tabsData}}
          </li>
        </ul>
        <div class="proDetails" v-show="isShow1">
          <div v-html="pddes" class="pddes">
            {{pddes}}
          </div>
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
                <span class="pj_time">{{listson.evatime | formatTime}}</span>
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
</template>
<script>
  import {formatDate} from '../../../../utils/common.js'
  import countdown from './Countdown.vue'
  export default {
    name: 'FastDetail',
    components: { countdown },
    data() {
      return {
        canBuy:false,
//          放大镜展示图片
        showPic: "",
        isCartShow: false,
        HotList_msges: [
          {msg: require("../../assets/icon/floor.png")},
          {msg: require("../../assets/icon/floor2.png")},
          {msg: require("../../assets/icon/floor3.png")}
        ],
//        详情和评价标签切换
        active: 0,
        isShow1: true,
        isShow2: false,
        pddes: "",
        tabsDatas: ['商品详情', '商品评价'],
        evalutes: [],
        currentPage: 1,
        pageNo: 1,
        pageSize: 10,
        maxtotal:0,
        eva1: 0,//宝贝与描述相符评分
        eva2: 0, //卖家服务
        eva3: 0,//物流服务
        isreal: true,
        isreal2: false,
        states: false,//收藏状态
//
        fenlei: "",
        Maxstroenum:0,//最大库存
        Minweight:0,//最小重量
        Minprice:0,//最小价格
        pdno:"",// 获取的商品编号
        weights:1,
        showstroenum:0,//显示的库存
        getnum:1,//输入框数量
        showprice: "",//显示的商品截个
        showoldprice:'',//划掉的旧价格
        haveShop:false,//是否依据属性选择出商品；为true才能添加购物车和购买
        systemTime:0,//返回的系统时间
        shopattr: [],//商品的列表limitTimeStoreList
        allattr: [],//publishAttrs  展示的属性
        summaryDates: {},//productInfo  商品信息 图片 品牌等、、
        limitTimeProd:{},//limitTimeProd   限时购商品
      }
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
    methods: {
      //获取活动规则信息
      getActiveDetail(){
        let vue =this;
        let param = {
          id:vue.$route.params.active
        };
        vue.$http.post(
          vue,'/rest/front/activity/limittime/limitTimeDetail',param,
          function (vue,data) {
            //商品详情
            vue.summaryDates = data.data.productInfo;
            vue.pddes =data.data.productInfo.pddes;
            vue.summaryDates.pdpicture=vue.unique(data.data.productInfo.pdpicture&&data.data.productInfo.pdpicture.length>0?data.data.productInfo.pdpicture:['default/imgs/defaultProductImg.jpg']);
            vue.showPic = vue.summaryDates.pdpicture[0];
            if (data.data.productInfo.level3 != "") {
              vue.fenlei = data.data.productInfo.level1 + ">" + data.data.productInfo.level2 + ">" + data.data.productInfo.level3;
            } else {
              vue.fenlei = data.data.productInfo.level1 + ">" + data.data.productInfo.level2;
            }
            //            ----------------属性数据的处理-----------------
            vue.shopattr = data.data.limitTimeStoreList;
            vue.Maxstroenum = vue.storemax(data.data.limitTimeStoreList);//最大库存
            vue.Minweight = vue.weightmin(data.data.limitTimeStoreList);//最小重量
            vue.Minprice = vue.pricemin(data.data.limitTimeStoreList).toFixed(2);//最小价格
            vue.allattr = data.data.publishAttrs;
            vue.limitTimeProd = data.data.limitTimeProd;
            vue.systemTime = data.data.systemTime;
            vue.attrData();//属性相关的数据集中处理
//            以下方法用于默认选中----商品列表第一个商品
            vue.defaultShop();
            //限时购商品详情
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


      choosePic(src) {
        this.showPic = src;
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
              vue.isreal2 = false;
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
            vue.$message({
              showClose: true,
              message: '已收藏',
              type: 'success'
            });
            vue.isreal2 = true;
            vue.isreal = false;
            vue.checkcollect()
          },
          function (error, data) {
            vue.$message({
              showClose: true,
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
            vue.$message({
              showClose: true,
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
          pdid:this.$route.params.id
        };
        vue.$http.post(
          vue, '/rest/producteva/getSingleProductEva', param,
          function (vue, data) {
//            console.log(data.data.evaPageModel)
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
          pageNo :this.pageNo,
          pageSize: this.pageSize,
          pdno:this.pdno,
          pdid:this.$route.params.id
        };
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
        this.evalute();
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.evalute();
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
      backward() {
        for (let i = 1; i < this.summaryDates.pdpicture.length; i++) {
          if (this.summaryDates.pdpicture[i] === this.showPic) {
            this.showPic = this.summaryDates.pdpicture[i - 1];
          }
        }
      },
      forward() {
        for (let i = 0; i < this.summaryDates.pdpicture.length - 1; i++) {
          if (this.summaryDates.pdpicture[i] === this.showPic) {
            this.showPic = this.summaryDates.pdpicture[i + 1];
            break;
          }
        }
      },
      unique(arr){//数组去重
        var tmp = new Array();
        for(var m in arr){
          tmp[arr[m]]=1;
        }
        //再把键和值的位置再次调换
        var tmparr = new Array();
        for(var n in tmp){
          tmparr.push(n);
        }
        return tmparr;
      },
      listenPic(src1, src2) {
        if (src1 === src2) {
          return {border: '1px solid red'};
        } else {
          return {border: 'none'};
        }
      },
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
      },
      //最大库存
      storemax(list){
        let max =list[0].storenum;
        for(let i = 0;i<list.length;i++){
          if(list[i].storenum>max){
            max = list[i].storenum;
          }
        }
        return max
      },
//      最小重量
      weightmin(list){
        let min =list[0].weight;
        for(let i = 0;i<list.length;i++){
          if(list[i].weight<min){
            min = list[i].weight;
          }
        }
        return min
      },
//      最小价格
      pricemin(list){
        let min =list[0].limitprice;
        for(let i = 0;i<list.length;i++){
          if(list[i].limitprice<min){
            min = list[i].limitprice;
          }
        }
        return min
      },
//写一个数据回调成功之后，处理属性数据的方法
      attrData:function(){
        let group=[];
        for(let i=0;i<this.allattr.length;i++){
          let groupitem= {name:"",value:null, son:[]};
          groupitem.name=this.allattr[i].name;
          for(let j=0;j<this.allattr[i].value.length;j++){
            let groupsonitem={paramvalue:"",show:0};
            groupsonitem.paramvalue=(this.allattr[i].value)[j];
            groupitem.son.push(groupsonitem);
          }
          group.push(groupitem);
        }
        this.allattr=group;
      },
//      页面加载进来---就默认显示一种商品的属性
      defaultShop:function(){
        let defaultAttr=this.shopattr[0];
        for(var x=0;x<defaultAttr.limitTimeProdAttrList.length;x++){
          let attrvalue="",index="",i="";
          for(var attr1=0;attr1<this.allattr.length;attr1++){
            if(defaultAttr.limitTimeProdAttrList[x].attribute===this.allattr[attr1].name){
              index=attr1;
              for(var attr2=0;attr2<this.allattr[attr1].son.length;attr2++){
                if(defaultAttr.limitTimeProdAttrList[x].value===this.allattr[attr1].son[attr2].paramvalue){
                  attrvalue=defaultAttr.limitTimeProdAttrList[x].value;
                  i=attr2;
                  this.clickattr(attrvalue,index,i)
                }
              }
            }
          }
        }
      },
//      点击某一个属性
      clickattr: function (attrvalue,index,i) {
        //0 初始状态   1选中状态  2 不可点击状态
        //放回点击的值
        let item = "";
        item = this.allattr;
        if ((item[index].son)[i].show !== 2) {
          //     //样式的改变+加放入值
          if ((item[index].son)[i].show === 1) {
            item[index].value = null;
            (item[index].son)[i].show = 0;
          } else {
            item[index].value = attrvalue;
            for (let gg = 0; gg < item[index].son.length; gg++) {
              if ((item[index].son)[gg].paramvalue === attrvalue) {
                (item[index].son)[gg].show = 1;
              } else {
                (item[index].son)[gg].show = 0;
              }
            }
          }
//一一遍历。取出每一个属性，获取含有具体属性的数组
          for (let a = 0; a < item.length; a++) {
            let matchattr = "";
            for (let b = 0; b < item[a].son.length; b++) {
              if ((item[a].son)[b].show != 1) {
                //取出了值，然后进行遍历
                let matchGroup = [];//完成的商品列表数组
                let sonGroup = [];//含有具体属性的数组
                matchGroup = this.shopattr;
                matchattr = item[a].name + ":" + (item[a].son)[b].paramvalue + ";";
                //得到含有该属性的商品集合
                for (let k = 0; k < matchGroup.length; k++) {
                  if (matchGroup[k].attrStr.indexOf(matchattr) != -1) {
                    sonGroup.push(matchGroup[k])
                  }
                }
                //遍历是否该商品集合中，含有点击事件的集合，有则该属性可选；
                let judgeShow = "", start = 0;//judgeShow  通过该值来控制属性的状态；  start；是否等于item的长度来判断是都遍历完成
                judgeShow = sonGroup;
                for (let c = 0; c < item.length; c++) {
                  let sonmatch = "";
                  if (item[c].value == null) {
                    sonmatch = item[c].name + ":";
                  } else {
                    sonmatch = item[c].name + ":" + item[c].value + ";";
                  }
                  judgeShow = this.checkStr(judgeShow, sonmatch, item[c].name, item[a].name);//判断字符串是否可选的递归方法
                  if (judgeShow == false) {
                    (item[a].son)[b].show = 2;
                    break;
                  }else{
                    start++;
                  }
                }
                //遍历完成，则该属性可选
                if (start == item.length) {
                  (item[a].son)[b].show = 0;
                }
              }
            }
          }
          this.allattr = item;
        }
        //放置点击的属性以后。判断一下是否三个属性全部选择完成
        let clicknum = 0;
        for (let h = 0; h < item.length; h++) {
          if (item[h].value != null) {
            clicknum++;
          }
        }
        if (clicknum == item.length) {
          let son = "";
          for (var i = 0; i < item.length; i++) {
            son = son + item[i].name + ":" + item[i].value + ";";
          }
          //         用得到的son  去查找总的商品列表获取库存和价格
          for (var j = 0; j < this.shopattr.length; j++) {
            if (son === this.shopattr[j].attrStr) {
              this.pdno = this.shopattr[j].pdno;
              this.showstroenum = this.shopattr[j].storenum;
              this.weights = this.shopattr[j].weight;
              this.showprice =(this.shopattr[j].limitprice).toFixed(2);
              this.showoldprice = (this.shopattr[j].originalprice).toFixed(2);
              this.haveShop=true;
              break;
            }
          }
        }else{
          this.pdno = "";
          this.showstroenum = this.Maxstroenum;
          this.weights = this.Minweight;
          this.showprice =this.Minprice;
          this.haveShop=false;
        }
      },
//    //查看该属性是否匹配成功
      //  用于循环属性是否成功
      checkStr:function(sonGroup,sonmatch,matchname,getname){
        if(matchname==getname){
          return sonGroup;//如果遍历的属性，和所遍历对象同一个父属性：例如颜色；则默认递归返回
        }else{
          //遍历是否该商品集合中，含有点击事件的集合，有则该属性可选；
          let myGroup=[],haveGroup=[];
          myGroup=sonGroup;
          let num=0;
          for(let w=0;w<myGroup.length;w++){
            if(myGroup[w].attrStr.indexOf(sonmatch)!=-1 ){
              haveGroup.push(myGroup[w]);
            }else{
              num++;
            }
          }
          if(num==myGroup.length){
            return false;
          }else{
            return haveGroup;
          }
        }
      },
      toAddShopcart() {
        if(this.showstroenum===0){
          this.$message({showClose: true,
            message:"该商品属性库存为0，不可添加",
            type: 'error'
          })
        }else {
          this.isCartShow = false;
          this.$store.commit("newNum", 1);
          let param = {};
          let deliverytime = "立即发货";
          param.saleid = localStorage.getItem('userInfo');
          param.pdid = this.summaryDates.id;
          param.pdno = this.pdno;
          param.limitid = this.$route.params.active;
          param.pdnumber = this.getnum;
          param.storeid = this.summaryDates.storeid;
          param.delivertime = deliverytime;
          param.isonline = 2;
          param.unit = this.summaryDates.unit;
          let protype = 0;
          param.protype = protype;
          let vue = this;
          vue.canBuy = true;
          vue.$http.post(
            vue, '/rest/buyer/shopcar/insertShopCar', param,
            function (vue, data) {
              vue.canBuy = false;
              vue.$message({
                showClose: true,
                message: "添加成功",
                type: 'success'
              })
            },
            function (error, data) {
              vue.canBuy = false;
              vue.$message({
                showClose: true,
                message: data.message,
                type: 'error'
              })
            }
          )
        }
      },
      //添加购物车
      addCart() {
        if(this.haveShop===false){
          this.$message({showClose: true,
            message:"商品属性选择不完全！！",
            type: 'error'
          })
        }else{
          this.isCartShow = true;
        }
      },
      //购买
      toBuy() {
        if(this.haveShop===false){
          this.$message({showClose: true,
            message:"商品属性选择不完全！！",
            type: 'error'
          })
        }else {
          let protype = 0;
          let deliverytime = "立即发货";
          let goodsInfo = {
            pdid: this.summaryDates.id,
            saleid: this.summaryDates.memberid,
            isonline: 2,
            pdno: this.pdno,
            limitid: this.$route.params.active,
            protype: protype,
            unit: this.summaryDates.unit,
            pdnumber: this.getnum,
            storeid: this.summaryDates.storeid,
            storename: this.summaryDates.storename,
            deliverytime: deliverytime
          };
          let type = 0;
          this.$store.commit('changetype', type);
          this.$store.commit('changeGoodsInfo', goodsInfo);
          this.$router.push({name: "PlaceOrder"})
        }

      },
    },
    mounted() {
      this.bigimg();
      this.getActiveDetail();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.checkcollect();
    },
  }
</script>

<style>
  .IdDetail  .pddes{
    padding:20px;
  }
  .IdDetail  .pddes > p > img {
    display: block;
    text-align: center;
    margin: auto;
    margin-bottom: 50px;
  }
  .small_thing .el-radio-button__inner{
    padding: 6px 8px;
    border-left: 1px solid #dcdfe6;
    margin-bottom: 5px;
    margin-right: 12px;
    border-radius: 0;
  }
  .small_thing .el-radio-button:first-child .el-radio-button__inner{
    border-radius: 0;
  }
  .small_thing  .el-radio-button:last-child .el-radio-button__inner{
    border-radius: 0;
  }
  .small_thing .el-radio-group{
    margin-left: 100px;
  }

</style>
<style scoped>
  .IdDetail {
    width: 1200px;
    margin: 14px auto;
    font-size: 14px;
    background: #f9f9f9;
    overflow: hidden;
  }

  #product_intro {
    /*float: left;*/
    width: 100%;
    margin-top: 10px;
    background: #fff;
  }

  /*商品图片，文字简介页面*/
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
  /*一系列小图片*/
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
    cursor: pointer;
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
  .gooddetail {
    min-height: 400px;
    overflow: hidden;
  }

  .product_detail {
    /*float: left;*/
    display: inline-block;
    overflow: hidden;
    background: #fff;
    vertical-align: top;
  }

  .product_detail .title {
    display: inline-block;
    margin: 24px 14px;
    font-size: 18px;
  }
  /*---------右侧的 商品参数*/
  #summary {
    width: 600px;
    padding: 10px 0;
  }

  /*参数的设置*/
  #summary>li> span {
    display: inline-block;
    width: 80px;
    text-align: left;
    color: #b6b6b6;
  }

  #summary>li {
    margin: 12px 0;
  }

  #summary>li > div {
    display: inline-block;
    vertical-align: middle;
  }
  /*选择的属性*/
  #summary .attrUI li{
    display: inline-block;
    border: 1px solid #ccc;
    width:70px;
    overflow: hidden;
    padding:5px;
    text-align: center;
    margin-right: 12px;
    font-size: 12px;
  }
  /*正常状态*/
  .normalLi{
    cursor: pointer;
  }
  /*选中的样式*/
  .checkedLi {
    background: red !important;
    color: white;
    cursor: pointer;
  }
  /*不可选择的样式*/
  .disableLi {
    color:#fff;
    background-color:#b6b6b6;
    border-color: #ebeef5;
    opacity: 0.5;
  }

  /*小图标的引入*/
  .product_detail .self {
    display: inline-block;
    margin: 26px 1px;
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
    background-color: rgb(255, 247, 248);
    padding: 0 0 10px 20px;
  }

  .product_detail .purchase span {
    margin: 2px 10px;
  }

  .product_detail .purchase i {
    display: inline-block;
    padding: 5px 9px;
    background: #000;
    color: #fff;
    margin: 0 5px;
  }

  .product_detail .purchase img {
    display: inline-block;
    margin: 5px 0;
  }

  /*发货时间以及仓库的选择*/
  #summary li.choosetime select {
    border-radius: 1px;
    padding: 5px 2px;
    border: 1px solid #d8dce5;
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
  .share li:first-child {
    margin: 5px 0;
  }
  .share .collection {
    background: url("../../assets/icon/shoucang.png") 12px bottom no-repeat;
  }

  .share .collection2 {
    background: url("../../assets/icon/shoucang2.png") 12px bottom no-repeat;
  }
  /*购买以及加入购物车按钮*/
  .operate li.bts {
    margin: 10px 0 30px 70px;
    overflow: hidden;
  }
  .operate li.bts button {
    float: left;
    width: 170px;
    font-size: 18px;
    line-height: 2.5em;
    border: 1px solid #e8000e;
  }
  #bt-buy {
    background: #e8000e;
    color: #fff;
  }
  #bt-buy2 {
    background: #808080;
    color: #fff;
    border: 0;
  }

  #bt-add {
    color: #e8000e;
    width: 170px;
    background-color: #fff;
    position: relative;
    margin-left: 135px;
  }

  #bt-add i {
    position: absolute;
    z-index: 5;
    left: 30px;
    top: 13px;
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
  /*底部商品详情和评价*/
  /*评价的设置*/
  .appraise .pingjia {
    overflow: hidden;
  }
  .appraise .eva_rates {
    display: inline-block;
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

  .right_tab {
    /*float: left;*/
    /*width: 882px;*/
    /*margin-left: 20px;*/
    width: 100%;

  }

  .right_tab ul li {
    display: inline-block;
    font-weight: bold;
    font-size: 14px;
    padding: 16px 20px;
  }

  .right_tab ul li.active {
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
    margin: 20px 0;
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
