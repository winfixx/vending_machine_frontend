<script setup lang="ts">
import BaseGreenTitleH2 from '@/components/BaseGreenTitleH2.vue'
import BaseRedTitleH2 from '@/components/BaseRedTitleH2.vue'
import { vendingStore } from '@/main'
import { useVendingStore } from '@/stores/useVendingStore'
import { mapStores } from 'pinia'
import { Teleport } from 'vue'
import AddDrinkInVendingForm from './AddDrinkInVendingForm.vue'
import DrinksList from './DrinksList.vue'
import InfoAboutVending from './InfoAboutVending.vue'
import UpdateModal from './UpdateModal.vue'
import UpdateVendingForm from './UpdateVendingForm.vue'
</script>
<script lang="ts">
export default {
  data(vm) {
    return {}
  },
  async created() {
    const params = this.$route.params
    if (params) await this.vendingStore.getById(params.id.toString())
  },
  computed: {
    ...mapStores(useVendingStore)
  }
}
</script>

<template>
  <Teleport to="body">
    <UpdateModal />
  </Teleport>
  <div v-if="vendingStore.vending.id">
    <div>
      <BaseGreenTitleH2
        class="mt-3 text-center"
        :msg="vendingStore.vending.title"
      />
    </div>

    <UpdateVendingForm />

    <AddDrinkInVendingForm />

    <InfoAboutVending />

    <DrinksList />
  </div>
  <div v-else>
    <BaseRedTitleH2 class="text-center" msg="Такого аппарата нет" />
  </div>
</template>
