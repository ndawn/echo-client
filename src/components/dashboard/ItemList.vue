<template lang="pug">
.item-list-container
  filter-block
  .separator
  .item-list
    list-item(v-for="item in items" :key="item.id" :item="item")
</template>

<script>
import FilterBlock from '../../components/dashboard/FilterBlock.vue';
import ListItem from '../../components/dashboard/ItemListItem.vue';

export default {
  props: ['items'],
  components: {
    FilterBlock,
    ListItem
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
    height: calc(100vh - 46px - 48px);
    overflow-y: scroll;
  }
}
</style>