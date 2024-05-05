<script setup lang="ts">
import { ID_TOAST_INFO_SUCCESS } from '@/consts/base'
import { Toast } from 'bootstrap'

defineProps<{
  title: string
  msg: string
  showToast: boolean
}>()
</script>

<script lang="ts">
export default {
  data() {
    return {
      theToast: null as Toast | null
    }
  },
  watch: {
    showToast(value) {
      if (this.theToast?.isShown) {
        this.theToast.hide()
      }
      this.theToast?.show()
    }
  },
  mounted() {
    this.theToast = new Toast(
      document.getElementById(ID_TOAST_INFO_SUCCESS) as Element
    )
  }
}
</script>

<template>
  <div class="position-fixed top-0 end-0 p-3" style="z-index: 2000">
    <div
      :id="ID_TOAST_INFO_SUCCESS"
      class="toast hide"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header bg-dark">
        <strong class="me-auto text-white">
          {{ title }}
        </strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body bg-dark">
        <span class="green">
          {{ msg }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
