import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch} from "../store";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // 로그인된 사용자 정보
    isLoggedIn: false, // 로그인 여부
    error: null, // 로그인 에러
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export const login =
  (username: string, password: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const response = await axios.post("/user/login", {
        username: username,
        password: password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginFailure("로그인에 실패했습니다."));
    }
  };

export default authSlice.reducer;
