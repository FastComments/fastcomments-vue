<script lang="ts">
import Vue from 'vue';
import FastcommentsVue from '@/fastcomments-vue.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    FastcommentsVue
  }
});
</script>

<template>
  <div id="app">
    <fastcomments-vue v-bind:config="{tenantId: 'demo'}" />
  </div>
</template>
