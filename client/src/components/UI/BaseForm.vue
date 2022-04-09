<template>
  <v-card class="d-flex flex-column justify-center pa-2 elevation-5">
    <v-card-title primary-title class="justify-center" v-if="title">
      <h2 class="primary--text text--accent-3">{{ title }}</h2>
    </v-card-title>
    <v-card-text class="d-flex justify-center py-0">
      <v-form class="form" id="login-form">
        <slot name="fields"></slot>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <slot name="buttons"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
}
</style>
