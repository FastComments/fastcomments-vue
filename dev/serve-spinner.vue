<script lang="ts">
import Vue from 'vue';
import FastComments from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    FastComments
  },
  data() {
    return {
      showSpinner: true
    }
  },
  computed: {
    fastCommentsConfig() {
      return {
        tenantId: 'demo',
        urlId: 'test',
        onRender: () => { this.showSpinner = false }
      }
    }
  }
});

</script>

<template>
  <div id="app">
    <div v-if="showSpinner">
      Spinner here...
    </div>
    <fast-comments v-bind:config="fastCommentsConfig"/>
  </div>
</template>
