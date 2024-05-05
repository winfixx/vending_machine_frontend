<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

defineProps<{
  msg: string
  typeButton: ButtonHTMLAttributes['type']
}>()
</script>

<template>
  <button :type="typeButton" class="btn green py-1 px-4">{{ msg }}</button>
</template>

<style scoped lang="scss">
.btn {
  background-color: hsla(160, 100%, 37%, 0.2);
}
</style>
