<template>
  <div id="container">
    <nav-view />
    <slot />
  </div>
</template>

<script>
import NavView from './NavView.vue'

export default {
  components: {
    ['nav-view']: NavView,
  },
}
</script>

<style>
#container {
  height: 100vh;
  display: flex;
  flex-direction: row;
  z-index: 1;
}
</style>
