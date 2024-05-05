<script setup lang="ts">
import { useVendingsListStore } from '@/stores/useVendingsListStore'
import { mapStores } from 'pinia'
import BaseGreenLink from './BaseGreenLink.vue'

defineProps<{
  linkTo: string
}>()
</script>
<script lang="ts">
export default {
  computed: {
    ...mapStores(useVendingsListStore)
  },
  async created() {
    await this.vendingsListStore.getAll()
  }
}
</script>

<template>
  <ul class="list-group mx-0 overflow-auto" style="max-height: 80vh">
    <BaseGreenLink
      v-for="vending in vendingsListStore.vendingsList"
      :key="vending.id"
      :link-to="`${linkTo}/${vending.id}`"
      :msg="vending.title"
      class="m-1"
    />
  </ul>
</template>

<style lang=""></style>
