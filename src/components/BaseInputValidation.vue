<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'

defineProps<{
  title: string
  msgValid: string
  msgInvalid: string
  inputType: InputTypeHTMLAttribute
}>()
const fieldData = defineModel('fieldData')
</script>

<template>
  <div class="mb-3">
    <label :for="title" class="form-label">{{ title }}</label>
    <input
      v-model="fieldData"
      :type="inputType"
      class="form-control"
      :id="title"
      required
    />
    <div class="valid-feedback">{{ msgValid }}</div>
    <div class="invalid-feedback">{{ msgInvalid }}</div>
  </div>
</template>

<style lang=""></style>
