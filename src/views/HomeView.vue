<script setup lang="ts">
import BaseGreenTitleH2 from '@/components/BaseGreenTitleH2.vue'
import BaseRedTitleH2 from '@/components/BaseRedTitleH2.vue'
import BaseVendingsList from '@/components/BaseVendingsList.vue'
import { useUserStore } from '@/stores/useUserStore'
import { VENDING_MACHINE_ROUTE } from '@/consts/routes'
import { mapStores } from 'pinia'
</script>
<script lang="ts">
export default {
  computed: {
    ...mapStores(useUserStore)
  }
}
</script>

<template>
  <div v-if="userStore.user.id">
    <BaseGreenTitleH2 class="text-center mt-3" msg="Список аппаратов" />
    <BaseVendingsList :link-to="VENDING_MACHINE_ROUTE"/>
  </div>
  <div v-else>
    <BaseRedTitleH2 class="text-center" msg="Не авторизован" />
  </div>
</template>