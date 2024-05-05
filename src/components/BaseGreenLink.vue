<script setup lang="ts">
defineProps<{
  linkTo: string
  msg: string
}>()
</script>

<template>
  <RouterLink :to="linkTo">{{ msg }}</RouterLink>
</template>

<style scoped lang="scss">
a {
  display: inline-block;
  font-size: 1rem;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);

  &.router-link-exact-active {
    color: var(--color-text);

    &:hover {
      background-color: transparent;
    }
  }
}
</style>
