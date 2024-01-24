import { createSlice } from "@reduxjs/toolkit";

const orderBySlice = createSlice({
  name: "orderBy",
  initialState: {
    orderBy: null, // 검색어
  },
  reducers: {
    clickOrderBy: (state, action) => {
      state.orderBy = action.payload;
    }
  },
});

export const { clickOrderBy, } = orderBySlice.actions;

export default orderBySlice.reducer;
