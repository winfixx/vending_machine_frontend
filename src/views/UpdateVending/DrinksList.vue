<script setup lang="ts">
import { BASE_STATIC_API_URL } from '@/consts/base'
import { vendingStore } from '@/main'
import GarbageButton from '@/views/UpdateVending/GarbageButton.vue'
import UpdateButton from './UpdateButton.vue'

defineProps()
</script>

<template>
  <div class="row row-cols-2 gap-2 my-3 overflow-auto" style="max-height: 80vh">
    <div
      v-for="drink in vendingStore.vending.drinks"
      :key="drink.id"
      class="card col border-2 border-dark p-0 position-relative"
      style="width: 15rem; background: #181818"
    >
      <img
        :src="BASE_STATIC_API_URL + `/${drink.image}`"
        class="card-img-top"
        style="max-width: 100%; max-height: 170px; object-fit: cover"
      />
      <div
        class="card-body d-flex flex-column py-2 justify-content-between gap-2"
      >
        <div>
          <h5 class="card-title text-white">{{ drink.title }}</h5>

          <p class="card-text text-white">
            <span>Кол-во в автомате: {{ drink.count }}</span> <br />
            <span> Цена: {{ drink.price }}</span> <br />
          </p>
        </div>

        <div class="mt-2">
          <UpdateButton :disabled="false" :drink="drink" />
          <GarbageButton class="mt-1" :drink-id="drink.id" :disabled="false" />
        </div>
      </div>
    </div>
  </div>
</template>
