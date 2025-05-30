<template>
  <v-card class="rounded-xl bg-gradient-primary text-white mb-6" elevation="12">
    <v-card-text class="pa-8">
      <div class="d-flex justify-space-between align-center mb-4">
        <div>
          <h2 class="text-h4 font-weight-bold mb-2">{{ userInfo?.name }}</h2>
          <p class="text-body-1 opacity-80">Conta {{ selectedAccount?.account_number }}</p>
        </div>
        <v-icon size="48" class="opacity-60">mdi-credit-card</v-icon>
      </div>

      <div class="mt-8">
        <p class="text-body-2 opacity-80 mb-2">Saldo disponível</p>
        <h1 class="text-h3 font-weight-bold">
          {{ formatCurrency(selectedAccount?.balance || 0) }}
        </h1>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { formatCurrency } from '../utils/api'
import type { User, BankAccount } from '../types'

interface Props {
  userInfo: User | null
  selectedAccount: BankAccount | null
}

defineProps<Props>()
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}
</style>
