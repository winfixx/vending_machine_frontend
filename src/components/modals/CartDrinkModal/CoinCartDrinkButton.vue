<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore'
import { mapStores } from 'pinia'

defineProps<{
  coin: string
  amountDeposited: number,
  overflowCoin: boolean
}>()
</script>
<script lang="ts">
export default {
  methods: {
    insertCoinsClick() {
      this.$emit('insertCoinsClick', this.coin)
    }
  },
  computed: {
    ...mapStores(useUserStore),
    disabledInsertCoins() {
      return this.amountDeposited + +this.coin > this.userStore.user.amountMoney
        ? true
        : false
    }
  }
}
</script>

<template>
  <button
    :disabled="disabledInsertCoins || overflowCoin"
    class="btn btn-primary"
    @click="insertCoinsClick"
  >
    {{ coin }}
  </button>
</template>
