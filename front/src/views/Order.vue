<template>
  <div class="container" v-if="this.getOrder.length">
    <div class="form">
      <b-form>
        <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            placeholder="Enter name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Your Surename:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.surename"
            placeholder="Enter surename"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label="Your phone:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="form.phone"
            placeholder="Enter phone"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-4"
          label="Your address:"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="form.address"
            placeholder="Enter address"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
    </div>
    <div class="orderContainer">
      <div class="order" v-for="order in getOrder" :key="order.id">
        <div class="orderName">
          Product: <b>{{ order.name }}</b>
        </div>
        <div class="orderCost">
          Cost: <b>{{ order.price }}</b>
        </div>
        <div class="orderValue">
          Value: <b>{{ order.value }}</b>
        </div>
        <button @click="minusProduct(order)">-</button>
        <button @click="addProduct(order)">+</button>
      </div>
      <div class="total">
        TOTAL PRICE: <b>{{ total }}</b>
      </div>
      <button @click="submitOrder()">SUBMIT</button>
    </div>
  </div>
  <div v-else>The order is empty</div>
</template>

<script>
// @ is an alias to /src
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "Order",
  data() {
    return {
      form: {
        name: "",
        surename: "",
        phome: "",
        address: "",
      },
      total: null,
    };
  },
  mounted() {
    this.totalPrice(this.getOrder);
  },
  methods: {
    ...mapMutations({
      clearOrder: "clearOrder",
    }),
    addProduct(order) {
      console.log(order);
      order.value++;
      this.totalPrice(this.getOrder);
    },
    minusProduct(order) {
      if (order.value <= 0) {
        this.totalPrice(this.getOrder);

        alert("The product cannot be negative");
        return;
      }
      order.value--;
      console.log(order);

      this.totalPrice(this.getOrder);
    },
    totalPrice(order) {
      let totalCost = 0;

      for (var i = 0; i < order.length; i++) {
        let item = order[i];
        let itemCost = item.price * item.value;
        totalCost += itemCost;
      }
      this.total = totalCost.toFixed(2);
      console.log(this.total);
    },
  },
  computed: {
    async submitOrder() {
      const customer = {
        name: this.form.name,
        surename: this.form.surename,
        phome: this.form.phome,
        address: this.form.address,
      };
      const order = Object.assign(
        {},
        { ...this.getOrder, total: this.total, customer }
      );
      console.log(order);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      };
      try {
        const response = await fetch(
          "http://localhost:5000/order",
          requestOptions
        );
        console.log(this.getOrder);
        alert("Order accepted");
        this.form = {
          name: "",
          surename: "",
          phome: "",
          address: "",
        };
      } catch (error) {
        console.log(error);
      }
    },

    ...mapGetters({
      getOrder: "getOrder",
    }),
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-evenly;
}
</style>
