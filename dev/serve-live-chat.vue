<script lang="ts">
import Vue from 'vue';
import {FastCommentsLiveChat} from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    FastCommentsLiveChat
  }
});
</script>

<template>
  <div id="app">
    <fast-comments-live-chat v-bind:config="{tenantId: 'demo'}" />
  </div>
</template>
