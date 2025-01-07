// NotificationScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const notifications = [
  { id: '1', title: 'New Friend Request', enabled: true },
  { id: '2', title: 'Event Reminders', enabled: false },
  { id: '3', title: 'Community Updates', enabled: true },
  { id: '4', title: 'Nomad News', enabled: false },
];

const NotificationScreen: React.FC = () => {
  const renderItem = ({ item }: { item: { id: string; title: string; enabled: boolean } }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationTextContainer}>
        <Ionicons name="notifications" size={24} color="#333" style={styles.icon} />
        <Text style={styles.notificationText}>{item.title}</Text>
      </View>
      <Switch value={item.enabled} onValueChange={() => {}} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 18,
    color: '#555',
  },
  icon: {
    marginRight: 10,
  },
});

export default NotificationScreen;