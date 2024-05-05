<script setup lang="ts">
import { vendingStore } from '@/main'
</script>

<template>
  <div class="my-3">
    <p class="m-0">
      Сумма денег в автомате: {{ vendingStore.vending.amountMoney }} р.
    </p>
    <p class="m-0">
      Кол-во напитков в автомате: {{ vendingStore.vending.drinks.length }}
    </p>
  </div>
</template>