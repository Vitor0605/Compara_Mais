# Roadmap de Desenvolvimento - Compara Mais

## 📍 Status Atual

### ✅ Concluído (Sprint 1)

1. **Documentação**
   - [x] Regras do aplicativo (regras.md)
   - [x] Arquitetura de dados (Firestore)
   - [x] Fluxos de moderação

2. **Frontend - Estrutura**
   - [x] Setup Expo com React Native
   - [x] Configuração Firebase SDK
   - [x] Sistema de navegação (Stack + Tabs)
   - [x] Design system (tema, cores, tipografia)
   - [x] State management (Zustand)

3. **Frontend - Telas**
   - [x] Tela de Login
   - [x] Painel Administrativo (Dashboard)
   - [x] Tela de Moderação (Lojas e Preços)

4. **Frontend - Componentes**
   - [x] Button (múltiplas variantes)
   - [x] TextInput com validação
   - [x] Card reutilizável

5. **Backend - Cloud Functions**
   - [x] Autenticação (setAdminRole)
   - [x] Criação/Deleção de perfil de usuário
   - [x] Processamento de submissão de lojas
   - [x] Processamento de preços com detecção de anomalias
   - [x] Rate limiting
   - [x] Estatísticas administrativas
   - [x] Limpeza automática de dados

6. **Backend - Segurança**
   - [x] Firestore Security Rules completas
   - [x] Validação de campos obrigatórios
   - [x] Controle de acesso por papel

---

## 📋 Próximos Passos (Sprint 2)

### 🎯 Submissão de Preços

- [ ] Tela de busca de produtos (autocomplete)
- [ ] Tela de seleção de loja (com mapa/lista)
- [ ] Tela de formulário de preço
  - [ ] Campo de preço com validação
  - [ ] Seletor de unidade
  - [ ] Upload de foto (câmera/galeria)
- [ ] Integração com Cloud Function de rate limiting
- [ ] Feedback visual de envio (sucesso/erro)

### 📊 Tela de Produtos

- [ ] Busca de produtos com Firestore query
- [ ] Listagem com lazy loading
- [ ] Filtros por categoria
- [ ] Histórico recente
- [ ] Cache local com AsyncStorage

### 🏪 Tela de Lojas

- [ ] Integração com Google Maps
- [ ] Busca por localização
- [ ] Listagem de lojas próximas
- [ ] Filtro por tipo (supermercado, loja, etc.)
- [ ] Informações da loja

---

## 🎨 Sprint 3: Comparação e Descoberta

- [ ] Tela principal de comparação
- [ ] Exibição do menor preço por produto
- [ ] Mapa de preços por loja
- [ ] Filtros avançados
  - [ ] Por raio de distância
  - [ ] Por período (últimos 7 dias, 30 dias, etc.)
  - [ ] Por tipo de loja
- [ ] Gráfico de histórico de preços
- [ ] Notificações de preço baixo (setup)

---

## 👥 Sprint 4: Sistema de Feedback

- [ ] Botões de feedback (útil/incorreto/spam)
- [ ] Cloud Function para processar feedback
- [ ] Atualização de trust score
- [ ] Sistema de denúncias
- [ ] Análise de padrões de comportamento

---

## 📱 Sprint 5: App para Usuários

- [ ] Tela inicial (home)
- [ ] Navegação completa para usuários regulares
- [ ] Perfil do usuário
- [ ] Histórico de submissões
- [ ] Configurações (notificações, unidades, etc.)

---

## 🔔 Sprint 6: Notificações

- [ ] Setup Firebase Cloud Messaging
- [ ] Notificações de preço baixo
- [ ] Notificações de feedback admin
- [ ] Opt-in/opt-out de notificações
- [ ] Agendamento de notificações

---

## 🧪 Sprint 7: Testes e Qualidade

- [ ] Testes unitários (componentes, store)
- [ ] Testes de integração (fluxos completos)
- [ ] Testes das Cloud Functions
- [ ] Testes E2E (Detox ou Playwright)
- [ ] Performance testing

---

## 🌙 Sprint 8: Polimento

- [ ] Tema escuro
- [ ] Animações suaves
- [ ] Otimização de performance
- [ ] Melhorias de UX
- [ ] Internacionalização (i18n)

---

## 🚀 Pré-Lançamento

- [ ] Testes em staging com Firebase staging project
- [ ] Testes de segurança (penetration testing)
- [ ] Conformidade LGPD/GDPR
- [ ] App Store/Google Play submission
- [ ] Documentação final

---

## 📊 Métricas de Sucesso

- Autenticação: Taxa de sucesso de login > 99%
- Submissão de preços: Latência < 2s
- Detecção de anomalias: Precisão > 85%
- Performance: TTI < 2s em conexão 3G
- User engagement: DAU > 1000 em 3 meses

---

## 🔗 Dependências Críticas

1. **Firebase Project Setup**
   - [ ] Firestore criado
   - [ ] Authentication habilitada
   - [ ] Storage configurado
   - [ ] Cloud Functions deployed
   - [ ] Security Rules deployed

2. **Certificados e Credenciais**
   - [ ] Google Cloud Service Account
   - [ ] Apple Developer Account (para iOS)
   - [ ] Google Play Developer Account

3. **Integrações Externas** (futuro)
   - [ ] Google Maps API
   - [ ] SendGrid/Twilio (emails/SMS)
   - [ ] Stripe (payments)

---

## 📝 Documentação Faltante

- [ ] Guia de contribuição (CONTRIBUTING.md)
- [ ] API Documentation (Cloud Functions)
- [ ] Deployment Guide
- [ ] Troubleshooting Guide
- [ ] Security Best Practices

---

## 🐛 Known Issues

Nenhuma no momento.

---

## 💡 Ideias para Futuro

- Integração com código de barras (Scanner)
- Machine Learning para detecção de preços anômalos
- Sistema de cashback/rewards
- API pública para partners
- Dashboard de vendedor (lojas)
- Análise de mercado avançada
- Recomendações personalizadas
