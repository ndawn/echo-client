<template lang="pug">
  #app
    dashboard
    .loading(v-if="isLoading")
      svg.spinner(viewBox="0 0 50 50")
        circle.path(cx="25" cy="25" r="20" fill="none" stroke-width="5")
</template>

<script>
import axios from 'axios';
import Dashboard from './components/dashboard/Dashboard.vue';
import { mapState } from 'vuex';

export default {
  computed: mapState(['isLoading']),
  components: {
    Dashboard
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.75rem;

  .spinner {
    animation: rotate 2s linear infinite;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
    width: 50px;
    height: 50px;
    
    .path {
      stroke: #06f;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
}
</style>
