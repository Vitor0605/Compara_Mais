import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthStore } from '../store/authStore';
import { colors, spacing, typography, commonStyles } from '../utils/theme';
import { Card, CardHeader, CardContent } from '../components/Card';
import { Button } from '../components/Button';

export const AdminScreen = ({ navigation }) => {
  const { user, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalPrices: 0,
    pendingStores: 0,
    flaggedPrices: 0,
  });
  const [pendingStores, setPendingStores] = useState([]);
  const [flaggedPrices, setFlaggedPrices] = useState([]);

  // Load admin data
  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      setLoading(true);

      // Get statistics
      const usersQuery = await getDocs(collection(db, 'users'));
      const storesQuery = await getDocs(collection(db, 'stores'));
      const pricesQuery = await getDocs(collection(db, 'prices'));

      // Get pending stores
      const pendingStoresQuery = query(
        collection(db, 'stores'),
        where('verified', '==', false)
      );
      const pendingStoresSnap = await getDocs(pendingStoresQuery);

      // Get flagged prices
      const flaggedPricesQuery = query(
        collection(db, 'prices'),
        where('flagged', '==', true)
      );
      const flaggedPricesSnap = await getDocs(flaggedPricesQuery);

      setStats({
        totalUsers: usersQuery.size,
        totalStores: storesQuery.size,
        totalPrices: pricesQuery.size,
        pendingStores: pendingStoresSnap.size,
        flaggedPrices: flaggedPricesSnap.size,
      });

      setPendingStores(
        pendingStoresSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      setFlaggedPrices(
        flaggedPricesSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      setLoading(false);
    } catch (error) {
      console.error('Error loading admin data:', error);
      Alert.alert('Erro', 'Falha ao carregar dados do administrador');
      setLoading(false);
    }
  };

  const approveStore = async (storeId) => {
    try {
      const storeRef = doc(db, 'stores', storeId);
      await updateDoc(storeRef, { verified: true });
      Alert.alert('Sucesso', 'Loja aprovada');
      loadAdminData();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao aprovar loja');
    }
  };

  const rejectStore = async (storeId) => {
    try {
      const storeRef = doc(db, 'stores', storeId);
      await updateDoc(storeRef, { verified: false, rejected: true });
      Alert.alert('Sucesso', 'Loja rejeitada');
      loadAdminData();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao rejeitar loja');
    }
  };

  const removeFlaggedPrice = async (priceId) => {
    try {
      const priceRef = doc(db, 'prices', priceId);
      await updateDoc(priceRef, { flagged: false });
      Alert.alert('Sucesso', 'Preço desflagrado');
      loadAdminData();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao desflagrar preço');
    }
  };

  const handleLogout = async () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', onPress: () => {} },
      {
        text: 'Sair',
        onPress: async () => {
          try {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          } catch (error) {
            Alert.alert('Erro', 'Falha ao fazer logout');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={[commonStyles.container, commonStyles.centerContent]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Painel Administrativo</Text>
            <Text style={styles.subtitle}>Bem-vindo, {user?.displayName || 'Admin'}</Text>
          </View>
          <Button
            label="Sair"
            onPress={handleLogout}
            variant="outline"
            size="sm"
          />
        </View>

        {/* Statistics */}
        <Text style={styles.sectionTitle}>Estatísticas</Text>
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <CardContent>
              <Text style={styles.statNumber}>{stats.totalUsers}</Text>
              <Text style={styles.statLabel}>Usuários</Text>
            </CardContent>
          </Card>
          <Card style={styles.statCard}>
            <CardContent>
              <Text style={styles.statNumber}>{stats.totalStores}</Text>
              <Text style={styles.statLabel}>Lojas</Text>
            </CardContent>
          </Card>
          <Card style={styles.statCard}>
            <CardContent>
              <Text style={styles.statNumber}>{stats.totalPrices}</Text>
              <Text style={styles.statLabel}>Preços</Text>
            </CardContent>
          </Card>
        </View>

        {/* Pending Stores */}
        {stats.pendingStores > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              Lojas Pendentes ({stats.pendingStores})
            </Text>
            {pendingStores.map((store) => (
              <Card key={store.id}>
                <CardHeader
                  title={store.name}
                  subtitle={store.address}
                />
                <CardContent>
                  <Text style={styles.storeInfo}>
                    <Text style={{ fontWeight: '600' }}>Tipo:</Text> {store.type}
                  </Text>
                  <Text style={styles.storeInfo}>
                    <Text style={{ fontWeight: '600' }}>Criada por:</Text> {store.createdBy}
                  </Text>
                  <View style={styles.actionButtons}>
                    <Button
                      label="Aprovar"
                      onPress={() => approveStore(store.id)}
                      variant="secondary"
                      size="sm"
                    />
                    <Button
                      label="Rejeitar"
                      onPress={() => rejectStore(store.id)}
                      variant="danger"
                      size="sm"
                    />
                  </View>
                </CardContent>
              </Card>
            ))}
          </>
        )}

        {/* Flagged Prices */}
        {stats.flaggedPrices > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              Preços Flagrados ({stats.flaggedPrices})
            </Text>
            {flaggedPrices.map((price) => (
              <Card key={price.id}>
                <CardHeader
                  title={`Preço: R$ ${price.price.toFixed(2)}`}
                  subtitle={`ID Produto: ${price.productId}`}
                />
                <CardContent>
                  <Text style={styles.storeInfo}>
                    <Text style={{ fontWeight: '600' }}>Loja ID:</Text> {price.storeId}
                  </Text>
                  <Text style={styles.storeInfo}>
                    <Text style={{ fontWeight: '600' }}>Usuário:</Text> {price.userId}
                  </Text>
                  <Text style={styles.storeInfo}>
                    <Text style={{ fontWeight: '600' }}>Motivo:</Text> {price.flagReason || 'Não especificado'}
                  </Text>
                  <View style={styles.actionButtons}>
                    <Button
                      label="Desflagrar"
                      onPress={() => removeFlaggedPrice(price.id)}
                      variant="secondary"
                      size="sm"
                    />
                  </View>
                </CardContent>
              </Card>
            ))}
          </>
        )}

        {stats.pendingStores === 0 && stats.flaggedPrices === 0 && (
          <Card>
            <CardContent style={commonStyles.centerContent}>
              <Text style={styles.noDataText}>
                Nenhuma ação pendente no momento
              </Text>
            </CardContent>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textLight,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text,
    marginVertical: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
  },
  statNumber: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.textLight,
  },
  storeInfo: {
    ...typography.bodySmall,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  noDataText: {
    ...typography.body,
    color: colors.textLight,
    textAlign: 'center',
  },
});
