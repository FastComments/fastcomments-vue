<script lang="ts">
import Vue from 'vue';
import {FastCommentsImageChat} from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    FastCommentsImageChat
  },
  data() {
    return {
      fastCommentsImageChatTarget: {}
    }
  },
  mounted() {
    this.fastCommentsImageChatTarget = this.$refs.fastCommentsImageChatTarget;
  }
});
</script>

<template>
  <div id="app">
    <img ref="fastCommentsImageChatTarget" src="https://fastcomments.com/images/image-chat-demo-1.jpg" alt="Demo Image"/>
    <fast-comments-image-chat v-bind:config="{tenantId: 'demo'}" :target-ref="fastCommentsImageChatTarget" />
  </div>
</template>
