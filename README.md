# Compara Mais - Aplicativo de Comparação de Preços

Aplicativo web mobile-first para comparar preços de produtos entre lojas e mercados cadastrados. Desenvolvido com React + Vite (TypeScript) e Firebase.

## 📋 Documentação do Projeto

- [Regras do Aplicativo](./regras/regras.md)
- [Web Frontend README](./web/README.md)
- [Backend README](./backend/README.md)

## 🏗️ Estrutura do Repositório

```
Compara_Mais/
├── regras/
│   └── regras.md                   # Documentação das regras e normas
├── web/                            # React + Vite - App Web Mobile-First
│   ├── src/
│   │   ├── screens/                # LoginScreen, AdminScreen
│   │   ├── components/             # Componentes reutilizáveis
│   │   ├── services/               # Firebase config
│   │   ├── store/                  # Zustand stores
│   │   ├── styles/                 # Styled-components
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md
├── backend/                        # Firebase Cloud Functions
│   ├── functions/
│   │   └── index.js               # Cloud Functions
│   ├── firestore.rules            # Regras de segurança
│   ├── package.json
│   └── README.md
└── README.md
```

## 🚀 Quick Start

### Web Frontend

```bash
cd web

# Instalar dependências
npm install

# Configurar Firebase (.env)
cp .env.example .env
# Editar .env com suas credenciais

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Backend

```bash
cd backend

# Instalar dependências
npm install

# Deploy functions e security rules
firebase deploy --only functions,firestore:rules

# Emuladores locais (desenvolvimento)
firebase emulators:start
```

## 📱 Funcionalidades Implementadas

### ✅ Fase 1: Autenticação e Admin (WEB)

- [x] Tela de Login (mobile-first)
- [x] Autenticação Firebase (email/password)
- [x] Painel Administrativo Web
  - [x] Dashboard com estatísticas responsivo
  - [x] Aprovação de lojas
  - [x] Moderação de preços flagrados
  - [x] Design mobile-first com Styled-Components
  - [x] Build otimizado com Vite

### 📋 Fase 2: Submissão de Preços (Próximo)

- [ ] Tela de busca de produtos
- [ ] Tela de submissão de preços
- [ ] Upload de fotos
- [ ] Validação em tempo real

### 📊 Fase 3: Comparação e Descoberta

- [ ] Tela de comparação de preços
- [ ] Filtros por loja/raio
- [ ] Histórico de preços (gráficos)
- [ ] Notificações de preço baixo

### 👥 Fase 4: Comunidade

- [ ] Sistema de feedback (útil/incorreto)
- [ ] Score de confiança do usuário
- [ ] Denúncias de preços/lojas
- [ ] Rankings de contribuidores

## 🔧 Tecnologias

### Web Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool (3x mais rápido)
- **Styled-Components** - CSS-in-JS
- **Firebase SDK** - Backend integration
- **Zustand** - State Management

### Backend
- **Firebase Firestore** - Database
- **Firebase Authentication** - Auth
- **Firebase Cloud Functions** - Backend logic
- **Firebase Storage** - File storage
- **Firebase Security Rules** - Authorization

## 🔐 Segurança

- Firestore Security Rules com validação rigorosa
- Autenticação Firebase obrigatória
- Rate limiting para submissões
- Sistema de confiança do usuário
- Detecção automática de anomalias
- Moderação manual para casos flagrados

## 📊 Arquitetura de Dados

### Collections no Firestore

- **users** - Perfis de usuários
- **stores** - Lojas e mercados cadastrados
- **products** - Produtos
- **prices** - Preços submetidos
- **feedback** - Feedback dos usuários
- **reports** - Denúncias

## 👨‍💻 Desenvolvimento

### Convenções

- Componentes React: PascalCase
- Funções/hooks: camelCase
- 2 spaces indentation
- Prettier para formatação
- ESLint para linting
- TypeScript para type safety

### Comandos Úteis

```bash
# Web
cd web
npm run dev        # Dev server
npm run build      # Build production
npm run lint       # Lint code
npm run format     # Format code

# Backend
cd backend
npm run deploy     # Deploy functions
npm run logs       # View function logs
```

### Testes

```bash
# Frontend
npm run test

# Backend
npm run test:functions
```

## 📝 Roadmap

- V1.0 - Admin e submissão de preços
- V1.1 - Busca e comparação
- V1.2 - Sistema de feedback
- V2.0 - App completo para usuários
- V2.1 - Notificações push
- V3.0 - Análise avançada e recomendações

## 📄 Licença

MIT

## 👤 Autor

Vitor0605

---

**Última atualização:** Maio 2026