<script lang="ts">
import Vue from 'vue';
import FastComments from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    FastComments
  }
});
</script>

<template>
  <div id="app">
    <fast-comments v-bind:config="{tenantId: 'demo'}" />
  </div>
</template>
