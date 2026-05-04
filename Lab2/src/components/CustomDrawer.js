import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const USER = {
  name: 'Сингаївський Максим',
  group: 'ІПЗ-22-1',
};

const MenuItem = ({ label, icon, onPress, active }) => (
  <TouchableOpacity
    style={[styles.menuItem, active && styles.menuItemActive]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.menuIcon}>{icon}</Text>
    <Text style={[styles.menuLabel, active && styles.menuLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

export default function CustomDrawer(props) {
  const { state, navigation } = props;
  const activeRouteName = state.routes[state.index].name;

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile section */}
      <View style={styles.profileSection}>
        <Text style={styles.userName}>{USER.name}</Text>
        <View style={styles.groupBadge}>
          <Text style={styles.groupText}>{USER.group}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Menu items */}
      <DrawerContentScrollView {...props} contentContainerStyle={styles.menuContainer}>
        <MenuItem
          label="Новини"
          icon="📰"
          active={activeRouteName === 'NewsStack'}
          onPress={() => navigation.navigate('NewsStack')}
        />
        <MenuItem
          label="Контакти"
          icon="👥"
          active={activeRouteName === 'Contacts'}
          onPress={() => navigation.navigate('Contacts')}
        />
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Лабораторна робота №2</Text>
        <Text style={styles.footerSubText}>React Native · 2026</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    backgroundColor: '#1a73e8',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 12,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  groupBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  groupText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  menuContainer: {
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 4,
  },
  menuItemActive: {
    backgroundColor: '#e8f0fe',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  menuLabel: {
    fontSize: 15,
    color: '#444',
    fontWeight: '500',
  },
  menuLabelActive: {
    color: '#1a73e8',
    fontWeight: '700',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
  footerSubText: {
    fontSize: 11,
    color: '#bbb',
    marginTop: 2,
  },
});
