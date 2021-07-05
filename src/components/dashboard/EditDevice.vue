<template lang="pug">
.edit-device
  .form-line
    .form-item
      h3.title Редактирование устройства
  .form-line(v-if="message")
    .form-item
      p(:class="{error, success: !error}") {{ message }}
  .form-line
    .form-item.subnet
      label.label(for="formSubnet") Подсеть
      input.input#formSubnet(type="text" disabled :value="device.subnet.cidr")
  .form-line
    .form-item.hostname
      label.label(for="formHostname") Имя хоста
      input.input#formHostname(type="text" disabled :value="device.hostname")
  .form-line
    .form-item.address
      label.label(for="formAddress") IP адрес
      input.input#formAddress(type="text" disabled :value="device.address")
  .form-line
    .form-item.mac
      label.label(for="formMac") MAC адрес
      input.input#formMac(type="text" disabled :value="device.mac")
  .form-line
    .form-item.name
      label.label(for="formName") Имя устройства
      input.input#formName(type="text" :disabled="frozen" v-model="name")
  .form-line
    .form-item.type
      label.label(for="formType") Тип устройства
      select.input#formType(:disabled="frozen" v-model="type")
        option(v-for="typeOption in types" :disabled="frozen" :value="typeOption.name") {{ typeOption.verboseName }}
  .form-line
    .form-item.button
      button.button(type="button" :disabled="frozen" @click="handleSaveClick") Сохранить
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import config from '@/config';
import configMapping from '@/utils/configMapping';

export default {
  data () {
    return {
      error: false,
      message: null,
      frozen: false,
      name: '',
      type: '',
      types: config.types
    }
  },
  computed: {
    device () {
      return this.$store.state.devices.find(dvc => dvc.id === this.$store.state.activeDevice) || null;
    },
  },
  methods: {
    freeze () {
      this.frozen = true;
    },
    unfreeze () {
      this.frozen = false;
    },
    async handleSaveClick () {
      this.freeze();
      this.$store.dispatch('setLoading', true);

      axios.put(`/api/devices/${this.device.pk}`, {name: this.name, type: this.type}, {headers: {Authorization: `Bearer ${localStorage.token}`}}).then(response => {
        this.error = false;
        this.device.name = this.name;
        this.device.type = configMapping.type(this.type);
        this.message = 'Сохранено!';

        setTimeout(() => {this.$store.dispatch('setActiveModalComponent', null)}, 3000);
      }).catch(error => {
        console.log(error.response.data);
        this.error = true;
        this.message = error.response.data.detail;
      }).finally(() => {
          this.$store.dispatch('setLoading', false);
          this.unfreeze();
      });
    }
  },
  mounted () {
      this.name = this.device.name;
      this.type = this.device.type;
  }
}
</script>


<style scoped lang="scss">
.edit-device {
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