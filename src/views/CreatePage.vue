<template>
  <div class="backdrop">
    <div class="stage">
      <div class="stage-box">
        <div class="c-header">
          <h3>Create new{{ showTitle }}</h3>
          <router-link ref="close" class="button button-clear" to="/">
            <p>✕</p>
            <hr />
            cancel
          </router-link>
        </div>
        <component
          :is="currentSeg"
          :folder="folder"
          @closeCreateUI="handleCloseCreateUI"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import { CreateUI, CreateUIFinal } from '../components/*'

export default {
  props: {
    folder: {
      type: String,
      validator: (value) => ['true', 'false'].indexOf(value) !== -1,
    },
  },
  components: {
    default: CreateUI,
    final: CreateUIFinal,
  },
  computed: {
    showTitle() {
      return typeof this.folder !== 'undefined'
        ? ` ${this.folder === 'true' ? 'folder' : 'list'}`
        : '...'
    },
    currentSeg() {
      return typeof this.folder === 'undefined' ? 'default' : 'final'
    },
  },
  methods: {
    handleCloseCreateUI() {
      this.$refs.close.$el.click()
    },
  },
}
</script>

<style lang="postcss" scoped>
.backdrop {
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--global-bg);
}

.stage {
  display: grid;
  place-items: center;
  height: 100%;

  .stage-box {
    width: 95%;
    @media (min-width: 20rem) and (max-width: 40rem) {
      width: 75%;
    }
    @media (min-width: 40rem) {
      width: 50%;
    }
  }
}

.c-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;

  a {
    height: min-content;
    text-transform: none;
    color: darkgray;
    padding: {
      left: 1rem;
      right: 1rem;
    }

    p {
      font-size: large;
      margin-bottom: 0;
    }

    hr {
      visibility: hidden;
      margin: -1rem 0;
    }
  }
}
</style>
