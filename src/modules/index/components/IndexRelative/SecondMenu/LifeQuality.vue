<template>
  <div class="LifeQuality" v-loading="dataloading">
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
            <!--<li><a href="">销量</a><img src="../../../assets/icon/down2.png" /></li>-->
            <!--<li><a href="">规格</a><img src="../../../assets/icon/down2.png"/></li>-->
            <li @click="changsort" v-model="searchmsg.sorttype"><a>价格</a>
              <img src="../../../assets/icon/down.png" v-if="searchmsg.sorttype==='2'"/>
              <img src="../../../assets/icon/sortup.png" v-else/>
            </li>
          </ul>
        </div>
        <div class="MyBrand_section" v-for="MyBrand in MyBrands">
          <div class="MyBrand_icon">
            <img :src="$oss.publicUrl(MyBrand.pdpicture)" @click="clickdetail(MyBrand.id)">
          </div>
          <p class="MyBrand_detail">
            <span>{{MyBrand.productname}}&nbsp;&nbsp;{{MyBrand.productalias}}&nbsp;&nbsp;{{MyBrand.subtitle}}</span>
          </p>
          <p class="MyBrand_price">
            <span class="MyBrand_price_red">￥{{MyBrand.minprice}}/{{MyBrand.unit}}</span>
          </p>
        </div>
      </div>
      <el-pagination :page-sizes="[20, 40, 100]" @size-change="SizeChange"
                     @current-change="CurrentChange"
                     :page-size="searchmsg.pageSize" :current-page.sync="searchmsg.pageNo"
                     layout="total,sizes, prev, pager, next, jumper" :total="Total">
      </el-pagination>
    </div>
  </div>
</template>
<style scoped>
  /*页码的编辑*/
  .LifeQuality .el-pagination {
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
  /*商品搜索的更多*/
  .keywords_list_two {
    line-height: 36px;
    display:flex;
    flex-wrap: wrap;
    width: 960px;
    overflow: hidden;
    padding: 0 20px;
    color: #424242;
  }
  .beforeheight{
    height: 36px;
  }
  .afterheight{
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

  .keywords_content_list table tr {
    overflow: hidden;
    border-bottom: solid 1px #d9d9d9;
  }

  .keywords_content_list table tr:last-child {
    border-bottom: none;
  }

  .keywords_content_tbd {
    width: 100%;
    position: relative;
    border: solid 1px #d9d9d9;
  }

  /*商品表格排序*/
  .keywords_content2 {
    overflow: hidden;
    margin: 30px 0;
    /*background-color: #fff;*/
  }

  .keywords_content2_ul {
    overflow: hidden;
    width: 224px;
    padding: 7px 0;
    margin-left: 18px;
  }
  .keywords_content2_ul li {
    width: 54px;
    height: 26px;
    line-height: 26px;
    color: #424242;
    text-align: center;
    float: left;
    border: 1px solid #d9d9d9;
    border-right: none;
    cursor: pointer;
  }

  .keywords_content2_ul li a {
    margin-top: 4px;
    color: #424242;
    /*display: block;*/
    /*float: left;*/
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

  .keywords_content2_title {
    background-color: #f0f0f0;
    overflow: hidden;
    border: 1px solid #d9d9d9;
  }
/*商品的列表展示*/
  .MyBrand_section {
    width: 285px;
    border: 1px solid #f2f2f2;
    float: left;
    margin: 10px 20px 20px 0;
  }
  /*nth-child匹配其父元素的第几个子元素（父元素包含了标题子元素）*/
  .keywords_content2  .MyBrand_section:nth-child(4n+1){
    margin-right: 0;
  }
  .MyBrand_icon > img {
    cursor: pointer;
    width: 283px;
    height: 283px;
  }
  .MyBrand_detail {
    font-size: 14px;
    color: #424242;
    line-height: 26px;
    margin-left: 17px;
  }
  /*问下过长--出现省略号*/
  .MyBrand_detail span{
    display: inline-block;
    width:250px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .MyBrand_price {
    margin: 14px 0 15px 15px;
  }
  .MyBrand_price_red {
    color: #e8000e;
    font-size: 16px;
    margin-right: 15px;
    font-weight: normal;
  }
</style>
<style>

</style>
<script>
  export default {
    name: "LifeQuality",
    metaInfo: {
      title: '生活辅材区商品 - 紧商网',
      meta: [
        {name: 'keywords', content: '生活辅材区商品 - 紧商网'},
        {
          name: 'description',
          content: '生活辅材区商品 - 紧商网'
        }
      ]
    },
    data: function () {
      return {
        dataloading:true,//数据加载
        //        搜索的条件接口
        searchmsg: {
          pageNo: 1,
          pageSize: 20,
          level1: "",
          level2: "",
          level3: "",
          brand: "",
          productname: "",
          searchKey: "",
          searchJson: [],
          sorttype:"1",
        },
        //        搜索的展示列表
        keycontent: [],
        searchkey: {attr: "", value: ""},
        searchkeys: [],
        //        标签
        dynamicTags: [],
//        商品列表
        MyBrands: [],
        Total: 0,
        //        路径中获取的参数
        getparam:"",
        getquery:"",
      }
    },
    methods: {
      //        改变排序方式
      changsort:function(){
          if(this.searchmsg.sorttype==="1"){
            this.searchmsg.sorttype="2";
          }else{
            this.searchmsg.sorttype="1";
          }
        this.getUrl();
      },
      more:function(index){
        if (this.keycontent[index].styles=="beforeheight") {
          this.keycontent[index].styles="afterheight";
          this.keycontent[index].word = "收起";
        } else {
          this.keycontent[index].styles="beforeheight";
          this.keycontent[index].word = "更多";
        }
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
      //        页码的变化
      SizeChange(val) {
        this.searchmsg.pageSize = val;
        this.getUrl();
      },
      CurrentChange(val) {
        this.searchmsg.pageNo = val;
        this.getUrl();
      },
      getList: function () {
        let vue = this;
        let param = vue.searchmsg;
        param.type = 2;
        vue.$http.post(
          vue, '/rest/front/product/otherProdList', param,
          function (vue, data) {
            // 成功处理
//              处理搜索列表数据
            vue.dataloading=false;
            vue.Total = data.data.pageInfo.totalRows;
            if (vue.Total != 0) {
//                   处理数据添加新的属性
              for (var i = 0; i < data.data.keyValues.length; i++) {
//                data.data.keyValues[i]["morelength"] = "10";
                data.data.keyValues[i]["styles"] = "beforeheight";
                data.data.keyValues[i]["word"] = "更多";
              }
//              for (var i = 0; i < data.data.keyValues.length; i++) {
//                data.data.keyValues[i]["morelength"] = "10";
//                data.data.keyValues[i]["word"] = "更多";
//              }
              vue.keycontent = data.data.keyValues;
              vue.MyBrands = data.data.pageInfo.list;
              for (var i = 0; i < vue.MyBrands.length; i++) {
                vue.MyBrands[i].pdpicture = vue.MyBrands[i].pdpicture&&vue.MyBrands[i].pdpicture.length>0?vue.MyBrands[i].pdpicture[0]:'default/imgs/defaultProductImg.jpg';
              }
            } else {
              vue.keycontent = [];
              vue.MyBrands = [];
              vue.$message({
                message: "没有符合条件的商品",
                type: 'warning'
              });
            }
          }, function (error, data) {
            // 错误处理
            console.log(error);
          });
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
        let SearchURL="/LifeQuality/search"+this.getparam+"?"+this.getquery+".html";
        window.open(window.location.origin+SearchURL,"_self");
      },
      //      列表框点击的搜索
      wordseach: function (i, ii) {
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
//            console.log(this.searchmsg.searchJson)
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
          pageSize: 20,
          level1: "",
          level2: "",
          level3: "",
          productname: "",
          brand: "",
          searchJson: [],
          sorttype:"1",
          searchKey:key
        };
        this.searchkeys = [];
        this.getUrl();
      },
//      去往详情页
      clickdetail: function (id) {
        window.open(window.location.origin +'/FastDetail/'+id);
      },
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
            if(v==="level1"||v==="level2"||v==="level3"||v==="productname"||v==="brand"){
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
    },
    mounted() {
        this.getList();
    }
  }

</script>
