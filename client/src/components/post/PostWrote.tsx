import React, { useState, useEffect } from "react";
import style from "./PostItem.module.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { tokenRefresh } from "../../slices/reducers/auth";
import { AppDispatch } from "../../slices/store";
const PostWrote = () => {
  const [userData, setUserData] = useState<any>({});

  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserData(dispatch);
  }, []);

  const getUserData = async (dispatch: AppDispatch) => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const response = await axios.get("/user/api/userDetail", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data);
      setUserData(response.data);
    } catch (err: any) {
      if (err.response.data.message === "기간이 만료된 토큰") {
        dispatch(tokenRefresh(String(refreshToken))); // 토큰을 갱신한 후에
        // await getUserData(); // 다시 데이터를 가져옴
      }
      console.error(err.response.data.message);
    }
  };

  return (
    <div className={style.post_wrote}>
      <div>
        <strong>{userData.nickname}</strong> 님이 쓴 글
      </div>
      <button
        type="button"
        className={style.btn_note_write}
        onClick={() => {
          window.open("/noteWrite/23", "_blank", "width=465, height=500");
        }}
      >
        쪽지보내기
      </button>
    </div>
  );
};

export default PostWrote;
