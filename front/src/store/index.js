import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    orderList: [],
    shopList: null,
  },
  getters: {
    getShops(state) {
      return state.shopList;
    },
    getOrder(state) {
      return state.orderList;
    },
  },
  mutations: {
    setShops(state, payload) {
      Vue.set(state, "shopList", payload);
    },
    setToOrder(state, payload) {
      const orderctx = this.getters.getOrder;
      let order = {
        id: payload.id,
        name: payload.name,
        image: payload.image,
        price: payload.price,
        value: 1,
      };
    
      if (!orderctx.length) {
        state.orderList.push(order);
        return;
      }
      console.log(orderctx);
      for (var i = 0; i < orderctx.length; i++) {
        if (orderctx[i].id === order.id) {
          orderctx[i].value += 1;
          return;
        }
      }
      
      state.orderList.push(order);
    },

  },
  actions: {
    async fetchShops(context) {
      await fetch("http://localhost:5000/shops")
        .then((data) => data.json())
        .then((data) => context.commit("setShops", data))
        .catch((e) => console.log(e));
    },

  },
});
