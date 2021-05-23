<template lang="pug">
header.header
    logo
    // toggle-view-icon
</template>

<script>
import Logo from '../../components/dashboard/Logo.vue';
// import ToggleViewIcon from '../../components/dashboard/ToggleViewIcon.vue';

export default {
  components: {
      Logo,
      // ToggleViewIcon
  }
}
</script>

<style lang="scss">
.header {
    width: 100%;
    height: 48px;
    background: #2c2c2c;

    .toggle-view {
        float: right;
    }
}
</style>