<script setup lang="ts">
import type { Drink } from '@/models/Drink'
import BaseDrinkItem from './BaseDrinkItem.vue'

defineProps<{
  drinks: Drink[]
}>()
</script>

<template>
  <div class="row row-cols-2 gap-2 my-3 overflow-auto" style="max-height: 80vh">
    <BaseDrinkItem v-for="drink in drinks" :key="drink.id" :drink="drink" />
  </div>
</template>
