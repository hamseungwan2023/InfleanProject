import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, RootState } from "../store";

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

export const selectAuth = (state: RootState) => state.auth;

export const updateProfile =
  (nickname: string, password: string, newPassword: string) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      const { user } = getState().auth;

      if (!user) {
        return;
      }
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.patch(
        `/user/update`,
        {
          nickname,
          password,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(loginSuccess(response.data));
      console.log("수정 성공:", response.data);
    } catch (err) {
      console.error("수정 실패:", err);
    }
  };

export const updateNickname =
  (nickname: string) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    try {
      const { user } = getState().auth;

      if (!user) {
        return;
      }
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.patch(
        `/user/update`,
        {
          nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(loginSuccess(response.data));
      console.log("수정 성공:", response.data);
    } catch (err) {
      console.error("수정 실패:", err);
    }
  };

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
      console.log("로그인 성공");
      console.log("사용자 정보", response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    } catch (error) {
      dispatch(loginFailure("로그인에 실패했습니다."));
    }
  };

export default authSlice.reducer;
