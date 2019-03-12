<template>
  <div class="home">
    <span>Current Cash: {{ cash }}</span>
    <Clicker name="Worker"/>
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
