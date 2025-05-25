import {configureStore} from '@reduxjs/toolkit';
import bookReducer from './slices/bookSlice';
import loadingReducer from './slices/loadingSlice';
import userReducer from './slices/userSlice';
import libraryReducer from './slices/librarySlice';
import bookDetailReducer from './slices/bookDetailSlice';

export const store = configureStore({
  reducer: {
    books: bookReducer,
    loading: loadingReducer,
    user: userReducer,
    library: libraryReducer,
    bookDetail: bookDetailReducer,
  },
});
