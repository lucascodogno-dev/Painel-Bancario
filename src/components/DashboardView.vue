<template>
  <v-row>
    <!-- Account Overview -->
    <v-col cols="12" md="8">
      <AccountOverview :user-info="userInfo" :selected-account="selectedAccount" />

      <!-- Quick Actions -->
      <QuickActions @change-view="$emit('change-view', $event)" />
    </v-col>

    <!-- Recent Transactions -->
    <v-col cols="12" md="4">
      <RecentTransactions :transactions="recentTransactions" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import AccountOverview from './AccountOverview.vue'
import QuickActions from './QuickActions.vue'
import RecentTransactions from './RecentTransactions.vue'
import type { User, BankAccount, Transaction } from '../types'

interface Props {
  userInfo: User | null
  selectedAccount: BankAccount | null
  recentTransactions: Transaction[]
}

defineProps<Props>()

defineEmits<{
  'change-view': [view: string]
}>()
</script>
