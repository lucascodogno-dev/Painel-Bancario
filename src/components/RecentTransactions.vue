<template>
  <v-card class="rounded-xl bg-dark-surface" elevation="8">
    <v-card-title class="text-white font-weight-bold">
      <v-icon class="mr-2">mdi-history</v-icon>
      Últimas Transações
    </v-card-title>

    <v-card-text class="pa-0">
      <v-list class="bg-transparent">
        <v-list-item v-for="(transaction, index) in transactions" :key="index" class="px-6 py-4">
          <template v-slot:prepend>
            <v-avatar
              :color="transaction.transfer_type === 'sent' ? 'error' : 'success'"
              class="mr-4"
            >
              <v-icon>
                {{ transaction.transfer_type === 'sent' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
              </v-icon>
            </v-avatar>
          </template>

          <v-list-item-title class="text-white font-weight-medium">
            {{ transaction.transfer_type === 'sent' ? 'Enviado' : 'Recebido' }}
          </v-list-item-title>

          <v-list-item-subtitle class="text-grey-400">
            {{ formatDate(transaction.created_at) }}
          </v-list-item-subtitle>

          <template v-slot:append>
            <span
              :class="transaction.transfer_type === 'sent' ? 'text-error' : 'text-success'"
              class="font-weight-bold"
            >
              {{ transaction.transfer_type === 'sent' ? '-' : '+'
              }}{{ formatCurrency(transaction.amount) }}
            </span>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { formatCurrency, formatDate } from '../utils/api'
import type { Transaction } from '../types'

interface Props {
  transactions: Transaction[]
}

defineProps<Props>()
</script>

<style scoped>
.bg-dark-surface {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
