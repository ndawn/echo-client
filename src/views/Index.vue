<template lang="pug">
main.main
  aside-panel(width="250px" left)
    item-list(:items="$store.getters.listData")
  graph-view
  aside-panel(width="350px" right)
    device-details
  modal(v-if="activeModalComponent")
    div(:is="activeModalComponent")
</template>

<script>
import AsidePanel from '../components/dashboard/AsidePanel.vue';
import GraphView from '../components/dashboard/GraphView.vue';
import ItemList from '../components/dashboard/ItemList.vue';
import DeviceDetails from '../components/dashboard/DeviceDetails.vue';
import Modal from '../components/dashboard/Modal.vue';
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  computed: mapState(['activeModalComponent']),
  components: {
    AsidePanel,
    GraphView,
    ItemList,
    DeviceDetails,
    Modal
  },
  beforeMount () {
    Promise.all([
      this.$store.dispatch('setDevices', [
        {pk: 1,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.1',  type: 'router',       connected_with: [],  connection_options: [['ssh', 22], ['telnet', 23]], subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 2,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.2',  type: 'switch',       connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]], subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 3,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.3',  type: 'switch',       connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]], subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 4,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.4',  type: 'switch',       connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]], subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 5,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.5',  type: 'switch',       connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]], subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 14, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.14', type: 'echo',         connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]], subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 6,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.6',  type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 7,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.7',  type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 8,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.8',  type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 9,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.9',  type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 10, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.10', type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 11, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.11', type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 12, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.12', type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 13, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.13', type: 'echo',         connected_with: [2], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 15, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.15', type: 'echo',         connected_with: [3], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 16, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.16', type: null,           connected_with: [3], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 17, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.17', type: null,           connected_with: [3], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 18, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.18', type: null,           connected_with: [3], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 19, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.19', type: 'echo',         connected_with: [4], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 20, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.20', type: null,           connected_with: [4], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 21, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.21', type: null,           connected_with: [4], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 22, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.22', type: null,           connected_with: [4], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 23, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.23', type: 'echo',         connected_with: [5], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 24, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.24', type: null,           connected_with: [5], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 25, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.25', type: 'voip',         connected_with: [5], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 26, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.26', type: 'voip',         connected_with: [5], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 27, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.27', type: 'printer',      connected_with: [5], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 28, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.28', type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 29, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.29', type: 'server',       connected_with: [3], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 30, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.30', type: 'server',       connected_with: [4], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 31, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.31', type: 'access_point', connected_with: [5], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 32, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.32', type: null,           connected_with: [1], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 33, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.33', type: 'mobile',       connected_with: [1], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 34, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.34', type: 'mobile',       connected_with: [1], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
        {pk: 35, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.35', type: null,           connected_with: [1], connection_options: [['ssh', 22]],                 subnet: {pk: 1, cidr: '192.168.0.0/24'}},
      ]),
      this.$store.dispatch('setSubnets', [
        {pk: 1, cidr: '192.168.0.0/24'}
      ])
    ]).then(() => {
      this.$store.dispatch('setLoading', false);
    });
    // axios.get('/api/devices/', {headers: {Authorization: `Bearer ${localStorage.token}`}}).then(response => {
    //   this.$store.dispatch('setDevices', response.data);
    // }).catch(error => {
    //   if (error.response.status === 401 || (error.response.status === 422 && error.response.data.detail === 'Signature has expired')) {
    //     delete localStorage.token;
    //     this.$router.push('/login');
    //   }
    // });
    // axios.get('/api/subnets/', {headers: {Authorization: `Bearer ${localStorage.token}`}}).then(response => {
    //   this.$store.dispatch('setSubnets', response.data);
    // }).catch(error => {
    //   if (error.response.status === 401 || (error.response.status === 422 && error.response.data.detail === 'Signature has expired')) {
    //     delete localStorage.token;
    //     this.$router.push('/login');
    //   }
    // });
  },
  mounted () {
    this.$store.dispatch('setLoading', false);
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