<template>
    <div class="ShopCar">
      <NewHeader></NewHeader>
      <router-view></router-view>
      <My-Footer ></My-Footer>
    </div>
</template>
<style ></style>
<script>
  import NewHeader from "../Header/NewHeader"
  import MyFooter from "../Footer/Footer"
    export default {
        components: {NewHeader,MyFooter},
        name: "ShopCar",
        data: function () {
            return {

            }
        }
    }
  </script>
