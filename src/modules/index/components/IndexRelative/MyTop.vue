<template>
  <div class="MyTop" id="MyTop">
    <div class="top">
      <div class="top_left">
        <span><i class="icon home"></i><span>您好，欢迎来到紧商网！</span></span>
        <span class="loginAfter" v-if="$store.state.loginInfo!==undefined">
            <span style="margin: 0 12px;">{{$store.state.loginInfo.username}}</span>
            <a @click="downline" style="margin-left: -6px">退出</a>
          </span>
        <span class="loginBefore" v-else>
              <a v-on:click="goToLogin" class="login">请登录</a>
              <a v-on:click="goToSignUp" class="regis" style="margin-left: -6px">请注册</a>
       </span>
        <span class="choose-address">
             <my-address></my-address><i class="icon down"></i>
          </span>
        <span><a class="goShop" @click="gotoShop">去往商家</a></span>
      </div>
      <div class="top_right">
        <ul>
          <li>
            <div>
              <a v-on:click="goToPersonal">个人中心</a>
            </div>
          </li>
          <!--<li >-->
          <!--<div>-->
          <!--<span class="showHide" style="cursor: pointer">记住紧商</span><i class="icon down"></i>-->
          <!--<ul class="downMenu">-->
          <!--<li><a href="javascript:;" @click="AddFavorite('我的网站','http:\/localhost:8000/')">收藏本站</a></li>-->
          <!--<li><a href="javascript:;" @click="SetHome(this,'http://localhost:8000/');">设为首页</a></li>-->
          <!--<li><a href="javascript:;" @click=" toDesktop('http:\/localhost:8000/','紧商网')">保存到桌面</a></li>-->
          <!--</ul>-->
          <!--</div>-->
          <!--</li>-->
          <li>
            <div>
              <span style="cursor: pointer">手机紧商</span><i class="icon down"></i>
              <ul class="downMenu">
                <li><img src='../../assets/images/qrcode_wx.jpg' class="qrImg">
                  <div style="text-align: center">微信公众号</div>
                </li>
                <li><img src='../../assets/images/androidUrl.png' class="qrImg">
                  <div style="text-align: center">安卓下载</div>
                </li>
                <li><img src='../../assets/images/iosUrl.png' class="qrImg">
                  <div style="text-align: center">IOS下载</div>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div>
              <!--<span @click="toggle" style="cursor: pointer">消息中心</span><i class="icon down"></i>-->
              <a>消息中心</a><i class="icon down"></i>
              <!--<ul class="downMenu">-->
              <!--<li><a href="#">交易物流</a></li>-->
              <!--<li><a href="#">系统消息</a></li>-->
              <!--<li><a href="#">互动消息</a></li>-->
              <!--</ul>-->
            </div>
          </li>
          <li>
            <div>
              <span @click="" style="cursor: pointer">&nbsp;客服中心&nbsp;&nbsp;&nbsp;</span><i class="icon down"></i>
              <ul class="downMenu telphone">
                <li><a>4001002897</a></li>
                <li><a>0571-57173777</a></li>
              </ul>
            </div>
          </li>
          <!--<li>-->
          <!--<div>-->
          <!--<em class="icon tel"></em>0571-22222222-->
          <!--</div>-->
          <!--</li>-->
        </ul>
      </div>
      <div style="clear: both"></div>
    </div>
  </div>
</template>
<script>
  import MyAddress from './address.vue';

  export default {
    name: 'MyTop',
    components: {MyAddress},
    data: function () {
      return {
        sellerInfo: ''
      }
    },
    methods: {
      //去商家
      gotoShop() {
        let sellerInfo ='';
        if(this.$store.state.loginInfo){
          sellerInfo = this.$store.state.loginInfo.sellerCompanyInfo;
        }else{
          sellerInfo ='';
        }
        if (sellerInfo) {
          if (sellerInfo.validate === 0) {       //  申请成为卖家 待审核
            localStorage.setItem('validate', '0');
            location.href = "/seller/userBand";
          } else if (sellerInfo.validate === 1) {  //   审核通过

            localStorage.setItem('validate', '1');
            location.href = "/seller";

          } else if (sellerInfo.validate === 2) {   //  审核未通过
            localStorage.setItem('validate', '2');
            location.href = "/seller/userBand";
          }
        } else {
          location.href = "/seller/Login";
        }

      },
      //设为首页
      SetHome(obj, url) {
        try {
          obj.style.behavior = 'url(#default#homepage)';
          obj.setHomePage(url);
        } catch (e) {
          if (window.netscape) {
            try {
              netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
              alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
          } else {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
          }
        }
      },
      //收藏本站
      AddFavorite(title, url) {
        try {
          window.external.addFavorite(url, title);
        }
        catch (e) {
          try {
            window.sidebar.addPanel(title, url, "");
          }
          catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
          }
        }
      },
      //保存到桌面
      toDesktop(sUrl, sName) {
        try {
          var WshShell = new ActiveXObject("WScript.Shell");
          var oUrlLink = WshShell.CreateShortcut(WshShell.SpecialFolders("Desktop") + "\\" + sName + ".url");
          oUrlLink.TargetPath = sUrl;
          oUrlLink.Save();
        }
        catch (e) {
          alert("当前IE安全级别不允许操作！");
        }
      },
//      toggle() {
//        alert('模块正在开发中')
//      },
      goToLogin: function () {
        this.$router.push({path: '/Login'});
      },
      goToSignUp: function () {
        this.$router.push({path: '/SignUp'});
      },
      goToPersonal: function () {
//        this.$router.push({name: 'CenterIndex'});
        location.href = "/usercenter"
      },

      downline: function () {
        let vue = this;
        vue.$http.post(
          vue, '/rest/buyer/logout', {},
          function (vue, data) {
            vue.$store.commit('loginStore', undefined);
            vue.$store.commit("newNum", 1);//update
          }, function (error, data) {
            console.log(error)
          });
      },
      getState: function () {
        if (this.$store.state.loginInfo === undefined) {
          let vue = this;
          vue.$http.post(
            vue, '/rest/common/userInfo', {_cannot: false},
            function (vue, data) {
              var data = data.data
              vue.$store.commit('loginStore', data);
              vue.$store.commit("newNum", 1);//update
              vue.sellerInfo = vue.$store.state.loginInfo.sellerCompanyInfo;
//              console.log(this.sellerInfo,1111);
            }, function (error, data) {
              console.log(error)
            });
        }
      }
    },
    mounted() {
      this.getState();
      if (this.$store.state.loginInfo) {
        this.sellerInfo = this.$store.state.loginInfo.sellerCompanyInfo;
      }
    },
    created() {
    }
  }
</script>
<style scoped>
  .MyTop {
    background: rgba(231,231,231,.8);
    font-size: 12px;
  }

  .MyTop a {
    cursor: pointer;
  }

  .top {
    width: 1200px;
    margin: 0 auto;
    /*height:30px;*/
    line-height: 30px;
  }

  /*登录注册前*/
  .loginBefore {
    float: left;
    margin-left: 30px;
  }

  .loginBefore a, .loginAfter a {
    color: #e60311;
    padding: 0 11px;
    border-right: 1px solid #bfbfbf;
    border-left: 1px solid #ffffff;
    box-sizing: border-box;
  }

  .loginBefore a:first-child, .loginAfter a:first-child, .top .top_right > ul li:first-child div {
    border-left: none;
  }

  .loginBefore a:last-child, .loginAfter a:last-child, .top .top_right > ul li:last-child div {
    border-right: none;
  }

  /*登录之后*/
  .loginAfter {
    color: #e60311;
  }

  /*去往商家*/
  .top_left a.goShop {
    color: #fff;
    background: #e60311;
    padding: 3px 6px;
    border-radius: 4px;
  }

  /*头部左边*/
  .top .top_left {
    float: left;
    overflow: hidden;
  }

  /*.top .top_left>ul>li,.top .top_right>ul>li{*/
  /*float: left;*/
  /*}*/
  .top .top_left > span {
    float: left;
  }

  /*头部右边*/
  .top .top_right > ul > li {
    float: left;
  }

  .top .top_right {
    float: right;
  }

  .top .top_right > ul > li > div {
    height: 17px;
    line-height: 17px;
    margin: 6px 0;
    padding: 0 10px;
    border-right: 1px solid #ffffff;
    border-left: 1px solid #bfbfbf;
  }
  /*右侧的下拉箭头*/
  .top .top_right > ul > li i {
    margin: 6px 0 1px 5px;
  }

  .top .top_right > ul > li > div {
    position: relative;
  }

  /*下拉菜单*/
  .downMenu {
    display: none;
    position: absolute;
    z-index: 10000;
    top: 22px;
    left: -1px;
    width: 85px;
    border: 1px solid #d9d9d9;
    border-top: none;
    background: #fff;
    line-height: 20px;
    padding: 2.5px;
  }
/*联系方式*/
  .telphone{
   width:100px;
  }
  .qrImg {
    width: 78px;
    height: 78px;
  }

  /*下拉效果的显示*/
  .top .top_right > ul > li:hover {
    background: #fff;
  }

  .top .top_right > ul > li:first-child:hover{
    background: #e7e7e7;
  }

  .top .top_right > ul > li:hover > div ul {
    display: block;
  }

  .top .top_right > ul > li:hover i {
    transform: rotate(180deg);
  }

  /*图标*/
  .choose-address i {
    margin: -17px 12px;
  }

  .icon {
    background: url(../../assets/icon/img.png) no-repeat;
    display: inline-block
  }

  .home {
    height: 11px;
    width: 12px;
    background-position: 0 -14px;
    margin: 9px 7px 0 0;
  }

  .tel {
    height: 10px;
    width: 10px;
    background-position: 0 0;
    padding: 0 3px;
    margin: 4px;
    float: left
  }

  .up {
    height: 6px;
    width: 10px;
    background-position: 0 -43px;
    float: right
  }

  .down {
    height: 6px;
    width: 10px;
    background-position: 0 -35px;
    float: right;
  }

</style>
