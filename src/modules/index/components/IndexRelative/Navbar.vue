<template>
  <div class="MyNavbar">
    <!--菜单导航样式-->
    <div id="Menu" class="clearfix">
      <div class="index_style clearfix">
        <div id="allSortOuterbox">
          <div class="t_menu_img"></div>
          <div class="Category"><a href="#"><em></em>全部商品分类</a></div>
          <div class="hd_allsort_out_box_new">
            <!--左侧栏目开始-->
            <ul class="Menu_list" style="height: 456px;">
              <li class="name" v-for="brand in brands">
                <div class="Menu_name">
                  <a :href=brand.msg>
                    <p>{{brand.title}}</p>
                    <p class="Menu_name_tip">{{brand.name}}</p>
                  </a>
                </div>
                <div class="menv_Detail" style="display: none;">
                  <div class="cat_pannel clearfix">
                    <div class="hd_sort_list">
                      <dl class="clearfix" v-for="half in halves">
                        <dt>
                          <a href="javascript:;">{{half.name}}
                            <i>&gt;</i></a>
                        </dt>
                        <dd>
                          <a href="javascript:;" >{{half.title}}</a>
                          <a href="javascript:;" >{{half.title2}}</a>
                          <a href="javascript:;" >{{half.title3}}</a>
                          <a href="javascript:;" >{{half.title4}}</a>
                          <a href="javascript:;" >{{half.title5}}</a>
                          <a href="javascript:;" >{{half.title6}}</a>
                          <a href="javascript:;" >{{half.title7}}</a>
                          <a href="javascript:;" >{{half.title8}}</a>
                          <a href="javascript:;" >{{half.title9}}</a>
                        </dd>
                      </dl>
                    </div>
                    <div class="Brands">
                      <a href="javascript:;" class="logo_Brands"><img src="http://www.huaxur.com/static_lm/upload/img/brand/1489140222224.jpg"></a>
                      <a href="javascript:;" class="logo_Brands"><img src="http://www.huaxur.com/static_lm/upload/img/brand/1502357669649.jpg"></a>
                      <a href="javascript:;" class="logo_Brands"><img src="http://www.huaxur.com/static_lm/upload/img/brand/1502357599163.jpg"></a>
                      <a href="javascript:;" class="logo_Brands"><img src="http://www.huaxur.com/static_lm/upload/img/brand/1502357653137.jpg"></a>
                      <a href="javascript:;" class="logo_Brands"><img src="http://www.huaxur.com/static_lm/upload/img/brand/1502353046088.jpg"></a>
                      <a href="javascript:;" class="logo_Brands"><img src="http://www.huaxur.com/static_lm/upload/img/brand/1502359686543.jpg"></a>
                    </div>
                    <div class="banner_gd">
                      <ul>
                        <li>
                          <a href="JavaScript:;" target="_blank">
                            <img src="http://www.huaxur.com/static_lm/upload/img/lmadv/1502417075446.png" style="width: 204px;height: 125px;margin-left: 9px;margin-top: 5px;">
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!--品牌-->
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'MyNavbar',
    data: function () {
      return {
        brands:[
          {title:'数码电子',name:'一体机、充电器、数据线、冲印服务、录音笔、麦克风、杀毒软件、运动跟踪器、iPhone、机身附件'},
          {title:'珠宝首饰',name:'K金项链、黄花梨、戒指、珍珠项链、投资银、红宝石、蓝宝石、摆件、挂件、黄金手镯、手链、脚链、钻石耳饰'},
          {title:'服饰内衣',name:'旗袍、服装洗护、太阳镜、衬衫'},
          {title:'食品饮料',name:'白酒、酸梅汤、坚果炒货、饼干/蛋糕、豆油、蜂蜜、普洱、新疆'},
          {title:'鞋靴箱包',name:'青春潮流、厚底、最新爆款、拉杆箱、人气款、上新、潮范、钱包'},
          {title:'养车用品',name:'充气泵、倒车雷达、方向盘套、打蜡机、商务型'},
          {title:'母婴用品',name:'1段、婴儿床、0~6个月'},
          {title:'音像卡券',name:'电子书、哲学、文学、音乐、文化、学术、青春文学'}
        ],
        halves:[
          {name:"电脑",title:"一体机",title2:"台式机",title3:"笔记本",title4:"游戏本"},
          {name:"手机配件",title:"充电器、数据线",title2:"蓝牙耳机",title3:"移动电源"},
          {name:"摄影摄像",title:"冲印服务",title2:"运动相机",title3:"拍立得",title4:"摄像机",title5:"影棚器材",title6:"数码相机",title7:"单反相机",title8:"数码相框"},
          {name:"电子教育",title:"录音笔",title2:"学生平板",title3:"早教益智",title4:"点读机/笔"},
          {name:"影音娱乐",title:"麦克风",title2:"专业音频",title3:"智能设备",title4:"苹果设备",title5:"耳机、耳麦",title6:"便携、无线设备",title7:"收音机",title8:"MP3、MP4",title9:"高清播放器"},
          {name:"虚拟商品",title:"杀毒软件",title2:"延保服务"},
          {name:"智能设备",title:"运动跟踪器",title2:"智能手环",title3:"智能手表",title4:"智能眼镜"},
          {name:"手机",title:"iphone",title2:"其他",title3:"华为",title4:"三星",title5:"小米",title6:"乐视"},
          {name:"数码配件",title:"机身附件",title2:"存储卡",title3:"读卡器",title4:"相机包"}
        ]
      }
    }
  }
</script>

<style>
  .sli{
    font-size: 16px;
    cursor: pointer;
  }
</style>
