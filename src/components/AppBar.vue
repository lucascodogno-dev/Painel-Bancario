<template>
  <v-app-bar elevation="0" class="bg-gradient-primary" height="80" app>
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        v-if="isAuthenticated"
        @click="$emit('toggle-drawer')"
        class="text-white"
      />
    </template>

    <v-toolbar-title class="text-white font-weight-bold text-h5">
      <v-icon class="mr-2" size="32">mdi-bank</v-icon>
      NextBank
    </v-toolbar-title>

    <v-spacer />

    <div v-if="isAuthenticated && userInfo" class="d-flex align-center">
      <v-chip class="mr-4 bg-white text-primary" prepend-icon="mdi-account-circle">
        {{ userInfo.name }}
      </v-chip>

      <v-btn icon @click="$emit('logout')" class="text-white" size="large">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import type { User } from '../types'

interface Props {
  isAuthenticated: boolean
  userInfo: User | null
}

defineProps<Props>()

defineEmits<{
  'toggle-drawer': []
  logout: []
}>()
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  backdrop-filter: blur(20px);
}
</style>
