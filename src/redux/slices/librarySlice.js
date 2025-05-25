import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getLikedBooks, getSavedBooks} from '@api/bookApi';

export const fetchLikedBooks = createAsyncThunk(
  'library/fetchLikedBooks',
  async userId => {
    const data = await getLikedBooks(userId);
    return data;
  },
);

export const fetchSavedBooks = createAsyncThunk(
  'library/fetchSavedBooks',
  async userId => {
    const data = await getSavedBooks(userId);
    return data;
  },
);

const librarySlice = createSlice({
  name: 'library',
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBooks(state) {
      state.books = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLikedBooks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLikedBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchLikedBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSavedBooks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchSavedBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {clearBooks} = librarySlice.actions;
export default librarySlice.reducer;
