<template>
  <div class="login-container">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-8 rounded-xl bg-dark-surface" elevation="24">
          <div class="text-center mb-8">
            <v-icon size="64" class="text-primary mb-4">mdi-bank</v-icon>
            <h1 class="text-h4 font-weight-bold text-white mb-2">NextBank</h1>
            <p class="text-grey-400">Faça login para acessar sua conta</p>
          </div>

          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="loginForm.email"
              label="Email"
              type="email"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              class="mb-4"
              :rules="[rules.required, rules.email]"
            />

            <v-text-field
              v-model="loginForm.password"
              label="Senha"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              class="mb-6"
              :rules="[rules.required]"
            />

            <v-btn
              type="submit"
              block
              size="large"
              class="bg-gradient-primary text-white font-weight-bold"
              :loading="loading"
              rounded="xl"
            >
              Entrar
            </v-btn>
          </v-form>

          <v-divider class="my-6" />

          <div class="text-center">
            <v-btn variant="text" @click="showSignUp = !showSignUp" class="text-primary">
              {{ showSignUp ? 'Já tem conta? Faça login' : 'Criar nova conta' }}
            </v-btn>
          </div>

          <!-- Sign Up Form -->
          <v-expand-transition>
            <div v-if="showSignUp" class="mt-6">
              <v-form @submit.prevent="handleSignUp">
                <v-text-field
                  v-model="signUpForm.name"
                  label="Nome completo"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  class="mb-4"
                  :rules="[rules.required]"
                />

                <v-text-field
                  v-model="signUpForm.email"
                  label="Email"
                  type="email"
                  prepend-inner-icon="mdi-email"
                  variant="outlined"
                  class="mb-4"
                  :rules="[rules.required, rules.email]"
                />

                <v-text-field
                  v-model="signUpForm.password"
                  label="Senha"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  variant="outlined"
                  class="mb-6"
                  :rules="[rules.required]"
                />

                <v-btn
                  type="submit"
                  block
                  size="large"
                  variant="outlined"
                  class="text-primary"
                  :loading="loading"
                  rounded="xl"
                >
                  Criar Conta
                </v-btn>
              </v-form>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { validationRules } from '../utils/api'
import type { LoginForm, SignUpForm } from '../types'

interface Props {
  loading: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  login: [data: LoginForm]
  'sign-up': [data: SignUpForm]
}>()

const showPassword = ref(false)
const showSignUp = ref(false)

const loginForm = reactive<LoginForm>({
  email: '',
  password: '',
})

const signUpForm = reactive<SignUpForm>({
  name: '',
  email: '',
  password: '',
})

const rules = validationRules

const handleLogin = () => {
  emit('login', { ...loginForm })
}

const handleSignUp = () => {
  emit('sign-up', { ...signUpForm })
  Object.assign(signUpForm, { name: '', email: '', password: '' })
  showSignUp.value = false
}
</script>

<style scoped>
.login-container {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
}

.bg-dark-surface {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

.v-text-field .v-field {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.v-text-field .v-field:hover {
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.v-text-field .v-field--focused {
  border: 1px solid #667eea !important;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2) !important;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.v-card {
  animation: fadeInUp 0.6s ease-out;
}
</style>
