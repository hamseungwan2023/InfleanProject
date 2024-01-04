import React from "react";
import style from "./PostItem.module.scss";

const PostWrote = () => {
  return (
    <div className={style.post_wrote}>
      <strong>세종대왕</strong> 님이 쓴 글
    </div>
  )
}

export default PostWrote;