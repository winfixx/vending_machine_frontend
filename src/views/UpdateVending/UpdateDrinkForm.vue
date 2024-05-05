<script setup lang="ts">
import BaseGreenButton from '@/components/BaseGreenButton.vue'
import { useDrinkStore } from '@/stores/useDrinkStore'
import { useVendingStore } from '@/stores/useVendingStore'
import { mapStores } from 'pinia'
</script>
<script lang="ts">
export default {
  data(vm) {
    return {
      countDrink: 0,
      imageDrink: undefined as File | undefined,
      priceDrink: 0,
      titleDrink: ''
    }
  },
  methods: {
    async updateDrink(event: Event) {
      event.preventDefault()

      if (
        this.countDrink ||
        this.imageDrink?.name ||
        this.priceDrink ||
        this.titleDrink
      )
        await this.drinkStore
          .update({
            countDrink: this.countDrink,
            imageDrink: this.imageDrink,
            priceDrink: this.priceDrink,
            titleDrink: this.titleDrink,
            drinkId: this.drinkStore.currentDrink.drinkId
          })
          .then(() => {
            this.vendingStore.getById(this.vendingStore.vending.id)
          })
    },
    onUploadFile(event: Event) {
      const files = (<HTMLInputElement>event.target).files
      let file = files?.length ? files[0] : undefined
      this.imageDrink = file
    }
  },
  computed: {
    ...mapStores(useVendingStore, useDrinkStore)
  }
}
</script>

<template>
  <form @submit="updateDrink">
    <div class="mb-3">
      <label for="titleDrinkUpdate" class="form-label">Название напитка</label>
      <input
        id="priceDrinkUpdate"
        v-model="titleDrink"
        type="text"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <label for="priceDrinkUpdate" class="form-label">Цена напитка</label>
      <input
        id="priceDrinkUpdate"
        v-model="priceDrink"
        type="number"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <label for="countDrinkUpdate" class="form-label">Кол-во напитков</label>
      <input
        id="countDrinkUpdate"
        v-model="countDrink"
        type="number"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <label for="imageDrink" class="form-label">Изображение напитка</label>
      <input
        id="imageDrink"
        @change="onUploadFile"
        type="file"
        class="form-control"
        accept="image/jpeg, image/png"
      />
    </div>

    <BaseGreenButton msg="Сохранить" type-button="submit" />
  </form>
</template>
