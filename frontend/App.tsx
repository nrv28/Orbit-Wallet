// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';
import Homescreen from './screens/HomeScreen';
import Searchscreen from './screens/SearchScreen';
import Profilescreen from './screens/ProfileScreen';
import Settingscreen from './screens/SettingScreen';
import Notificationscreen from './screens/NotificationScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Search') {
                iconName = 'search';
              } else if (route.name === 'Profile') {
                iconName = 'person';
              } else if (route.name === 'Notifications') {
                iconName = 'notifications';
              } else if (route.name === 'Settings') {
                iconName = 'settings';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false, // Hide tab name on the top
          })}
        >
          <Tab.Screen name="Home" component={Homescreen} />
          <Tab.Screen name="Search" component={Searchscreen} />
          <Tab.Screen name="Profile" component={Profilescreen} />
          <Tab.Screen name="Notifications" component={Notificationscreen} />
          <Tab.Screen name="Settings" component={Settingscreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
