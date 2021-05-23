<template lang="pug">
.device-details-param
    .param-name {{ name }}
    .param-value {{ value }}
</template>

<script>
export default {
    props: ['name', 'value']
}
</script>

<style lang="scss">
.device-details-param {
    display: flex;
    box-sizing: border-box;
    margin: 6px 0;
    padding: 0 24px;

    .param-name {
        font-weight: 600;
        flex-basis: 40%;
    }

    .param-value {
        flex-basis: 60%;
        padding-left: 8px;
    }
}
</style>