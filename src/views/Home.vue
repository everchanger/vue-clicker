<template>
  <div class="home">
    <span class="text-grey-darkest text-lg p-2 border border-grey bg-grey-lighter">Cash: ${{ cash }}</span>
    <div class="flex justify-center flex-col sm:flex-row sm:justify-between w-full mt-8">
    <Clicker name="Ice cream" :startAmount="1" :timeToGenerate="1000" icon="ice-cream"/>
    <Clicker name="Bacon" :timeToGenerate="2000" :startCost="50" :startProfit="25" icon="bacon"/>
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
