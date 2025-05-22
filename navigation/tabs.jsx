import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHouse,
  faMagnifyingGlass,
  faBook,
  faFlask,
} from '@fortawesome/free-solid-svg-icons';
import HomeScreen from '../screens/Home/index';
import SearchScreen from '../screens/Search/index';
import LibraryScreen from '../screens/Library/index';
import TestScreen from '../screens/Test';

const Tab = createBottomTabNavigator();

const HomeTabBarIcon = ({color, size}) => (
  <FontAwesomeIcon icon={faHouse} size={size} color={color} />
);

const SearchTabBarIcon = ({color, size}) => (
  <FontAwesomeIcon icon={faMagnifyingGlass} size={size} color={color} />
);

const LibraryTabBarIcon = ({color, size}) => (
  <FontAwesomeIcon icon={faBook} size={size} color={color} />
);

const TestTabBarIcon = ({color, size}) => (
  <FontAwesomeIcon icon={faFlask} size={size} color={color} />
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeTabBarIcon,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: SearchTabBarIcon,
          tabBarLabel: 'Search',
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: LibraryTabBarIcon,
          tabBarLabel: 'Library',
        }}
      />
      <Tab.Screen
        name="Test"
        component={TestScreen}
        options={{
          tabBarIcon: TestTabBarIcon,
          tabBarLabel: 'Test',
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
