<script lang="ts">
    import Vue from 'vue';

    export interface FastCommentsReviewsSummaryConfig {
        tenantId: string;
        urlId?: string;
        hasDarkBackground?: boolean;
        region?: 'eu' | string;
        apiHost?: string;
    }

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
        name: 'FastCommentsReviewsSummary',
        props: {
            config: {
                type: Object as () => FastCommentsReviewsSummaryConfig
            }
        },
        data() {
            return {
                widgetId: `fastcomments-rs-${Math.random()}-${Date.now()}`,
                lastConfigKey: ''
            }
        },
        async mounted() {
            // @ts-ignore
            if (window && !window.FastCommentsReviewsSummaryWidget) {
                const src = this.config.region === 'eu' ? 'https://cdn-eu.fastcomments.com/js/embed-reviews-summary.min.js' : 'https://cdn.fastcomments.com/js/embed-reviews-summary.min.js';
                await insertScript(src, 'fastcomments-rs-script', window.document.body);
            }
            this.lastConfigKey = JSON.stringify(this.config);
            // @ts-ignore
            window.FastCommentsReviewsSummaryWidget(document.getElementById(this.widgetId), this.config);
        },
        watch: {
            config(newConfig: FastCommentsReviewsSummaryConfig) {
                const key = JSON.stringify(newConfig);
                if (key === this.lastConfigKey) return;
                this.lastConfigKey = key;
                const el = document.getElementById(this.widgetId);
                // @ts-ignore
                if (el && window.FastCommentsReviewsSummaryWidget) {
                    el.innerHTML = '';
                    // @ts-ignore
                    window.FastCommentsReviewsSummaryWidget(el, newConfig);
                }
            }
        }
    });
</script>

<template>
    <div class="fastcomments-reviews-summary">
        <div v-bind:id="widgetId"></div>
    </div>
</template>
