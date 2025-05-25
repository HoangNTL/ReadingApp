import {createSlice} from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    global: false, // trạng thái loading tổng quát
  },
  reducers: {
    setLoading: (state, action) => {
      state.global = action.payload;
    },
  },
});

export const {setLoading} = loadingSlice.actions;
export default loadingSlice.reducer;
