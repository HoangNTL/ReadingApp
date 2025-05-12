import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './navigation/tabs';
import LoginScreen from './screens/Login/index';
import RegisterScreen from './screens/Register/index';
import {UserProvider} from './contexts/UserContext';
import BookDetailScreen from './screens/BookDetail/index';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="App" component={Tabs} />
          <Stack.Screen name="BookDetail" component={BookDetailScreen} />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
}
