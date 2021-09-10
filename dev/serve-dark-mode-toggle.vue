<script lang="ts">
    import Vue from 'vue';
    import FastComments from '@/fastcomments-vue.vue';

    export default Vue.extend({
        name: 'ServeDarkModeToggle',
        components: {
            FastComments
        },
        data() {
            return {
                isDarkMode: false
            }
        }
    });
</script>

<template>
    <div id="app" :class="isDarkMode ? 'dark' : 'light'">
        <button @click="isDarkMode = !isDarkMode">Toggle Dark Mode</button>
        <fast-comments v-bind:config="{tenantId: 'demo', hasDarkBackground: isDarkMode}"/>
    </div>
</template>
<style>
    body {
        margin: 0;
        padding: 0;
    }
    #app {
        position: absolute; /* This is just so we can make the whole page black dynamically, easily. You don't need to do this. */
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
    .dark {
        background: #000;
        color: #fff;
    }
</style>
