<template lang="pug">
.create-agent
  .form-line
    .form-item
      h3.title Создание агента
  .form-line(v-if="message")
    .form-item
      p(:class="{error, success: !error}") {{ message }}
  .form-line
    .form-item.subnet
      label.label(for="formSubnet") Подсеть
      select.input#formSubnet(v-model="subnet")
        option(v-for="subnet in $store.getters.freeSubnets" :disabled="frozen" :value="subnet") {{ subnet.cidr }}
  .form-line
    .form-item.address
      label.label(for="formAddress") IP адрес
      input.input#formAddress(type="text" :disabled="frozen" v-model="address" :class="{error: addressInvalid, highlighted: addressHighlighted}")
  .form-line
    .form-item.button
      button.button(type="button" :disabled="frozen" @click="handleSaveClick") Создать
</template>

<script>
import axios from 'axios';
import ip from 'ip';

export default {
  data () {
    return {
      error: false,
      message: null,
      frozen: false,
      address: '',
      addressInvalid: false,
      addressHighlighted: false,
      subnet: null
    }
  },
  methods: {
    freeze () {
      this.frozen = true;
    },
    unfreeze () {
      this.frozen = false;
    },
    blink (param) {
      this[param] = true;
      setTimeout(() => {this[param] = false}, 1000);
    },
    validateAddress (value) {
      try {
        if (!ip.cidrSubnet(this.subnet.cidr).contains(value)) {
          this.addressInvalid = true;
          return;
        }
      } catch {
        this.addressInvalid = true;
        return;
      }
      this.addressInvalid = false;
    },
    handleSaveClick () {
      if (this.addressInvalid) {
        this.blink('addressHighlighted');
        return;
      }

      this.freeze();
      this.$store.dispatch('setLoading', true);

      axios.post('/api/agents/', {address: this.address, subnet_id: this.subnet.pk}, {headers: {Authorization: `Bearer ${localStorage.token}`}}).then(response => {
        this.$store.dispatch('addAgents', [response.data]);
        this.error = false;
        this.message = 'Агент успешно создан и развернут!';

        setTimeout(() => {this.$store.dispatch('setActiveModalComponent', null)}, 3000);
      }).catch(error => {
        console.log(error);
        this.error = true;
        this.message = error;
      }).finally(() => {
          this.$store.dispatch('setLoading', false);
          this.unfreeze();
      });
    }
  },
  watch: {
    address (value) {
      this.validateAddress(value);
    }
  },
  mounted () {
    window.$$ip = ip;
  }
}
</script>


<style scoped lang="scss">
.create-agent {
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
        transition: color 0.2s ease;

        &.error {
          color: darkred;
        }

        &.error.highlighted {
          color: red;
        }
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

      .success {
        color: darkgreen;
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