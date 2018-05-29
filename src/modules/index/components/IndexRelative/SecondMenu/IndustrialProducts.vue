<template>
  <div class="IndustrialProducts" v-loading="dataloading">
    <div class="keywords_content">
      <div class="keywords_title">
        <p class="keywords_titlecontent left">关键词：{{this.searchmsg.searchKey}}</p>
        <p class="keywords_titlelist right">条件搜出{{Total}}件商品</p>
      </div>
      <div class="mytag">
        <span>所选分类：<span @click="clearall" style=" color: #e8000e;cursor: pointer">（清空全部搜索条件）</span></span>
        <div class="mysearch">
          <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" type="info" size="small"
                  @close="handleClose(tag)">
            {{tag}}
          </el-tag>
        </div>
      </div>
      <div class="keywords_content_list">
        <table class="keywords_content_tbd">
          <tr v-for="(keys,index) in keycontent">
            <td class="keywords_list_one">{{keys.name}}</td>
            <td class="keywords_list_two" :class="keys.styles">
              <!--<span v-for="(son,sonindex) in keys.value" class="keywords_list_sec" @click="wordseach(index,sonindex)"-->
              <!--v-if='sonindex<keys.morelength'>{{son}}-->
              <!--</span>-->
              <span v-for="(son,sonindex) in keys.value" class="keywords_list_sec" @click="wordseach(index,sonindex)">{{son}}</span>
            </td>
            <td class="keywords_list_thr" @click="more(index)">{{keys.word}}</td>
          </tr>
        </table>
      </div>
      <div class="keywords_content2"  >
        <div class="keywords_content2_title">
          <ul class="keywords_content2_ul left">
            <!--<li><a href="">综合</a><img src="../../../assets/icon/down.png"/></li>-->
            <!--<li><a href="">销量</a><img src="../../../assets/icon/down2.png"/></li>-->
            <li @click="changsort" v-model="searchmsg.sorttype"><span>规格</span>
              <img src="../../../assets/icon/down.png" v-if="searchmsg.sorttype==='1'"/>
              <img src="../../../assets/icon/sortup.png" v-else/>
            </li>
            <li><input type="checkbox"  @click="changself" v-model="self"/>自营</li>
            <li><input type="checkbox" @click="changhave" v-model="have"/>有库存</li>
            <li><input type="checkbox" @click="changtime" v-model="time"/>有远期</li>
          </ul>
          <div class="keywords_shopcar right" @click="adds">
            <img src="../../../assets/icon/shop_car.png"/>
            <span>批量加入购物车</span>
          </div>
        </div>
        <div class="goodslist">
          <table class="keywords_content_tbd2" style="width: 100%; border-color: #d9d9d9">
            <thead>
            <th><input type="checkbox" @click="selectAll" v-model="checked">全选</th>
            <th>品名</th>
            <th>品牌印记</th>
            <th>包装方式</th>
            <th>单价</th>
            <th>库存</th>
            <th>仓库</th>
            <th>发货时间</th>
            <th>订购量</th>
            <th>总价/预定价</th>
            <th>操作</th>
            </thead>
            <tbody>
            <!--<template v-for="(data,i) in keywords_tbds">-->
            <tr v-for="(item,i) in keywords_tbds" class="checkBox2">
              <td class="keywords_tbd2_one">
                <input type="checkbox" :value="i" v-model="selectArr" class="checkBox"/>
                <img class="checkimg" :src="$oss.publicUrl(item.pdpicture)" @click="click_ipt(i,item.id)"
                     style="cursor: pointer"/>
              </td>
              <td class="keywords_tbd2_two" @click="click_ipt(i,item.id)" style="cursor: pointer">
                <img src="../../../assets/images/self.png" height="16" width="34" style="vertical-align: middle"
                     v-if="item.selfsupport==true"/>
                <span>{{item.productname}}</span>
                <span>{{item.level3}}</span>
                <span>{{item.stand}}</span>
                <span>{{item.material}}/{{item.cardnum}}</span>
              </td>
              <td>
                <div class="check_logoimg" v-if="item.brandpic"><img :src="$oss.publicUrl(item.brandpic)"/></div>
                {{item.brand}}<br/>
                {{item.mark}}
              </td>
              <td>{{item.packagetype}}</td>
              <td>
                <span v-if="item.showprice">￥{{item.marketprice}}／{{item.unit}}</span>
                <span style="color: #0e90d2;cursor:pointer;" v-else @click="goToLogin">会员专属价</span>
              </td>
              <td>{{item.pdstorenum}}{{item.storeunit}}</td>
              <td>
                <!--<select v-model="item.storename.value" @change="selectStore(i,item.storename)" style="width:100px;">-->
                <!--<option v-for="option in item.storeNames" :value="option.value">-->
                <!--{{ // option.text }}-->
                <!--</option>-->
                <!--</select>-->
                {{item.storename}}
              </td>
              <td>
                <select v-model="item.time" @change="selectTime(i,item.time.price)" style="width: 87px;height:26px;">
                  <option v-for="time in item.prices" :value="time">
                    {{time.name}}
                  </option>
                </select>
              </td>
              <td class="keywords_tbd2_nine">
                <div class="num_decreae left" @click="handleReduce(i)" :disabled="item.startnum === item.num">-</div>
                <input type="number" class="num_input left" v-model="item.num"
                       v-on:input="inputFunc(i,item.num)"
                       v-on:blur="inputBlur(i,item.num)">
                <div class="num_increas left" @click="handleAdd(i)" :disabled="item.pdstorenum === item.num">+</div>
                <select class="num_danwei" v-model="item.packageChild" @change="selectUnit(i,item.packageChild.unit)">
                  <option v-for="child in item.packages" :value="child">{{child.unit}}</option>
                </select>
                <div style="display: inline-block;height: 26px;line-height: 26px;padding-left: 15px">{{item.pagetypeStr}}</div>
              </td>
              <td v-if="item.showprice">
                <button v-bind:class="isActive(item.paytype,0)" @click="choosePay(item,0)">￥{{item.totalPrice}}</button>
                <button v-bind:class="isActive(item.paytype,1)" @click="choosePay(item,1)"
                        v-show="item.time.name!='立即发货'"
                        style="margin-left: 5px">￥{{item.deposit}}
                </button>
              </td>
              <td v-else><span style="color: #0e90d2;cursor:pointer;" @click="goToLogin">会员专属价</span></td>
              <td>
                <button v-if="item.pdstorenum>=item.num" class="red_button" @click="addOne(i)">加入购物车</button>
                <span v-if="item.pdstorenum<item.num||item.pdstorenum<0">联系客服组货</span>
              </td>
            </tr>
            <!--</template>-->
            </tbody>
          </table>
          <el-pagination :page-sizes="[10, 20, 50, 100]" @size-change="SizeChange"
                         @current-change="CurrentChange"
                         :page-size="searchmsg.pageSize" :current-page="searchmsg.pageNo"
                         layout="total,sizes, prev, pager, next, jumper" :total="Total">
          </el-pagination>
        </div>
      </div>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="item in items" style="float: left">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "IndustrialProducts",
    metaInfo() {
      return {
        title: this.titleInfo,
        meta: [
          {
            name: 'keywords',
            content: this.keywordsInfo
          },
          {
            name: 'description',
            content:  this.descriptionInfo
          }
        ]
      }
    },
    data: function () {
      return {
        titleInfo:'不锈钢螺栓批发_价格_供应商_生产厂家-紧商网',
        keywordsInfo:'螺丝批发,螺丝价格,螺丝供应商,螺丝生产厂家',
        descriptionInfo:'紧商网提供最新不锈钢螺丝批发、价格、供应商、生产厂家等相关信息，螺丝质量好，规格全，批发价格低，一件代发。买卖螺丝，就上紧商网',
          dataloading:true,//数据加载
        title: "",
        keywords: "",
        description: "",
        Total: 0,
        value: "",
        productIndex: [0],
        items: [],
        checked: false,
        selectArr: [],
        keywords_tbds: [],
        allData: [],
//        搜索的展示列表
        keycontent: [],
//        标签
        dynamicTags: [],
        key: "",
//        搜索的条件接口
        searchmsg:{
          level1: "",
          level2: "",
          level3: "",
          productname: "",
          brand: "",
          cardnum: "",
          material: "",
          searchJson: [],
          pageNo: 1,
          pageSize: 10,
          sorttype:"1",
          selfsupport:"0",
          havestore:"0",
          forwardtime:"0",
          searchKey: "",
        },
        self:false,
        have:false,
        time:false,
//        关键词
        searchkey: {attr: "", value: ""},
        searchkeys: [],
        depositRate: 1,
//        路径中获取的参数
        getparam:"",
        getquery:"",
      }
    },
    methods: {
      //SEO搜索
      SEOsearch(){
        if(this.searchmsg.level1&&!this.searchmsg.level2){
          this.titleInfo = this.searchmsg.level1 +'批发_价格_供应商_生产厂家-紧商网';
          this.keywordsInfo = this.searchmsg.level1 +'批发,'+ this.searchmsg.level1 +'价格,'+ this.searchmsg.level1 +'供应商,'+ this.searchmsg.level1 +'生产厂家';
          this.descriptionInfo = '紧商网提供最新'+ this.searchmsg.level1 +'批发、价格、供应商、生产厂家等相关信息，'+ this.searchmsg.level1 +'质量好，规格全，批发价格低，一件代发。买卖'+ this.searchmsg.level1 +'，就上紧商网'
        }
        else if(this.searchmsg.level2&&!this.searchmsg.level3){
          this.titleInfo = this.searchmsg.level2 +'批发_价格_供应商_生产厂家-紧商网';
          this.keywordsInfo = this.searchmsg.level2 +'批发,'+ this.searchmsg.level2 +'价格,'+ this.searchmsg.level2 +'供应商,'+ this.searchmsg.level2 +'生产厂家';
          this.descriptionInfo = '紧商网提供最新'+ this.searchmsg.level2 +'批发、价格、供应商、生产厂家等相关信息，'+ this.searchmsg.level2 +'质量好，规格全，批发价格低，一件代发。买卖'+ this.searchmsg.level2 +'，就上紧商网'
        }
        else if(this.searchmsg.level3){
          this.titleInfo = this.searchmsg.material + this.searchmsg.level1 + this.searchmsg.level2 + this.searchmsg.level3 +'批发_价格_供应商_生产厂家-紧商网';
          this.keywordsInfo = this.searchmsg.level2+ this.searchmsg.level3 +'批发,'+ this.searchmsg.level2+ this.searchmsg.level3 +'价格,'+ this.searchmsg.level2+ this.searchmsg.level3 +'供应商,'+ this.searchmsg.level2+ this.searchmsg.level3 +'生产厂家';
          this.descriptionInfo = '紧商网提供最新'+ this.searchmsg.level2 + this.searchmsg.level3 +'批发、价格、供应商、生产厂家等相关信息，'+ this.searchmsg.level2 + this.searchmsg.level3 +'质量好，规格全，批发价格低，一件代发。买卖'+ this.searchmsg.level2+ this.searchmsg.level3 +'，就上紧商网'
        }
        else {
          this.titleInfo = '不锈钢螺栓批发_价格_供应商_生产厂家-紧商网';
          this.keywordsInfo = '螺丝批发,螺丝价格,螺丝供应商,螺丝生产厂家';
          this.descriptionInfo = '紧商网提供最新不锈钢螺丝批发、价格、供应商、生产厂家等相关信息，螺丝质量好，规格全，批发价格低，一件代发。买卖螺丝，就上紧商网';
        }
      },



      getTitle(level) {//wy:暂时没用到
        switch (level) {
          case 2://2级分类
            break;
          case 3://3级分类
            break;
        }
      },
//        点击会员专属价--跳到登录页面
      goToLogin: function () {
        this.$router.push({path: '/Login'});
      },
//        改变排序方式
      changsort: function () {
        if (this.searchmsg.sorttype === "1") {
          this.searchmsg.sorttype = "0";
        } else {
          this.searchmsg.sorttype = "1";
        }
        this.getUrl();
      },
      changself: function () {
        if (this.searchmsg.selfsupport === "1") {
          this.searchmsg.selfsupport = "0";
        } else {
          this.searchmsg.selfsupport = "1";
        }
        this.getUrl();
      },
      changhave: function () {
        if (this.searchmsg.havestore === "1") {
          this.searchmsg.havestore = "0";
        } else {
          this.searchmsg.havestore = "1";
        }
        this.getUrl();
      },
      changtime: function () {
        if (this.searchmsg.forwardtime === "1") {
          this.searchmsg.forwardtime = "0";
        } else {
          this.searchmsg.forwardtime = "1";
        }
        this.getUrl();
      },
//      more: function (index) {
//        if (this.keycontent[index].value.length - 10 > 0) {
//          if (this.keycontent[index].morelength == this.keycontent[index].value.length) {
//            this.keycontent[index].morelength = "10";
//            this.keycontent[index].word = "更多";
//          } else {
//            this.keycontent[index].morelength = this.keycontent[index].value.length;
//            this.keycontent[index].word = "收起";
//          }
//        } else {
//          this.$message({
//            message: "该属性下无更多属性值",
//            type: 'warning'
//          });
//        }
//      },
      more: function (index) {
        if (this.keycontent[index].styles == "beforeheight") {
          this.keycontent[index].styles = "afterheight";
          this.keycontent[index].word = "收起";
        } else {
          this.keycontent[index].styles = "beforeheight";
          this.keycontent[index].word = "更多";
        }
      },
//        搜索的方法
      getList() {
        this.dataloading=true;
        let vue = this;
        let param = vue.searchmsg;
//        调用该搜索方法，则重新生成顶部链接(搜索方法完成之后将路径放回页面中)
        vue.$http.post(
          vue, '/rest/front/product/list', param,
          function (vue, data) {
            vue.Total = data.data.pageInfo.totalRows;
            if (vue.Total != 0) {
////                   处理数据添加新的属性
              for (var i = 0; i < data.data.keyValues.length; i++) {
//                data.data.keyValues[i]["morelength"] = "10";
                data.data.keyValues[i]["styles"] = "beforeheight";
                data.data.keyValues[i]["word"] = "更多";
              }
              vue.keycontent = data.data.keyValues;
              //数据初始化配置
              let indexs = [];
              for (let item in data.data.pageInfo.list) {
                let num = 0;
                indexs.push(num)
              }
              vue.productIndex = indexs;
              vue.allData = data.data.pageInfo.list;
              vue.keywords_tbds = vue.configData(data.data.pageInfo.list, indexs);
            } else {
              vue.keycontent = [];
              vue.allData = [];
              vue.keywords_tbds = [];
              vue.$message({
                showClose: true,
                message: "没有符合条件的商品",
                type: 'warning'
              });
            }
            vue.dataloading=false;
          },
          function (error, data) {

          }
        )
      },
//      点击生成新的链接，进行跳转**********************************
      getUrl:function(){
        for(let xx in this.searchmsg){
          if(xx!="searchJson"&&this.searchmsg[xx]!=""&&this.searchmsg[xx]&&this.searchmsg[xx]!=null){
            this.getparam=this.getparam+"-"+xx+"_"+this.searchmsg[xx];
          }
        }
        for (var yy = 0; yy < this.searchkeys.length; yy++) {
          this.getquery=this.getquery+this.searchkeys[yy].attr+"="+this.searchkeys[yy].value;
        }
        let SearchURL="/IndustrialProducts/search"+this.getparam+"?"+this.getquery+".html";
        window.open(window.location.origin+SearchURL,"_self");
      },
//      列表框点击的搜索
      wordseach: function (i, ii) {
//          点击事件；遍历处理完之后生成新的连接；放到页面中去
        let aa = "";
        for (aa in this.searchmsg) {
          if (aa == this.keycontent[i].key) {
            this.searchmsg[aa] = (this.keycontent[i].value)[ii];
            this.searchmsg.pageNo =1;
            break;
          } else if (aa == "searchJson") {
            let qq = 0;
            for (var w = 0; w < this.searchkeys.length; w++) {
              if (this.keycontent[i].key == this.searchkeys[w].attr) {
                this.$message({
                  showClose: true,
                  message: "属性值重复",
                  type: 'warning'
                });
              } else {
                qq++;
              }
            }
            if (qq == this.searchkeys.length) {
              this.searchkey.attr = this.keycontent[i].key;
              this.searchkey.value = (this.keycontent[i].value)[ii];
              this.searchkeys.push(this.searchkey);
              this.searchkey = {attr: "", value: ""};
              this.searchmsg.searchJson = (JSON.stringify(this.searchkeys));
              this.searchmsg.pageNo =1;
            }
          }
        }
        this.getUrl();
      },
//      标签(关闭标签)
      handleClose(tag) {
        let aa = "";
        for (aa in this.searchmsg) {
          if (this.searchmsg[aa] == tag) {
            this.searchmsg[aa] = "";
            this.searchmsg.pageNo =1;
            break;
          } else if (aa == "searchJson") {
            for (var w = 0; w < this.searchkeys.length; w++) {
              if (this.searchkeys[w].value == tag) {
                this.searchkeys.splice(w, 1);
                this.searchmsg.searchJson = (JSON.stringify(this.searchkeys));
                this.searchmsg.pageNo =1;
              }
            }
          }
        }
        this.getUrl();
      },

//      清空所有搜索条件
      clearall: function () {
          let key=this.searchmsg.searchKey;
        this.searchmsg = {
          pageNo: 1,
          pageSize: 10,
          level1: "",
          level2: "",
          level3: "",
          productname: "",
          brand: "",
          cardnum: "",
          material: "",
          searchJson: [],
          sorttype:"1",
          searchKey:key
        };
        this.searchkeys = [];
        this.getUrl();
      },
      //        页码的变化
      SizeChange(val) {
        this.searchmsg.pageSize = val;
        this.selectArr =[];
        this.getUrl();

      },
      CurrentChange(val) {
        this.searchmsg.pageNo = val;
        this.selectArr =[];
        this.getUrl();
      },
      checkState(storeNum, num) {
        let result = "购买";
        if (storeNum === 0 || num > storeNum) {
          result = "联系客服组货";
        }
        return result;
      },
      selectUnit(i, unit) {//选单位
//        let packageList = this.keywords_tbds[i].packages;
//        let preUnit = this.keywords_tbds[i].preUnit;
//        let newNum = this.keywords_tbds[i].num;
//        let num_qian = (packageList[0].num);
//        let num_he = (packageList[1].num);
        //价格计算
//        if (unit === "千") {
//          if (preUnit === "盒") {
//            newNum = Math.ceil(newNum / num_qian);
//          } else if (preUnit === "箱") {
//            newNum = Math.ceil(newNum / num_qian / num_he);
//          }
//
//        } else if (unit === "盒") {
//          if (preUnit === "千") {
//            newNum = Math.ceil(newNum * num_qian);
//          } else if (preUnit === "箱") {
//            newNum = Math.ceil(newNum / num_he);
//          }
//        } else if (unit === "箱") {
//          if (preUnit === "千") {
//            newNum = Math.ceil(newNum * num_he * num_qian);
//          } else if (preUnit === "盒") {
//            newNum = Math.ceil(newNum * num_he);
//          }
//        }
        this.keywords_tbds[i].preUnit = unit;
        let discount = (this.keywords_tbds[i].time.name === "立即发货") ? 1 : 0.99;
        if (this.checkNumber(i, this.keywords_tbds[i].num) < this.keywords_tbds[i].startnum) {
          this.keywords_tbds[i].num = this.getNumber(i, this.keywords_tbds[i].startnum, this.keywords_tbds[i].preUnit);
          this.keywords_tbds[i].marketprice = this.singlePrice(this.keywords_tbds[i].startPrice, this.keywords_tbds[i].startnum, this.keywords_tbds[i].intervalprice);
          this.keywords_tbds[i].totalPrice = this.totalPrice(this.keywords_tbds[i].startPrice, this.keywords_tbds[i].startnum, this.keywords_tbds[i].intervalprice, discount,i);
          this.keywords_tbds[i].deposit = this.depositPrice(this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice);
        } else if (this.checkNumber(i, this.keywords_tbds[i].num) > this.keywords_tbds[i].pdstorenum) {
          this.keywords_tbds[i].num = this.getNumber(i, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].preUnit);
          this.keywords_tbds[i].marketprice = this.singlePrice(this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice);
          this.keywords_tbds[i].totalPrice = this.totalPrice(this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice, discount,i);
          this.keywords_tbds[i].deposit = this.depositPrice(this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice);
        } else {
          this.updatePrice(this.keywords_tbds, i, null, this.getNumber(i, this.keywords_tbds[i].num), null, unit);
        }
//let nunber=this.getNumber(i,this.keywords_tbds[i].num,unit);
//        this.updatePrice(this.keywords_tbds, i, null, null, null, unit);
      },
      //价格换算
      handleReduce(i) {

        if (this.keywords_tbds[i].num > this.keywords_tbds[i].startnum && this.keywords_tbds[i].num > 1) {
          let num = this.keywords_tbds[i].num + ".00";
          let fval = num.toString().split(".")[0];
          fval--;
          let sval = num.toString().split(".")[1];
          let numStr = fval + "." + sval;
          this.keywords_tbds[i].num = numStr;
          this.updatePrice(this.keywords_tbds, i, null, this.keywords_tbds[i].num);
        }

      },
      handleAdd(i) {
        if (this.keywords_tbds[i].num < this.keywords_tbds[i].pdstorenum) {
          let num = this.keywords_tbds[i].num + ".00";
          let fval = num.toString().split(".")[0];
          fval++;
          let sval = num.toString().split(".")[1];
          let numStr = fval + "." + sval;
          this.keywords_tbds[i].num = numStr;
          this.updatePrice(this.keywords_tbds, i, null, this.keywords_tbds[i].num);
        }
      },
      inputFunc(i, val) {
        // let intValue = parseFloat(val) ? parseFloat(val) : 0;
//        console.log(val);
        let intValue = 0;
        if (val != null && !isNaN(val)) {
          //检查小数点后是否对于两位
          intValue = val;
          if (val.toString().split(".").length > 1 && val.toString().split(".")[1].length > 3) {
            // alert("小数点后不能多于两位！");
            intValue = parseFloat(val).toFixed(3);
          }
        }
        this.keywords_tbds[i].num = intValue;
        this.updatePrice(this.keywords_tbds, i, null, intValue);

      },
      inputBlur(i, val) {
        let discount = (this.keywords_tbds[i].time.name === "立即发货") ? 1 : 0.99;
        if (this.checkNumber(i, val) < this.keywords_tbds[i].startnum) {
          this.keywords_tbds[i].num = this.getNumber(i, this.keywords_tbds[i].startnum, this.keywords_tbds[i].preUnit);
          this.keywords_tbds[i].marketprice = this.singlePrice(this.keywords_tbds[i].startPrice, this.keywords_tbds[i].startnum, this.keywords_tbds[i].intervalprice);
          this.keywords_tbds[i].totalPrice = this.totalPrice(this.keywords_tbds[i].startPrice, this.keywords_tbds[i].startnum, this.keywords_tbds[i].intervalprice, discount,i);
          this.keywords_tbds[i].deposit = this.depositPrice(this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice);
        } else if (this.checkNumber(i, val) > this.keywords_tbds[i].pdstorenum) {
          this.keywords_tbds[i].num = this.getNumber(i, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].preUnit);
          this.keywords_tbds[i].marketprice = this.singlePrice(this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice);
          this.keywords_tbds[i].totalPrice = this.totalPrice(this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice, discount,i);
          this.keywords_tbds[i].deposit = this.depositPrice(this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice);
        }
      },
      selectTime(i, price) {
        this.keywords_tbds[i].startPrice = price;
        this.keywords_tbds[i].paytype = 0;//默认第一项
        this.updatePrice(this.keywords_tbds, i, price);
      },
      updatePrice(list, index, newP, newNum, intervalPrice, newUnit) {//更新价格
        let newPrice = newP ? newP : list[index].startPrice;
        let num = newNum ? newNum : list[index].num;
        let rangePrice = intervalPrice ? intervalPrice : list[index].intervalprice;
        let unit = newUnit ? newUnit : list[index].preUnit;
        let discount = (list[index].time.name === "立即发货") ? 1 : 0.99;
        let smallNum = this.checkNumber(index, num, unit);
        list[index].marketprice = this.singlePrice(newPrice, smallNum, rangePrice);
        list[index].totalPrice = this.totalPrice(newPrice, smallNum, rangePrice, discount,index);
        list[index].deposit = this.depositPrice(newPrice, smallNum, rangePrice);
      },
      getNumber(i, num, unit) {
        let packageList = this.keywords_tbds[i].packages;
        for (let i = 0; i < packageList.length; i++) {
          if (packageList[i].unit === unit) {
            return num;
          } else {
            let numRate = packageList[i].num === 0 ? 1 : packageList[i].num;
            num = (num / numRate).toFixed(2);
          }
        }
      },
      checkNumber(i, numb, newUnit) {//判断num 转化成最小单位计算价格
        let num = numb;
        let unit = newUnit ? newUnit : this.keywords_tbds[i].preUnit;
        let storeUnit = this.keywords_tbds[i].storeunit;
        let packageList = this.keywords_tbds[i].packages;
//        let num_qian = packageList[0].num;
//        let num_he = packageList[1].num;
        //默认单位为最小单位packageList[0].unit
        for (let i = 0; i < packageList.length; i++) {
          if (packageList[i].unit === unit) {
            return num;
          } else {
            let numRate = packageList[i].num === 0 ? 1 : packageList[i].num;
            num = num * numRate;
          }
        }


//        if (unit === packageList[0].unit && packageList[0].unit) {
//          if (storeUnit === packageList[1].unit && packageList[1].unit) {
//            num = num / num_qian;
//          } else if (storeUnit === packageList[2].unit && packageList[2].unit) {
//            num = num / num_qian / num_he;
//          }
//
//        } else if (unit === packageList[1].unit && packageList[1].unit) {
//          if (storeUnit === packageList[0].unit && packageList[0].unit) {
//            num = num * num_qian;
//          } else if (storeUnit === packageList[2].unit && packageList[2].unit) {
//            num = num / num_he;
//          }
//        } else if (unit === packageList[2].unit && packageList[2].unit) {
//          if (storeUnit === packageList[0].unit && packageList[0].unit) {
//            num = num * num_he * num_qian;
//          } else if (storeUnit === packageList[1].unit && packageList[1].unit) {
//            num = num * num_he;
//          }
//        }
        return num;
      },
      totalPrice(price, num, intervalprice, discount,item) {//单价，数量，区间,远期折扣
        num = parseFloat(num);
        let rate = 100;
        if (intervalprice) {
          let range = JSON.parse(intervalprice);
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
        }
        if (rate === "" || rate === undefined) {
          rate = 100;
        }
        let total_price = ((price * num * parseInt(rate) / 100)+ 0.000001).toFixed(2);
        if (discount) {
          total_price = ((price * num * parseInt(rate) * discount / 100) + 0.000001).toFixed(2);
        }
        if(parseInt(item)>-1){
          this.keywords_tbds[item].pagetypeStr=this.transPackagetype(this.keywords_tbds[item].packages,num,this.keywords_tbds[item].unit);
        }

        return total_price;
      },
      singlePrice(price, num, intervalprice) {//计算单价
        num = parseFloat(num);
        let rate = 100;
        if (intervalprice) {
          let range = JSON.parse(intervalprice);
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
        }
        if (rate === "" || rate === undefined) {
          rate = 100;
        }

        let single_price = this.deleteZero((price * parseInt(rate) / 100).toFixed(5));
        return single_price;
      },
      depositPrice(price, num, intervalprice) {
        num = parseFloat(num);
        let rate = 100;
        if (intervalprice) {
          let range = JSON.parse(intervalprice);
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
        }
        if (rate === "" || rate === undefined) {
          rate = 100;
        }
//        console.log(this.depositRate);
        let deposit_price = (price * num * parseInt(rate) / 100);
        if (this.depositRate) {
          deposit_price = (price * num * parseInt(rate) * this.depositRate / 10000).toFixed(2);
        }
        return deposit_price;
      },
      deleteZero(number) {
        let first = number.toString().split(".")[0];
        let second = number.toString().split(".")[1];
        let newNumber = "";
        let arr = [];
        // 删除0
        for (let i = second.length - 1; i > -1; i--) {
          if (second[i] === 0) {
          } else {
            arr.push(second[i]);
          }
        }
        arr.reverse();
        if (arr.length > 0) {
          newNumber = first + "." + arr.join('');

        } else {
          newNumber = first;
        }
        newNumber = parseFloat(newNumber);
        return newNumber;
      },
      isActive(type, index) {
        let check = false;
        if (type === index) {
          check = true;
        }
        return {
          unchecked: true,
          checked: check,
        }
      },
      choosePay(item, type) {//付款方式
        item.paytype = type;
      },
      selectStore(i, val) {
        //新数据带入
        let indexs = this.productIndex;
        indexs[i] = val.value;
        this.keywords_tbds = this.configData(this.allData, indexs);
      },
      //获取定金比率
      getRate() {
        let vue = this;
        let param = {};
        vue.$http.post(
          vue, '/rest/transaction/loadAllTransactionSetting', param,
          function (vue, data) {
            vue.depositRate = data.data.transactionSettings.remotepurchasingmargin;

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

      //包装方式转换
      transPackagetype(type,num,unit){
        let pagetypeStr = '';
        let first = '';
        let second = '';
        let third = '';
        let c_one = Math.floor(num/type[0].num);  //向上取整（盒）
        let c_two = Math.floor(c_one/type[1].num);  //向上取整（箱）
        let l_one = Math.floor((num * 1000)%(type[0].num * 1000));  //余数（千）
        let l_two = c_one%type[1].num; //余数（盒）
//        console.log(type[0].num);
//        console.log(c_one);
//        console.log(type,num,unit);
        if(c_two>0){
          first = c_two +type[2].unit
        }

        if(c_one>0&&c_one<type[1].num){
          second = c_one + type[1].unit
        } else if(c_one >type[1].num){
          second = l_two +type[1].unit
        }

        if(num>0&&num<type[0].num){
          third = num + type[0].unit
        } else if(num>type[0].num){
          if(l_one===0){
            third =''
          } else {
            third = l_one * 0.001 + type[0].unit
          }

        }
        pagetypeStr = first + second + third;
//        console.log(pagetypeStr)
        return pagetypeStr
      },

      configData(data, indexs) {//更新数据
        let list = [];
        let id, selectIndex, productname,level3, mark, brand, brandpic, packagetype, prodprice, unit, pdstorenum, storeunit,
          storename, stand, material, cardnum, selfsupport,pagetypeStr,
          subtitle, startnum, memberid, pdno, storeid, pdpicture,
          marketprice, prices, intervalprice, packages, producttype, showprice;
        for (let i = 0; i < data.length; i++) {
          let d = data[i];
          id = d.id;
          // selectIndex = j;
          selfsupport = d.selfsupport;
          productname = d.productname;
          level3=d.level3;
          stand = d.stand;
          material = d.material;
          cardnum = d.cardnum;
          mark = d.mark;
          brand = d.brand;
          brandpic = d.brandpic;
          packagetype = d.packagetype;
          prodprice = d.prodprice;
          unit = d.unit;
          pdstorenum = d.pdstorenum;
          storeunit = d.storeunit;
          storename = d.storename;
          subtitle = d.subtitle;
          startnum = d.startnum;
          marketprice = d.prices[0].price;
          prices = d.prices;
          intervalprice = d.intervalprice;
          packages = d.packages;
          memberid = d.memberid;
          pdno = d.pdno;
          storeid = d.storeid;
          pdpicture = d.pdpicture&&d.pdpicture.length>0?d.pdpicture[0]:"default/imgs/defaultProductImg.jpg";
          producttype = d.producttype == "紧固件" ? 1 : 2;
          showprice = d.showprice;
          pagetypeStr = this.transPackagetype(d.packages,d.startnum,d.unit);
          let item = {
            "id": id,
            "selectIndex": selectIndex,
            "productname": productname,
            "level3":level3,
            "selfsupport": selfsupport,
            "stand": stand,
            "material": material,
            "cardnum": cardnum,
            "mark": mark,
            "brand": brand,
            "brandpic": brandpic,
            "packagetype": packagetype,
            "prodprice": prodprice,
            "unit": unit,
            "pdstorenum": pdstorenum,
            "storeunit": storeunit,
            "storename": storename,
            "subtitle": subtitle,
            "startnum": startnum,
            "num": startnum,
            "marketprice": this.singlePrice(marketprice, startnum, intervalprice),//单价prices[0].price
            "prices": prices,
            "time": prices[0],
            "intervalprice": intervalprice,
            "packages": packages,
            "packageChild": packages[0],
            "preUnit": packages[0].unit,
            "startPrice": marketprice,//prices[0].price
            "totalPrice": this.totalPrice(marketprice, startnum, intervalprice),
            "deposit": this.depositPrice(marketprice, startnum, intervalprice),
            "memberid": memberid,
            "pdno": pdno,
            "storeid": storeid,
            "pdpicture": pdpicture,
            "producttype": producttype,
            "showprice": showprice,
            "paytype": 0,
            "pagetypeStr":pagetypeStr
          };
          list.push(item);
        }
        return list;
      },
      selectAll(event) {
        var _this = this;
        if (_this.checked) {
          _this.selectArr = [];
        } else { //实现全选
          _this.selectArr = [];
          _this.keywords_tbds.forEach(function (keywords_tbd, i) {
            _this.selectArr.push(i);
          });
          return _this.selectArr;
        }
        return _this.selectArr;
      }
      ,
      jump: function (MyName) {
        this.$router.push({name: MyName})
      }
      ,
      //点击产品图片跳转详情
      click_ipt($index, id) {
        // this.$router.push({name: "IndustrialDetail", params: {id: id}});
        window.open(window.location.origin + '/IndustrialDetail/' + id);//open new window
      }
      ,
      addOne(index) {
//        this.selectArr.push(index);//add this pd
        this.$store.commit("newNum", 1);//update
        let selectItem = this.keywords_tbds[index];
        let protype = 0;
        if (selectItem.time.name === "立即发货") {
          protype = 0;
        } else {
          if (selectItem.paytype === 0) {
            protype = 1;
          } else {//==1
            protype = 2;
          }
        }
        let param = {
          "saleid": selectItem.memberid,
          "pdid": selectItem.id,
          "pdno": selectItem.pdno,
          "pdnumber": selectItem.num,
          "storeid": selectItem.storeid,
          "delivertime": selectItem.time.name,
          "unit": selectItem.preUnit,
          "protype": protype,
        };
        let vue = this;
        vue.$http.post(
          vue, '/rest/buyer/shopcar/insertShopCar', param,
          function (vue, data) {
            vue.$message({
              showClose: true,
              message: "已加入购物车",
              type: 'success'
            })
          },
          function (error, data) {
            vue.$message({
              showClose: true,
              message: data.message,
              type: 'error'
            })
          }
        )

      }
      ,
      adds() {
        this.$store.commit("newNum", 1);
        let shopCarList = [];
        if (this.selectArr.length > 0) {//有货物
          for (let i = 0; i < this.selectArr.length; i++) {
            let selectIndex = this.selectArr[i];
            let selectItem = this.keywords_tbds[selectIndex];
            let protype = 0;
            if (selectItem.time.name === "立即发货") {
              protype = 0;
            } else {
              if (selectItem.paytype === 0) {
                protype = 1;
              } else {//==1
                protype = 2;
              }
            }
            let item = {
              "saleid": selectItem.memberid,
              "pdid": selectItem.id,
              "pdno": selectItem.pdno,
              "producttype": selectItem.producttype,
              "pdnumber": selectItem.num,
              "storeid": selectItem.storeid,
              "delivertime": selectItem.time.name,
              "unit": selectItem.preUnit,
              "protype": protype,
            };
            shopCarList.push(item);
          }
          let vue = this;
          let param = {shopCarList: JSON.stringify(shopCarList)};
          vue.$http.post(
            vue, '/rest/buyer/shopcar/batchInsertShopCar', param,
            function (vue, data) {
              vue.$message({
                showClose: true,
                message: "添加成功",
                type: 'success'
              })
              // alert("添加成功");
              vue.$router.push({name: "Pay"});

            },
            function (error, data) {
              vue.$message({
                showClose: true,
                message: data.message,
                type: 'error'
              })
            }
          )
        } else {
//          alert("请先勾选您需要的商品")
          this.$message({
            showClose: true,
            message: "请先勾选您需要的商品",
            type: 'warning'
          })
        }
      },
    },
    watch: {
      "selectArr":
        function () {
          if (this.selectArr.length === this.productIndex.length) {
            this.checked = true
          } else {
            this.checked = false
          }
        }

      ,
    },
    created() {
      //        将路径中获取的数据----保存在页面数据中
      let urlparam=this.$route.params.SearchURL;//获取？前的数据放置在页面中，调取搜索方法获取新数据
      let paramone=urlparam.split("-");
      let group=[];
      for(var i=1;i<paramone.length;i++){
        let item={name:"",value:""};
        let son=paramone[i].split("_");
        item.name=son[0];
        item.value=son[1];
        group.push(item);
      }
      for(var w=0;w<group.length;w++){
        for(let v in this.searchmsg){
          if(group[w].name===v){
            if(group[w].name==="pageNo"||group[w].name==="pageSize"){
              this.searchmsg[v]=Number(group[w].value);
            }else{
              this.searchmsg[v]=group[w].value;
            }
            if(v==="level1"||v==="level2"||v==="level3"||v==="productname"||v==="brand"||v==="cardnum"||v==="material"){
              this.dynamicTags.push(group[w].value);
            }
          }
        }
      }
      let urlquery=this.$route.query;//获取？后的数据放置在页面中，调取搜索方法获取新数据（attrJson的数据）
//      切割掉后面的html
      for( let r in urlquery) {
        if(r!=".html"){
          this.searchkey = {attr: "", value: ""};
          this.searchkey.attr = r;
          this.searchkey.value =urlquery[r].replace(".html","");
          this.searchkeys.push(this.searchkey);
          this.searchmsg.searchJson = (JSON.stringify(this.searchkeys));
          this.dynamicTags.push(urlquery[r].replace(".html",""));
        }
      }
      if(this.searchmsg.selfsupport==="1") {this.self=true;}
      if(this.searchmsg.havestore==="1") {this.have=true;}
      if(this.searchmsg.forwardtime==="1") {this.time=true;}
      this.SEOsearch();
    },
    mounted() {
      this.getList();
      this.getRate();
      this.$store.commit('savetijiao', '');
    }
  }

</script>
<style scoped>
  .unchecked {
    min-width: 80px;
    height: 26px;
    border: 1px solid #666;
    color: #666;
  }

  .checked {
    border: 1px solid #e8000e;
    color: #e8000e;
    background: none;
  }

  /*页码的编辑*/
  .goodslist .el-pagination {
    margin: 30px 10px;
    float: right;
  }

  /*标签*/
  .mytag {
    margin: 12px 5px;
  }

  .mysearch {
    margin: 12px 5px;
  }

  .mytag .el-tag {
    margin: 0 6px;
  }

  /*created by fastfan*/
  /*关键词*/
  .keywords_content {
    width: 1200px;
    margin: auto;
    /*font-weight: 700;*/
    overflow: hidden;
    padding-top: 20px;
  }

  .keywords_title {
    overflow: hidden;
    /*background-color: #fff;*/
  }

  .keywords_titlecontent {
    margin: 29px 0 19px 0;
    font-size: 16px;
    color: #e8000e;
  }

  .keywords_titlelist {
    color: #666;
    margin: 30px 0 22px 0;
  }

  .keywords_content_list {
    overflow: hidden;
    background-color: #fff;
  }

  /*商品属性*/
  .keywords_list_one {
    line-height: 36px;
    background-color: #f0f0f0;
    color: #666;
    width: 112px;
    text-align: center;
  }

  /**/
  .keywords_content_list table tr {
    overflow: hidden;
    border-bottom: solid 1px #d9d9d9;
  }

  .keywords_content_list table tr:last-child {
    border-bottom: none;
  }

  .keywords_list_two {
    line-height: 36px;
    display: flex;
    flex-wrap: wrap;
    width: 960px;
    overflow: hidden;
    padding: 0 20px;
    color: #424242;
  }

  .beforeheight {
    height: 36px;
  }

  .afterheight {
    height: auto;
  }

  .keywords_list_thr {
    line-height: 36px;
    background-color: #f0f0f0;
    color: #666;
    cursor: pointer;
    width: 126px;
    text-align: center;
  }

  .keywords_list_sec {
    margin: 0 28px 0 0px;
    cursor: pointer;
  }

  .keywords_list_sec:hover {
    color: #e8000e;
  }

  .keywords_content_tbd {
    width: 100%;
    position: relative;
    border: solid 1px #d9d9d9;
  }

  /*商品排序*/
  .keywords_content2 {
    overflow: hidden;
    margin: 15px 0;
    background-color: #fff;
  }

  .keywords_content2_ul {
    overflow: hidden;
    padding: 7px 0;
    margin-left: 18px;
  }

  .keywords_content2_ul li {
    float: left;
    margin: 0 12px;
    height: 26px;
    line-height: 26px;
  }

  .keywords_content2_ul li input {
    vertical-align: middle;
    margin: 0 5px;
  }

  .keywords_content2_ul li:first-child {
    width: 54px;
    text-align: center;
    background-color: #e8000e;
    color: #fff;
    border: 1px solid #d9d9d9;
    cursor: pointer;
  }

  .keywords_content2_ul li img {
    float: right;
    margin-top: 7px;
    margin-right: 7px;
  }

  .keywords_shopcar {
    padding: 10px 0;
    cursor: pointer;
  }

  .keywords_shopcar span {
    color: #424242;
    margin: 0 10px 0 5px;
  }

  .keywords_content2_title {
    background-color: #f0f0f0;
    overflow: hidden;
    border: 1px solid #d9d9d9;
    border-bottom: none;
  }

  /*第二个表格*/
  .keywords_content_tbd2 {
    text-align: center;
    border: 1px solid #d9d9d9;
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

  .keywords_content_tbd2 tbody tr td {
    font-weight: normal;
  }

  .keywords_content_tbd2 thead th input {
    vertical-align: middle;
    margin: 0 9px 0 20px;
  }

  .checkimg {
    width: 64px;
    height: 64px;
    background-color: #e8000e;
    float: left;
    cursor: pointer
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
    margin: 0 auto;
  }

  .check_logoimg > img {
    width: 30px;
    height: 20px;
  }

  /*数量加减*/
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
    height: 26px;
    background-color: #ffffff;
    border: solid 1px #d9d9d9;
    margin: 0;
    border-left: none;
    border-right: none;
    padding-left: 5px;
  }

  .keywords_content_tbd2 tbody tr {
    border-bottom: 1px solid #d9d9d9;
  }

  .keywords_content_tbd2 tbody tr:last-child {
    border-bottom: none;
  }

  .num_danwei {
    height: 26px;
    vertical-align: top;
  }

  .keywords_tbd2_nine {
    min-width: 80px;
  }

  .keywords_tbd2_one {
    padding-bottom: 14px;
    padding-top: 20px;
    width: 120px;
  }

  .el-pager li {
    width: auto;
    border: none;
  }

</style>
<style>


  nav {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 30px;
    overflow: hidden;
  }

  .active {
    border-bottom: 0;
  }

  .red_button {
    padding: 3px 5px;
    background: none;
    border:1px solid #e8000e;
    color: #e8000e;
  }
</style>
