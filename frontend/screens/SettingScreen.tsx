
// SettingsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const settingsOptions = [
  { id: '1', title: 'Account Settings', icon: 'person' },
  { id: '2', title: 'Privacy', icon: 'lock-closed' },
  { id: '3', title: 'Language', icon: 'language' },
  { id: '4', title: 'Help & Support', icon: 'help-circle' },
];

const SettingsScreen: React.FC = () => {
  const handleOptionPress = (option: string) => {
    console.log(`Navigating to ${option}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {settingsOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.option}
          onPress={() => handleOptionPress(option.title)}
        >
          <View style={styles.optionContainer}>
            <Ionicons name={option.icon} size={24} color="#007BFF" style={styles.icon} />
            <Text style={styles.optionText}>{option.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
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
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#555',
  },
  icon: {
    marginRight: 10,
  },
});

export default SettingsScreen;