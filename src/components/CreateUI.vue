<template>
  <div class="row c-ui">
    <router-link
      to="/create?folder=false"
      class="column column-40 c-ui-type button button-outline"
    >
      <span data-type="icon"> 📜 </span>
      <router-link to="/create?folder=false" class="button">list</router-link>
    </router-link>
    <router-link
      to="/create?folder=true"
      class="column column-40 c-ui-type button button-outline"
    >
      <span data-type="icon"> 📚 </span>
      <router-link to="/create?folder=true" class="button">folder</router-link>
    </router-link>
  </div>
</template>

<style lang="postcss" scoped>
.c-ui {
  justify-content: space-around;
  align-items: center;
}

.c-ui-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: min-content;

  [data-type='icon'] {
    font-size: xx-large;
  }
}
</style>
