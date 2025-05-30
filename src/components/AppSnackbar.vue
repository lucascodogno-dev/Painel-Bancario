<template>
  <v-snackbar v-model="internalShow" :color="modelValue.color" :timeout="2000" location="top">
    {{ modelValue.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Snackbar } from '../types'

interface Props {
  modelValue: Snackbar
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: Snackbar]
}>()

const internalShow = computed({
  get: () => props.modelValue.show,
  set: (value: boolean) => {
    emit('update:modelValue', { ...props.modelValue, show: value })
  },
})
</script>

<style scoped>
.v-snackbar {
  backdrop-filter: blur(10px);
}
</style>
