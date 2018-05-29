<template>
  <div class="helpDetail">
    <div class="bread">
      <span>您的位置：</span>
      <a>首页</a>
      <span>&gt;</span>
      <span>帮助中心</span>
      <span>&gt;</span>
      <span>关于我们</span>
      <span>&gt;</span>
      <span>团队文化</span>
    </div>
    <div class="helpmsg">
      <div class="itemname">
        <i class="icon"></i>
        <span class="itemtitle">团队文化</span>
      </div>
      <div class="helpcontent">
          <ul  class="msg">
            <li><span>企业愿景：</span>打造全球工业品供应链第一品牌</li>
            <li><span>我们的口号：</span>为您省钱，让您赚钱。</li>
            <li><span>经营理念：</span>团结、诚信、高效、创新。</li>
            <li>
              <span>团结：</span>
              是紧商长期稳健发展的根本保障。紧商人在风云变幻的商场中稳健的成长，
              得益于全体紧商人的同心协力的企业氛围。事成于和睦，力生于团结，我们对内强化团队的整体素质，
              对外保持与客户、经销商及各相关团体的真诚合作，为合作伙伴创造长期价值，达成双赢。 
            </li>
            <li>
              <span>诚信：</span>
              是紧商经营的根本指导方针。
                诚信者，天下之结也，我们牢记：诚信为本、诚信做人、诚信立事。在工作中严于律己，踏实做事，
                形成独特的强大的战斗力。言而有信，不光为了自己，更是力求把完美的成果奉献给客户。 
            </li>
            <li>
              <span>高效：</span>
              是紧商人的行事作风。行动迅速，对质量严格要求，对服务坚守承诺，
              并将追求高效卓越的意识贯穿到企业经营的方方面面，做到每人每天都在挑战自我，每天每人都在成长。　
            </li>
            <li><span>创新: </span>
               是紧商文化的核心价值观，也是我们自信、自强、自尊的内在精神的集中展现。以创新谋发展，
                创造市场需求，引领市场发展潮流，在经营中体现为紧商人高举更快、
                更高、更强的旗帜致力于推动中国紧固件业的发展。
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>

    export default{
        data(){
            return {

            }
        }
    }
</script>
<style scoped>
  @import "../../css/helpcentercommon.css";
  .msg li{
    line-height: 34px;
    margin:10px 0;
    letter-spacing: 1.1px;
  }
  .msg span{
    letter-spacing: 1.1px;
    text-align: justify;
    color: #424242;
    margin-right: 5px;
  }
</style>
