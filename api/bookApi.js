import api from './index';

export const getBooks = async () => {
  try {
    const response = await api.get('/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getTopViewedBooks = async () => {
  try {
    const response = await api.get('/books/top-viewed');
    return response.data;
  } catch (error) {
    console.error('Error fetching top viewed books:', error);
    throw error;
  }
};

export const getLatestBooks = async () => {
  try {
    const response = await api.get('/books/latest');
    return response.data;
  } catch (error) {
    console.error('Error fetching latest books:', error);
    throw error;
  }
};
