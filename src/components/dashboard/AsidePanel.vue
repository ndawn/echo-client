<template lang="pug">
aside.aside(:style="computedStyle")
  slot
</template>

<script>
export default {
  props: {
    width: String,
    left: Boolean,
    right: Boolean
  },
  data () {
    return {
      computedStyle: {
        flexBasis: this.width,
        borderLeft: this.right ? '1px solid #eee' : '',
        borderRight: this.left ? '1px solid #eee' : ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.aside {
  height: 100%;
  flex-grow: 0;
  flex-shrink: 0;
}
</style>