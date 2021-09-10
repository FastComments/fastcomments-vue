<script lang="ts">
import Vue from 'vue';
import {FastCommentsCollabChat} from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    FastCommentsCollabChat
  },
  data() {
    return {
      fastCommentsCollabChatTarget: {}
    }
  },
  mounted() {
    this.fastCommentsCollabChatTarget = this.$refs.fastCommentsCollabChatTarget;
  }
});
</script>

<template>
  <div id="app">
    <div ref="fastCommentsCollabChatTarget">This is some text that will have collab chat enabled.</div>
    <fast-comments-collab-chat v-bind:config="{tenantId: 'demo'}" :target-ref="fastCommentsCollabChatTarget"/>
  </div>
</template>
