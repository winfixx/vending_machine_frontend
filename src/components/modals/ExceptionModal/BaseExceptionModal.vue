<script setup lang="ts">
import { Modal } from 'bootstrap'
import BaseGreenButton from '../../BaseGreenButton.vue'
import BaseRedTitleH2 from '../../BaseRedTitleH2.vue'
import { ID_MODAL_EXCEPTION } from '@/consts/base'

defineProps<{
  showModal: boolean
  title: string
  msg: string
}>()
</script>

<script lang="ts">
export default {
  data() {
    return {
      theModal: null as Modal | null
    }
  },
  watch: {
    showModal(value) {
      this.theModal?.toggle()
    }
  },
  mounted() {
    this.theModal = new Modal(document.getElementById(ID_MODAL_EXCEPTION) as Element)
  }
}
</script>

<template>
  <div :id="ID_MODAL_EXCEPTION" class="modal show" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <BaseRedTitleH2 :msg="title" />
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <p class="text-danger fs-5">{{ msg }}</p>
        </div>

        <div class="modal-footer">
          <BaseGreenButton msg="Закрыть" type-button="button" data-bs-dismiss="modal"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
