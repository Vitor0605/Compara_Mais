# Web - Compara Mais Mobile-First

Aplicação web responsiva com React + TypeScript + Styled-Components, otimizada para mobile-first.

## Setup e Instalação

### 1. Instalar dependências

```bash
cd web
npm install
```

### 2. Configurar Firebase

Criar `.env` baseado em `.env.example`:

```bash
cp .env.example .env
```

Adicionar suas credenciais do Firebase:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Iniciar aplicação

**Desenvolvimento:**
```bash
npm run dev
```

Abrirá automaticamente em `http://localhost:3000`

**Build para produção:**
```bash
npm run build
npm run preview
```

## Estrutura do Projeto

```
web/
├── src/
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Entry point
│   ├── screens/
│   │   ├── LoginScreen.tsx  # Tela de login
│   │   └── AdminScreen.tsx  # Tela admin
│   ├── components/
│   │   └── index.tsx        # Componentes reutilizáveis
│   ├── services/
│   │   └── firebase.ts      # Config Firebase
│   ├── store/
│   │   └── authStore.ts     # Zustand auth store
│   └── styles/
│       ├── variables.ts     # Cores, spacing, breakpoints
│       ├── global.ts        # Global styles
│       ├── components.ts    # Styled components
│       └── styled.d.ts      # TypeScript types
├── index.html               # HTML entry
├── package.json
├── vite.config.ts
├── tsconfig.json
└── .env.example
```

## Tecnologias

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool (3x mais rápido que Webpack)
- **Styled-Components** - CSS-in-JS
- **Firebase SDK** - Backend services
- **Zustand** - State management

## Arquitetura

### Mobile-First Design
- Componentes otimizados para mobile
- Responsive grid com Styled-Components
- Viewport configuration para suporte completo

### Styled-Components
- Tema centralizado (colors, spacing, breakpoints)
- Componentes reutilizáveis: Button, TextInput, Card, StatBox
- Media queries integradas

### State Management
- Zustand para autenticação
- Firebase auth state listener

## Funcionalidades Implementadas

### Login
- Email/senha com Firebase Auth
- Validação de formulário
- Error handling

### Admin Dashboard
- Estatísticas gerais (users, stores, prices)
- Aprovação de lojas pendentes
- Moderação de preços flagrados
- Logout seguro

## Performance

- **Vite** oferece HMR (Hot Module Replacement) ultrarrápido
- Code splitting automático
- Minificação e otimização em produção
- Bundle size otimizado

## Deployment

### Opções
1. **Vercel** (recomendado para React)
   ```bash
   vercel
   ```

2. **Netlify**
   ```bash
   netlify deploy --prod --dir=dist
   ```

3. **Firebase Hosting**
   ```bash
   firebase deploy --only hosting
   ```

## Desenvolvimento

### Convenções
- Componentes em PascalCase
- Funções/hooks em camelCase
- 2 spaces indentation
- Prettier para formatação

### Comandos
```bash
npm run dev        # Dev server
npm run build      # Build production
npm run preview    # Preview build
npm run lint       # Lint code
npm run format     # Format code
```

## Mobile-First Features

✅ Viewport configurado corretamente
✅ Touch-friendly buttons (48x48px mín)
✅ Responsive design sem breakpoints desnecessários
✅ Performance otimizada
✅ Safe area support (notch/dynamic island)
✅ Meta tags para PWA

## Próximos Passos

- [ ] Implementar tela de submissão de preços
- [ ] Adicionar busca de produtos
- [ ] Gráficos de preços
- [ ] Notificações push
- [ ] PWA support
- [ ] Testes E2E
