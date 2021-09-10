<script lang="ts">
    import Vue from 'vue';
    import FastComments from '@/fastcomments-vue.vue';

    export default Vue.extend({
        name: 'ServePagination',
        components: {
            FastComments
        },
        methods: {
          updatePage: function(pageNumber: number) {
            this.$router.push('/demo#page-' + pageNumber);
            this.page = pageNumber;
          }
        },
        data() {
            return {
                page: 0,
                url: window.location.href
            }
        },
        watch: {
            $route() {
              this.url = window.location.href;
            }
        }
    });
</script>

<template>
    <div id="app">
        <div>Page: <span v-html="page"></span></div>
        <button @click="updatePage(page - 1)" style="margin-right: 5px">Prev</button>
        <button @click="updatePage(page + 1)">Next</button>
        <fast-comments v-bind:config="{tenantId: 'nYrnfYEv', urlId: url, url: url}"/>
    </div>
</template>
