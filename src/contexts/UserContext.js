import {createContext, useState} from 'react';
import {loginApi, registerApi} from '../src/api/authApi';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const response = await loginApi(email, password);

    if (response) {
      setUser(response.user);
      return true;
    }

    return false;
  }

  async function register(username, email, password) {
    const response = await registerApi(username, email, password);

    if (response) {
      setUser(response.user);
      return true;
    }

    return false;
  }

  async function logout() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{user, login, register, logout}}>
      {children}
    </UserContext.Provider>
  );
};
