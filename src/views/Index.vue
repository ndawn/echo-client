<template lang="pug">
main.main
  aside-panel(width="220px" left)
    item-list(:items="$store.getters.filteredDevices")
  graph-view
  aside-panel(width="300px" right)
    device-details
  modal(v-if="terminalWindowState.active" :onClose="onModalClose")
    terminal
</template>

<script>
import AsidePanel from '../components/dashboard/AsidePanel.vue';
import GraphView from '../components/dashboard/GraphView.vue';
import ItemList from '../components/dashboard/ItemList.vue';
import DeviceDetails from '../components/dashboard/DeviceDetails.vue';
import Modal from '../components/dashboard/Modal.vue';
import Terminal from '../components/dashboard/Terminal.vue';
import { mapState } from 'vuex';

export default {
  data () {
    return {
      onModalClose (event) {
        this.$store.state.terminalWindowState.socket.close();
        this.$store.dispatch('updateTerminalWindowState', {active: false});
      }
    }
  },
  computed: {
    ...mapState(['terminalWindowState'])
  },
  components: {
    AsidePanel,
    GraphView,
    ItemList,
    DeviceDetails,
    Modal,
    Terminal
  }
}
</script>

<style lang="scss">
.main {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .graph-view {
    flex-shrink: 1;
    flex-grow: 0;
  }
}
</style>