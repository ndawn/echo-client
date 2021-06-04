<template lang="pug">
.create-subnet
  .form-line
    .form-item
      h3.title Создание подсети
  .form-line(v-if="error")
    .form-item
      p(:class="{error, success: !error}") {{ message }}
  .form-line
    .form-item.cidr
      label.label(for="formCidr") CIDR подсети
      input.input#formCidr(type="text" :disabled="frozen" v-model="cidr" :class="{error: cidrInvalid, highlighted: cidrHighlighted}")
  .form-line
    .form-item.gateway-address
      label.label(for="formGatewayAddress") IP адрес шлюза
      input.input#formGatewayAddress(type="text" :disabled="frozen" v-model="gatewayAddress" :class="{error: gatewayAddressInvalid, highlighted: gatewayAddressHighlighted}")
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
      cidr: '',
      cidrInvalid: false,
      cidrHighlighted: false,
      gatewayAddress: '',
      gatewayAddressInvalid: false,
      gatewayAddressHighlighted: false
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
    validateCidr (value) {
      try {
        ip.cidrSubnet(value);
        if (this.$store.state.subnets.filter(subnet => subnet.cidr === value).length > 0) {
          this.cidrInvalid = true;
          return;
        }
      } catch {
        this.cidrInvalid = true;
        return;
      }
      this.cidrInvalid = false;
      this.validateGatewayAddress(this.gatewayAddress);
    },
    validateGatewayAddress (value) {
      if (this.cidrInvalid) {
        return;
      }

      try {
        if (!ip.cidrSubnet(this.cidr).contains(value)) {
          this.gatewayAddressInvalid = true;
          return;
        }
      } catch {
        this.gatewayAddressInvalid = true;
        return;
      }
      this.gatewayAddressInvalid = false;
    },
    handleSaveClick () {
      this.cidrInvalid && this.blink('cidrHighlighted');
      this.gatewayAddressInvalid && this.blink('gatewayAddressHighlighted');

      if (this.cidrInvalid || this.gatewayAddressInvalid) {
        return;
      }

      this.freeze();
      this.$store.dispatch('setLoading', true);

      axios.post('/api/subnets/', {cidr: this.cidr, gateway_address: this.gatewayAddress}, {headers: {Authorization: `Bearer ${localStorage.token}`}}).then(response => {
        this.$store.dispatch('addSubnets', [response.data]);
        this.error = false;
        this.message = 'Подсеть успешно создана!';

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
    cidr (value) {
      this.validateCidr(value);
    },
    gatewayAddress (value) {
      this.validateGatewayAddress(value);
    }
  }
}
</script>


<style scoped lang="scss">
.create-subnet {
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