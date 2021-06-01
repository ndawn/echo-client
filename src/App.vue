<template lang="pug">
  #app
    dashboard
</template>

<script>
import axios from 'axios';
import Dashboard from './components/dashboard/Dashboard.vue';

export default {
  components: {
    Dashboard
  },
  beforeMount () {
    // this.$store.dispatch('setDevices', [
    //   {pk: 1,  name: 'Router',          address: '192.168.0.1',  type: 'router',       connected_with: [],  connection_options: [['ssh', 22], ['telnet', 23]]},
    //   {pk: 2,  name: 'Switch',          address: '192.168.0.2',  type: 'switch',       connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]]},
    //   {pk: 3,  name: 'Switch',          address: '192.168.0.3',  type: 'switch',       connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]]},
    //   {pk: 4,  name: 'Switch',          address: '192.168.0.4',  type: 'switch',       connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]]},
    //   {pk: 5,  name: 'Switch',          address: '192.168.0.5',  type: 'switch',       connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]]},
    //   {pk: 14, name: 'Echo агент',      address: '192.168.0.14', type: 'echo',         connected_with: [1], connection_options: [['ssh', 22], ['telnet', 23]]},
    //   {pk: 6,  name: 'Max-PC',          address: '192.168.0.6',  type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
    //   {pk: 7,  name: 'DESKTOP-NO12453', address: '192.168.0.7',  type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
    //   {pk: 8,  name: 'debian',          address: '192.168.0.8',  type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
    //   {pk: 9,  name: 'winsrv',          address: '192.168.0.9',  type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
    //   {pk: 10, name: 'DESKTOP-H328I23', address: '192.168.0.10', type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
    //   {pk: 11, name: 'desktop',         address: '192.168.0.11', type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
    //   {pk: 12, name: 'MacBook (Max)',   address: '192.168.0.12', type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
    //   {pk: 13, name: 'Echo агент',      address: '192.168.0.13', type: 'echo',         connected_with: [2], connection_options: [['ssh', 22]]},
    //   {pk: 15, name: 'Echo агент',      address: '192.168.0.15', type: 'echo',         connected_with: [3], connection_options: [['ssh', 22]]},
    //   {pk: 16, name: 'Echo агент',      address: '192.168.0.16', type: null,           connected_with: [3], connection_options: [['ssh', 22]]},
    //   {pk: 17, name: 'Echo агент',      address: '192.168.0.17', type: null,           connected_with: [3], connection_options: [['ssh', 22]]},
    //   {pk: 18, name: 'Echo агент',      address: '192.168.0.18', type: null,           connected_with: [3], connection_options: [['ssh', 22]]},
    //   {pk: 19, name: 'Echo агент',      address: '192.168.0.19', type: 'echo',         connected_with: [4], connection_options: [['ssh', 22]]},
    //   {pk: 20, name: 'Echo агент',      address: '192.168.0.20', type: null,           connected_with: [4], connection_options: [['ssh', 22]]},
    //   {pk: 21, name: 'Echo агент',      address: '192.168.0.21', type: null,           connected_with: [4], connection_options: [['ssh', 22]]},
    //   {pk: 22, name: 'Echo агент',      address: '192.168.0.22', type: null,           connected_with: [4], connection_options: [['ssh', 22]]},
    //   {pk: 23, name: 'Echo агент',      address: '192.168.0.23', type: 'echo',         connected_with: [5], connection_options: [['ssh', 22]]},
    //   {pk: 24, name: 'Echo агент',      address: '192.168.0.24', type: null,           connected_with: [5], connection_options: [['ssh', 22]]},
    //   {pk: 25, name: 'Echo агент',      address: '192.168.0.25', type: 'voip',         connected_with: [5], connection_options: [['ssh', 22]]},
    //   {pk: 26, name: 'Echo агент',      address: '192.168.0.26', type: 'voip',         connected_with: [5], connection_options: [['ssh', 22]]},
    //   {pk: 27, name: 'Echo агент',      address: '192.168.0.27', type: 'printer',      connected_with: [5], connection_options: [['ssh', 22]]},
    //   {pk: 28, name: 'Echo агент',      address: '192.168.0.28', type: 'pc',           connected_with: [2], connection_options: [['ssh', 22]]},
    //   {pk: 29, name: 'Echo агент',      address: '192.168.0.29', type: 'server',       connected_with: [3], connection_options: [['ssh', 22]]},
    //   {pk: 30, name: 'Echo агент',      address: '192.168.0.30', type: 'server',       connected_with: [4], connection_options: [['ssh', 22]]},
    //   {pk: 31, name: 'Echo агент',      address: '192.168.0.31', type: 'access_point', connected_with: [5], connection_options: [['ssh', 22]]},
    //   {pk: 32, name: 'Echo агент',      address: '192.168.0.32', type: null,           connected_with: [1], connection_options: [['ssh', 22]]},
    //   {pk: 33, name: 'Echo агент',      address: '192.168.0.33', type: 'mobile',       connected_with: [1], connection_options: [['ssh', 22]]},
    //   {pk: 34, name: 'Echo агент',      address: '192.168.0.34', type: 'mobile',       connected_with: [1], connection_options: [['ssh', 22]]},
    //   {pk: 35, name: 'Echo агент',      address: '192.168.0.35', type: null,           connected_with: [1], connection_options: [['ssh', 22]]},
    // ]);
    axios.get('/api/devices').then(data => {
      this.$store.dispatch('setDevices', data);
    });
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
}
</style>
