<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
  </div>
</template>

<style scoped lang="scss">
.greetings {
  h1 {
    font-weight: 500;
    font-size: 2.6rem;
    position: relative;
    text-align: center;
  }
}
@media (min-width: 1024px) {
  .greetings {
    h1 {
      text-align: left;
    }
  }
}
</style>
