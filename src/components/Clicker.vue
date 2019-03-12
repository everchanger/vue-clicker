<template>
   <div class="mt-2 font-normal text-md border rounded p-2 w-1/2 shadow-md">
      <div class="m-2 flex justify-between">
         <div>
            <h3 class="text-xl font-bold text-grey-darker mb-1">{{ name }}</h3>
            <p class="text-grey-darker">Profit ${{ profit }}</p>
            <p class="text-grey-darker">{{ timeToGenerate / 1000 }} seconds</p>
         </div>
         <div>
            <span class="text-grey-darker font-bold">{{ amountOwned }} owned</span>
         </div>
      </div>
      <div class="m-2">
         <div class="border h-8 bg-green-lightest">
            <div class="bg-green h-full" :style="{'width': current + '%'}" />
         </div>
      </div>
      <div class="flex justify-between">
         <div>
            <button class="buy-btn" :title="price(1)" :disabled="!canBuy(1)" @click="buy(1)">Buy one</button>
            <button class="buy-btn" :title="price(10)" :disabled="!canBuy(10)" @click="buy(10)">10</button>
            <button class="buy-btn" :title="price(25)" :disabled="!canBuy(25)" @click="buy(25)">25</button>
            <button class="buy-btn" :title="price(100)" :disabled="!canBuy(100)" @click="buy(100)">100</button>
            <button class="buy-btn" :title="price(maxAmountCanBuy)" :disabled="maxAmountCanBuy <= 0 || !canBuy(maxAmountCanBuy)" @click="buy(maxAmountCanBuy)">{{maxAmountCanBuy <= 0 ? 'None' : maxAmountCanBuy}}</button>
         </div>
         <button class="buy-btn bg-purple-lighter" @click="start">Collect</button>
      </div>
   </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
   props: {
      name: {
         type: String,
         required: true,
      },
      startCost: {
         default: 10,
         type: Number,
      },
      startProfit: {
         default: 1,
         type: Number,
      },
      timeToGenerate: {
         default: 1000,
         type: Number,
      }
   },
   data: function () {
      return {
         inProgress: false,
         interval: 10,
         current: 0,
         amountOwned: 1,
         costModifierOnBuy: 0.01,
         costModifier: 1,
      };
   },
   methods: {
      ...mapActions([
         'addCash',
         'subtractCash',
      ]),
      canBuy(amount) {
         return this.cash >= this.price(amount);
      },
      buy(amount) {
         if (!this.canBuy(amount)) {
            return;
         }

         this.amountOwned += amount;
         this.subtractCash(this.price(amount));
         this.costModifier += this.costModifierOnBuy;
      },
      price(amount) {
         let price = 0;
         let currentCost = this.cost;
         let tempCostModifier = this.costModifier;
         for(let i = 0; i < amount; ++i) {
            currentCost = currentCost * tempCostModifier;
            price += currentCost;
            tempCostModifier += this.costModifierOnBuy;
         }
         return price;
      },
      updateProgress() {
         const fraction = (this.interval / (this.timeToGenerate)) * 100;
         this.current += fraction;
         if(this.current > 100) {
            this.addCash(this.profit);
            this.inProgress = false;
            this.current = 0;
         } else {
            setTimeout(this.updateProgress, this.interval);
         }
      },
      start() {
         if (this.inProgress) {
            return;
         }
         this.current = 0;
         this.inProgress = true;
         setTimeout(this.updateProgress, this.interval);
      },
   },
   computed: {
      ...mapGetters([
         'cash',
      ]),
      maxAmountCanBuy() {
         return parseInt(this.cash / this.cost);
      },
      profit() {
         return this.startProfit * this.amountOwned;
      },
      cost() {
         return this.startCost * this.costModifier;
      },
    },
}
</script>

<style lang="sass" scoped>
   
</style>
