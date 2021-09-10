import _Vue, { PluginFunction, VueConstructor } from 'vue';

// Import vue components
import commentingDirective from '@/fastcomments-vue.vue';
import collabChatDirective from '@/fastcomments-collab-chat.vue';
import imageChatDirective from '@/fastcomments-image-chat.vue';
import liveChatDirective from '@/fastcomments-live-chat.vue';

// Define typescript interfaces for autoinstaller
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}
interface InstallableComponent extends VueConstructor<_Vue> {
  install: InstallFunction;
}

// install function executed by Vue.use()
const install: InstallFunction = function installFastcommentsVue(Vue: typeof _Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('FastComments', commentingDirective);
  Vue.component('FastCommentsCollabChat', collabChatDirective);
  Vue.component('FastCommentsImageChat', imageChatDirective);
  Vue.component('FastCommentsLiveChat', liveChatDirective);
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
if ('false' === process.env.ES_BUILD) {
  let GlobalVue = null;
  if (typeof window !== 'undefined') {
    // @ts-ignore
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    GlobalVue = (global as any).Vue;
  }
  if (GlobalVue) {
    (GlobalVue as typeof _Vue).use(plugin);
  }
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(commentingDirective as any as InstallableComponent).install = install;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(collabChatDirective as any as InstallableComponent).install = install;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(imageChatDirective as any as InstallableComponent).install = install;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(liveChatDirective as any as InstallableComponent).install = install;

// Export components
export default commentingDirective; // retained for backwards compatibility
export const FastComments = commentingDirective;
export const FastCommentsCollabChat = collabChatDirective;
export const FastCommentsImageChat = imageChatDirective;
export const FastCommentsLiveChat = liveChatDirective;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
