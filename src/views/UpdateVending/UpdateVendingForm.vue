<script setup lang="ts">
import BaseGreenButton from '@/components/BaseGreenButton.vue'
import BaseExceptionModal from '@/components/modals/ExceptionModal/BaseExceptionModal.vue'
import LiveToastInfoSuccess from '@/components/toast/LiveToastInfoSuccess.vue'
import type { ExceptionReponse } from '@/dto/exceptions/ExceptionReponse'
import { useVendingStore } from '@/stores/useVendingStore'
import { useVendingsListStore } from '@/stores/useVendingsListStore'
import { mapActions, mapStores } from 'pinia'
import { Teleport } from 'vue'
</script>

<script lang="ts">
export default {
  data(vm) {
    return {
      amountMoneyVending: 0,
      titleVending: '',
      showUpdateVendingForm: false,
      showModalException: false,
      titleModal: '',
      messageModal: '',
      showToast: false,
      titleToast: '',
      messageToast: ''
    }
  },
  created() {
    this.amountMoneyVending = this.vendingStore.vending.amountMoney
    this.titleVending = this.vendingStore.vending.title
  },
  methods: {
    ...mapActions(useVendingsListStore, ['update']),
    async updateVending(event: Event) {
      event.preventDefault()

      if (this.amountMoneyVending || this.titleVending) {
        await this.update({
          idVendingMachine: this.vendingStore.vending.id,
          amountMoneyVendingMachine: this.amountMoneyVending,
          titleVendingMachine: this.titleVending
        })
          .then(async () => {
            await this.vendingStore.getById(this.vendingStore.vending.id)
            this.showToast = !this.showToast
            this.messageToast = 'Успешно обновлено'
            this.titleToast = 'Уведомление'
          })
          .catch(ex => {
            this.showModalException = !this.showModalException

            if (ex.response) {
              const exception = ex.response.data as ExceptionReponse
              this.titleModal = `Ошибка (${exception.status})`
              this.messageModal = exception.errorMessage
              return
            }

            this.titleModal = `Ошибка (${ex.code})`
            this.messageModal = ex.message
          })
      }
    }
  },
  computed: {
    ...mapStores(useVendingStore)
  }
}
</script>

<template>
  <Teleport to="body">
    <LiveToastInfoSuccess
      :msg="messageToast"
      :show-toast="showToast"
      :title="titleToast"
    />
    <BaseExceptionModal
      :msg="messageModal"
      :title="titleModal"
      :show-modal="showModalException"
    />
  </Teleport>

  <div v-show="!showUpdateVendingForm">
    <button class="btn text-white" @click="showUpdateVendingForm = true">
      Изменить данные аппарата...
    </button>
  </div>
  <div v-show="showUpdateVendingForm">
    <button class="btn text-white" @click="showUpdateVendingForm = false">
      Скрыть...
    </button>

    <form @submit="updateVending">
      <div class="mb-3">
        <label for="titleVending" class="form-label">Название аппарата</label>
        <input
          v-model="titleVending"
          type="text"
          class="form-control"
          id="titleVending"
        />
      </div>
      <div class="mb-3">
        <label for="amountMoneyVending" class="form-label">
          Сумма денег в аппарате
        </label>
        <input
          v-model="amountMoneyVending"
          type="text"
          class="form-control"
          id="amountMoneyVending"
        />
      </div>

      <BaseGreenButton msg="Сохранить" type-button="submit" />
    </form>
  </div>
</template>
