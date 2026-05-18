import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthStore } from '../store/authStore';
import { Button, Card, StatBox } from '../components/index';
import { Container, Grid, FlexBox, Header, AppContainer, Main } from '../styles/components';
import { colors, spacing } from '../styles/variables';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.lg};
  flex-wrap: wrap;
  gap: ${spacing.md};
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  color: ${colors.text};
  margin: 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: ${colors.text};
  margin: ${spacing.lg} 0 ${spacing.md} 0;
  padding-bottom: ${spacing.md};
  border-bottom: 2px solid ${colors.border};
`;

const ItemCard = styled(Card)`
  margin-bottom: ${spacing.md};
`;

const ItemHeader = styled.div`
  margin-bottom: ${spacing.md};
  border-bottom: 1px solid ${colors.border};
  padding-bottom: ${spacing.md};
`;

const ItemTitle = styled.h3`
  font-size: 1.1rem;
  color: ${colors.text};
  margin-bottom: ${spacing.sm};
`;

const ItemSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${colors.textLight};
  margin: 0;
`;

const ItemDetail = styled.p`
  font-size: 0.95rem;
  color: ${colors.text};
  margin-bottom: ${spacing.sm};

  strong {
    color: ${colors.text};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${spacing.md};
  margin-top: ${spacing.md};
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: ${spacing.xl};
  color: ${colors.textLight};
`;

interface Store {
  id: string;
  name: string;
  address: string;
  type: string;
  createdBy: string;
}

interface Price {
  id: string;
  productId: string;
  storeId: string;
  userId: string;
  price: number;
  flagReason?: string;
}

interface Stats {
  totalUsers: number;
  totalStores: number;
  totalPrices: number;
  pendingStores: number;
  flaggedPrices: number;
}

interface AdminScreenProps {
  onLogout: () => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({ onLogout }) => {
  const { user, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalStores: 0,
    totalPrices: 0,
    pendingStores: 0,
    flaggedPrices: 0,
  });
  const [pendingStores, setPendingStores] = useState<Store[]>([]);
  const [flaggedPrices, setFlaggedPrices] = useState<Price[]>([]);

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
        })) as Store[]
      );

      setFlaggedPrices(
        flaggedPricesSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Price[]
      );

      setLoading(false);
    } catch (error) {
      console.error('Error loading admin data:', error);
      setLoading(false);
    }
  };

  const approveStore = async (storeId: string) => {
    try {
      const storeRef = doc(db, 'stores', storeId);
      await updateDoc(storeRef, { verified: true });
      await loadAdminData();
    } catch (error) {
      console.error('Error approving store:', error);
    }
  };

  const rejectStore = async (storeId: string) => {
    try {
      const storeRef = doc(db, 'stores', storeId);
      await updateDoc(storeRef, { verified: false, rejected: true });
      await loadAdminData();
    } catch (error) {
      console.error('Error rejecting store:', error);
    }
  };

  const removeFlaggedPrice = async (priceId: string) => {
    try {
      const priceRef = doc(db, 'prices', priceId);
      await updateDoc(priceRef, { flagged: false });
      await loadAdminData();
    } catch (error) {
      console.error('Error removing flagged price:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <AppContainer>
        <NoDataMessage style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <div>Carregando dados do administrador...</div>
        </NoDataMessage>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Header>
        <Container>
          <PageHeader>
            <div>
              <PageTitle>Painel Administrativo</PageTitle>
              <p style={{ color: colors.textLight, margin: 0 }}>Bem-vindo, {user?.displayName || 'Admin'}</p>
            </div>
            <Button variant="primary" onClick={handleLogout}>
              Sair
            </Button>
          </PageHeader>
        </Container>
      </Header>

      <Main>
        <Container>
          {/* Statistics */}
          <SectionTitle>Estatísticas</SectionTitle>
          <Grid columns={3}>
            <StatBox label="Usuários" value={stats.totalUsers} />
            <StatBox label="Lojas" value={stats.totalStores} />
            <StatBox label="Preços" value={stats.totalPrices} />
          </Grid>

          {/* Pending Stores */}
          {stats.pendingStores > 0 && (
            <>
              <SectionTitle>Lojas Pendentes ({stats.pendingStores})</SectionTitle>
              {pendingStores.map((store) => (
                <ItemCard key={store.id}>
                  <ItemHeader>
                    <ItemTitle>{store.name}</ItemTitle>
                    <ItemSubtitle>{store.address}</ItemSubtitle>
                  </ItemHeader>
                  <ItemDetail>
                    <strong>Tipo:</strong> {store.type}
                  </ItemDetail>
                  <ItemDetail>
                    <strong>Criada por:</strong> {store.createdBy}
                  </ItemDetail>
                  <ActionButtons>
                    <Button variant="secondary" onClick={() => approveStore(store.id)}>
                      Aprovar
                    </Button>
                    <Button variant="danger" onClick={() => rejectStore(store.id)}>
                      Rejeitar
                    </Button>
                  </ActionButtons>
                </ItemCard>
              ))}
            </>
          )}

          {/* Flagged Prices */}
          {stats.flaggedPrices > 0 && (
            <>
              <SectionTitle>Preços Flagrados ({stats.flaggedPrices})</SectionTitle>
              {flaggedPrices.map((price) => (
                <ItemCard key={price.id}>
                  <ItemHeader>
                    <ItemTitle>R$ {price.price.toFixed(2)}</ItemTitle>
                    <ItemSubtitle>ID Produto: {price.productId}</ItemSubtitle>
                  </ItemHeader>
                  <ItemDetail>
                    <strong>Loja ID:</strong> {price.storeId}
                  </ItemDetail>
                  <ItemDetail>
                    <strong>Usuário:</strong> {price.userId}
                  </ItemDetail>
                  <ItemDetail>
                    <strong>Motivo:</strong> {price.flagReason || 'Não especificado'}
                  </ItemDetail>
                  <ActionButtons>
                    <Button variant="secondary" onClick={() => removeFlaggedPrice(price.id)}>
                      Desflagrar
                    </Button>
                  </ActionButtons>
                </ItemCard>
              ))}
            </>
          )}

          {stats.pendingStores === 0 && stats.flaggedPrices === 0 && (
            <NoDataMessage>
              ✓ Nenhuma ação pendente no momento
            </NoDataMessage>
          )}
        </Container>
      </Main>
    </AppContainer>
  );
};
