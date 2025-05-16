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
    console.log('Fetching pages for chapter:', chapterId);
    const response = await api.get(`books/chapters/${chapterId}/pages`);
    console.log('Pages:', response.data);
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
