import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    location: null, // 선택된 지역
  },
  reducers: {
    clickedLocation: (state, action) => {
      state.location = action.payload;
    }
  },
});

export const { clickedLocation, } = locationSlice.actions;

export default locationSlice.reducer;
