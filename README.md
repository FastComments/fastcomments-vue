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

Replace "demo" below with your "tenantId" - available [here](https://fastcomments.com/auth/my-account/get-acct-code) in the FastComments admin area.

The widget supports a lot of options - see FastCommentsConfig [here](https://github.com/FastComments/fastcomments-typescript/blob/eae973fb7885de4df58b21b7a22a3e40c89feefa/src/fastcomments-config.ts#L14).

```vue
<script lang="ts">
import Vue from 'vue';
import FastCommentsVue from 'fastcomments-vue.vue';

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

## Contributing
Please checkout our [contribution guidelines](CONTRIBUTING.md) before starting on a change. Remember to communicate first!

## License

MIT © [winrid](https://github.com/winrid)
