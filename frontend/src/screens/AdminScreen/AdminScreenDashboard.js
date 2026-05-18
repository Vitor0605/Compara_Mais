import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { colors, spacing, typography, commonStyles } from '../../utils/theme';
import { Card, CardHeader, CardContent } from '../../components/Card';

export const AdminScreenDashboard = () => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Overview Card */}
        <Card>
          <CardHeader title="Dashboard Administrativo" />
          <CardContent>
            <Text style={styles.description}>
              Painel de controle para moderação de lojas, preços e usuários do aplicativo Compara Mais.
            </Text>
          </CardContent>
        </Card>

        {/* Features */}
        <Text style={styles.sectionTitle}>Funcionalidades Principais</Text>

        <Card>
          <CardHeader
            title="📊 Estatísticas"
            subtitle="Visualize dados gerais"
          />
          <CardContent>
            <Text style={styles.featureText}>
              • Total de usuários cadastrados{'\n'}
              • Total de lojas registradas{'\n'}
              • Total de preços submetidos{'\n'}
              • Pendências (lojas e preços)
            </Text>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="✅ Aprovação de Lojas"
            subtitle="Gerenciamento de cadastros"
          />
          <CardContent>
            <Text style={styles.featureText}>
              • Revisar lojas pendentes{'\n'}
              • Verificar localização e dados{'\n'}
              • Aprovar ou rejeitar{'\n'}
              • Histórico de aprovações
            </Text>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="🚩 Moderação de Preços"
            subtitle="Controle de qualidade"
          />
          <CardContent>
            <Text style={styles.featureText}>
              • Preços flagrados automaticamente{'\n'}
              • Detecção de anomalias{'\n'}
              • Análise de confiança do usuário{'\n'}
              • Remoção de dados inválidos
            </Text>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="👥 Gerenciamento de Usuários"
            subtitle="Controle de contas"
          />
          <CardContent>
            <Text style={styles.featureText}>
              • Score de confiança por usuário{'\n'}
              • Histórico de submissões{'\n'}
              • Bloqueio de usuários suspeitos{'\n'}
              • Análise de comportamento
            </Text>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="📝 Relatórios"
            subtitle="Análise de dados"
          />
          <CardContent>
            <Text style={styles.featureText}>
              • Relatório de atividades{'\n'}
              • Análise de fraudes{'\n'}
              • Exportação de dados{'\n'}
              • Logs de moderação
            </Text>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text,
    marginVertical: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.text,
  },
  featureText: {
    ...typography.bodySmall,
    color: colors.text,
    lineHeight: 24,
  },
});
