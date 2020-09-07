<template>
  <li class="nav-item">
    <details v-if="isFolder" type="folder">
      <summary class="button button-clear" :title="obj.name">
        <span
          :style="{
            textShadow: `0 0 0 ${obj.color}`,
          }"
          >📁</span
        >
      </summary>
      <draggable
        v-model="folder"
        @start="drag = true"
        @end="drag = false"
        :group="{ name: id, pull: true, put: true }"
        tag="ul"
      >
        <li
          is="nav-item"
          v-for="item in folder"
          :key="item.id"
          v-bind="{ ...item }"
        />
      </draggable>
    </details>
    <router-link v-else :to="list.showUrl" type="list">
      <img :alt="list.cutImgAlt" :title="obj.name" :src="obj.pic" />
    </router-link>
  </li>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'nav-item',
  props: {
    id: {
      type: Number,
      required: true,
    },
    isFolder: {
      type: Boolean,
    },
  },
  components: {
    draggable,
  },
  computed: {
    obj() {
      return this.$store.getters['sidebar/query']({
        isFolder: this.isFolder,
        id: this.id,
      })
    },
    list() {
      return {
        showUrl: this.id ? `/${this.id}` : location.pathname + location.search,
        cutImgAlt: this.obj.name.charAt(0) || '',
      }
    },
    folder: {
      get() {
        return this.obj.members
      },
      set(value) {
        this.$store.commit('sidebar/updateFolder', {
          id: this.id,
          value,
        })
      },
    },
  },
}
</script>

<style lang="postcss" scoped>
[type='folder'] {
  & > summary {
    cursor: pointer;
    list-style: none;
    height: max-content;
    margin-bottom: 0;
    border-radius: 15%;
    background: var(--bg-tertiary);
    padding: {
      top: 1rem;
      bottom: 1rem;
    }

    &:hover,
    &:focus {
      background: var(--bg-tertiary);
    }

    span {
      color: transparent;
      user-select: none;
      font-size: large;
    }
  }

  &[open] > summary {
    border-radius: 15% 15% 0 0;
  }

  & > ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    margin: 0;
    min-height: 2.5rem;
    padding-top: 2rem;
    background: var(--bg-accent);
    border-radius: 0 0 15% 15%;
  }

  & > summary::-webkit-details-marker {
    display: none;
  }
}
</style>
