<template lang="pug">
  #app
    dashboard
</template>

<script>
import Dashboard from './components/dashboard/Dashboard.vue';

export default {
  components: {
    Dashboard
  },
  beforeMount () {
    this.$store.dispatch('setDevices', [
      {id: 1, name: 'Router', address: '192.168.0.1', type: 'router', connectedTo: [], connectOptions: ['ssh', 'telnet']},
      {id: 2, name: 'Switch', address: '192.168.0.2', type: 'switch', connectedTo: [1], connectOptions: ['ssh', 'telnet']},
      {id: 3, name: 'Switch', address: '192.168.0.3', type: 'switch', connectedTo: [1], connectOptions: ['ssh', 'telnet']},
      {id: 4, name: 'Switch', address: '192.168.0.4', type: 'switch', connectedTo: [1], connectOptions: ['ssh', 'telnet']},
      {id: 5, name: 'Switch', address: '192.168.0.5', type: 'switch', connectedTo: [1], connectOptions: ['ssh', 'telnet']},
      {id: 14, name: 'Echo агент', address: '192.168.0.14', type: 'echo', connectedTo: [1], connectOptions: ['ssh', 'telnet', 'vnc']},
      {id: 6, name: 'Max-PC', address: '192.168.0.6', type: 'pc', connectedTo: [2], connectOptions: ['ssh']},
      {id: 7, name: 'DESKTOP-NO12453', address: '192.168.0.7', type: 'pc', connectedTo: [2], connectOptions: ['ssh']},
      {id: 8, name: 'debian', address: '192.168.0.8', type: 'pc', connectedTo: [2], connectOptions: ['ssh']},
      {id: 9, name: 'winsrv', address: '192.168.0.9', type: 'pc', connectedTo: [2], connectOptions: ['ssh']},
      {id: 10, name: 'DESKTOP-H328I23', address: '192.168.0.10', type: 'pc', connectedTo: [2], connectOptions: ['ssh']},
      {id: 11, name: 'desktop', address: '192.168.0.11', type: 'pc', connectedTo: [2], connectOptions: ['ssh']},
      {id: 12, name: 'MacBook (Max)', address: '192.168.0.12', type: 'pc', connectedTo: [2], connectOptions: ['ssh']},
      {id: 13, name: 'Echo агент', address: '192.168.0.13', type: 'echo', connectedTo: [2], connectOptions: ['ssh']},
      {id: 15, name: 'Echo агент', address: '192.168.0.15', type: 'echo', connectedTo: [3], connectOptions: ['ssh']},
      {id: 16, name: 'Echo агент', address: '192.168.0.16', type: null, connectedTo: [3], connectOptions: ['ssh']},
      {id: 17, name: 'Echo агент', address: '192.168.0.17', type: null, connectedTo: [3], connectOptions: ['ssh']},
      {id: 18, name: 'Echo агент', address: '192.168.0.18', type: null, connectedTo: [3], connectOptions: ['ssh']},
      {id: 19, name: 'Echo агент', address: '192.168.0.19', type: 'echo', connectedTo: [4], connectOptions: ['ssh', 'vnc']},
      {id: 20, name: 'Echo агент', address: '192.168.0.20', type: null, connectedTo: [4], connectOptions: ['ssh']},
      {id: 21, name: 'Echo агент', address: '192.168.0.21', type: null, connectedTo: [4], connectOptions: ['ssh']},
      {id: 22, name: 'Echo агент', address: '192.168.0.22', type: null, connectedTo: [4], connectOptions: ['ssh']},
      {id: 23, name: 'Echo агент', address: '192.168.0.23', type: 'echo', connectedTo: [5], connectOptions: ['ssh', 'vnc']},
      {id: 24, name: 'Echo агент', address: '192.168.0.24', type: null, connectedTo: [5], connectOptions: ['ssh']},
      {id: 25, name: 'Echo агент', address: '192.168.0.25', type: 'voip', connectedTo: [5], connectOptions: ['ssh']},
      {id: 26, name: 'Echo агент', address: '192.168.0.26', type: 'voip', connectedTo: [5], connectOptions: []},
      {id: 27, name: 'Echo агент', address: '192.168.0.27', type: 'printer', connectedTo: [5], connectOptions: ['ssh']},
      {id: 28, name: 'Echo агент', address: '192.168.0.28', type: 'pc', connectedTo: [2], connectOptions: ['ssh']},
      {id: 29, name: 'Echo агент', address: '192.168.0.29', type: 'server', connectedTo: [3], connectOptions: ['ssh']},
      {id: 30, name: 'Echo агент', address: '192.168.0.30', type: 'server', connectedTo: [4], connectOptions: ['ssh']},
      {id: 31, name: 'Echo агент', address: '192.168.0.31', type: 'access_point', connectedTo: [5], connectOptions: ['ssh']},
      {id: 32, name: 'Echo агент', address: '192.168.0.32', type: null, connectedTo: [1], connectOptions: ['ssh']},
      {id: 33, name: 'Echo агент', address: '192.168.0.33', type: 'mobile', connectedTo: [1], connectOptions: ['ssh']},
      {id: 34, name: 'Echo агент', address: '192.168.0.34', type: 'mobile', connectedTo: [1], connectOptions: ['ssh']},
      {id: 35, name: 'Echo агент', address: '192.168.0.35', type: null, connectedTo: [1], connectOptions: ['ssh']},
    ]);
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
