<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <h2 class="green">{{ msg }}</h2>
</template>