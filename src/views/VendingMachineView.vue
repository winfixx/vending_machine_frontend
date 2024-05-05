<script setup lang="ts">
import BaseGreenTitleH2 from '@/components/BaseGreenTitleH2.vue'
import BaseRedTitleH2 from '@/components/BaseRedTitleH2.vue'
import BaseDrinksList from '@/components/DrinkList/BaseDrinksList.vue'
import BaseCartIcon from '@/components/icons/BaseCartIcon.vue'
import TheCartDrinkModal from '@/components/modals/CartDrinkModal/TheCartDrinkModal.vue'
import { useCartDrinkStore } from '@/stores/useCartDrinkStore'
import { useVendingStore } from '@/stores/useVendingStore'
import { mapStores } from 'pinia'
</script>
<script lang="ts">
export default {
  data(vm) {
    return {
      showModal: false
    }
  },
  async created() {
    const params = this.$route.params
    if (params) {
      await this.vendingStore.getById(params.id.toString())

      this.cartDrinkStore.addCart(params.id.toString())
    }
  },
  computed: {
    ...mapStores(useCartDrinkStore, useVendingStore)
  },
  provide() {
    return {
      vendingId: this.$route.params.id
    }
  }
}
</script>

<template>
  <Teleport to="body">
    <TheCartDrinkModal :show-modal="showModal" />
  </Teleport>

  <div v-if="vendingStore.vending.id">
    <div class="d-flex justify-content-around align-items-center mt-3">
      <BaseGreenTitleH2 :msg="vendingStore.vending.title" />

      <BaseCartIcon @click="showModal = !showModal" />
    </div>

    <BaseDrinksList
      :drinks="vendingStore.vending.drinks"
      v-if="!!vendingStore.vending.drinks.length"
    />
    <div v-else>
      <p class="text-danger text-center" style="font-size: 20px">
        В аппарате нет напитков
      </p>
    </div>
  </div>
  <div v-else>
    <BaseRedTitleH2 class="text-center" msg="Такого аппарата нет" />
  </div>
</template>
