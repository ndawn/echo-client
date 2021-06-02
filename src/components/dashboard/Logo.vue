<template lang="pug">
img.logo(:src="logoIcon()")
</template>

<script>
import logoLight from '@/assets/logo_light.svg';
import logoDark from '@/assets/logo_dark.svg';

export default {
    props: {
        light: Boolean,
        dark: Boolean
    },
    data () {
        return {
            logoLight,
            logoDark
        };
    },
    methods: {
        logoIcon () {
            return this.dark ? logoDark : logoLight;
        }
    }
}
</script>

<style lang="scss">
.logo {
    display: inline-block;
    padding: 10px 24px 12px;
    box-sizing: border-box;
    height: 100%;
    font-size: 1.4rem;
    font-weight: lighter;
    color: white;
}
</style>
