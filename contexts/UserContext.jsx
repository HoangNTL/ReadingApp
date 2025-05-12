import {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    if (email === 'test@example.com' && password === '123456') {
      setUser({email});
      return true;
    }
    return false;
  }

  async function register(username, email, password, dob) {}
  async function logout() {}

  return (
    <UserContext.Provider value={{user, login, register, logout}}>
      {children}
    </UserContext.Provider>
  );
};
