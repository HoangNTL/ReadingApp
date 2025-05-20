import api from './index';

export const loginApi = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {email, password});
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const registerApi = async (username, email, password) => {
  try {
    const response = await api.post('/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
