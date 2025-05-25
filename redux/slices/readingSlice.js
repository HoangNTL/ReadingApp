import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getFirstChapter,
  getPagesByChapterId,
  getNextChapter,
  getPreviousChapter,
  getLikeStatus,
  likeBook,
} from '../../api/bookApi';

// Async thunk lấy chapter đầu tiên + pages
export const fetchFirstChapter = createAsyncThunk(
  'reading/fetchFirstChapter',
  async (bookId, thunkAPI) => {
    const chapter = await getFirstChapter(bookId);
    const pages = await getPagesByChapterId(chapter.id);
    return {chapter, pages};
  },
);

// Async thunk lấy next chapter
export const fetchNextChapter = createAsyncThunk(
  'reading/fetchNextChapter',
  async ({bookId, chapterOrder}, thunkAPI) => {
    const nextChapter = await getNextChapter(bookId, chapterOrder);
    if (nextChapter) {
      const pages = await getPagesByChapterId(nextChapter.id);
      return {chapter: nextChapter, pages};
    }
    return thunkAPI.rejectWithValue('No next chapter');
  },
);

// Async thunk lấy previous chapter
export const fetchPreviousChapter = createAsyncThunk(
  'reading/fetchPreviousChapter',
  async ({bookId, chapterOrder}, thunkAPI) => {
    const previousChapter = await getPreviousChapter(bookId, chapterOrder);
    if (previousChapter) {
      const pages = await getPagesByChapterId(previousChapter.id);
      return {chapter: previousChapter, pages};
    }
    return thunkAPI.rejectWithValue('No previous chapter');
  },
);

// Async thunk lấy trạng thái like
export const fetchLikeStatus = createAsyncThunk(
  'reading/fetchLikeStatus',
  async ({bookId, userId}, thunkAPI) => {
    const likeStatus = await getLikeStatus(bookId, userId);
    return likeStatus.is_liked;
  },
);

// Async thunk để like/unlike book
export const toggleLikeBook = createAsyncThunk(
  'reading/toggleLikeBook',
  async ({bookId, userId}, thunkAPI) => {
    const result = await likeBook(bookId, userId);
    return result.is_liked;
  },
);

const readingSlice = createSlice({
  name: 'reading',
  initialState: {
    currentChapter: null,
    currentPages: [],
    currentPageIndex: 0,
    like: false,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentPageIndex(state, action) {
      state.currentPageIndex = action.payload;
    },
    toggleHeader(state, action) {
      // Nếu bạn muốn lưu trạng thái header ở redux
    },
  },
  extraReducers: builder => {
    builder
      // fetchFirstChapter
      .addCase(fetchFirstChapter.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFirstChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChapter = action.payload.chapter;
        state.currentPages = action.payload.pages;
        state.currentPageIndex = 0;
      })
      .addCase(fetchFirstChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // fetchNextChapter
      .addCase(fetchNextChapter.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNextChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChapter = action.payload.chapter;
        state.currentPages = action.payload.pages;
        state.currentPageIndex = 0;
      })
      .addCase(fetchNextChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // fetchPreviousChapter
      .addCase(fetchPreviousChapter.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreviousChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChapter = action.payload.chapter;
        state.currentPages = action.payload.pages;
        state.currentPageIndex = action.payload.pages.length - 1;
      })
      .addCase(fetchPreviousChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // fetchLikeStatus
      .addCase(fetchLikeStatus.fulfilled, (state, action) => {
        state.like = action.payload;
      })

      // toggleLikeBook
      .addCase(toggleLikeBook.fulfilled, (state, action) => {
        state.like = action.payload;
      });
  },
});

export const {setCurrentPageIndex} = readingSlice.actions;

export default readingSlice.reducer;
