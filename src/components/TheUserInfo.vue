<script setup lang="ts">
import { mapActions, mapStores } from 'pinia'
import { useUserStore } from '@/stores/useUserStore'
</script>
<script lang="ts">
export default {
  data(vm) {
    return {
      balance: 0
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    ...mapActions(useUserStore, ['update']),
    async fillBalance(event: Event) {
      event.preventDefault()

      await this.update({
        userId: this.userStore.user.id,
        amountMoney: this.balance
      })

      this.balance = 0
    }
  }
}
</script>

<template>
  <div v-if="userStore.user.id">
    <p class="my-3">Состояние: {{ userStore.user.amountMoney }} р.</p>

    <form class="mb-3" @submit="fillBalance">
      <label class="form-label" for="changeBalanceInput">
        Пополнить баланс
      </label>
      <div class="input-group">
        <input
          type="number"
          class="form-control"
          id="changeBalanceInput"
          placeholder="Пополнить баланс"
          v-model="balance"
        />
        <button
          class="btn btn-outline-secondary green"
          type="submit"
          id="button-addon2"
        >
          Пополнить
        </button>
      </div>
    </form>
  </div>
</template>

<style lang=""></style>
