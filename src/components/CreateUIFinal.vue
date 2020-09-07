<template>
  <form @submit.prevent="submit">
    <div class="row ui-final-input">
      <div class="column" data-side="left">
        <label for="name">{{ type }} name</label>
        <input ref="nameInput" type="text" name="name" v-model="name" />
      </div>
      <div class="column" data-side="right">
        <folder
          v-if="folder === 'true'"
          :name="name"
          @payload="processPayload"
        />
        <list v-else :name="name" @payload="processPayload" />
      </div>
    </div>
    <div class="ui-final-panel">
      <router-link to="/create" class="button button-clear">← back</router-link>
      <div></div>
      <input type="submit" value="create" class="button" />
    </div>
  </form>
</template>

<script>
/* eslint-disable no-unused-vars */
import { hash, getRandom } from '../utils'

const components = {
  list: {
    render(h) {
      return (
        <fragment>
          {!this.pic ? (
            <span>No icon selected.</span>
          ) : (
            <span>Selected icon: </span>
          )}
          <img title={this.name} src={this.pic} />
          <input
            type="file"
            name="pic"
            accept="image/*"
            onChange={this.onPicChange}
          />
        </fragment>
      )
    },
    props: ['name'],
    data() {
      return {
        pic: '',
      }
    },
    methods: {
      onPicChange(e) {
        let file = e.target.files[0] || e.dataTransfer.files[0]
        let img

        const reader = new FileReader()
        reader.onloadend = function () {
          img = new Image()
          img.onload = function () {
            if (!(img.width <= 96 && img.height <= 96)) {
              alert(
                `Selected picture is not valid, valid: smaller than 96x96; detected ${img.width}x${img.height}`
              )
              return
            }

            this.pic = reader.result
            this.$emit('payload', {
              pic: this.pic,
            })
          }.bind(this)
          img.src = reader.result
        }.bind(this)

        if (file) reader.readAsDataURL(file)
      },
    },
  },
  folder: {
    render(h) {
      return (
        <fragment>
          <div>
            <span>Selected color: </span>
            <span
              style={{
                color: 'transparent',
                textShadow: `0 0 0 ${this.color ? this.color : '#000'}`,
                userSelect: 'none',
                fontSize: 'larger',
              }}
              title={this.name}
            >
              📁
            </span>
          </div>
          <input type="color" name="color" onChange={this.onColorChange} />
        </fragment>
      )
    },
    props: ['name'],
    data() {
      return {
        color: '',
      }
    },
    methods: {
      onColorChange(e) {
        this.color = e.target.value
        this.$emit('payload', {
          color: this.color,
        })
      },
    },
  },
}

export default {
  props: {
    folder: {
      type: String,
      required: true,
      validator: (value) => ['true', 'false'].indexOf(value) !== -1,
    },
  },
  data() {
    return {
      name: '',
      payload: {},
    }
  },
  computed: {
    id() {
      let name = this.name
      return hash(name + getRandom())
    },
    type() {
      return this.folder === 'true' ? 'folder' : 'list'
    },
  },
  mounted() {
    this.$refs.nameInput.focus()
  },
  components,
  methods: {
    processPayload(payload) {
      this.payload = payload
    },
    submit() {
      if (this.name) {
        this.$emit('closeCreateUI')
        this.$store.dispatch('sidebar/append', {
          folder: this.folder,
          name: this.name,
          id: this.id,
          ...this.payload,
        })
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.ui-final-input {
  [data-side='left'] {
    label {
      text-transform: capitalize;
    }

    input {
      @media (prefers-color-scheme: dark) {
        color: white;
      }
    }
  }
}

.ui-final-panel {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  background: var(--bg-tertiary);
  padding: 1rem;

  a {
    margin-bottom: 0;
  }

  input {
    margin-bottom: 0;
  }
}
</style>
