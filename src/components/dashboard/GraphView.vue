<template lang="pug">
.graph-view
  .graph#deviceGraph(ref="deviceGraph")
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['chart', 'chartSeries', 'graphConfig']),
    ...mapGetters(['graphData'])
  },
  watch: {
    graphData (newValue) {
      this.$store.dispatch('setChartData', newValue);
    }
  },
  methods: {
    handleNodeClick (event, node) {
      const nodeElement = event.path.find(el => el.classList.contains('node'));

      if (!nodeElement.classList.contains('shaded')) {
        this.setActiveDevice(node);
      }
    },
    setActiveDevice (device) {
      this.$store.dispatch('setActiveDevice', device.id);
    }
  },
  mounted () {
    this.$store.dispatch('createChart', this.$refs.deviceGraph);
  }
}
</script>

<style lang="scss">
.graph-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #e5e5e5;

  .graph {
    height: 100%;
  }

  .shaded {
    opacity: 0.4;
  }
}
</style>