<script lang="ts">
    import Vue from 'vue';
    import {FastCommentsCollabChatWidgetConfig} from "fastcomments-typescript";

    async function insertScript(src: string, id: string, parentElement: Element) {
        return new Promise((resolve, reject) => {
            const script = window.document.createElement('script');
            script.async = true;
            script.src = src;
            script.id = id;
            parentElement.appendChild(script);

            script.addEventListener('load', resolve);
            script.addEventListener('error', reject);
        });
    }

    // noinspection TypeScriptExplicitMemberType
    let lastWidgetInstance: { update: (arg0: any) => void; } | null = null;
    function reset(config : FastCommentsCollabChatWidgetConfig) {
        if (lastWidgetInstance) {
            lastWidgetInstance.update(config);
        }
    }

    // let fcInstance = null;
    export default Vue.extend({
        name: 'FastCommentsCollabChat', // vue component name
        props: {
            config: {
                type: Object as () => FastCommentsCollabChatWidgetConfig
            },
            targetRef: {
              default: null
            }
        },
        data() {
            return {
                widgetId: `fastcomments-collab-chat-${Math.random()}-${Date.now()}`
            }
        },
        async mounted() {
            // @ts-ignore
            if (window && !window.FastCommentsCollabChat) {
                const src = this.config.region === 'eu' ? 'https://cdn-eu.fastcomments.com/js/embed-collab-chat.min.js' : 'https://cdn.fastcomments.com/js/embed-collab-chat.min.js';
                await insertScript(src, 'fastcomments-collab-chat-script', window.document.body);
            }
            // @ts-ignore
            lastWidgetInstance = window.FastCommentsCollabChat(this.targetRef, this.config);
        },
        watch: {
            config(newConfig : FastCommentsCollabChatWidgetConfig) {
                reset(newConfig);
            },
        },
    });
</script>

<template>
    <div class="fastcomments-collab-chat">
        <div v-bind:id="widgetId"></div>
    </div>
</template>
