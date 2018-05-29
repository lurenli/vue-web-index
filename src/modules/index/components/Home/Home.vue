<template>
  <div class="Home" id="Home">
    <div class="img_wrap" v-if="activeLS">
      <img src="../../assets/images/closeImg.png" height="36" width="36" class="close_img" @click="activeLS=false" />
      <img src="../../assets/images/redPacket.gif" width="1200" class="activeLS" />
    </div>

    <My-Header ></My-Header>
    <New-NavBar ></New-NavBar>
    <router-view></router-view>
    <FloatFloor></FloatFloor>
    <My-Footer ></My-Footer>
  </div>
</template>

<script>
  import MyHeader from "../Header/Header"
  import NewNavBar from "../IndexRelative/NewNavBar"
  import FloatFloor from "../IndexRelative/FloatFloor"
  import MyFooter from "../Footer/Footer"
  export default {
    components: {
      MyHeader,MyFooter,NewNavBar,FloatFloor
    },
      name: 'Home',
      data:function () {
        return{
          info:[],
          activeLS:false,
          screenWidth:document.body.clientWidth
        }
      },
    methods: {
      checkWith(){
        if(this.screenWidth<1200) {
          if(document.getElementById('MyTop')){
            document.getElementById('MyTop').style.width = '1200px';
          }
          if(document.getElementById('MyHeader')){
            document.getElementById('MyHeader').style.width = '1200px';
          }
          if(document.getElementById('NewNavBar')){
            document.getElementById('NewNavBar').style.width = '1200px';
          }
          if(document.getElementById('Index')){
            document.getElementById('Index').style.width = '1200px';
          }
          document.getElementById('Home').style.width ='1200px';
        }else if(this.screenWidth>1200){
          if(document.getElementById('MyTop')){
            document.getElementById('MyTop').style.width = '100%';
          }
          if(document.getElementById('MyHeader')){
            document.getElementById('MyHeader').style.width = '100%';
          }
          if(document.getElementById('NewNavBar')){
            document.getElementById('NewNavBar').style.width = '100%';
          }
          if(document.getElementById('Index')){
            document.getElementById('Index').style.width = '100%';
          }
          document.getElementById('Home').style.width ='100%';
          }
        }

    },
    watch:{
      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
//            console.log(that.screenWidth)
            that.checkWith()
            that.timer = false
          }, 400)
        }
      }
    },
    created(){
      if(localStorage.getItem('regmes')==='true'){
        this.activeLS = true;
        localStorage.removeItem('regmes');
      }
    },
    mounted() {
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
    },
    beforeCreate(){
//      console.log(this.$router.currentRoute.query.code);
      if(this.$router.currentRoute.query.code){
        let vue  = this;
        let param = {
          code:this.$router.currentRoute.query.code
        };
        vue.$http.post(
          vue,'/rest/thirdpart/login/wxLogin',param,
          function (vue,data) {
            console.log(data);
            if(data.message==='没有绑定帐号'){
//              console.log('去绑定')
              window.localStorage.setItem('nickname',data.data.nickname);
              window.localStorage.setItem('nicktype',data.data.type);
              window.localStorage.setItem('openid',data.data.openid);
              window.location.href='/userBand'
            } else {
              vue.$http.post(
                vue, '/rest/common/userInfo', {_cannot:false},
                function (vue, data) {
                  var data =data.data;
                  vue.$store.commit('loginStore',data);
                  vue.$router.push({ name: 'Index' });
                },function (error,data) {
                  console.log(error)
                });
            }
          },
          function (error,data) {
            console.log(data);
          }
        )
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .close_img{
    position: fixed;
    z-index: 1000;
    top:450px;
    margin-left: 166px;
    left: 50%;
    cursor: pointer;
  }
  .activeLS{
    position: fixed;
    top:150px;
    left: 50%;
    margin-left: -600px;
    z-index: 999;
  }
</style>
