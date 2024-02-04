import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: null, // 검색어
    searchCategory: null, //검색 카테고리
  },
  reducers: {
    clickSearch: (state, action) => {
      state.search = action.payload.search;
      state.searchCategory = action.payload.searchCategory;
    }
  },
});

export const { clickSearch, } = searchSlice.actions;

export default searchSlice.reducer;
