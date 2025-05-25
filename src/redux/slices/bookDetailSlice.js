import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getBookById, getSaveStatus, saveBook} from '@api/bookApi';

export const fetchBookDetail = createAsyncThunk(
  'bookDetail/fetchBookDetail',
  async ({bookId, userId}) => {
    const book = await getBookById(bookId);
    if (!book) {
      throw new Error('Book not found');
    }

    const status = await getSaveStatus(bookId, userId);
    return {book, isSaved: status.is_saved};
  },
);

export const toggleSaveBook = createAsyncThunk(
  'bookDetail/toggleSaveBook',
  async ({bookId, userId}, {getState}) => {
    const savedBooks = await saveBook(bookId, userId);
    return savedBooks.is_saved;
  },
);

const bookDetailSlice = createSlice({
  name: 'bookDetail',
  initialState: {
    book: null,
    isSaved: false,
    loading: false,
    saving: false,
    error: null,
  },
  reducers: {
    clearBookDetail(state) {
      state.book = null;
      state.isSaved = false;
      state.loading = false;
      state.saving = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Handle fetchBookDetail actions
      .addCase(fetchBookDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookDetail.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.book = action.payload.book ?? null;
          state.isSaved = action.payload.isSaved ?? false;
        } else {
          state.book = null;
          state.isSaved = false;
        }
      })
      .addCase(fetchBookDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle toggleSaveBook actions
      .addCase(toggleSaveBook.pending, state => {
        state.saving = true;
        state.error = null;
      })
      .addCase(toggleSaveBook.fulfilled, (state, action) => {
        state.isSaved = action.payload;
        state.saving = false;
      })
      .addCase(toggleSaveBook.rejected, (state, action) => {
        state.saving = false;
        state.error = action.error.message;
      });
  },
});

export const {clearBookDetail} = bookDetailSlice.actions;
export default bookDetailSlice.reducer;
