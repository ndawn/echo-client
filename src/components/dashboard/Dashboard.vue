<template lang="pug">
.dashboard
  dashboard-header
  index
</template>

<script>
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';
import Index from '@/views/Index.vue';

export default {
  components: {
    DashboardHeader,
    Index
  }
}
</script>

<style scoped lang="scss">
.dashboard {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>