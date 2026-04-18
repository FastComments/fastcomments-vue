<script lang="ts">
    import Vue from 'vue';

    export interface FastCommentsUserActivityFeedConfig {
        tenantId: string;
        userId: string;
        hasDarkBackground?: boolean;
        readonly?: boolean;
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
        name: 'FastCommentsUserActivityFeed',
        props: {
            config: {
                type: Object as () => FastCommentsUserActivityFeedConfig
            }
        },
        data() {
            return {
                widgetId: `fastcomments-ua-${Math.random()}-${Date.now()}`,
                lastConfigKey: ''
            }
        },
        async mounted() {
            // @ts-ignore
            if (window && !window.FastCommentsUserActivity) {
                const src = this.config.region === 'eu' ? 'https://cdn-eu.fastcomments.com/js/embed-user-activity.min.js' : 'https://cdn.fastcomments.com/js/embed-user-activity.min.js';
                await insertScript(src, 'fastcomments-ua-script', window.document.body);
            }
            this.lastConfigKey = JSON.stringify(this.config);
            // @ts-ignore
            window.FastCommentsUserActivity(document.getElementById(this.widgetId), this.config);
        },
        watch: {
            config(newConfig: FastCommentsUserActivityFeedConfig) {
                const key = JSON.stringify(newConfig);
                if (key === this.lastConfigKey) return;
                this.lastConfigKey = key;
                const el = document.getElementById(this.widgetId);
                // @ts-ignore
                if (el && window.FastCommentsUserActivity) {
                    el.innerHTML = '';
                    // @ts-ignore
                    window.FastCommentsUserActivity(el, newConfig);
                }
            }
        }
    });
</script>

<template>
    <div class="fastcomments-user-activity-feed">
        <div v-bind:id="widgetId"></div>
    </div>
</template>
