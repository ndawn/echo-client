<template lang="pug">
header.header
  logo
  .header-block.create-block(@click="toggleCreate")
    .create-icon
      img(:src="createIcon")
      span.create-text Добавить объект
    .dropdown.create-dropdown(:class="{active: createActive}")
      ul.option-list.create-dropdown-list
        li.option.create-dropdown-item(@click="activateCreateAgent")
          img(:src="echoIcon")
          span.option-text Агент
        li.option.create-dropdown-item(@click="activateCreateSubnet")
          img(:src="subnetIcon")
          span.option-text Подсеть
  .header-block.user-block(@click="toggleUser")
    span.user-text {{ userName }}
    .user-icon
      img(:src="userIcon")
    .dropdown.user-dropdown(:class="{active: userActive}")
      ul.option-list.user-dropdown-list
        li.option.user-dropdown-item(@click="logout")
          img(:src="logoutIcon")
          span.option-text Выйти
</template>

<script>
import Logo from '@/components/dashboard/Logo.vue';
import CreateAgent from '@/components/dashboard/CreateAgent.vue';
import CreateSubnet from '@/components/dashboard/CreateSubnet.vue';
import createIcon from '@/assets/img/mini/plus.png';
import userIcon from '@/assets/img/mini/user.png';
import echoIcon from '@/assets/img/mini/echo.png';
import subnetIcon from '@/assets/img/mini/subnet.png';
import logoutIcon from '@/assets/img/mini/logout.png';

export default {
  data () {
    return {
      // user: {
      //   first_name: 'Александр',
      //   last_name: 'Цветков'
      // },
      user: null,
      createIcon,
      userIcon,
      echoIcon,
      subnetIcon,
      logoutIcon,
      createActive: false,
      userActive: false
    }
  },
  computed: {
    userName () {
      return this.user ? `${this.user.first_name} ${this.user.last_name}` : '';
    }
  },
  methods: {
    toggleCreate () {
      this.createActive = !this.createActive;
    },
    toggleUser () {
      this.userActive = !this.userActive;
    },
    activateCreateAgent () {
      this.$store.dispatch('setActiveModalComponent', CreateAgent);
    },
    activateCreateSubnet () {
      this.$store.dispatch('setActiveModalComponent', CreateSubnet);
    },
    logout () {
      delete localStorage.token;
      this.$router.push('/login');
    }
  },
  components: {
      Logo,
      CreateAgent,
      CreateSubnet
  },
  beforeMount () {
    if (localStorage.token === undefined) {
      this.$router.push('/login');
      return;
    }

    axios.get('/api/account/', {headers: {Authorization: `Bearer ${localStorage.token}`}}).then(response => {
       this.user = response.data;
    }).catch(error => {
      console.log(error);
      if (error.response.status === 401 || (error.response.status === 422 && error.response.data.detail === 'Signature has expired')) {
        delete localStorage.token;
        this.$router.push('/login');
      }
    })
  }
}
</script>

<style lang="scss">
.header {
  width: 100%;
  height: 48px;
  background: #2c2c2c;

  .header-block {
    display: inline-block;
    position: relative;
    padding: 0 16.5px;
    box-sizing: border-box;
    height: 48px;
    vertical-align: top;
    line-height: 48px;
    user-select: none;
    color: #eee;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }

    &:active {
      background: rgba(0, 0, 0, 0.2);
    }

    .dropdown {
        display: none;
        position: absolute;
        top: 105%;
        right: 0;
        border: 1px solid #ececec;
        border-radius: 3px;
        box-shadow: 0 3px 2px 0 #c3c3c3;
        color: #2c2c2c;
        background: white;

        &.active {
            display: initial;
        }

        .option-list {
            margin: 0;
            padding: 4px 0;
            list-style: none;

            .option {
                padding: 6px 24px;
                cursor: pointer;

                &:hover {
                    background: #ececec;
                }
            }
        }
    }
  }

  .create-block {
    img {
      vertical-align: sub;
    }

    .create-text {
      padding-left: 8px;
    }

    .create-dropdown-item {
      padding-left: 16px !important;
      line-height: initial;

      img {
        padding-right: 8px;
      }
    }
  }

  .user-block {
    float: right;
    margin-right: 48px;
    padding-right: 0;

    .user-text, .user-icon {
      display: inline-block;
    }

    .user-icon {
      padding: 0 16.5px;
      vertical-align: sub;
    }

    .user-dropdown-item {
      padding-left: 16px !important;
      line-height: initial;

      img {
        padding-right: 8px;
        vertical-align: sub;
      }
    }
  }
}
</style>