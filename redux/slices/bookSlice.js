import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getBooks,
  getBookByKeyword,
  getTopViewedBooks,
  getLatestBooks,
} from '../../api/bookApi';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const data = await getBooks();
  return data;
});

export const searchBooks = createAsyncThunk(
  'books/searchBooks',
  async keyword => {
    const data = await getBookByKeyword(keyword);
    return data;
  },
);

export const fetchTopViewedBooks = createAsyncThunk(
  'books/fetchTopViewedBooks',
  async () => {
    return await getTopViewedBooks();
  },
);

export const fetchLatestBooks = createAsyncThunk(
  'books/fetchLatestBooks',
  async () => {
    return await getLatestBooks();
  },
);

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    list: [],
    topViewed: [],
    latest: [],
    loading: false,
    error: null,
  },
  reducers: {
    setBooks(state, action) {
      state.list = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch books
      .addCase(fetchBooks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Search books
      .addCase(searchBooks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Top Viewed
      .addCase(fetchTopViewedBooks.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTopViewedBooks.fulfilled, (state, action) => {
        state.topViewed = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopViewedBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Latest
      .addCase(fetchLatestBooks.pending, state => {
        state.loading = true;
      })
      .addCase(fetchLatestBooks.fulfilled, (state, action) => {
        state.latest = action.payload;
        state.loading = false;
      })
      .addCase(fetchLatestBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {setBooks} = bookSlice.actions;
export default bookSlice.reducer;
