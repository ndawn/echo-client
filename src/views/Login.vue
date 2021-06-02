<template lang="pug">
.loading
</template>

<script>
export default {
    beforeCreate () {
        this.$store.dispatch('setLoading', true);
    },
    destroyed () {
        this.$store.dispatch('setLoading', false);
    }
}
</script>

<style lang="scss">
.loading {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
}
</style>
