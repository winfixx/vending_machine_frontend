<script setup lang="ts">
defineProps<{
  disabled: boolean
}>()
</script>

<template>
  <button
    :disabled="disabled"
    class="btn py-1 px-4 d-flex justify-content-center align-items-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="19"
      :fill="disabled ? 'hsla(0, 67%, 49%, 1)' : 'red'"
      class="bi bi-cart-dash mx-1"
      viewBox="0 0 16 16"
      style="cursor: pointer"
    >
      <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
      <path
        d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
      />
    </svg>
  </button>
</template>

<style scoped lang="scss">
button {
  background-color: hsla(0, 67%, 49%, 0.2);

  &:hover {
    background-color: hsla(0, 67%, 49%, 0.1);
  }
}
</style>
