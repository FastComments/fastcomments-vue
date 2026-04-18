<script lang="ts">
import Vue from 'vue';
import FastComments from '@/fastcomments-vue.vue';
import { injectShowcaseCSS } from './_showcase-styles';
import { themeState, setTheme, initTheme, type Theme } from './_theme';

export default Vue.extend({
  name: 'ServeDarkModeToggle',
  components: { FastComments },
  data() {
    return { isDarkMode: true, themeState, copied: false };
  },
  computed: {
    snippet(): string {
      return `<script lang="ts">
import Vue from 'vue';
import { FastComments } from 'fastcomments-vue';

export default Vue.extend({
  components: { FastComments },
  data() { return { isDark: false }; },
  computed: {
    config() {
      return { tenantId: 'demo', hasDarkBackground: this.isDark };
    }
  }
});
<\/script>

<template>
  <div>
    <button @click="isDark = false">Light</button>
    <button @click="isDark = true">Dark</button>
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
  mounted() { injectShowcaseCSS(); initTheme(); this.isDarkMode = themeState.value === 'dark'; }
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
        <div><code>npm run serve-toggle-dark-mode</code></div>
        <a href="https://fastcomments.com" rel="noopener">fastcomments.com &nearr;</a>
      </footer>
    </aside>

    <main class="fc-stage">
      <div class="fc-demo">
        <header class="fc-demo__head">
          <div>
            <div class="fc-demo__breadcrumb">Flows <em>/ Dark Mode</em></div>
            <h1 class="fc-demo__title">Dark Mode</h1>
            <p class="fc-demo__subtitle">Toggle the widget theme at runtime. The widget responds to
              <code style="font-family: var(--fc-mono); color: var(--fc-ink);">hasDarkBackground</code>
              and re-renders immediately.</p>
          </div>
          <div class="fc-demo__actions">
            <span class="fc-tag fc-tag--brand">Active · {{ isDarkMode ? 'dark' : 'light' }}</span>
          </div>
        </header>
        <div class="fc-stage__panel" style="padding: 20px;">
          <div style="display: flex; gap: 10px; padding-bottom: 16px; box-shadow: inset 0 -1px 0 0 var(--fc-border); margin-bottom: 20px;">
            <button class="fc-btn" :class="{ 'fc-btn--primary': !isDarkMode }" @click="isDarkMode = false">Light</button>
            <button class="fc-btn" :class="{ 'fc-btn--primary': isDarkMode }" @click="isDarkMode = true">Dark</button>
          </div>
          <div :style="{ padding: '24px', borderRadius: '12px', transition: 'background 250ms ease, color 250ms ease', background: isDarkMode ? '#0b0b0b' : '#ffffff', color: isDarkMode ? '#fff' : '#111' }">
            <fast-comments v-bind:config="{tenantId: 'demo', hasDarkBackground: isDarkMode}" />
          </div>
        </div>

        <div class="fc-code-panel">
          <div class="fc-code-panel__head">
            <span class="fc-code-panel__head-label">serve-dark-mode-toggle.vue</span>
            <button type="button" class="fc-code-panel__copy" @click="copyCode">{{ copied ? 'Copied' : 'Copy' }}</button>
          </div>
          <pre class="fc-code-panel__body">{{ snippet }}</pre>
        </div>
      </div>
    </main>
  </div>
</template>
