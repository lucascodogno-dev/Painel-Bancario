<template>
  <v-card-text class="pa-6 pt-0">
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="filters.start_date"
          label="Data inicial"
          type="date"
          variant="outlined"
          density="compact"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field
          v-model="filters.end_date"
          label="Data final"
          type="date"
          variant="outlined"
          density="compact"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          v-model="filters.transfer_type"
          :items="transferTypeOptions"
          label="Tipo"
          variant="outlined"
          density="compact"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-btn @click="handleFilter" block class="bg-primary" :loading="loading"> Filtrar </v-btn>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface Props {
  loading: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  filter: [filters: any]
}>()

const filters = reactive({
  start_date: '',
  end_date: '',
  transfer_type: '',
})

const transferTypeOptions = [
  { title: 'Todas', value: '' },
  { title: 'Enviadas', value: 'sent' },
  { title: 'Recebidas', value: 'received' },
]

const handleFilter = () => {
  emit('filter', { ...filters })
}
</script>

<style scoped>
.v-text-field .v-field,
.v-select .v-field {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.v-text-field .v-field:hover,
.v-select .v-field:hover {
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.v-text-field .v-field--focused,
.v-select .v-field--focused {
  border: 1px solid #667eea !important;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2) !important;
}
</style>
