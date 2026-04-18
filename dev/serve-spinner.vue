<script lang="ts">
import Vue from 'vue';
import FastComments from '@/entry';
import { injectShowcaseCSS } from './_showcase-styles';
import { themeState, setTheme, initTheme, type Theme } from './_theme';

export default Vue.extend({
  name: 'ServeSpinner',
  components: { FastComments },
  data() {
    return { showSpinner: true, themeState, copied: false };
  },
  computed: {
    isDark(): boolean { return this.themeState.value === 'dark'; },
    fastCommentsConfig() {
      return {
        tenantId: 'demo',
        urlId: 'test',
        hasDarkBackground: this.isDark,
        onRender: () => { this.showSpinner = false; }
      };
    },
    snippet(): string {
      return `<script lang="ts">
import Vue from 'vue';
import { FastComments } from 'fastcomments-vue';

export default Vue.extend({
  components: { FastComments },
  data() { return { showSpinner: true }; },
  computed: {
    config() {
      return {
        tenantId: 'demo',
        urlId: 'test',
        onRender: () => { this.showSpinner = false; }
      };
    }
  }
});
<\/script>

<template>
  <div>
    <div v-if="showSpinner">Loading…</div>
    <fast-comments :config="config" />
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
        <div><code>npm run serve-spinner</code></div>
        <a href="https://fastcomments.com" rel="noopener">fastcomments.com &nearr;</a>
      </footer>
    </aside>

    <main class="fc-stage">
      <div class="fc-demo">
        <header class="fc-demo__head">
          <div>
            <div class="fc-demo__breadcrumb">Flows <em>/ Loading Spinner</em></div>
            <h1 class="fc-demo__title">Custom Loading Spinner</h1>
            <p class="fc-demo__subtitle">Render your own loading state until the widget fires
              <code style="font-family: var(--fc-mono); color: var(--fc-ink);">onRender</code>. The spinner disappears
              as soon as the first render completes.</p>
          </div>
          <div class="fc-demo__actions">
            <span class="fc-tag fc-tag--brand">Spinner · {{ showSpinner ? 'visible' : 'hidden' }}</span>
          </div>
        </header>
        <div class="fc-stage__panel">
          <div v-if="showSpinner" style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 1px dashed var(--fc-border); border-radius: 12px; margin-bottom: 18px;">
            <span style="width: 16px; height: 16px; border: 2px solid rgba(132, 83, 237, 0.3); border-top-color: #8453ed; border-radius: 50%; display: inline-block; animation: fc-spin 0.8s linear infinite;"></span>
            <span style="font-family: var(--fc-mono); font-size: 12px; color: var(--fc-ink-dim); letter-spacing: 0.18em; text-transform: uppercase;">Loading widget…</span>
          </div>
          <div class="fc-stage__panel fc-stage__panel--light" style="padding: 20px;">
            <fast-comments v-bind:config="fastCommentsConfig" />
          </div>
        </div>

        <div class="fc-code-panel">
          <div class="fc-code-panel__head">
            <span class="fc-code-panel__head-label">serve-spinner.vue</span>
            <button type="button" class="fc-code-panel__copy" @click="copyCode">{{ copied ? 'Copied' : 'Copy' }}</button>
          </div>
          <pre class="fc-code-panel__body">{{ snippet }}</pre>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
@keyframes fc-spin { to { transform: rotate(360deg); } }
</style>
