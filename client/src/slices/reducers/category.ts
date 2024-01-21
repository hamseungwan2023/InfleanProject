import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: null, // 선택된 카테고리
  },
  reducers: {
    clickedCategory: (state, action) => {
      state.category = action.payload;
    }
  },
});

export const { clickedCategory, } = categorySlice.actions;

export default categorySlice.reducer;
