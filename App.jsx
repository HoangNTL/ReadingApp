import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './navigation/tabs';
import LoginScreen from './screens/Login/index';
import RegisterScreen from './screens/Register/index';
import BookDetailScreen from './screens/BookDetail/index';
import ReadingScreen from './screens/ReadingScreen/index';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="App" component={Tabs} />
            <Stack.Screen name="BookDetail" component={BookDetailScreen} />
            <Stack.Screen name="Reading" component={ReadingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}
