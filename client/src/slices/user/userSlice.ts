import { createSlice } from "@reduxjs/toolkit";
import { userData } from "../../constants/userData";
const userSlice = createSlice({
  name: "users",
  initialState: userData,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    updateUser: (state, action) => {
      const { nickname, password, id } = action.payload;
      const uu = state.find((user) => user.id == id);
      if (uu) {
        uu.nickname = nickname;
        uu.password = password;
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      const uu = state.find((user) => user.id == id);
      if (uu) {
        return state.filter((f: any) => f.id !== id);
      }
    },
  },
});
export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
