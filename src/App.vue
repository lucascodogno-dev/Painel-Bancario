<template>
  <v-app>
    <!-- Navigation Bar -->
    <AppBar
      :is-authenticated="isAuthenticated"
      :user-info="userInfo"
      @toggle-drawer="drawer = !drawer"
      @logout="logout"
    />

    <!-- Navigation Drawer -->
    <NavigationDrawer
      v-if="isAuthenticated"
      v-model="drawer"
      :current-view="currentView"
      @update-view="currentView = $event"
    />

    <!-- Main Content -->
    <v-main class="bg-dark-background">
      <v-container fluid class="pa-6">
        <!-- Login View -->
        <LoginView v-if="!isAuthenticated" :loading="loading" @login="login" @sign-up="signUp" />

        <!-- Dashboard View -->
        <DashboardView
          v-else-if="currentView === 'dashboard'"
          :user-info="userInfo"
          :selected-account="selectedAccount"
          :recent-transactions="recentTransactions"
          @change-view="currentView = $event"
        />

        <!-- Transfer View -->
        <TransferView
          v-else-if="currentView === 'transfer'"
          :user-accounts="userAccounts"
          :all-accounts="allAccounts"
          :loading="loading"
          @transfer="makeTransfer"
          @cancel="currentView = 'dashboard'"
        />

        <!-- Statement View -->
        <StatementView
          v-else-if="currentView === 'statement'"
          :statements="statements"
          :loading="loading"
          :pagination="pagination"
          @load-statements="loadStatements"
          @update-page="updatePagination"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import Swal from 'sweetalert2'

import AppBar from './components/AppBar.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'
import LoginView from './components/LoginView.vue'
import DashboardView from './components/DashboardView.vue'
import TransferView from './components/TransferView.vue'
import StatementView from './components/StatementView.vue'

import { apiRequest } from './utils/api'
import type { User, BankAccount, Transaction } from './types'

// 🧠 Reactive State
const isAuthenticated = ref(false)
const loading = ref(false)
const drawer = ref(false)
const currentView = ref('dashboard')
const token = ref('')

const userInfo = ref<User | null>(null)
const userAccounts = ref<BankAccount[]>([])
const allAccounts = ref<BankAccount[]>([])
const recentTransactions = ref<Transaction[]>([])
const statements = ref<Transaction[]>([])

const pagination = reactive({
  current_page: 1,
  total_pages: 1,
  total_records: 0,
})

// 🔥 Computed
const selectedAccount = computed(() => userAccounts.value[0] || null)

// 🛠️ Utilitário de Alertas com SweetAlert2
const showSwal = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
  Swal.fire({
    text: message,
    icon: type,
    confirmButtonText: 'OK',
    background: '#1a1a2e',
    color: '#ffffff',
    confirmButtonColor: '#3f51b5',
  })
}

// 🔑 Authentication
const login = async (loginData: { email: string; password: string }) => {
  loading.value = true
  try {
    const response = await apiRequest(
      '/auth/sign_in',
      {
        method: 'PUT',
        body: JSON.stringify({ user: loginData }),
      },
      token.value,
    )

    token.value = response.token
    localStorage.setItem('token', response.token)
    isAuthenticated.value = true

    await loadUserData()
    showSwal('Login realizado com sucesso!', 'success')
  } catch (error) {
    showSwal('Erro ao fazer login', 'error')
  } finally {
    loading.value = false
  }
}

const signUp = async (signUpData: { name: string; email: string; password: string }) => {
  loading.value = true
  try {
    await apiRequest(
      '/auth/sign_up',
      {
        method: 'POST',
        body: JSON.stringify({ user: signUpData }),
      },
      token.value,
    )

    showSwal('Conta criada com sucesso! Faça login.', 'success')
  } catch (error) {
    showSwal('Erro ao criar conta', 'error')
  } finally {
    loading.value = false
  }
}

const logout = () => {
  token.value = ''
  localStorage.removeItem('token')
  isAuthenticated.value = false
  currentView.value = 'dashboard'
  userInfo.value = null
  userAccounts.value = []
  allAccounts.value = []
  recentTransactions.value = []
  statements.value = []
  showSwal('Logout realizado!', 'info')
}

// 🔄 Data loading
const loadUserData = async () => {
  try {
    const userResponse = await apiRequest('/users/infos', {}, token.value)
    userInfo.value = userResponse

    const accountsResponse = await apiRequest('/users/bank_accounts/my', {}, token.value)
    userAccounts.value = accountsResponse

    const allAccountsResponse = await apiRequest('/users/bank_accounts', {}, token.value)
    allAccounts.value = allAccountsResponse

    await loadRecentTransactions()
  } catch (error) {
    showSwal('Erro ao carregar dados do usuário', 'error')
    console.error('Error loading user data:', error)
  }
}

const loadRecentTransactions = async () => {
  try {
    const response = await apiRequest(
      '/users/bank_account_transfers/statements?per_page=3',
      {},
      token.value,
    )
    recentTransactions.value = response.data || []
  } catch (error) {
    showSwal('Erro ao carregar transações recentes', 'error')
    console.error('Error loading recent transactions:', error)
  }
}

const loadStatements = async (filters: any = {}) => {
  loading.value = true
  try {
    const params = new URLSearchParams()

    if (filters.start_date) params.append('start_date', filters.start_date)
    if (filters.end_date) params.append('end_date', filters.end_date)
    if (filters.transfer_type) params.append('transfer_type', filters.transfer_type)
    params.append('page', pagination.current_page.toString())
    params.append('per_page', '10')

    const response = await apiRequest(
      `/users/bank_account_transfers/statements?${params}`,
      {},
      token.value,
    )

    statements.value = response.data || []
    pagination.total_pages = response.total_pages || 1
    pagination.total_records = response.total_records || 0
  } catch (error) {
    showSwal('Erro ao carregar extrato', 'error')
    console.error('Error loading statements:', error)
  } finally {
    loading.value = false
  }
}

const updatePagination = (page: number) => {
  pagination.current_page = page
  loadStatements()
}

// 💸 Transfer
const makeTransfer = async (transferData: any) => {
  loading.value = true
  try {
    await apiRequest(
      '/users/bank_account_transfers',
      {
        method: 'POST',
        body: JSON.stringify({
          bank_account_transfer: transferData,
          make_success: true,
        }),
      },
      token.value,
    )

    showSwal('Transferência realizada com sucesso!', 'success')
    await loadUserData()
    currentView.value = 'dashboard'
  } catch (error) {
    showSwal('Erro ao realizar transferência', 'error')
  } finally {
    loading.value = false
  }
}

// 🚀 Initialize
onMounted(() => {
  const savedToken = localStorage.getItem('token')
  if (savedToken) {
    token.value = savedToken
    isAuthenticated.value = true
    loadUserData()
  }
})
</script>

<style scoped>
.v-app {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.bg-dark-background {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
}
</style>
