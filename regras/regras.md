# Regras do Aplicativo Compara Mais

## Objetivo

Documento com as regras, normas e orientações para o funcionamento do aplicativo móvel "Compara Mais", que compara preços de produtos entre lojas e mercados cadastrados.

## Visão Geral

- **Plataforma**: React Native com Expo (mobile-first)
- **Backend/Serviços**: Firebase (Firestore para dados, Authentication para autenticação, Cloud Functions quando necessário)

## Cadastro e Autenticação

- Usuários devem criar conta via Firebase Authentication (email/senha, ou provedores sociais habilitados)
- Perfis de usuário armazenam nome público, UID Firebase e preferências (opcional)
- Apenas usuários autenticados podem submeter preços e cadastrar lojas (sujeito a aprovação/moderação)

## Estrutura de Dados (Firestore)

### Collections Principais

- **`users`**: `{ uid, displayName, email, trustScore, createdAt, updatedAt }`
- **`stores`**: `{ storeId, name, address, city, state, coordinates, type (mercado/loja/supermercado), verified, createdBy, createdAt }`
- **`products`**: `{ productId, name, brand, category, barcode, createdBy, createdAt }`
- **`prices`**: `{ priceId, productId, storeId, userId, price, currency, quantity, unit, photoUrl, timestamp, verified }`

**Indexação recomendada**: 
- `productId + timestamp` (para obter preços recentes por produto)
- `storeId + timestamp` (para obter preços de uma loja)
- `trustScore` (para listar usuários confiáveis)

## Regras de Submissão de Preços

- **Campos obrigatórios**: `productId`, `storeId`, `price`, `timestamp`
- **Validações**:
  - `price > 0` (valores inválidos rejeitados no cliente e validados no Firebase Rules)
  - `quantity > 0` (quantidade deve ser válida)
  - `unit` deve estar em lista predefinida (kg, l, unidade, pacote, etc.)
  - `timestamp` não pode ser no futuro
- **Fotos opcionais**: armazenar em Firebase Storage com regras de acesso
- **Rate Limiting**: máximo 50 submissões por usuário por dia (validar em Cloud Function)

## Validação e Segurança

### Firebase Security Rules

```
- Leitura pública para `prices`, `products`, `stores` (descoberta de preços)
- Leitura privada para `users` (apenas dados públicos expostos)
- Escrita restrita a usuários autenticados em `prices`
- Validação de tipos e campos obrigatórios nas rules
- Cloud Functions para operações sensíveis (confirmação de loja, cálculos de confiança)
```

### Proteção de Dados

- Campos sensíveis (email, dados pessoais) não devem ser confiados ao cliente
- Usar Cloud Functions para agregações e cálculos de `trustScore`
- Não expor UIDs de usuários publicamente

## Moderação e Verificação

- **Lojas**: Verificação manual ou automática por localização/CNPJ
- **Usuários**: Sistema de confiança baseado em:
  - Histórico de envios aceitos
  - Feedback da comunidade (upvote/downvote)
  - Consistência de preços (anomalias são sinalizadas)
- **Preços Suspeitos**: Cloud Function detecta outliers e marca para revisão
- **Denúncias**: Usuários podem denunciar preços ou lojas incorretas

## Lógica de Comparação de Preços

- **Exibição**: Mostrar o menor preço recente por produto nos últimos 7 dias
- **Filtros**: Por raio de distância, loja, data
- **Priorização**: Preços com foto e de usuários com `trustScore > 80` aparecem primeiro
- **Histórico**: Gráfico simples de variação de preço ao longo do tempo
- **Fonte**: Exibir loja, usuário e data de cada preço

## Comportamento Offline e Sincronização

- **Cache Local**: Usar AsyncStorage ou SQLite para leitura offline
- **Fila de Sincronização**: Submissões feitas offline são enfileiradas
- **Resolução de Conflitos**: 
  - Timestamp mais recente tem prioridade
  - Validação server-side ao sincronizar
  - Notificar usuário em caso de rejeição

## Privacidade e Dados Pessoais (LGPD)

- Não exibir emails ou dados pessoais publicamente
- Manter apenas o necessário: UID Firebase (internamente), displayName público, estatísticas
- **Direito ao Esquecimento**: Permitir exclusão de conta e remoção de dados pessoais
- **Portabilidade**: Exportar dados do usuário em formato estruturado
- **Consentimento**: Obter consentimento explícito para Analytics e Crashlytics

## Regras de UX e Mobile-First

- **Layout**: 1 coluna, botões grandes (48x48px mín.), inputs fáceis de usar
- **Desempenho**: Carregamento incremental, lazy loading, placeholders
- **Fluxo de Submissão**: 
  1. Buscar produto (autocomplete)
  2. Selecionar loja (mapa ou lista)
  3. Informar preço, quantidade, unidade
  4. Foto (opcional)
  5. Enviar
- **Feedback**: Indicadores de carregamento, confirmação de sucesso, tratamento de erros claro

## Logs, Métricas e Monitoramento

- **Firebase Analytics**: Eventos para cadastro, login, submissão de preço, busca, visualização de comparação
- **Crashlytics**: Monitorar erros e crashes
- **Performance Monitoring**: Rastrear latência de queries e operações críticas
- **Dashboard Admin**: Visualizar métricas, moderação de lojas/preços

## Testes e Qualidade

- **Testes Unitários**: Lógica de comparação, validação de dados, cálculos
- **Testes de Integração**: Fluxo de autenticação, submissão de preço, sincronização offline
- **Testes E2E**: Fluxo completo do usuário (cadastro → busca → comparação)
- **Testes Manuais**: Moderação, anomalias de preço, conflitos de sincronização

## Considerações Finais

- Estas regras são um ponto de partida e devem evoluir com o aplicativo
- Revisar Firebase Security Rules, políticas de privacidade e fluxos de moderação regularmente
- Manter documentação atualizada conforme novas features são adicionadas
- Envolver moderadores e usuários no feedback sobre as regras
