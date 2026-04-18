<script lang="ts">
import Vue from 'vue';
import { FastCommentsImageChat } from '@/entry';
import { injectShowcaseCSS } from './_showcase-styles';
import { themeState, setTheme, initTheme, type Theme } from './_theme';

export default Vue.extend({
  name: 'ServeImageChat',
  components: { FastCommentsImageChat },
  data() {
    return { fastCommentsImageChatTarget: {} as Element | {}, themeState, copied: false };
  },
  computed: {
    isDark(): boolean { return this.themeState.value === 'dark'; },
    fcConfig(): { tenantId: string; hasDarkBackground: boolean } {
      return { tenantId: 'demo', hasDarkBackground: this.isDark };
    },
    snippet(): string {
      return `<script lang="ts">
import Vue from 'vue';
import { FastCommentsImageChat } from 'fastcomments-vue';

export default Vue.extend({
  components: { FastCommentsImageChat },
  data() { return { target: null as Element | null }; },
  mounted() { this.target = this.$refs.target as Element; }
});
<\/script>

<template>
  <div>
    <img ref="target" src="/demo.jpg" alt="" />
    <fast-comments-image-chat :config="{ tenantId: 'demo' }" :target-ref="target" />
  </div>
</template>`;
    }
  },
  methods: {
    setTheme(t: Theme) { setTheme(t); },
    copyCode() {
      navigator.clipboard.writeText(this.snippet as string).then(() => {
        this.copied = true;
        setTimeout(() => { this.copied = false; }, 1200);
      }).catch(() => {});
    }
  },
  mounted() {
    injectShowcaseCSS();
    initTheme();
    this.fastCommentsImageChatTarget = this.$refs.fastCommentsImageChatTarget as Element;
  }
});
</script>

<template>
  <div id="app" class="fc-shell">
    <aside class="fc-rail">
      <div class="fc-brand">
        <img class="fc-brand__logo fc-brand__logo--light" src="https://fastcomments.com/images/svg/v2/logo.svg" alt="FastComments" />
        <img class="fc-brand__logo fc-brand__logo--dark" src="https://fastcomments.com/images/svg/v2/logo_white.svg" alt="" aria-hidden="true" />
        <span class="fc-brand__wordmark">
          <span class="fc-brand__name">FastComments</span>
          <span class="fc-brand__slug">vue 2 · showcase</span>
        </span>
      </div>
      <footer class="fc-rail__foot">
        <div class="fc-theme-toggle" role="group" aria-label="Theme">
          <button type="button" class="fc-theme-toggle__btn" :class="{ 'is-active': themeState.value === 'light' }" @click="setTheme('light')">Light</button>
          <button type="button" class="fc-theme-toggle__btn" :class="{ 'is-active': themeState.value === 'dark' }" @click="setTheme('dark')">Dark</button>
        </div>
        <div><code>npm run serve-image-chat</code></div>
        <a href="https://fastcomments.com" rel="noopener">fastcomments.com &nearr;</a>
      </footer>
    </aside>

    <main class="fc-stage">
      <div class="fc-demo">
        <header class="fc-demo__head">
          <div>
            <div class="fc-demo__breadcrumb">Widgets <em>/ Image Chat</em></div>
            <h1 class="fc-demo__title">Image Chat</h1>
            <p class="fc-demo__subtitle">Drag to select any region of the image. A threaded discussion gets pinned
              to the exact region. Ideal for design reviews, bug triage, and creative collaboration.</p>
          </div>
          <div class="fc-demo__actions">
            <span class="fc-tag fc-tag--brand">Tenant · demo</span>
          </div>
        </header>
        <div class="fc-stage__panel fc-stage__panel--light">
          <img
            ref="fastCommentsImageChatTarget"
            src="https://fastcomments.com/images/image-chat-demo-1.jpg"
            alt="Demo Image"
            style="max-width: 100%; border-radius: 12px; display: block; margin: 0 auto 20px;"
          />
          <fast-comments-image-chat
            v-bind:config="fcConfig"
            :target-ref="fastCommentsImageChatTarget"
          />
        </div>

        <div class="fc-code-panel">
          <div class="fc-code-panel__head">
            <span class="fc-code-panel__head-label">serve-image-chat.vue</span>
            <button type="button" class="fc-code-panel__copy" @click="copyCode">{{ copied ? 'Copied' : 'Copy' }}</button>
          </div>
          <pre class="fc-code-panel__body">{{ snippet }}</pre>
        </div>
      </div>
    </main>
  </div>
</template>
