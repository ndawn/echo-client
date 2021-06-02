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
  props: [
    'username',
    'password',
  ],
  data () {
    return {
      terminal: null
    }
  },
  computed: mapState({terminalState: 'terminalWindowState'}),
  async mounted () {
    this.terminal = new Terminal({cursorBlink: true});

    this.terminal.open(this.$refs.terminal);
    this.terminal.write(`Connecting to ${this.terminalState.device.address}...\r\n`);

    this.$store.dispatch('setLoading', false);

    // axios.get('/api/agents/').then(response => {
    //   let targetAgent;

    //   for (let agent of response.data) {
    //     if (this.terminalState.device.subnet.pk === agent.subnet.pk) {
    //       targetAgent = agent;
    //       break;
    //     }
    //   }
    // });

    const socket = new WebSocket(`ws://${this.terminalState.agentAddress}/tunnel?sid=${this.terminalState.sid}`);

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
