<script setup lang="ts">
import BaseGreenButton from '@/components/BaseGreenButton.vue'
import BaseInputValidation from '@/components/BaseInputValidation.vue'
import BaseExceptionModal from '@/components/modals/ExceptionModal/BaseExceptionModal.vue'
import type { ExceptionReponse } from '@/dto/exceptions/ExceptionReponse'
import { useDrinkStore } from '@/stores/useDrinkStore'
import { useVendingStore } from '@/stores/useVendingStore'
import { mapStores } from 'pinia'
import { Teleport } from 'vue'
</script>
<script lang="ts">
export default {
  data(vm) {
    return {
      showAddDrinkForm: false,
      countDrink: 0,
      imageDrink: undefined as File | undefined,
      priceDrink: 0,
      titleDrink: '',
      showModalException: false,
      titleModal: '',
      messageModal: ''
    }
  },
  methods: {
    async addDrink(event: Event) {
      event.preventDefault()

      if (
        this.countDrink &&
        this.imageDrink?.name &&
        this.priceDrink &&
        this.titleDrink
      )
        await this.drinkStore
          .add({
            countDrink: this.countDrink,
            imageDrink: this.imageDrink,
            priceDrink: this.priceDrink,
            titleDrink: this.titleDrink,
            vendingMachineId: this.vendingStore.vending.id
          })
          .then(() => {
            this.vendingStore.getById(this.vendingStore.vending.id)
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
  <Teleport to="body">
    <BaseExceptionModal
      :msg="messageModal"
      :title="titleModal"
      :show-modal="showModalException"
    />
  </Teleport>

  <div v-show="!showAddDrinkForm">
    <button class="btn text-white" @click="showAddDrinkForm = true">
      Добавить напиток в аппарат
    </button>
  </div>
  <div v-show="showAddDrinkForm">
    <button class="btn text-white" @click="showAddDrinkForm = false">
      Скрыть...
    </button>

    <form @submit="addDrink" class="was-validated">
      <BaseInputValidation
        v-model:field-data="titleDrink"
        msg-valid="Все хорошо!"
        msg-invalid="Пожалуйста, выберите название напитка."
        title="Название напитка"
        input-type="text"
      />
      <BaseInputValidation
        v-model:field-data="priceDrink"
        msg-valid="Все хорошо!"
        msg-invalid="Пожалуйста, укажите цену напитка."
        title="Цена напитка"
        input-type="number"
      />
      <BaseInputValidation
        v-model:field-data="countDrink"
        msg-valid="Все хорошо!"
        msg-invalid="Пожалуйста, укажите кол-во напитков."
        title="Кол-во напитков"
        input-type="number"
      />
      <div class="mb-3">
        <label for="imageDrink" class="form-label">Изображение напитка</label>
        <input
          id="imageDrink"
          @change="onUploadFile"
          type="file"
          class="form-control"
          accept="image/jpeg, image/png"
          required
        />
        <div class="valid-feedback">Все хорошо</div>
        <div class="invalid-feedback">
          Пример обратной связи неверной формы выбора файла
        </div>
      </div>

      <BaseGreenButton msg="Добавить" type-button="submit" />
    </form>
  </div>
</template>
