import React, { useLayoutEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const { newsItem } = route.params;

  // Динамічний заголовок екрану
  useLayoutEffect(() => {
    navigation.setOptions({
      title: newsItem.category,
    });
  }, [navigation, newsItem]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: newsItem.image }} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        {/* Category & date */}
        <View style={styles.metaRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{newsItem.category}</Text>
          </View>
          <Text style={styles.date}>📅 {newsItem.date}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{newsItem.title}</Text>

        {/* Author */}
        <View style={styles.authorRow}>
          <Text style={styles.authorLabel}>✍️ Автор:</Text>
          <Text style={styles.authorName}>{newsItem.author}</Text>
        </View>

        <View style={styles.divider} />

        {/* Full text */}
        <Text style={styles.bodyText}>
          {newsItem.description}
          {'\n\n'}
          Продовження статті. Наші кореспонденти зазначають, що ситуація продовжує розвиватися.
          Експерти в галузі коментують останні події та дають прогнози на найближче майбутнє.
          {'\n\n'}
          За словами аналітиків, дана тенденція матиме значний вплив на подальший розвиток подій.
          Спостерігачі уважно стежать за розвитком ситуації та готують детальні аналітичні матеріали.
          {'\n\n'}
          Редакція продовжуватиме висвітлювати цю тему. Підписуйтесь на наш портал, щоб бути
          в курсі останніх новин.
        </Text>

        {/* Tags */}
        <View style={styles.tagsSection}>
          <Text style={styles.tagsLabel}>Теги:</Text>
          <View style={styles.tagsRow}>
            {['#новини', `#${newsItem.category.toLowerCase()}`, '#актуально'].map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  image: {
    width: '100%',
    height: 240,
    backgroundColor: '#e0e0e0',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 20,
    minHeight: 400,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  categoryBadge: {
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryText: {
    color: '#1a73e8',
    fontWeight: '700',
    fontSize: 12,
  },
  date: {
    color: '#999',
    fontSize: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
    lineHeight: 30,
    marginBottom: 14,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  authorLabel: {
    fontSize: 13,
    color: '#888',
  },
  authorName: {
    fontSize: 13,
    color: '#1a73e8',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  tagsSection: {
    marginTop: 8,
  },
  tagsLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dde3ee',
  },
  tagText: {
    color: '#555',
    fontSize: 12,
    fontWeight: '500',
  },
});
