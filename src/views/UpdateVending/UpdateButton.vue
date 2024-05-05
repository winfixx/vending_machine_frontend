<script setup lang="ts">
import { ID_MODAL_UPDATE } from '@/consts/base'
import { useDrinkStore } from '@/stores/useDrinkStore'
import { mapActions } from 'pinia'

defineProps<{
  disabled: boolean
  drink: {
    id: string
    price: number
    title: string
    image: string
    count: number
  }
}>()
</script>
<script lang="ts">
export default {
  data(vm) {
    return {
      showModal: true
    }
  },
  methods: {
    ...mapActions(useDrinkStore, ['setDrink'])
  }
}
</script>

<template>
  <button
    @click="
      setDrink({
        drinkId: drink.id,
        countDrink: drink.count,
        imageDrink: undefined,
        priceDrink: drink.price,
        titleDrink: drink.title
      })
    "
    data-bs-toggle="modal"
    :data-bs-target="`#${ID_MODAL_UPDATE}`"
    :disabled="disabled"
    class="btn py-1 px-4 d-flex justify-content-center align-items-center w-100"
  >
    <span
      :style="{
        color: disabled
          ? 'hsla(160, 100%, 37%, 0.5)'
          : 'hsla(160, 100%, 37%, 1)'
      }"
    >
      Обновить
    </span>
  </button>
</template>

<style scoped lang="scss">
button {
  background-color: hsla(160, 100%, 37%, 0.2);

  &:hover {
    background-color: hsla(160, 100%, 37%, 0.1);
  }
}
</style>
