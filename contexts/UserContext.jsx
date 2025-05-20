import {createContext, useState} from 'react';
import {Alert} from 'react-native';
import {loginApi, registerApi} from '../api/authApi';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const response = await loginApi(email, password);

    if (response) {
      setUser(response.user);
      Alert.alert('Login successful', 'Welcome back!');
      return true;
    }

    return false;
  }

  async function register(username, email, password) {
    const response = await registerApi(username, email, password);

    if (response) {
      setUser(response.user);
      Alert.alert('Registration successful', 'Welcome!');
      return true;
    }

    return false;
  }

  async function logout() {
    setUser(null);
    Alert.alert('Logout successful', 'See you next time!');
  }

  return (
    <UserContext.Provider value={{user, login, register, logout}}>
      {children}
    </UserContext.Provider>
  );
};
