<template lang="pug">
.term-container
  .loading(v-if="state.socket === null")
    svg.spinner(viewBox="0 0 50 50")
      circle.path(cx="25" cy="25" r="20" fill="none" stroke-width="5")
  .term(ref="terminal")
</template>

<script>
import { mapState } from 'vuex';
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from 'xterm-addon-fit';

export default {
  data () {
    return {
      terminal: null
    }
  },
  computed: mapState({state: 'terminalWindowState'}),
  mounted () {
    this.terminal = new Terminal({cursorBlink: true});

    this.terminal.open(this.$refs.terminal);
    this.terminal.write(`Connecting to ${this.state.device.address}...\r\n`);
    
    const socket = new WebSocket(`ws://127.0.0.1:8000/tunnel?target=${this.state.device.address}`);

    socket.onclose = (event) => {
      this.terminal.write('Connection closed by remote host.');
    }

    socket.onerror = (event) => {
      this.terminal.write('Connection to remote host failed.');
    }

    const attachAddon = new AttachAddon(socket);
    const fitAddon = new FitAddon();

    this.terminal.loadAddon(attachAddon);
    this.terminal.loadAddon(fitAddon);

    fitAddon.fit();

    this.$store.dispatch('updateTerminalWindowState', {socket});
  }
}
</script>

<style scoped lang="scss">
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
    stroke: white;
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
    stroke: white;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
    stroke: #06f;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
    stroke: white;
  }
}
</style>