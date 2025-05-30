<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card
        class="rounded-xl bg-dark-surface hover-lift"
        elevation="8"
        @click="$emit('change-view', 'transfer')"
      >
        <v-card-text class="pa-6 text-center">
          <v-icon size="48" class="text-primary mb-4">mdi-bank-transfer</v-icon>
          <h3 class="text-h6 font-weight-bold text-white mb-2">Transferir</h3>
          <p class="text-grey-400">Envie dinheiro para outras contas</p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6">
      <v-card
        class="rounded-xl bg-dark-surface hover-lift"
        elevation="8"
        @click="$emit('change-view', 'statement')"
      >
        <v-card-text class="pa-6 text-center">
          <v-icon size="48" class="text-success mb-4">mdi-file-document</v-icon>
          <h3 class="text-h6 font-weight-bold text-white mb-2">Extrato</h3>
          <p class="text-grey-400">Veja todas as suas transações</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
defineEmits<{
  'change-view': [view: string]
}>()
</script>

<style scoped>
.bg-dark-surface {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}
</style>
