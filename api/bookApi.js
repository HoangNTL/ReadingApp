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

export const getBookById = async id => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    throw error;
  }
};

export const getFirstChapter = async bookId => {
  try {
    const response = await api.get(`/books/${bookId}/chapters/first`);
    return response.data;
  } catch (error) {
    console.error('Error fetching first chapter:', error);
    throw error;
  }
};

export const getPagesByChapterId = async chapterId => {
  try {
    const response = await api.get(`books/chapters/${chapterId}/pages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pages for chapter:', error);
    throw error;
  }
};

export const getNextChapter = async (bookId, currentOrder) => {
  try {
    const response = await api.get(`/books/${bookId}/chapters/next`, {
      params: {current_order: currentOrder},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching next chapter:', error);
    throw error;
  }
};

export const getPreviousChapter = async (bookId, currentOrder) => {
  try {
    const response = await api.get(`/books/${bookId}/chapters/previous`, {
      params: {current_order: currentOrder},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching previous chapter:', error);
    throw error;
  }
};

export const likeBook = async (bookId, userId) => {
  try {
    const response = await api.post(`/books/${bookId}/like`, {
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.error('Error liking book:', error);
    throw error;
  }
};

export const getLikeStatus = async (bookId, userId) => {
  try {
    const response = await api.get(`/books/${bookId}/like`, {
      params: {
        user_id: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error checking like status:', error);
    throw error;
  }
};

export const getLikedBooks = async userId => {
  try {
    const response = await api.get('/books/like', {
      params: {
        user_id: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching liked books:', error);
    throw error;
  }
};

export const getBookByKeyword = async keyword => {
  try {
    const response = await api.get('/books/search', {
      params: {
        keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

export const saveBook = async (bookId, userId) => {
  try {
    const response = await api.post(`/books/${bookId}/save`, {
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.error('Error saving book:', error);
    throw error;
  }
};

export const getSaveStatus = async (bookId, userId) => {
  try {
    const response = await api.get(`/books/${bookId}/save`, {
      params: {
        user_id: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error checking like status:', error);
    throw error;
  }
};

export const getSavedBooks = async userId => {
  try {
    const response = await api.get('/books/save', {
      params: {
        user_id: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching saved books:', error);
    throw error;
  }
};
