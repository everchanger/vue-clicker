<template>
   <div class="sm:m-4 mb-4 font-normal text-sm border border-grey-light bg-purple-lightest rounded p-2 shadow w-full sm:w-2/5">
      <div class="flex justify-between">
         <button
            :disabled="!canCollect"
            :title="amountOwned == 0 ? 'Can\'t use until bought at least one of ' + name : 'Collect'"
            class="btn collect-btn"
            @click="start"
         >
            <font-awesome-icon class="text-4xl mb-2" :icon="icon"></font-awesome-icon> {{ amountOwned }}
         </button>
         <div class="w-3/4">
            <div class="flex justify-between">
               <div class="m-2">
                  <h3 class="text-xs font-bold text-grey-darker mb-1">{{ name }}</h3>
                  <p class="text-grey-darker">Profit ${{ profit }}</p>
                  <p class="text-grey-darker">{{ timeToGenerate / 1000 }} seconds</p>
               </div>
               <div class="m-2">
                  <button
                     class="btn"
                     :class="{'manager-hired': hasManager}"
                     :disabled="hasManager || !canHireManager"
                     :title="hasManager ? 'Manager hard at work!' : 'Hire manager for $' + this.managerPrice"
                     @click="hireManager()"
                  >
                     <font-awesome-icon class="text-2xl" icon="user-tie"></font-awesome-icon>
                  </button>
               </div>
            </div>
            <div class="m-2">
               <div class="border h-8 bg-orange-lightest">
                  <div class="bg-green-lighter h-full" :style="{'width': current + '%'}" />
               </div>
            </div>
            <div class="m-2">
               <button class="btn" :title="price(1)" :disabled="!canBuy(1)" @click="buy(1)">Buy one</button>
               <button class="btn" :title="price(10)" :disabled="!canBuy(10)" @click="buy(10)">10</button>
               <button class="btn" :title="price(25)" :disabled="!canBuy(25)" @click="buy(25)">25</button>
               <button class="btn" :title="price(100)" :disabled="!canBuy(100)" @click="buy(100)">100</button>
               <button class="btn" :title="price(maxAmountCanBuy)" :disabled="maxAmountCanBuy <= 0 || !canBuy(maxAmountCanBuy)" @click="buy(maxAmountCanBuy)">{{maxAmountCanBuy <= 0 ? 'None' : maxAmountCanBuy}}</button>
            </div>
         </div>
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
      startAmount: {
         default: 0,
         Number,
      },
      startCost: {
         default: 10,
         type: Number,
      },
      startProfit: {
         default: 1,
         type: Number,
      },
      managerPrice: {
         default: 100,
         type: Number,
      },
      timeToGenerate: {
         default: 1000,
         type: Number,
      },
      icon: {
         default: 'times',
         type: String,
      }
   },
   data: function () {
      return {
         hasManager: false,
         inProgress: false,
         interval: 10,
         current: 0,
         amountOwned: this.startAmount,
         costModifierOnBuy: 0.00,
         costModifier: 1,
      };
   },
   methods: {
      ...mapActions([
         'addCash',
         'subtractCash',
      ]),
      hireManager() {
         if (! this.canHireManager) {
            return;
         }
         this.hasManager = true;
         this.subtractCash(this.managerPrice);

         if (!this.inProgress) {
            this.start();
         }
      },
      canBuy(amount) {
         return this.cash >= this.price(amount);
      },
      buy(amount) {
         if (!this.canBuy(amount)) {
            return;
         }

         this.amountOwned += amount;
         for(let i = 0; i < amount; ++i) {
            this.subtractCash(this.price(1));
            this.costModifier += this.costModifierOnBuy;
         }
      },
      price(amount) {
         let price = 0;
         let currentCost = this.cost;
         for(let i = 0; i < amount; ++i) {
            price += currentCost;
         }
         return price.toFixed(2);
      },
      updateProgress() {
         const fraction = (this.interval / (this.timeToGenerate)) * 100;
         this.current += fraction;
         if(this.current > 100) {
            this.addCash(this.profit);
            this.inProgress = false;
            this.current = 0;

            if (this.hasManager) {
               this.start();
            }
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
      canHireManager() {
         return (this.cash >= this.managerPrice) && this.canCollect;
      },
      canCollect() {
         return this.amountOwned > 0 && !this.inProgress && !this.hasManager;
      },
      maxAmountCanBuy() {
         const maxAmountToBuy = 1000;
         for(let i = 0; i < maxAmountToBuy; i++) {
            if(!this.canBuy(i)) {
               return i - 1;
            }
         }
      },
      profit() {
         return this.startProfit * (this.amountOwned ? this.amountOwned : 1);
      },
      cost() {
         return this.startCost * this.costModifier;
      },
    },
}
</script>

<style lang="sass" scoped>
   
</style>
