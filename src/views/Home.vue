<template>
  <div class="home">
    <span class="text-lg text-grey-darker sm:m-4 p-2 border border-grey-light bg-purple-lightest shadow">Cash: ${{ cash }}</span>
    <div class="flex justify-center flex-col sm:flex-row flex-wrap sm:justify-start w-full mt-4">
      <Clicker name="Ice cream" :startAmount="1" :timeToGenerate="1000" icon="ice-cream"/>
      <Clicker name="Bacon" :timeToGenerate="2000" :startCost="50" :startProfit="25" :managerPrice="200" icon="bacon"/>
      <Clicker name="Coffee" :timeToGenerate="4000" :startCost="5000" :startProfit="50" :managerPrice="12000" icon="coffee"/>
      <Clicker name="Pizza" :timeToGenerate="8000" :startCost="25000" :startProfit="75" :managerPrice="80000" icon="pizza-slice"/>
      <Clicker name="Hamburger" :timeToGenerate="16000" :startCost="50000" :startProfit="100" :managerPrice="160000" icon="hamburger"/>
      <Clicker name="Cocktail" :timeToGenerate="32000" :startCost="100000" :startProfit="125" :managerPrice="275000" icon="cocktail"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Clicker from '@/components/Clicker.vue';
import { mapGetters } from 'vuex';

export default {
   name: 'home',
   components: {
      Clicker
   },
   computed: {
      ...mapGetters([
         'cash',
      ]),
   },
}
</script>
