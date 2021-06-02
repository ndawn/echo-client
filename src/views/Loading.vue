<template lang="pug">
.loading
</template>

<script>
export default {
    mounted () {
        this.$store.dispatch('setLoading', true);
    },
    beforeDestroy () {
        this.$store.dispatch('setLoading', false);
    }
}
</script>

<style lang="scss">
.loading {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
}
</style>
