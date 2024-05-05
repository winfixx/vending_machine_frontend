<script setup lang="ts">
import BaseGreenButton from '@/components/BaseGreenButton.vue'
import BaseGreenTitleH2 from '@/components/BaseGreenTitleH2.vue'
import BaseInputValidation from '@/components/BaseInputValidation.vue'
import BaseVendingsList from '@/components/BaseVendingsList.vue'
import LiveToastInfoSuccess from '@/components/toast/LiveToastInfoSuccess.vue'
import { ADMIN_ROUTE } from '@/consts/routes'
import { vendingsListStore } from '@/main'
import { UserRole } from '@/models/enum/UserRole'
import { useUserStore } from '@/stores/useUserStore'
import { mapStores } from 'pinia'
import { Teleport } from 'vue'
</script>
<script lang="ts">
export default {
  data(vm) {
    return {
      titleVendingMachine: '',
      amountMoneyVendingMachine: 0,
      showAddVendingForm: false,
      showToast: false,
      titleToast: '',
      messageToast: ''
    }
  },
  methods: {
    async addVending(event: Event) {
      event.preventDefault()

      if (!this.titleVendingMachine || !this.amountMoneyVendingMachine) return

      await vendingsListStore
        .add({
          titleVendingMachine: this.titleVendingMachine,
          amountMoneyVendingMachine: this.amountMoneyVendingMachine
        })
        .then(async () => {
          await vendingsListStore.getAll()
          this.messageToast = 'Успешно'
          this.titleToast = 'Уведомление'
          this.showToast = !this.showToast
          this.titleVendingMachine = ''
          this.amountMoneyVendingMachine = 0
        })
    }
  },
  computed: {
    ...mapStores(useUserStore, vendingsListStore),
    accessToAdminPanel() {
      return this.userStore.user.role === UserRole.Admin ? true : false
    }
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
  </Teleport>

  <div>
    <BaseGreenTitleH2 msg="Админ панель" class="text-center mt-3" />

    <div v-if="accessToAdminPanel">
      <BaseVendingsList :link-to="ADMIN_ROUTE" />

      <div class="mt-2">
        <button
          class="btn text-white"
          v-show="!showAddVendingForm"
          @click="showAddVendingForm = true"
        >
          Добавить аппарат...
        </button>
        <div v-show="showAddVendingForm">
          <button class="btn text-white" @click="showAddVendingForm = false">
            Скрыть...
          </button>
          <form @submit="addVending" class="was-validated">
            <BaseInputValidation
              v-model:field-data="titleVendingMachine"
              msg-valid="Все хорошо!"
              msg-invalid="Пожалуйста, выберите название аппарата"
              title="Название аппарата"
              input-type="text"
            />
            <BaseInputValidation
              v-model:field-data="amountMoneyVendingMachine"
              msg-valid="Все хорошо!"
              msg-invalid="Пожалуйста, укажите сумму денег в аппарат."
              title="Сумма денег"
              input-type="text"
            />

            <BaseGreenButton
              :disabled="!titleVendingMachine || !amountMoneyVendingMachine"
              msg="Добавить"
              type-button="submit"
            />
          </form>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-danger text-center mt-3" style="font-size: 20px">
        У вас недостаточно прав доступа
      </p>
    </div>
  </div>
</template>
