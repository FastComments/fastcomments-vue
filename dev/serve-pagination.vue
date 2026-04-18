<script lang="ts">
import Vue from 'vue';
import FastComments from '@/fastcomments-vue.vue';
import { injectShowcaseCSS } from './_showcase-styles';
import { themeState, setTheme, initTheme, type Theme } from './_theme';

export default Vue.extend({
  name: 'ServePagination',
  components: { FastComments },
  methods: {
    updatePage(pageNumber: number) {
      this.$router.push('/demo#page-' + pageNumber);
      this.page = pageNumber;
    },
    setTheme(t: Theme) { setTheme(t); },
    copyCode() {
      navigator.clipboard.writeText(this.snippet as string).then(() => {
        this.copied = true;
        setTimeout(() => { this.copied = false; }, 1200);
      }).catch(() => {});
    }
  },
  data() {
    return { page: 0, url: window.location.href, themeState, copied: false };
  },
  computed: {
    isDark(): boolean { return this.themeState.value === 'dark'; },
    fcConfig(): { tenantId: string; urlId: string; url: string; hasDarkBackground: boolean } {
      return { tenantId: 'nYrnfYEv', urlId: this.url, url: this.url, hasDarkBackground: this.isDark };
    },
    snippet(): string {
      return `<script lang="ts">
import Vue from 'vue';
import { FastComments } from 'fastcomments-vue';

export default Vue.extend({
  components: { FastComments },
  data() { return { page: 0 }; },
  computed: {
    config() {
      return { tenantId: 'demo', urlId: \`product-\${this.page}\` };
    }
  },
  methods: {
    paginate(dir: number) { this.page += dir; }
  }
});
<\/script>

<template>
  <div>
    <button @click="paginate(-1)">Prev</button>
    <button @click="paginate(1)">Next</button>
    <fast-comments :config="config" />
  </div>
</template>`;
    }
  },
  watch: {
    $route() { this.url = window.location.href; }
  },
  mounted() { injectShowcaseCSS(); initTheme(); }
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
        <div><code>npm run serve-pagination</code></div>
        <a href="https://fastcomments.com" rel="noopener">fastcomments.com &nearr;</a>
      </footer>
    </aside>

    <main class="fc-stage">
      <div class="fc-demo">
        <header class="fc-demo__head">
          <div>
            <div class="fc-demo__breadcrumb">Flows <em>/ Thread Pagination</em></div>
            <h1 class="fc-demo__title">Thread Pagination</h1>
            <p class="fc-demo__subtitle">Swap the widget&rsquo;s <code style="font-family: var(--fc-mono); color: var(--fc-ink);">urlId</code>
              at runtime to jump between products, posts, or pages. Threads provision lazily. No pre-creation
              needed.</p>
          </div>
          <div class="fc-demo__actions">
            <span class="fc-tag fc-tag--brand">Page · {{ page }}</span>
          </div>
        </header>
        <div class="fc-stage__panel" style="padding: 20px;">
          <div style="display: flex; align-items: center; gap: 10px; padding-bottom: 14px; box-shadow: inset 0 -1px 0 0 var(--fc-border); margin-bottom: 20px;">
            <button class="fc-btn" @click="updatePage(page - 1)">← prev</button>
            <button class="fc-btn fc-btn--primary" @click="updatePage(page + 1)">next →</button>
            <div style="font-family: var(--fc-mono); font-size: 13px; color: var(--fc-ink-dim); margin-left: auto;">
              <span style="color: var(--fc-ink-mute);">page</span> <span style="color: var(--fc-ink);">{{ page }}</span>
            </div>
          </div>
          <div class="fc-stage__panel fc-stage__panel--light" style="padding: 20px;">
            <fast-comments v-bind:config="fcConfig" />
          </div>
        </div>

        <div class="fc-code-panel">
          <div class="fc-code-panel__head">
            <span class="fc-code-panel__head-label">serve-pagination.vue</span>
            <button type="button" class="fc-code-panel__copy" @click="copyCode">{{ copied ? 'Copied' : 'Copy' }}</button>
          </div>
          <pre class="fc-code-panel__body">{{ snippet }}</pre>
        </div>
      </div>
    </main>
  </div>
</template>
