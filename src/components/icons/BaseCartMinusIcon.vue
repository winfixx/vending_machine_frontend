<script setup lang="ts">
defineProps<{
  disabled: boolean
}>()
</script>

<template>
  <button :disabled="disabled">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="29"
      :fill="disabled ? 'gray' : 'white'"
      class="bi bi-dash mx-1"
      viewBox="0 0 16 16"
      style="cursor: pointer"
    >
      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
    </svg>
  </button>
</template>

<style scoped lang="scss">
button {
  background: none;
  outline: none;
  border: none;
}
</style>
