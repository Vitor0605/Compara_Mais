# Frontend - Compara Mais Mobile App

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js          # Tela de login do admin
│   │   └── AdminScreen/
│   │       ├── AdminScreen.js      # Tela principal de moderação
│   │       └── AdminScreenDashboard.js  # Dashboard
│   ├── components/                 # Componentes reutilizáveis
│   │   ├── Button.js
│   │   ├── TextInput.js
│   │   └── Card.js
│   ├── services/
│   │   └── firebase.js             # Configuração Firebase
│   ├── store/
│   │   └── authStore.js            # Zustand store para autenticação
│   └── utils/
│       └── theme.js                # Cores, tipografia, espaçamento
├── App.js                          # Arquivo principal com navegação
├── app.json                        # Configuração Expo
├── package.json
└── babel.config.js
```

## Setup e Instalação

### 1. Instalar dependências

```bash
cd frontend
npm install
```

### 2. Configurar Firebase

Criar `.env` baseado em `.env.example`:

```bash
cp .env.example .env
```

Adicionar suas credenciais do Firebase:

```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Iniciar aplicação

```bash
npm start
```

Para executar no Android:
```bash
npm run android
```

Para executar no iOS:
```bash
npm run ios
```

## Arquitetura

### Estado (Zustand)
- `useAuthStore` - Gerencia autenticação e estado do usuário

### Navegação
- Stack Navigator para autenticação
- Tab Navigator para telas do admin (Dashboard + Moderação)

### Componentes Base
- `Button` - Botão customizado com variantes
- `TextInput` - Input com validação
- `Card` - Componente container

### Design System
- Cores: Primária (azul), secundária (verde), etc.
- Tipografia: H1-H5, body, caption
- Espaçamento: xs, sm, md, lg, xl, xxl

## Funcionalidades da Tela Admin

### Dashboard
- Exibe estatísticas gerais
- Total de usuários, lojas, preços
- Informações sobre pendências

### Moderação
- **Aprovação de Lojas**: Revisar e aprovar/rejeitar lojas pendentes
- **Flagged Prices**: Gerenciar preços marcados como suspeitos
- **Verificação**: Validar dados antes de aprovar

## Fluxo de Autenticação

1. Usuário faz login na tela de login
2. Firebase autentica as credenciais
3. Cloud Function verifica se é admin
4. Se admin, redireciona para AdminTabs
5. Caso contrário, exibe erro

## Mobile-First Design

- Layout responsivo para telas pequenas
- Tipografia escalável
- Componentes otimizados para touch
- Navegação com abas inferior
- Suporte a tema claro

## Próximos Passos

- [ ] Implementar tela de usuários
- [ ] Tela de produtos e busca
- [ ] Gráficos de preços
- [ ] Sistema de notificações
- [ ] Testes unitários e E2E
- [ ] Tema escuro
