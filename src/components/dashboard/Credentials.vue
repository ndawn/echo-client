<template lang="pug">
.credentials
  .form-line
    .form-item
      h3.title Подключение к устройству
  .form-line(v-if="error")
    .form-item
      p.error {{ error }}
  .form-line
    .form-item.host
      label.label(for="formHost") Адрес
      input.input#formHost(type="text" disabled :value="terminalState.device.address")
    .form-item.port
      label.label(for="formPort") Порт
      input.input#formPort(type="text" disabled :value="terminalState.method.port")
  .form-line
    .form-item.username
      label.label(for="formUsername") Логин
      input.input#formUsername(type="text" :disabled="frozen" v-model="terminalState.username")
  .form-line
    .form-item.password
      label.label(for="formPassword") Пароль
      input.input#formPassword(type="password" :disabled="frozen" v-model="terminalState.password")
  .form-line
    .form-item.button
      button.button(type="button" :disabled="frozen" @click="handleConnectClick") Подключиться
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data () {
    return {
      error: null,
      frozen: false
    }
  },
  computed: mapState({terminalState: 'terminalWindowState'}),
  methods: {
    freeze () {
      this.frozen = true;
    },
    unfreeze () {
      this.frozen = false;
    },
    async handleConnectClick () {
      this.freeze();
      this.$store.dispatch('setLoading', true);

      axios.get('/api/agents/').then(response => {
        console.log(response);

        let targetAgent = null;

        for (let agent of response.data) {
          if (this.terminalState.device.subnet.pk === agent.subnet.pk) {
            targetAgent = agent;
            break;
          }
        }

        console.log({
          url: `http://${targetAgent.address}:11007/tunnel/create/`,
          params: {
            host: this.terminalState.device.address,
            port: this.terminalState.method.port,
            proto: this.terminalState.method.proto,
            username: this.terminalState.username,
            password: this.terminalState.password
          }
        })

        axios.post(
          `http://${targetAgent.address}:11007/tunnel/create/`,
          {
            host: this.terminalState.device.address,
            port: this.terminalState.method.port,
            proto: this.terminalState.method.proto,
            username: this.terminalState.username,
            password: this.terminalState.password
          }
        ).then(response => {
          console.log(response);
          this.$store.dispatch('updateTerminalWindowState', {active: true, sid: response.data, agentAddress: targetAgent.address});
          this.$store.dispatch('setCredentialsActive', false);
        }).catch(error => {
          console.log(error);
          this.error = error;
          this.$store.dispatch('setLoading', false);
          this.unfreeze();
        });
      }).catch(error => {
        console.log(error);
        this.error = error;
        this.$store.dispatch('setLoading', false);
        this.unfreeze();
      });
    }
  }
}
</script>


<style scoped lang="scss">
.credentials {
  padding: 16px 12px;
  width: 300px;
  background: white;

  .title {
    margin: 0;
  }

  .form-line {
    margin: 4px 0 4px;

    .form-item {
      display: inline-block;
      padding: 4px;
      box-sizing: border-box;
      width: 100%;

      .label, .input {
        display: block;
        width: 100%;
        box-sizing: border-box;
        font-size: 1.2em;
      }

      .label {
        margin-bottom: 3px;
      }

      .input {
        padding: 4px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        outline: none;
        border-radius: 2px;
      }

      &.host {
        width: 78%;
      }

      &.port {
        width: 22%;
      }

      .error {
        color: darkred;
      }

      .button {
        margin-top: 8px;
        padding: 6px 4px;
        box-sizing: border-box;
        width: 100%;
        font-size: 1.4em;
        font-family: 'Open Sans';
        border: none;
        outline: none;
        border-radius: 2px;
        color: white;
        background: #1e90ff;
        cursor: pointer;
        transition: background 0.2s ease;

        &:hover {
          background: #1874cf;
        }

        &:active {
          background: #145faa;
        }

        &[disabled] {
          background: #76a4d1;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>