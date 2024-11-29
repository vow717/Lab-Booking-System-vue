<script setup lang="ts">
import HeaderView from '@/views/header/IndexView.vue'
</script>
<template>
  <div class="container">
    <HeaderView />
    <br />
    <br />
    <RouterView />
  </div>
</template>
<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}
</style>
