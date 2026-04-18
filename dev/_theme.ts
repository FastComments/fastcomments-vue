import Vue from 'vue';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'fc-showcase-theme';
const USER_SET_KEY = STORAGE_KEY + ':user-set';

function readInitial(): Theme {
  if (typeof document === 'undefined') return 'light';
  const fromAttr = document.documentElement.getAttribute('data-fc-theme');
  if (fromAttr === 'light' || fromAttr === 'dark') return fromAttr;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const initial = readInitial();
if (typeof document !== 'undefined') document.documentElement.setAttribute('data-fc-theme', initial);

export const themeState = Vue.observable({ value: initial });

export function applyTheme(next: Theme) {
  themeState.value = next;
  if (typeof document !== 'undefined') document.documentElement.setAttribute('data-fc-theme', next);
  if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, next);
}

export function setTheme(next: Theme) {
  if (typeof window !== 'undefined') window.localStorage.setItem(USER_SET_KEY, '1');
  applyTheme(next);
}

export function initTheme() {
  applyTheme(themeState.value);
  if (typeof window !== 'undefined') {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    mq?.addEventListener?.('change', (e) => {
      if (!window.localStorage.getItem(USER_SET_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}
