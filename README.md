# NextBank - Sistema Bancário Vue.js

https://github.com/user-attachments/assets/679a1045-28e4-4da4-b312-9561539f058d

## 📁 Estrutura do Projeto

```
src/
├── App.vue                    # Componente principal
├── components/                # Componentes separados
│   ├── AppBar.vue            # Barra de navegação superior
│   ├── NavigationDrawer.vue  # Menu lateral
│   ├── LoginView.vue         # Tela de login e cadastro
│   ├── DashboardView.vue     # Dashboard principal
│   ├── AccountOverview.vue   # Visão geral da conta
│   ├── QuickActions.vue      # Ações rápidas
│   ├── RecentTransactions.vue # Transações recentes
│   ├── TransferView.vue      # Tela de transferências
│   ├── StatementView.vue     # Extrato completo
│   ├── StatementFilters.vue  # Filtros do extrato
│   └── AppSnackbar.vue       # Notificações
├── types/
│   └── index.ts              # Tipagens TypeScript
├── utils/
│   └── api.ts                # Utilitários da API
└── styles/
    └── global.css            # Estilos globais
```

## 🔧 Instalação e Configuração

1. **Instale as dependências:**
```bash
npm install vue@3 vuetify@3 @vue/composition-api
```

2. **Configure o Vuetify no main.js:**
```javascript
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  }
})

const app = createApp(App)
app.use(vuetify)
app.mount('#app')
```

3. **Importe os estilos globais no main.js:**
```javascript
import './styles/global.css'
```

## 📦 Componentes

### **App.vue**
- Componente principal que gerencia o estado global
- Controla autenticação e navegação
- Faz as chamadas para a API

### **AppBar.vue**
- Barra de navegação superior
- Mostra informações do usuário logado
- Botão de logout

### **NavigationDrawer.vue**
- Menu lateral com navegação
- Itens do menu: Dashboard, Transferir, Extrato

### **LoginView.vue**
- Formulário de login e cadastro
- Validação de campos
- Alternância entre login e cadastro

### **DashboardView.vue**
- Tela principal após login
- Composta por: AccountOverview, QuickActions, RecentTransactions

### **AccountOverview.vue**
- Card com informações da conta
- Exibe nome do usuário e saldo

### **QuickActions.vue**
- Ações rápidas (Transferir, Extrato)
- Cards clicáveis com hover effects

### **RecentTransactions.vue**
- Lista das últimas 3 transações
- Ícones coloridos por tipo de transação

### **TransferView.vue**
- Formulário de transferência
- Seleção de contas e valores
- Validação de campos

### **StatementView.vue**
- Extrato completo com paginação
- Integração com StatementFilters

### **StatementFilters.vue**
- Filtros para o extrato
- Data inicial, final e tipo de transferência

### **AppSnackbar.vue**
- Componente de notificações
- Suporte a diferentes cores (success, error)

## 🎨 Estilos e Tema

### **Design System:**
- **Cores Primárias:** Gradiente azul/roxo (#667eea → #764ba2)
- **Background:** Gradiente escuro (#0f0f23 → #1a1a2e)
- **Surface:** Glass morphism com blur e transparência
- **Tipografia:** Roboto com pesos variados

### **Efeitos Visuais:**
- Glass morphism em cards
- Hover effects com transformações
- Animações de entrada (fadeInUp)
- Blur effects em overlays
- Custom scrollbar

### **Responsividade:**
- Mobile-first approach
- Breakpoints para tablet e desktop
- Ajustes de tipografia para mobile

## 🔄 Fluxo de Dados

### **Estado Global (App.vue):**
```typescript
- isAuthenticated: boolean
- userInfo: User | null
- userAccounts: BankAccount[]
- allAccounts: BankAccount[]
- recentTransactions: Transaction[]
- statements: Transaction[]
- pagination: Pagination
- snackbar: Snackbar
```

### **Comunicação entre Componentes:**
- **Props:** Dados passados do pai para filho
- **Emits:** Eventos emitidos do filho para pai
- **Provide/Inject:** Para dados globais (se necessário)

## 🌐 API Integration

### **Endpoints utilizados:**
- `PUT /auth/sign_in` - Login
- `POST /auth/sign_up` - Cadastro
- `GET /users/infos` - Informações do usuário
- `GET /users/bank_accounts/my` - Contas do usuário
- `GET /users/bank_accounts` - Todas as contas
- `GET /users/bank_account_transfers/statements` - Extrato
- `POST /users/bank_account_transfers` - Nova transferência

### **Utilitários da API (utils/api.ts):**
- `apiRequest()` - Função base para chamadas
- `formatCurrency()` - Formatação de moeda
- `formatDate()` - Formatação de data
- `validationRules` - Regras de validação

## 📱 Funcionalidades

### **Autenticação:**
- ✅ Login com email/senha
- ✅ Cadastro de novos usuários
- ✅ Persistência de token no localStorage
- ✅ Logout com limpeza de dados

### **Dashboard:**
- ✅ Visão geral da conta com saldo
- ✅ Últimas 3 transações
- ✅ Ações rápidas (Transferir/Extrato)
- ✅ Design responsivo

### **Transferências:**
- ✅ Seleção de conta origem/destino
- ✅ Validação de valores
- ✅ Tipos de transferência (PIX/TED)
- ✅ Feedback de sucesso/erro

### **Extrato:**
- ✅ Lista completa de transações
- ✅ Filtros por data e tipo
- ✅ Paginação
- ✅ Status das transações

## 🚀 Como Usar

### **1. Estrutura de Arquivos:**
Organize os arquivos conforme a estrutura mostrada acima:

```
src/
├── App.vue
├── components/
├── types/
├── utils/
└── styles/
```

### **2. Imports Necessários:**
Certifique-se de que cada componente importa suas dependências:

```vue
<!-- Exemplo App.vue -->
<script setup lang="ts">
import AppBar from './components/AppBar.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'
// ... outros imports
</script>
```

### **3. Configuração da API:**
Ajuste a URL base da API no arquivo `utils/api.ts`:

```typescript
const url = `http://localhost:3000/v1${endpoint}` // Sua URL aqui
```

## 🎯 Benefícios da Componentização

### **Organização:**
- ✅ Código mais limpo e organizado
- ✅ Responsabilidades bem definidas
- ✅ Fácil manutenção

### **Reutilização:**
- ✅ Componentes podem ser reutilizados
- ✅ Lógica isolada por funcionalidade
- ✅ Testes mais focados

### **Performance:**
- ✅ Lazy loading possível
- ✅ Re-renderização otimizada
- ✅ Bundle splitting

### **Desenvolvimento:**
- ✅ Desenvolvimento em paralelo
- ✅ Debug mais fácil
- ✅ Código mais legível

## 🔄 Próximos Passos

### **Melhorias Possíveis:**
1. **Composables:** Extrair lógica para composables
2. **Pinia:** Gerenciamento de estado mais robusto
3. **Vue Router:** Navegação com rotas
4. **Testes:** Unit tests para componentes
5. **Lazy Loading:** Carregamento sob demanda

### **Exemplo de Composable:**
```typescript
// composables/useAuth.ts
export function useAuth() {
  const isAuthenticated = ref(false)
  const user = ref(null)
  
  const login = async (credentials) => {
    // lógica de login
  }
  
  return { isAuthenticated, user, login }
}
```

### **Exemplo com Vue Router:**
```typescript
// router/index.ts
const routes = [
  { path: '/login', component: LoginView },
  { path: '/dashboard', component: DashboardView },
  { path: '/transfer', component: TransferView },
  { path: '/statement', component: StatementView }
]
```

## 📋 Checklist de Implementação

### **Básico:**
- [ ] Criar estrutura de pastas
- [ ] Copiar componentes
- [ ] Configurar imports
- [ ] Testar funcionalidades

### **Avançado:**
- [ ] Implementar composables
- [ ] Adicionar Vue Router
- [ ] Configurar Pinia
- [ ] Escrever testes
- [ ] Otimizar performance

## 🎨 Customização

### **Temas:**
Para customizar as cores, edite as variáveis CSS:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --background-gradient: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
  --surface-color: rgba(255, 255, 255, 0.05);
}
```

### **Animações:**
Adicione/modifique animações no `global.css`:

```css
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
```

## 🐛 Troubleshooting

### **Problemas Comuns:**

1. **Imports não funcionam:**
   - Verifique os caminhos relativos
   - Certifique-se que os arquivos existem

2. **Estilos não aplicam:**
   - Importe o global.css no main.js
   - Verifique se o Vuetify está configurado

3. **API não responde:**
   - Verifique a URL base
   - Confirme se o backend está rodando

4. **TypeScript errors:**
   - Certifique-se que os tipos estão corretos
   - Importe os tipos necessários

## 📚 Recursos Adicionais

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vuetify 3 Documentation](https://vuetifyjs.com/)
- [TypeScript Vue](https://vuejs.org/guide/typescript/overview.html)
- [Vue Testing Library](https://testing-library.com/docs/vue-testing-library/intro)

---

