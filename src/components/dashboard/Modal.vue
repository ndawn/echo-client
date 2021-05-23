<template lang="pug">
.modal
  .close-button(@click="thisOnClose")
    img(:src="closeIcon")
  slot
</template>

<script>
import crossIconMini from '@/assets/img/mini/cross.png';

export default {
  props: ['onClose'],
  data () {
    return {
      thisOnClose: this.onClose.bind(this),
      closeIcon: crossIconMini
    }
  }
}
</script>


<style scoped lang="scss">
.modal {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);

  .close-button {
    position: absolute;
    top: 4px;
    right: 8px;
    padding: 12px;
    line-height: 0;
    border-radius: 50%;
    transition: background 0.2s ease;
    cursor: pointer;
    user-select: none;

    &:hover {
      background: rgba(0, 0, 0, 0.4);
    }

    &:active {
      background: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>