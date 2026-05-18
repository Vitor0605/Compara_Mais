# Compara Mais - Aplicativo de Comparação de Preços

Aplicativo mobile para comparar preços de produtos entre lojas e mercados cadastrados. Desenvolvido com React Expo (mobile-first) e Firebase.

## 📋 Documentação do Projeto

- [Regras do Aplicativo](./regras/regras.md)
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## 🏗️ Estrutura do Repositório

```
Compara_Mais/
├── regras/
│   └── regras.md                   # Documentação das regras e normas
├── frontend/                       # React Expo - App Mobile
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│   ├── App.js
│   ├── app.json
│   └── package.json
├── backend/                        # Firebase Cloud Functions
│   ├── functions/
│   │   └── index.js               # Cloud Functions
│   ├── firestore.rules            # Regras de segurança
│   ├── package.json
│   └── README.md
└── README.md
```

## 🚀 Quick Start

### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Configurar Firebase (.env)
cp .env.example .env
# Editar .env com suas credenciais

# Iniciar
npm start
```

### Backend

```bash
cd backend

# Instalar dependências
npm install

# Deploy functions
firebase deploy --only functions,firestore:rules

# Emuladores locais
firebase emulators:start
```

## 📱 Funcionalidades Implementadas

### ✅ Fase 1: Autenticação e Admin

- [x] Tela de Login
- [x] Autenticação Firebase
- [x] Painel Administrativo
  - [x] Dashboard com estatísticas
  - [x] Aprovação de lojas
  - [x] Moderação de preços flagrados
  - [x] Gerenciamento de usuários

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

### Frontend
- React Native
- Expo
- React Navigation
- Firebase SDK
- Zustand (State Management)
- NativeWind (Tailwind CSS)

### Backend
- Firebase Firestore (Database)
- Firebase Authentication
- Firebase Cloud Functions
- Firebase Storage
- Firebase Analytics & Crashlytics

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

- Componentes em PascalCase
- Hooks e funções em camelCase
- Espaçamento com 2 spaces
- Prettier para formatação
- ESLint para linting

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