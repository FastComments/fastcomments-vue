<script lang="ts">
import Vue from 'vue';
import { FastCommentsCollabChat } from '@/entry';
import { injectShowcaseCSS } from './_showcase-styles';
import { themeState, setTheme, initTheme, type Theme } from './_theme';

export default Vue.extend({
  name: 'ServeCollabChat',
  components: { FastCommentsCollabChat },
  data() {
    return { fastCommentsCollabChatTarget: {} as Element | {}, themeState, copied: false };
  },
  computed: {
    isDark(): boolean { return this.themeState.value === 'dark'; },
    fcConfig(): { tenantId: string; hasDarkBackground: boolean } {
      return { tenantId: 'demo', hasDarkBackground: this.isDark };
    },
    snippet(): string {
      return `<script lang="ts">
import Vue from 'vue';
import { FastCommentsCollabChat } from 'fastcomments-vue';

export default Vue.extend({
  components: { FastCommentsCollabChat },
  data() { return { target: null as Element | null }; },
  mounted() { this.target = this.$refs.target as Element; }
});
<\/script>

<template>
  <div>
    <div ref="target">Highlight any passage to pin a discussion.</div>
    <fast-comments-collab-chat :config="{ tenantId: 'demo' }" :target-ref="target" />
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
    this.fastCommentsCollabChatTarget = this.$refs.fastCommentsCollabChatTarget as Element;
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
        <div><code>npm run serve-collab-chat</code></div>
        <a href="https://fastcomments.com" rel="noopener">fastcomments.com &nearr;</a>
      </footer>
    </aside>

    <main class="fc-stage">
      <div class="fc-demo">
        <header class="fc-demo__head">
          <div>
            <div class="fc-demo__breadcrumb">Widgets <em>/ Collab Chat</em></div>
            <h1 class="fc-demo__title">Collab Chat</h1>
            <p class="fc-demo__subtitle">Anchor discussion threads to specific text selections. Highlight any passage
              of the sample document below to attach a comment pinned to that excerpt.</p>
          </div>
          <div class="fc-demo__actions">
            <span class="fc-tag fc-tag--brand">Tenant · demo</span>
          </div>
        </header>
        <div class="fc-stage__panel fc-stage__panel--light">
          <div
            ref="fastCommentsCollabChatTarget"
            style="font-family: Georgia, serif; font-size: 17px; line-height: 1.7; color: #1e1e1e; max-width: 64ch; margin: 0 auto 32px;"
          >
            Highlight any passage of this sample document to anchor a thread to the selection. Collab Chat pins the
            conversation to the exact text so reviewers share context when they reply.
          </div>
          <fast-comments-collab-chat
            v-bind:config="fcConfig"
            :target-ref="fastCommentsCollabChatTarget"
          />
        </div>

        <div class="fc-code-panel">
          <div class="fc-code-panel__head">
            <span class="fc-code-panel__head-label">serve-collab-chat.vue</span>
            <button type="button" class="fc-code-panel__copy" @click="copyCode">{{ copied ? 'Copied' : 'Copy' }}</button>
          </div>
          <pre class="fc-code-panel__body">{{ snippet }}</pre>
        </div>
      </div>
    </main>
  </div>
</template>
