<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

defineProps<{
  msg: string
  typeButton: ButtonHTMLAttributes['type']
}>()
</script>

<template>
  <button :type="typeButton" class="btn red p-1 px-4">{{ msg }}</button>
</template>

<style scoped lang="scss">
.btn {
  background-color: hsla(0, 67%, 49%, 0.2);
}
</style>
