<template lang="pug">
  #app
    dashboard
    .loading(v-if="isLoading")
      svg.spinner(viewBox="0 0 50 50")
        circle.path(cx="25" cy="25" r="20" fill="none" stroke-width="5")
</template>

<script>
import axios from 'axios';
import Dashboard from './components/dashboard/Dashboard.vue';
import { mapState } from 'vuex';

export default {
  computed: mapState(['isLoading']),
  components: {
    Dashboard
  },
  beforeMount () {
    this.$store.dispatch('setDevices', [
      {pk: 1,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.1',  type: 'router',       connected_with: [],  connection_options: [['ssh', 22], ['telnet', 23]]},
      {pk: 2,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.2',  type: 'switch',       connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]]},
      {pk: 3,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.3',  type: 'switch',       connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]]},
      {pk: 4,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.4',  type: 'switch',       connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]]},
      {pk: 5,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.5',  type: 'switch',       connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]]},
      {pk: 14, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.14', type: 'echo',         connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]]},
      {pk: 6,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.6',  type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
      {pk: 7,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.7',  type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
      {pk: 8,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.8',  type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
      {pk: 9,  mac: '00:0a:dc:cd:af:e0', address: '192.168.0.9',  type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
      {pk: 10, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.10', type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
      {pk: 11, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.11', type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
      {pk: 12, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.12', type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
      {pk: 13, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.13', type: 'echo',         connected_with: [2], connection_options: [['ssh', 22]]},
      {pk: 15, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.15', type: 'echo',         connected_with: [3], connection_options: [['ssh', 22]]},
      {pk: 16, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.16', type: null,           connected_with: [3], connection_options: [['ssh', 22]]},
      {pk: 17, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.17', type: null,           connected_with: [3], connection_options: [['ssh', 22]]},
      {pk: 18, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.18', type: null,           connected_with: [3], connection_options: [['ssh', 22]]},
      {pk: 19, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.19', type: 'echo',         connected_with: [4], connection_options: [['ssh', 22]]},
      {pk: 20, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.20', type: null,           connected_with: [4], connection_options: [['ssh', 22]]},
      {pk: 21, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.21', type: null,           connected_with: [4], connection_options: [['ssh', 22]]},
      {pk: 22, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.22', type: null,           connected_with: [4], connection_options: [['ssh', 22]]},
      {pk: 23, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.23', type: 'echo',         connected_with: [5], connection_options: [['ssh', 22]]},
      {pk: 24, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.24', type: null,           connected_with: [5], connection_options: [['ssh', 22]]},
      {pk: 25, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.25', type: 'voip',         connected_with: [5], connection_options: [['ssh', 22]]},
      {pk: 26, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.26', type: 'voip',         connected_with: [5], connection_options: [['ssh', 22]]},
      {pk: 27, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.27', type: 'printer',      connected_with: [5], connection_options: [['ssh', 22]]},
      {pk: 28, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.28', type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
      {pk: 29, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.29', type: 'server',       connected_with: [3], connection_options: [['ssh', 22]]},
      {pk: 30, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.30', type: 'server',       connected_with: [4], connection_options: [['ssh', 22]]},
      {pk: 31, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.31', type: 'access_point', connected_with: [5], connection_options: [['ssh', 22]]},
      {pk: 32, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.32', type: null,           connected_with: [1], connection_options: [['ssh', 22]]},
      {pk: 33, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.33', type: 'mobile',       connected_with: [1], connection_options: [['ssh', 22]]},
      {pk: 34, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.34', type: 'mobile',       connected_with: [1], connection_options: [['ssh', 22]]},
      {pk: 35, mac: '00:0a:dc:cd:af:e0', address: '192.168.0.35', type: null,           connected_with: [1], connection_options: [['ssh', 22]]},
    ]).then(() => {
      this.$store.dispatch('setLoading', false);
    });
    // axios.get('/api/devices/').then(response => {
    //   this.$store.dispatch('setDevices', response.data);
    // });
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.75rem;

  .spinner {
    animation: rotate 2s linear infinite;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
    width: 50px;
    height: 50px;
    
    .path {
      stroke: #06f;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
}
</style>
