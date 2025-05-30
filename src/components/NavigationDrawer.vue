<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    app
    class="bg-dark-surface"
    width="280"
    expand-on-hover
  >
    <v-list class="py-4">
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        @click="$emit('update-view', item.value)"
        :class="{ 'v-list-item--active': currentView === item.value }"
        class="mb-2 mx-3 rounded-xl"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import type { MenuItem } from '../types'

interface Props {
  modelValue: boolean
  currentView: string
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: boolean]
  'update-view': [view: string]
}>()

const menuItems: MenuItem[] = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', value: 'dashboard' },
  { title: 'Transferir', icon: 'mdi-bank-transfer', value: 'transfer' },
  { title: 'Extrato', icon: 'mdi-file-document', value: 'statement' },
]
</script>

<style scoped>
.bg-dark-surface {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.v-list-item--active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
}

.v-list-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  margin: 4px 0;
}

.v-list-item:hover:not(.v-list-item--active) {
  background: rgba(255, 255, 255, 0.05) !important;
  transform: translateX(4px);
}
</style>
