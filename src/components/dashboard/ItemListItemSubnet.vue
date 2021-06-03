<template lang="pug">
.list-item-subnet
  .list-item.subnet(@click="handleClick")
    img.icon(:src="active ? arrowDownIcon : arrowRightIcon" alt="")
    img.icon(:src="itemIcon" alt="")
    span.name {{ item.cidr }}
  item-list-item-device(v-if="active" v-for="device in item.devices" :item="device" :key="item.pk + '_' + device.pk")
</template>

<script>
import arrowDownIcon from '@/assets/img/mini/arrow_down_black.png';
import arrowRightIcon from '@/assets/img/mini/arrow_right_black.png';
import subnetIconMini from '@/assets/img/mini/subnet.png';
import ItemListItemDevice from '@/components/dashboard/ItemListItemDevice.vue';

export default {
  props: ['item'],
  data () {
    return {
      arrowDownIcon,
      arrowRightIcon,
      itemIcon: subnetIconMini,
      active: false
    }
  },
  methods: {
    handleClick () {
      this.toggle();
    },
    toggle () {
      this.active = !this.active;
    }
  },
  components: {
    ItemListItemDevice
  }
}
</script>

<style lang="scss">
.list-item {
  box-sizing: border-box;
  padding: 6px 24px 6px 45px;
  cursor: pointer;

  &.subnet {
    padding: 6px 24px;
  }

  &:hover {
    background: #fafafa;
  }

  &.active {
    background: #ececec;
  }

  .icon {
    vertical-align: text-top;
    margin-right: 6px;
  }

  .name {
    width: 100%;
    overflow-x: hidden;
    white-space: nowrap;
    color: #3b3b3b;
  }
}
</style>