<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <h2 class="text-danger mt-2">{{ msg }}</h2>
</template>