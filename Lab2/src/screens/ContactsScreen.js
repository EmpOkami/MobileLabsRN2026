import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { contactsData } from '../data/contactsData';

// ── Separator ───────────────────────────────────────────────────────────────
const ItemSeparator = () => <View style={styles.separator} />;

// ── Contact Row ─────────────────────────────────────────────────────────────
const ContactItem = ({ item }) => (
  <TouchableOpacity style={styles.contactItem} activeOpacity={0.7}>
    <Image source={{ uri: item.avatar }} style={styles.avatar} />
    <View style={styles.contactInfo}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactPhone}>{item.phone}</Text>
      <Text style={styles.contactEmail}>{item.email}</Text>
    </View>
    <View style={styles.callBtn}>
      <Text style={styles.callBtnText}>📞</Text>
    </View>
  </TouchableOpacity>
);

// ── Section Header ──────────────────────────────────────────────────────────
const SectionHeader = ({ section }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{section.title}</Text>
  </View>
);

// ── ContactsScreen ──────────────────────────────────────────────────────────
export default function ContactsScreen() {
  const renderItem = useCallback(({ item }) => <ContactItem item={item} />, []);
  const renderSectionHeader = useCallback(
    ({ section }) => <SectionHeader section={section} />, []
  );
  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <SectionList
      sections={contactsData}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparator}
      stickySectionHeadersEnabled={true}
      ListHeaderComponent={
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderTitle}>👥 Контакти</Text>
          <Text style={styles.listHeaderSub}>{
            contactsData.reduce((acc, s) => acc + s.data.length, 0)
          } контактів</Text>
        </View>
      }
      ListFooterComponent={
        <View style={styles.listFooter}>
          <Text style={styles.listFooterText}>— Кінець списку —</Text>
        </View>
      }
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
  listHeader: {
    backgroundColor: '#1a73e8',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    marginBottom: 4,
  },
  listHeaderTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  listHeaderSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  sectionHeader: {
    backgroundColor: '#e8edf5',
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a73e8',
    letterSpacing: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    marginRight: 14,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 13,
    color: '#555',
    marginBottom: 1,
  },
  contactEmail: {
    fontSize: 12,
    color: '#888',
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f0fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callBtnText: {
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 80,
  },
  listFooter: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  listFooterText: {
    color: '#999',
    fontSize: 13,
  },
});
