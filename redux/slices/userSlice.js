// redux/userSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loginApi, registerApi} from '../../api/authApi';

// Async thunk cho login
export const login = createAsyncThunk(
  'user/login',
  async ({email, password}, thunkAPI) => {
    const response = await loginApi(email, password);
    if (response) {
      return response.user;
    }
    return thunkAPI.rejectWithValue('Login failed');
  },
);

// Async thunk cho register
export const register = createAsyncThunk(
  'user/register',
  async ({username, email, password}, thunkAPI) => {
    const response = await registerApi(username, email, password);
    if (response) {
      return response.user;
    }
    return thunkAPI.rejectWithValue('Register failed');
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      // login
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log('Login successful:', action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // register
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {logout} = userSlice.actions;

export default userSlice.reducer;
