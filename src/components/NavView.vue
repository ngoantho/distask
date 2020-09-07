<template>
  <div class="nav-view">
    <draggable
      v-model="items"
      @start="drag = true"
      @end="drag = false"
      class="nav-view-list"
      :group="{ name: 'default', pull: true, put: true }"
      tag="ul"
    >
      <li
        is="nav-item"
        v-for="item in items"
        :key="item.id"
        v-bind="{ ...item }"
      ></li>
    </draggable>
    <router-link to="/create" class="button button-clear nav-view-add" animated
      >+</router-link
    >
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import NavItem from './NavItem.vue'

export default {
  computed: {
    items: {
      get() {
        return this.$store.getters['sidebar/order']
      },
      set(value) {
        this.$store.commit('sidebar/updateOrdering', value)
      },
    },
  },
  components: {
    draggable,
    'nav-item': NavItem,
  },
}
</script>

<style lang="postcss" scoped>
.nav-view {
  display: grid;
  grid-template-rows: 1fr auto;
  background: var(--bg-secondary);
}

.nav-view-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  margin-bottom: 0;
  overflow: scroll;
  padding: {
    top: 0.5rem;
    left: 1rem;
    right: 1rem;
  }
}

.nav-view-add {
  background-color: var(--bg-accent);
  height: max-content;
  border-radius: 35%;
  font-size: xx-large;
  transform: scale(0.75);
  padding: {
    top: 2rem;
    bottom: 2rem;
  }

  &:hover {
    border-radius: 0.4rem;
    background-color: #3d9970;
    color: #fff;
  }
}
</style>
