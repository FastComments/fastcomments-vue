# fastcomments-vue

> A Vue library for FastComments, a fast and developer friendly comment system.

[![NPM](https://img.shields.io/npm/v/fastcomments-vue.svg)](https://www.npmjs.com/package/fastcomments-vue) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

For Vue 3.0, see [fastcomments-vue-next](https://github.com/fastcomments/fastcomments-vue-next).

## Installation

### NPM

```bash
npm install --save fastcomments-vue
```

### Yarn

```bash
yarn add fastcomments-vue
```

## Usage

### The Comment Widget

The FastCommentsVue component contains the live FastComments comment widget.

Replace "demo" below with your "tenantId" - available [here](https://fastcomments.com/auth/my-account/api) in the FastComments admin area.

The widget supports a lot of options - see FastCommentsConfig [here](https://github.com/FastComments/fastcomments-typescript/blob/main/src/fast-comments-comment-widget-config.ts).

```vue
<script lang="ts">
import Vue from 'vue';
import FastCommentsVue from 'fastcomments-vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    FastCommentsVue
  }
});
</script>

<template>
  <div id="app">
    <fast-comments-vue v-bind:config="{tenantId: 'demo'}" />
  </div>
</template>
```

## Updating The Current Page (SPA Example)

In FastComments we call the article id, or page the comments get tied to, the URL ID as it can be a url or an ID.
Define the URL ID in the following manner. The component watches for changes in config object, and will reload, so you can just update the "url" and "urlId" settings.

See a full working example [here](dev/serve-pagination.ts).

Run the pagination example via:

```
npm run serve-pagination
```

```vue
<fast-comments-vue v-bind:config="{tenantId: 'demo', url: 'https://example.com', urlId: 'some-page-id'}" />
```

### Account Region (ATTENTION: EU Customers)

If your account is located in the EU, set `region = 'eu'` in the widget configuration, for example:

```vue
<fast-comments-vue v-bind:config="{tenantId: 'demo', url: 'https://example.com', urlId: 'some-page-id', region: 'eu'}" />
```

Otherwise, you do not have to define `region`.

## In Production

You probably don't want to define the config inline if you're passing callbacks etc. Instead, you'll want to define
config in a `computed` block, otherwise each time your callback etc is invoked the entire widget will re-render.

[See the spinner example for how to do this.](./dev/serve-spinner.vue)

## Contributing
Please check out our [contribution guidelines](CONTRIBUTING.md) before starting on a change. Remember to communicate first!

## License

MIT © [winrid](https://github.com/winrid)
