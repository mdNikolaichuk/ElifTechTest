<template>
  <div class="container">
    <div class="item" v-for="shop in getShop" :key="shop.id">
      <b-card
    
        :title=shop.name
       
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
      <img  
      :src=shop.image
        alt="Image"
        img-top>
        <b-card-text>
          {{ shop.description }}
        </b-card-text>
        <b-card-text>
          {{ shop.price }}$
        </b-card-text>

        <b-button href="#" variant="primary" @click="addOrder(shop)">Add to order</b-button>
      </b-card>
    </div>

  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Shops",
  methods: {

    ...mapMutations({
      addOrder: 'setToOrder'
    }),
    ...mapActions({
      shops: "fetchShops",
    }),
  },
  computed: {
    ...mapGetters({
      getShop: "getShops",
    }),
  },
  mounted() {
    this.shops();
  },
};
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-evenly;
}
img{
  width:240px;
  height: 320px;
}
.item{
  flex: 300px 0 0;}
</style>
