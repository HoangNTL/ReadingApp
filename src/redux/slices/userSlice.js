import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loginApi, registerApi} from '@api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = createAsyncThunk(
  'user/login',
  async ({email, password}, thunkAPI) => {
    try {
      const response = await loginApi(email, password);
      if (response) {
        await AsyncStorage.setItem('user', JSON.stringify(response.user)); // Store user data
        return response.user;
      }
      return thunkAPI.rejectWithValue('Login failed');
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message || 'Login failed',
      );
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async ({username, email, password}, thunkAPI) => {
    try {
      const response = await registerApi(username, email, password);
      if (response) {
        await AsyncStorage.setItem('user', JSON.stringify(response.user)); // Store user data in AsyncStorage
        return response.user;
      }
      return thunkAPI.rejectWithValue('Register failed');
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message || 'Register failed',
      );
    }
  },
);

// Thunk để logout và xóa user trong AsyncStorage
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, thunkAPI) => {
    await AsyncStorage.removeItem('user');
    // Sau đó dispatch action logout thuần túy để reset state
    thunkAPI.dispatch(logout());
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
    setUser(state, action) {
      state.user = action.payload;
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

export const {logout, setUser} = userSlice.actions;

export default userSlice.reducer;
