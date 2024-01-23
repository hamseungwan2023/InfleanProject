import React from "react";
import style from "./PostItem.module.scss";
import { useSelector } from "react-redux";
const PostWrote = () => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <div className={style.post_wrote}>
      <div>
        <strong>{user.nickname}</strong> 님이 쓴 글
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
