<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6">
      <v-card class="rounded-xl bg-dark-surface" elevation="12">
        <v-card-title class="text-white font-weight-bold pa-6">
          <v-icon class="mr-2">mdi-bank-transfer</v-icon>
          Nova Transferência
        </v-card-title>

        <v-card-text class="pa-6">
          <v-form @submit.prevent="handleTransfer">
            <v-select
              v-model="transferForm.from_user_bank_account_id"
              :items="userAccounts"
              item-title="account_number"
              item-value="id"
              label="Conta de origem"
              prepend-inner-icon="mdi-bank"
              variant="outlined"
              class="mb-4"
              :rules="[rules.required]"
            />

            <v-select
              v-model="transferForm.to_user_bank_account_id"
              :items="allAccounts"
              item-title="account_number"
              item-value="id"
              label="Conta de destino"
              prepend-inner-icon="mdi-bank-transfer-out"
              variant="outlined"
              class="mb-4"
              :rules="[rules.required]"
            />

            <v-text-field
              v-model="transferForm.amount_to_transfer"
              label="Valor"
              type="number"
              step="0.01"
              prepend-inner-icon="mdi-currency-usd"
              variant="outlined"
              class="mb-4"
              :rules="[rules.required, rules.positive]"
            />

            <v-select
              v-model="transferForm.transfer_type"
              :items="transferTypes"
              label="Tipo de transferência"
              prepend-inner-icon="mdi-swap-horizontal"
              variant="outlined"
              class="mb-6"
              :rules="[rules.required]"
            />

            <div class="d-flex gap-4">
              <v-btn @click="$emit('cancel')" variant="outlined" size="large" class="flex-grow-1">
                Cancelar
              </v-btn>

              <v-btn
                type="submit"
                size="large"
                class="bg-gradient-primary text-white flex-grow-1"
                :loading="loading"
              >
                Transferir
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { validationRules } from '../utils/api'
import type { BankAccount, TransferForm } from '../types'

interface Props {
  userAccounts: BankAccount[]
  allAccounts: BankAccount[]
  loading: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  transfer: [data: TransferForm]
  cancel: []
}>()

const transferForm = reactive<TransferForm>({
  from_user_bank_account_id: null,
  to_user_bank_account_id: null,
  amount_to_transfer: null,
  transfer_type: 1,
})

const transferTypes = [
  { title: 'PIX', value: 1 },
  { title: 'TED', value: 2 },
]

const rules = validationRules

const handleTransfer = () => {
  emit('transfer', { ...transferForm })

  // Reset form
  Object.assign(transferForm, {
    from_user_bank_account_id: null,
    to_user_bank_account_id: null,
    amount_to_transfer: null,
    transfer_type: 1,
  })
}
</script>

<style scoped>
.bg-dark-surface {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

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
