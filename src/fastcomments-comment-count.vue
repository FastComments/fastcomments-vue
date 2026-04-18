<script lang="ts">
    import Vue from 'vue';
    import {FastCommentsCommentCountConfig} from "fastcomments-typescript";

    async function insertScript(src: string, id: string, parentElement: Element) {
        return new Promise((resolve, reject) => {
            if (document.getElementById(id)) { resolve(null); return; }
            const script = window.document.createElement('script');
            script.async = true;
            script.src = src;
            script.id = id;
            parentElement.appendChild(script);

            script.addEventListener('load', resolve);
            script.addEventListener('error', reject);
        });
    }

    export default Vue.extend({
        name: 'FastCommentsCommentCount',
        props: {
            config: {
                type: Object as () => FastCommentsCommentCountConfig
            }
        },
        data() {
            return {
                widgetId: `fastcomments-count-${Math.random()}-${Date.now()}`,
                lastConfigKey: ''
            }
        },
        async mounted() {
            // @ts-ignore
            if (window && !window.FastCommentsCommentCount) {
                const src = this.config.region === 'eu' ? 'https://cdn-eu.fastcomments.com/js/widget-comment-count.min.js' : 'https://cdn.fastcomments.com/js/widget-comment-count.min.js';
                await insertScript(src, 'fastcomments-count-script', window.document.body);
            }
            this.lastConfigKey = JSON.stringify(this.config);
            // @ts-ignore
            window.FastCommentsCommentCount(document.getElementById(this.widgetId), this.config);
        },
        watch: {
            config(newConfig: FastCommentsCommentCountConfig) {
                const key = JSON.stringify(newConfig);
                if (key === this.lastConfigKey) return;
                this.lastConfigKey = key;
                const el = document.getElementById(this.widgetId);
                // @ts-ignore
                if (el && window.FastCommentsCommentCount) {
                    el.innerHTML = '';
                    // @ts-ignore
                    window.FastCommentsCommentCount(el, newConfig);
                }
            }
        }
    });
</script>

<template>
    <span class="fastcomments-comment-count">
        <span v-bind:id="widgetId"></span>
    </span>
</template>
