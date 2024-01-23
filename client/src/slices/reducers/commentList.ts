import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch} from "../store";

const commentListSlice = createSlice({
  name: "commentList",
  initialState: {
    commentList: null, // 로그인된 사용자 정보
    error: null, // 로그인 에러
  },
  reducers: {
    loadSuccess: (state, action) => {
      state.commentList = action.payload;
      state.error = null;
    },
    loadFailure: (state, action) => {
      state.commentList = null;
      state.error = action.payload;
    },
  },
});

export const { loadSuccess, loadFailure, } = commentListSlice.actions;

export const loadReduxCommentList =
  (postId: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const response = await axios.get(`/api/commentList/${postId}`);
      dispatch(loadSuccess(response.data));
    } catch (error) {
      dispatch(loadFailure(error));
    }
  };

export default commentListSlice.reducer;
