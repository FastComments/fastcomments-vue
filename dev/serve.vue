<script lang="ts">
import Vue from 'vue';
import { FastComments, FastCommentsCollabChat, FastCommentsCommentCount, FastCommentsImageChat, FastCommentsLiveChat, FastCommentsReviewsSummary, FastCommentsUserActivityFeed } from '@/entry';
import { injectShowcaseCSS } from './_showcase-styles';
import { themeState, setTheme, initTheme, type Theme } from './_theme';

type ViewKey = 'comments' | 'comment-count' | 'live-chat' | 'collab-chat' | 'image-chat' | 'reviews-summary' | 'user-activity-feed' | 'pagination' | 'dark-mode';

interface ViewMeta {
  key: ViewKey;
  label: string;
  kind: 'widget' | 'flow';
  hint: string;
  breadcrumb: string;
  subtitle: string;
  script: string;
}

const VIEWS: ViewMeta[] = [
  {
    key: 'comments',
    label: 'Live Comment Widget',
    kind: 'widget',
    hint: 'Full live commenting widget',
    breadcrumb: 'Widgets / Live Comment Widget',
    subtitle: 'The flagship live commenting widget against the demo tenant. Replies, voting, moderation, and realtime sync come bundled.',
    script: 'npm run serve'
  },
  {
    key: 'comment-count',
    label: 'Comment Count',
    kind: 'widget',
    hint: 'Inline count badge',
    breadcrumb: 'Widgets / Comment Count',
    subtitle: 'A low-weight count badge you can drop inline with any list item, card, or document link. Stays live as new comments come in.',
    script: 'serve.vue · comment-count'
  },
  {
    key: 'live-chat',
    label: 'Live Chat',
    kind: 'widget',
    hint: 'Realtime streaming chat',
    breadcrumb: 'Widgets / Live Chat',
    subtitle: 'The streaming variant. Tuned for live events, launches, and broadcasts where conversation volume would overwhelm a conventional threaded view.',
    script: 'npm run serve-live-chat'
  },
  {
    key: 'collab-chat',
    label: 'Collab Chat',
    kind: 'widget',
    hint: 'Anchor threads to text selections',
    breadcrumb: 'Widgets / Collab Chat',
    subtitle: 'Anchor discussion threads to specific text selections. Highlight any passage of the sample document below to attach a comment pinned to that excerpt.',
    script: 'npm run serve-collab-chat'
  },
  {
    key: 'image-chat',
    label: 'Image Chat',
    kind: 'widget',
    hint: 'Region comments on images',
    breadcrumb: 'Widgets / Image Chat',
    subtitle: 'Drag to select any region of the image. A threaded discussion gets pinned to the exact region. Ideal for design reviews, bug triage, and creative collaboration.',
    script: 'npm run serve-image-chat'
  },
  {
    key: 'reviews-summary',
    label: 'Reviews Summary',
    kind: 'widget',
    hint: 'Star ratings overview',
    breadcrumb: 'Widgets / Reviews Summary',
    subtitle: 'A compact star-rating aggregate with per-rating breakdown. Drops into product pages, listing previews, and marketing components wherever aggregate sentiment beats individual comments.',
    script: 'serve.vue · reviews-summary'
  },
  {
    key: 'user-activity-feed',
    label: 'Activity Feed',
    kind: 'widget',
    hint: 'Per-user timeline',
    breadcrumb: 'Widgets / Activity Feed',
    subtitle: 'A chronological stream of a single user\u2019s comments and interactions. Perfect for profile pages, moderation views, and reputation dashboards.',
    script: 'serve.vue · user-activity-feed'
  },
  {
    key: 'pagination',
    label: 'Thread Pagination',
    kind: 'flow',
    hint: 'Swap urlId at runtime',
    breadcrumb: 'Flows / Thread Pagination',
    subtitle: 'Swap the widget\u2019s urlId at runtime to jump between products, posts, or pages. Threads provision lazily. No pre-creation needed.',
    script: 'npm run serve-pagination'
  },
  {
    key: 'dark-mode',
    label: 'Dark Mode',
    kind: 'flow',
    hint: 'Runtime theme switching',
    breadcrumb: 'Flows / Dark Mode',
    subtitle: 'Toggle the widget theme at runtime. The widget responds to hasDarkBackground and re-renders immediately.',
    script: 'npm run serve-toggle-dark-mode'
  }
];

const SNIPPETS: Record<ViewKey, string> = {
  comments: `<script lang="ts">
import Vue from 'vue';
import { FastComments } from 'fastcomments-vue';

export default Vue.extend({
  components: { FastComments }
});
<\/script>

<template>
  <fast-comments :config="{ tenantId: 'demo' }" />
</template>`,
  'comment-count': `<script lang="ts">
import Vue from 'vue';
import { FastCommentsCommentCount } from 'fastcomments-vue';

export default Vue.extend({
  components: { FastCommentsCommentCount }
});
<\/script>

<template>
  Comments:
  <fast-comments-comment-count :config="{ tenantId: 'demo', urlId: 'my-page' }" />
</template>`,
  'live-chat': `<script lang="ts">
import Vue from 'vue';
import { FastCommentsLiveChat } from 'fastcomments-vue';

export default Vue.extend({
  components: { FastCommentsLiveChat }
});
<\/script>

<template>
  <fast-comments-live-chat :config="{ tenantId: 'demo' }" />
</template>`,
  'collab-chat': `<script lang="ts">
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
</template>`,
  'image-chat': `<script lang="ts">
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
</template>`,
  'reviews-summary': `<script lang="ts">
import Vue from 'vue';
import { FastCommentsReviewsSummary } from 'fastcomments-vue';

export default Vue.extend({
  components: { FastCommentsReviewsSummary }
});
<\/script>

<template>
  <fast-comments-reviews-summary :config="{ tenantId: 'demo', urlId: 'demo-ratings' }" />
</template>`,
  'user-activity-feed': `<script lang="ts">
import Vue from 'vue';
import { FastCommentsUserActivityFeed } from 'fastcomments-vue';

// SSO userId format: \\\`\\\${tenantId}:\\\${appUserId}\\\`
export default Vue.extend({
  components: { FastCommentsUserActivityFeed }
});
<\/script>

<template>
  <fast-comments-user-activity-feed
    :config="{ tenantId: 'demo', userId: 'demo:someone@somewhere.com' }"
  />
</template>`,
  pagination: `<script lang="ts">
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
</template>`,
  'dark-mode': `<script lang="ts">
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
</template>`
};

export default Vue.extend({
  name: 'ServeDev',
  components: { FastComments, FastCommentsCollabChat, FastCommentsCommentCount, FastCommentsImageChat, FastCommentsLiveChat, FastCommentsReviewsSummary, FastCommentsUserActivityFeed },
  data() {
    return {
      themeState,
      copied: false,
      selected: 'comments' as ViewKey,
      views: VIEWS,
      page: 0,
      localDark: themeState.value === 'dark',
      collabTargetEl: null as Element | null,
      imageTargetEl: null as Element | null
    };
  },
  computed: {
    isDark(): boolean { return this.themeState.value === 'dark'; },
    widgets(): ViewMeta[] { return this.views.filter((v) => v.kind === 'widget'); },
    flows(): ViewMeta[] { return this.views.filter((v) => v.kind === 'flow'); },
    current(): ViewMeta { return this.views.find((v) => v.key === this.selected) || this.views[0]; },
    baseConfig(): { tenantId: string; hasDarkBackground: boolean } {
      return { tenantId: 'demo', hasDarkBackground: this.isDark };
    },
    commentCountConfig(): { tenantId: string; urlId: string; hasDarkBackground: boolean } {
      return { tenantId: 'demo', urlId: 'vue-demo-count', hasDarkBackground: this.isDark };
    },
    reviewsSummaryConfig(): { tenantId: string; urlId: string; hasDarkBackground: boolean } {
      return { tenantId: 'demo', urlId: 'demo-ratings', hasDarkBackground: this.isDark };
    },
    userActivityFeedConfig(): { tenantId: string; userId: string; hasDarkBackground: boolean } {
      return { tenantId: 'demo', userId: 'demo:someone@somewhere.com', hasDarkBackground: this.isDark };
    },
    paginatedConfig(): { tenantId: string; urlId: string; hasDarkBackground: boolean } {
      return { tenantId: 'demo', urlId: `vue-product-${this.page}`, hasDarkBackground: this.isDark };
    },
    darkModeConfig(): { tenantId: string; hasDarkBackground: boolean } {
      return { tenantId: 'demo', hasDarkBackground: this.localDark };
    },
    snippet(): string { return SNIPPETS[this.selected]; }
  },
  methods: {
    setTheme(t: Theme) { setTheme(t); },
    select(key: ViewKey) {
      this.selected = key;
      this.$nextTick(() => {
        if (key === 'collab-chat') this.collabTargetEl = this.$refs.collabTarget as Element;
        if (key === 'image-chat') this.imageTargetEl = this.$refs.imageTarget as Element;
      });
    },
    paginate(dir: number) { this.page += dir; },
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

      <nav class="fc-nav" aria-label="Examples">
        <div class="fc-nav__group">
          <div class="fc-nav__heading"><span>01</span><em>Widgets</em></div>
          <a v-for="item in widgets"
             :key="item.key"
             href="javascript:void(0)"
             class="fc-nav__item"
             :class="{ 'is-active': selected === item.key }"
             @click="select(item.key)">
            <span class="fc-nav__item-label">{{ item.label }}</span>
            <span class="fc-nav__item-hint">{{ item.hint }}</span>
          </a>
        </div>

        <div class="fc-nav__group">
          <div class="fc-nav__heading"><span>02</span><em>Flows &amp; configuration</em></div>
          <a v-for="item in flows"
             :key="item.key"
             href="javascript:void(0)"
             class="fc-nav__item"
             :class="{ 'is-active': selected === item.key }"
             @click="select(item.key)">
            <span class="fc-nav__item-label">{{ item.label }}</span>
            <span class="fc-nav__item-hint">{{ item.hint }}</span>
          </a>
        </div>
      </nav>

      <footer class="fc-rail__foot">
        <div class="fc-theme-toggle" role="group" aria-label="Theme">
          <button type="button" class="fc-theme-toggle__btn" :class="{ 'is-active': themeState.value === 'light' }" @click="setTheme('light')">Light</button>
          <button type="button" class="fc-theme-toggle__btn" :class="{ 'is-active': themeState.value === 'dark' }" @click="setTheme('dark')">Dark</button>
        </div>
        <div><code>npm i fastcomments-vue</code></div>
        <a href="https://fastcomments.com" rel="noopener">fastcomments.com &nearr;</a>
      </footer>
    </aside>

    <main class="fc-stage">
      <div class="fc-demo">
        <header class="fc-demo__head">
          <div>
            <div class="fc-demo__breadcrumb">{{ current.breadcrumb.split(' / ')[0] }} <em>/ {{ current.breadcrumb.split(' / ')[1] }}</em></div>
            <h1 class="fc-demo__title">{{ current.label }}</h1>
            <p class="fc-demo__subtitle">{{ current.subtitle }}</p>
          </div>
          <div class="fc-demo__actions">
            <span class="fc-tag fc-tag--brand">Tenant · demo</span>
            <span v-if="selected === 'pagination'" class="fc-tag">Page · {{ page }}</span>
            <span v-if="selected === 'dark-mode'" class="fc-tag">Active · {{ localDark ? 'dark' : 'light' }}</span>
          </div>
        </header>

        <div v-if="selected === 'comments'" class="fc-stage__panel fc-stage__panel--light">
          <fast-comments :config="baseConfig" />
        </div>

        <div v-else-if="selected === 'comment-count'" class="fc-stage__panel fc-stage__panel--light">
          <div style="font-family: var(--fc-mono); font-size: 14px; color: var(--fc-ink);">
            Comments:
            <fast-comments-comment-count :config="commentCountConfig" />
          </div>
        </div>

        <div v-else-if="selected === 'live-chat'" class="fc-stage__panel fc-stage__panel--light">
          <fast-comments-live-chat :config="baseConfig" />
        </div>

        <div v-else-if="selected === 'collab-chat'" class="fc-stage__panel fc-stage__panel--light">
          <div
            ref="collabTarget"
            style="font-family: Georgia, serif; font-size: 17px; line-height: 1.7; color: #1e1e1e; max-width: 64ch; margin: 0 auto 32px;"
          >
            Highlight any passage of this sample document to anchor a thread to the selection. Collab Chat pins the
            conversation to the exact text so reviewers share context when they reply.
          </div>
          <fast-comments-collab-chat :config="baseConfig" :target-ref="collabTargetEl" />
        </div>

        <div v-else-if="selected === 'image-chat'" class="fc-stage__panel fc-stage__panel--light">
          <img
            ref="imageTarget"
            src="https://fastcomments.com/images/image-chat-demo-1.jpg"
            alt="Demo Image"
            style="max-width: 100%; border-radius: 12px; display: block; margin: 0 auto 20px;"
          />
          <fast-comments-image-chat :config="baseConfig" :target-ref="imageTargetEl" />
        </div>

        <div v-else-if="selected === 'reviews-summary'" class="fc-stage__panel fc-stage__panel--light">
          <fast-comments-reviews-summary :config="reviewsSummaryConfig" />
        </div>

        <div v-else-if="selected === 'user-activity-feed'" class="fc-stage__panel fc-stage__panel--light">
          <fast-comments-user-activity-feed :config="userActivityFeedConfig" />
        </div>

        <div v-else-if="selected === 'pagination'" class="fc-stage__panel" style="padding: 20px;">
          <div style="display: flex; align-items: center; gap: 10px; padding-bottom: 14px; box-shadow: inset 0 -1px 0 0 var(--fc-border); margin-bottom: 20px;">
            <button class="fc-btn" @click="paginate(-1)">← prev</button>
            <button class="fc-btn fc-btn--primary" @click="paginate(1)">next →</button>
            <div style="font-family: var(--fc-mono); font-size: 13px; color: var(--fc-ink-dim); margin-left: auto;">
              <span style="color: var(--fc-ink-mute);">page</span> <span style="color: var(--fc-ink);">{{ page }}</span>
            </div>
          </div>
          <div class="fc-stage__panel fc-stage__panel--light" style="padding: 20px;">
            <fast-comments :config="paginatedConfig" />
          </div>
        </div>

        <div v-else-if="selected === 'dark-mode'" class="fc-stage__panel" style="padding: 20px;">
          <div style="display: flex; gap: 10px; padding-bottom: 16px; box-shadow: inset 0 -1px 0 0 var(--fc-border); margin-bottom: 20px;">
            <button class="fc-btn" :class="{ 'fc-btn--primary': !localDark }" @click="localDark = false">Light</button>
            <button class="fc-btn" :class="{ 'fc-btn--primary': localDark }" @click="localDark = true">Dark</button>
          </div>
          <div :style="{ padding: '24px', borderRadius: '12px', transition: 'background 250ms ease, color 250ms ease', background: localDark ? '#0b0b0b' : '#ffffff', color: localDark ? '#fff' : '#111' }">
            <fast-comments :config="darkModeConfig" />
          </div>
        </div>

        <div class="fc-code-panel">
          <div class="fc-code-panel__head">
            <span class="fc-code-panel__head-label">{{ current.script }}</span>
            <button type="button" class="fc-code-panel__copy" @click="copyCode">{{ copied ? 'Copied' : 'Copy' }}</button>
          </div>
          <pre class="fc-code-panel__body">{{ snippet }}</pre>
        </div>
      </div>
    </main>
  </div>
</template>
