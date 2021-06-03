<template lang="pug">
.list-item(:class="{active: isActive}" @click="setActive")
  img.icon(:src="itemIcon" alt="")
  span.name {{ item.name || item.address }}
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      itemIcon: this.item.type.icon.mini
    }
  },
  computed: {
    isActive () {
      return this.$store.state.activeDevice === this.item.id;
    }
  },
  methods: {
    setActive () {
      this.$store.dispatch('setActiveDevice', this.item.id);
    }
  }
}
</script>

<style lang="scss">
.list-item {
  box-sizing: border-box;
  padding: 6px 24px;
  cursor: pointer;

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