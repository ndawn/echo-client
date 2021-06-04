<template lang="pug">
.item-list-container
  filter-block
  .separator
  .item-list.devices(v-if="currentList === 'devices'")
    list-item-device(v-for="item in items.devices" :key="item.id" :item="item")
  .item-list.subnets(v-if="currentList === 'subnets'")
    list-item-subnet(v-for="item in items.subnets" :key="item.id" :item="item")
  .icon-footer
    .list-type-button(@click="activateDevices")
      img(:src="serverIconMini" alt="" title="Устройства")
    .list-type-button(@click="activateSubnets")
      img(:src="subnetIconMini" alt="" title="Подсети")
</template>

<script>
import serverIconMini from '@/assets/img/mini/server.png';
import subnetIconMini from '@/assets/img/mini/subnet.png';
import FilterBlock from '../../components/dashboard/FilterBlock.vue';
import ListItemDevice from '../../components/dashboard/ItemListItemDevice.vue';
import ListItemSubnet from '../../components/dashboard/ItemListItemSubnet.vue';

export default {
  props: ['items'],
  data () {
    return {
      serverIconMini,
      subnetIconMini,
      currentList: 'devices',
    }
  },
  methods: {
    activateDevices () {
      this.currentList = 'devices';
    },
    activateSubnets () {
      this.currentList = 'subnets';
    }
  },
  components: {
    FilterBlock,
    ListItemDevice,
    ListItemSubnet
  }
}
</script>

<style lang="scss">
.item-list-container {
  width: 100%;
  height: 100%;

  .title {
    padding-left: 16px;
    color: #444;
  }

  .separator {
    width: 100%;
    height: 8px;
  }

  .item-list {
    width: 100%;
    height: calc(100vh - 46px - 48px - 49px);
    overflow-y: scroll;
  }

  .icon-footer {
    width: 100%;
    height: 49px;
    border-top: 1px solid #eee;

    .list-type-button {
      display: inline-block;
      padding: 0 16.5px;
      line-height: 48px;
      transition: background 0.2s ease;
      cursor: pointer;
      user-select: none;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }

      &:active {
        background: rgba(0, 0, 0, 0.3);
      }

      img {
        vertical-align: sub;
      }
    }
  }
}
</style>