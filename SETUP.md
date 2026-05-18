# 🚀 Guia de Setup - Compara Mais

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Firebase CLI
- Conta Google/Firebase
- Android Studio ou Xcode (para testes no celular)

---

## 1️⃣ Setup Firebase Project

### 1.1 Criar novo projeto

1. Ir para [Firebase Console](https://console.firebase.google.com)
2. Clique em "Criar Projeto"
3. Nome: `Compara-Mais` (ou similar)
4. Desabilitar Google Analytics (por enquanto)
5. Criar projeto

### 1.2 Configurar Firestore

1. Na sidebar, ir em **Firestore Database**
2. Clique em **Create Database**
3. Modo: **Start in production mode** (usaremos Security Rules)
4. Localização: **South America (São Paulo)** ou mais próxima
5. Habilitar Firestore

### 1.3 Configurar Authentication

1. Na sidebar, ir em **Authentication**
2. Clique em **Get Started**
3. Ativar **Email/Password**

### 1.4 Configurar Storage

1. Na sidebar, ir em **Storage**
2. Clique em **Get Started**
3. Modo: **Production mode**
4. Localização: **South America (São Paulo)**

### 1.5 Obter credenciais

1. Ir em **Project Settings** (ícone de engrenagem)
2. Abas: **General** e **Service Accounts**
3. Copiar credenciais do projeto (API Key, Project ID, etc.)

---

## 2️⃣ Setup Frontend

### 2.1 Instalação

```bash
cd frontend
npm install
```

### 2.2 Configurar Firebase

1. Copiar arquivo de exemplo:
```bash
cp .env.example .env
```

2. Editar `.env` com suas credenciais do Firebase:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=seu_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_bucket.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

### 2.3 Iniciar aplicação

```bash
npm start
```

**Opções:**
- `npm run android` - Abrir no Android
- `npm run ios` - Abrir no iOS
- `npm run web` - Abrir na web

### 2.4 Testar Login

1. No Firebase Console, criar um usuário de teste:
   - Email: `admin@example.com`
   - Senha: `123456`

2. No app, fazer login com essas credenciais

---

## 3️⃣ Setup Backend

### 3.1 Instalação

```bash
cd backend
npm install
```

### 3.2 Configurar Firebase CLI

```bash
firebase login
firebase init
```

Selecionar:
- ✅ Functions
- ✅ Firestore
- Projeto: selecione o criado anteriormente

### 3.3 Deploy das Cloud Functions

```bash
firebase deploy --only functions
```

### 3.4 Deploy das Firestore Rules

```bash
firebase deploy --only firestore:rules
```

### 3.5 Testar Cloud Functions

Usar Firebase Console para testar:

1. Ir em **Cloud Functions**
2. Clicar em uma função (ex: `getAdminStats`)
3. Clicar em **Testing**
4. Copiar e colar em um terminal:

```bash
firebase functions:call getAdminStats
```

---

## 4️⃣ Testar Fluxo Completo

### 4.1 Criar Lojas de Teste

1. No Firebase Console, ir em **Firestore Database**
2. Clique em **Start collection** > `stores`
3. Adicionar documento:
```json
{
  "name": "Supermercado Teste",
  "address": "Rua Teste, 123",
  "city": "São Paulo",
  "state": "SP",
  "type": "supermercado",
  "verified": false,
  "createdBy": "admin@example.com"
}
```

### 4.2 Adicionar Preços de Teste

1. Create collection `prices`
2. Adicionar documento:
```json
{
  "productId": "prod123",
  "storeId": "store123",
  "userId": "admin@example.com",
  "price": 19.90,
  "currency": "BRL",
  "quantity": 1,
  "unit": "kg",
  "timestamp": "2024-05-18T10:00:00Z",
  "flagged": false
}
```

### 4.3 No App, Acessar Admin Panel

1. Login com `admin@example.com` / `123456`
2. Ir para aba **Moderação**
3. Verificar lojas e preços carregados
4. Testar aprovação/rejeição de lojas

---

## 5️⃣ Emuladores Locais (Opcional)

Para desenvolvimento local sem usar Firebase live:

```bash
cd backend
firebase emulators:start
```

Conectar frontend aos emuladores editando `src/services/firebase.js`:

```javascript
if (__DEV__) {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, 'localhost', 8080);
}
```

---

## 6️⃣ Checklist de Verificação

- [ ] Firebase Project criado
- [ ] Firestore habilitado
- [ ] Authentication habilitada
- [ ] Storage criado
- [ ] `.env` configurado no frontend
- [ ] `firebase deploy` executado para backend
- [ ] Usuário de teste criado
- [ ] App inicia sem erros
- [ ] Login funciona
- [ ] Admin panel carrega dados
- [ ] Cloud Functions deployadas com sucesso

---

## 🐛 Troubleshooting

### Erro: "Firebase project not found"
```bash
firebase init
# Selecionar novo projeto ou usar existing
```

### Erro: "Permission denied" ao fazer deploy
```bash
firebase login
firebase projects:list
firebase use seu-project-id
firebase deploy
```

### App não carrega dados
- Verificar `.env` com credenciais corretas
- Verificar Firestore Rules (devem permitir read para preços)
- Verificar console.log para erros de Firebase

### Cloud Functions não disparam
- Verificar se estão deployadas: `firebase functions:list`
- Verificar logs: `firebase functions:log`

---

## 📚 Recursos Úteis

- [Firebase Console](https://console.firebase.google.com)
- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [Firebase Admin SDK](https://firebase.google.com/docs/database/admin)

---

## ✅ Próximo Passo

Depois de tudo funcionando, comece com:

**Sprint 2: Implementar Submissão de Preços**
- Tela de busca de produtos
- Tela de seleção de loja
- Formulário de submissão com foto

Ver [ROADMAP.md](./ROADMAP.md) para detalhes.

---

**Data:** Maio 2026
**Versão:** 1.0.0
