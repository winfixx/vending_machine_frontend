<script setup lang="ts">
import BaseGreenButton from '@/components/BaseGreenButton.vue'
import BaseGreenTitleH2 from '@/components/BaseGreenTitleH2.vue'
import BaseInputValidation from '@/components/BaseInputValidation.vue'
import BaseExceptionModal from '@/components/modals/ExceptionModal/BaseExceptionModal.vue'
import { HOME_ROUTE } from '@/consts/routes'
import type { ExceptionReponse } from '@/dto/exceptions/ExceptionReponse'
import { useUserStore } from '@/stores/useUserStore'
import { mapActions } from 'pinia'
import { Teleport } from 'vue'
</script>
<script lang="ts">
export default {
  data() {
    return {
      userName: '',
      password: '',
      showModalException: false,
      titleModal: '',
      messageModal: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['login']),
    async submit(event: Event) {
      event.preventDefault()

      if (!this.userName || !this.password) {
        return
      }

      await this.login({
        password: this.password,
        userName: this.userName
      })
        .then(() => this.$router.push(HOME_ROUTE))
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
  <div>
    <BaseGreenTitleH2 msg="Логин" class="mt-3 text-center" />

    <form @submit="submit" class="was-validated">
      <BaseInputValidation
        v-model:field-data="userName"
        msg-valid="Все хорошо!"
        msg-invalid="Пожалуйста, выберите имя пользователя."
        title="Имя"
        input-type="text"
      />
      <BaseInputValidation
        v-model:field-data="password"
        msg-valid="Все хорошо!"
        msg-invalid="Пожалуйста, укажите пароль."
        title="Пароль"
        input-type="password"
      />

      <BaseGreenButton msg="Войти" type-button="submit" />
    </form>
  </div>
</template>
