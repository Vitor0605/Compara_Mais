# README - Backend Compara Mais

## Estrutura

- **functions/index.js** - Cloud Functions para lógica do backend
- **firestore.rules** - Regras de segurança do Firestore

## Cloud Functions Disponíveis

### Autenticação
- `setAdminRole` - Define role de admin para um usuário (callable)

### Usuários
- `createUserProfile` - Cria perfil ao registrar (trigger auth)
- `deleteUserProfile` - Deleta perfil ao remover conta (trigger auth)

### Lojas
- `processStoreSubmission` - Valida submissão de loja (trigger firestore)

### Preços
- `processPriceSubmission` - Valida e detecta anomalias (trigger firestore)
- `checkRateLimit` - Verifica limite de submissões (callable)

### Admin
- `getAdminStats` - Retorna estatísticas do app (callable)
- `updateUserTrustScore` - Atualiza confiança do usuário (callable)

### Limpeza
- `deleteOldPrices` - Remove preços com 1+ ano (scheduled daily)

## Deploy

```bash
firebase deploy --only functions,firestore:rules
```

## Testing

```bash
firebase emulators:start
```

## Firestore Rules

- Leitura pública para preços, produtos, lojas (apenas verificados)
- Escrita restrita a usuários autenticados
- Dados pessoais privados (apenas o próprio usuário)
- Admins têm acesso total para moderação
