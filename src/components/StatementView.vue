<template>
  <v-card class="rounded-xl bg-dark-surface" elevation="12">
    <v-card-title class="text-white font-weight-bold pa-6">
      <v-icon class="mr-2">mdi-file-document</v-icon>
      Extrato Completo
    </v-card-title>

    <!-- Filters -->
    <StatementFilters @filter="handleFilter" :loading="loading" />

    <!-- Transactions List -->
    <v-card-text class="pa-0">
      <v-list class="bg-transparent">
        <v-list-item
          v-for="(transaction, index) in statements"
          :key="index"
          class="px-6 py-4 border-b border-grey-800"
        >
          <template v-slot:prepend>
            <v-avatar
              :color="transaction.transfer_type === 'sent' ? 'error' : 'success'"
              class="mr-4"
            >
              <v-icon>
                {{
                  transaction.transfer_type === 'sent' ? 'mdi-arrow-up-bold' : 'mdi-arrow-down-bold'
                }}
              </v-icon>
            </v-avatar>
          </template>

          <div>
            <v-list-item-title class="text-white font-weight-medium">
              {{
                transaction.transfer_type === 'sent'
                  ? 'Transferência Enviada'
                  : 'Transferência Recebida'
              }}
            </v-list-item-title>

            <v-list-item-subtitle class="text-grey-400">
              {{ formatDate(transaction.created_at) }}
            </v-list-item-subtitle>

            <v-chip
              :color="transaction.status === 'success' ? 'success' : 'error'"
              size="small"
              class="mt-2"
            >
              {{ transaction.status === 'success' ? 'Sucesso' : 'Falha' }}
            </v-chip>
          </div>

          <template v-slot:append>
            <div class="text-right">
              <div
                :class="transaction.transfer_type === 'sent' ? 'text-error' : 'text-success'"
                class="font-weight-bold text-h6"
              >
                {{ transaction.transfer_type === 'sent' ? '-' : '+'
                }}{{ formatCurrency(transaction.amount) }}
              </div>
              <div class="text-grey-400 text-caption">
                {{ transaction.transfer_method === 1 ? 'PIX' : 'TED' }}
              </div>
            </div>
          </template>
        </v-list-item>
      </v-list>

      <!-- Pagination -->
      <div class="pa-6" v-if="pagination.total_pages > 1">
        <v-pagination
          :model-value="pagination.current_page"
          :length="pagination.total_pages"
          @update:model-value="$emit('update-page', $event)"
          class="justify-center"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import StatementFilters from './StatementFilters.vue'
import { formatCurrency, formatDate } from '../utils/api'
import type { Transaction, Pagination } from '../types'

interface Props {
  statements: Transaction[]
  loading: boolean
  pagination: Pagination
}

defineProps<Props>()

const emit = defineEmits<{
  'load-statements': [filters: any]
  'update-page': [page: number]
}>()

const handleFilter = (filters: any) => {
  emit('load-statements', filters)
}
</script>

<style scoped>
.bg-dark-surface {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.border-b {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.border-grey-800 {
  border-color: rgba(255, 255, 255, 0.1);
}

.v-pagination .v-pagination__item {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

.v-pagination .v-pagination__item--is-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border: 1px solid transparent !important;
}
</style>
