import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { initialNews, generateNews } from '../data/newsData';
import NewsCard from '../components/NewsCard';

// ── ListHeaderComponent ─────────────────────────────────────────────────────
const ListHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>📰 Стрічка новин</Text>
    <Text style={styles.headerSubtitle}>Актуальні події з усього світу</Text>
  </View>
);

// ── ListFooterComponent ─────────────────────────────────────────────────────
const ListFooter = ({ loading }) => (
  <View style={styles.footer}>
    {loading ? (
      <>
        <ActivityIndicator color="#1a73e8" size="small" />
        <Text style={styles.footerText}>Завантаження...</Text>
      </>
    ) : (
      <Text style={styles.footerText}>— Кінець стрічки —</Text>
    )}
  </View>
);

// ── ItemSeparatorComponent ──────────────────────────────────────────────────
const ItemSeparator = () => <View style={styles.separator} />;

// ── MainScreen ──────────────────────────────────────────────────────────────
export default function MainScreen({ navigation }) {
  const [news, setNews] = useState(initialNews);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextId, setNextId] = useState(initialNews.length + 1);

  // Pull-to-Refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const fresh = generateNews(1, 15);
      setNews(fresh);
      setNextId(16);
      setRefreshing(false);
    }, 1500);
  }, []);

  // Infinite Scroll
  const onEndReached = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const more = generateNews(nextId, 10);
      setNews(prev => [...prev, ...more]);
      setNextId(prev => prev + 10);
      setLoadingMore(false);
    }, 1200);
  }, [loadingMore, nextId]);

  const renderItem = useCallback(({ item }) => (
    <NewsCard
      item={item}
      onPress={() => navigation.navigate('Details', { newsItem: item })}
    />
  ), [navigation]);

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <FlatList
      data={news}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      // Pull-to-Refresh
      refreshing={refreshing}
      onRefresh={onRefresh}
      // Infinite Scroll
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
      // Visual components
      ListHeaderComponent={<ListHeader />}
      ListFooterComponent={<ListFooter loading={loadingMore} />}
      ItemSeparatorComponent={ItemSeparator}
      // Optimization
      initialNumToRender={6}
      maxToRenderPerBatch={8}
      windowSize={7}
      removeClippedSubviews={true}
      // Style
      contentContainerStyle={styles.listContent}
      style={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#1a73e8',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  separator: {
    height: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  footerText: {
    color: '#999',
    fontSize: 13,
    marginLeft: 6,
  },
});
