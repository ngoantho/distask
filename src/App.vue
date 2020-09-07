<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import Layout from './components/_Layout.vue'

export default {
  components: {
    layout: Layout,
  },
  computed: {
    layout() {
      return 'layout'
    },
  },
}
</script>

<style>
@import './styles/alive.css';
@import './styles/accent.css';
@import './styles/dark.css';

@supports (scroll-behavior: smooth) {
  html {
    scroll-behavior: smooth;
  }
}
@media screen and (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: smooth;
  }
}

body {
  padding: 0;
  margin: 0;
  -webkit-overflow-scrolling: touch;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3 {
  text-rendering: optimizeLegibility;
}
</style>
