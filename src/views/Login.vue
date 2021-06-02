<template lang="pug">
.login
  .login-form
    .form-line.logo
      .form-item
          logo(dark)
    .form-line(v-if="error")
      .form-item
        p.error {{ error }}
    .form-line
      .form-item.username
        label.label(for="formUsername") Логин
        input.input#formUsername(type="text" :disabled="frozen" v-model="username")
    .form-line
      .form-item.password
        label.label(for="formPassword") Пароль
        input.input#formPassword(type="password" :disabled="frozen" v-model="password")
    .form-line
      .form-item.button
        button.button(type="button" :disabled="frozen" @click="authorize") Войти
</template>

<script>
import Logo from '@/components/dashboard/Logo.vue';
import axios from 'axios';

export default {
    data () {
        return {
            error: null,
            frozen: false,
            username: '',
            password: ''
        }
    },
    methods: {
        freeze () {
            this.frozen = true;
        },
        unfreeze () {
            this.frozen = false;
        },
        authorize () {
            this.freeze();

            this.$store.dispatch('setLoading', true);

            axios.post(
                '/api/account/login',
                {
                    username: this.username,
                    password: this.password
                }
            ).then(response => {
                localStorage.token = response.data.access_token;
                this.$router.push('/');
            }).catch(error => {
                this.error = error;
                this.$store.dispatch('setLoading', false);
            }).finally(this.unfreeze);
        }
    },
    components: {
        Logo
    },
    mounted () {
      this.$store.dispatch('setLoading', false);
    }
}
</script>

<style lang="scss">
.login {
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;

  .login-form {
    padding-bottom: 16px;
    width: 300px;
    border: 1px solid #eee;
    border-radius: 2px;
    overflow: hidden;
    background: white;

    img.logo {
      padding: 24px 4px 0;
      box-sizing: initial;
      height: 56px;
    }

    .form-line {
      margin: 4px 0 4px;
      padding: 0 16px;

      &.logo {
        margin: 0;
        padding: 0;
        width: 100%;
        text-align: center;
      }

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
}
</style>
