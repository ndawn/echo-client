<template lang="pug">
.term-container
  .term(ref="terminal")
</template>

<script>
import axios from 'axios';
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
  methods: {
    onClose () {
      this.terminalState.socket && this.terminalState.socket.close();
      this.$store.dispatch('updateTerminalWindowState', {active: false, device: null, method: null, username: null, password: null});
    }
  },
  computed: mapState({terminalState: 'terminalWindowState'}),
  async mounted () {
    this.terminal = new Terminal({cursorBlink: true});

    this.terminal.open(this.$refs.terminal);
    this.terminal.write(`Connecting to ${this.terminalState.device.address}...\r\n`);

    this.$store.dispatch('setLoading', false);

    const socket = new WebSocket(`ws://${this.terminalState.agentAddress}:11007/tunnel?sid=${this.terminalState.sid}`);

    socket.onclose = (event) => {
      this.terminal.write('\r\nConnection closed by remote host.');
    }

    socket.onerror = (event) => {
      this.terminal.write('\r\nConnection to remote host failed.');
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
