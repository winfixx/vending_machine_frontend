<script setup lang="ts">
import BaseGreenButton from '@/components/BaseGreenButton.vue'
import BaseGreenTitleH2 from '@/components/BaseGreenTitleH2.vue'
import { ID_MODAL_UPDATE } from '@/consts/base'
import UpdateDrinkForm from './UpdateDrinkForm.vue'
</script>

<script lang="ts"></script>

<template>
  <div :id="ID_MODAL_UPDATE" class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <BaseGreenTitleH2 msg="Обновление напитка" />
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <UpdateDrinkForm />
        </div>

        <div class="modal-footer">
          <BaseGreenButton
            msg="Закрыть"
            type-button="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
      </div>
    </div>
  </div>
</template>
