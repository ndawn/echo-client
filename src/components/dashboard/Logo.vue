<template lang="pug">
img.logo(:src="logo")
</template>

<script>
import logo from '@/assets/logo.svg';

export default {
    data () {
        return {
            logo
        };
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
