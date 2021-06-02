<template lang="pug">
.modal
  .close-button(@click="onClose")
    img(:src="closeIcon")
  slot
</template>

<script>
import crossIconMini from '@/assets/img/mini/cross.png';

export default {
  data () {
    return {
      closeIcon: crossIconMini
    }
  },
  methods: {
    onClose () {
      if (this.$store.state.isLoading) {
        return;
      }

      this.$store.dispatch('setActiveModalComponent', null);

      this.$slots.default.forEach(slot => {
        if (slot.componentInstance !== undefined) {
          slot.componentInstance.onClose && slot.componentInstance.onClose();
        }
      })
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
    top: 0;
    right: 0;
    padding: 16.5px;
    line-height: 0;
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