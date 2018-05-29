<template>
    <div class="Index" id="Index">
      <Flash></Flash>
      <Brand></Brand>
      <FloorA></FloorA>
      <FloorB></FloorB>
    </div>
</template>

<script>
  import Flash from "./Flash"
  import Brand from "./Brand"
  import FloorA from "./FloorA"
  import FloorB from "./FloorB"

  export default {
    components: {
      Flash, Brand, FloorA,FloorB
    },
    name: "Index",
    metaInfo: {
      title: '紧商网-买卖螺丝,就上紧商网',
      titleTemplate: null,
      meta: [
        {vmid: 'keywords',name: 'keywords', content: '紧固件,标准件,螺栓,螺柱,螺钉,螺母,垫圈,挡圈,木螺钉,销,铆钉,自攻钉,焊钉,膨胀件,组合件，紧商网，紧商购物平台'},
        {vmid: 'description',
          name: 'description',
          content: '紧商网，集中行业产品库存，应用互联网+紧固件产业模式，为用户提供紧固件网上交易，物流配送，技术服务，行情资讯，提升在线交易的效率和客户体验度，形成工业品销售结算中心，服务产业上下游用户。打造全球工业品供应链服务优质品牌。'
        }
      ]
    },
    data(){
      return{

      }
    }
  }
</script>

