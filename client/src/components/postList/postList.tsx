import React from "react";
import { postList } from "../../constants/postList";
import PostItem from "../postItem/PostItem";
import style from "./PostList.module.scss";

const PostList = () => {
  return <div className="postlist">
    <ul className={style.list}>
      {
        postList.map((item,index) => <PostItem title={item}/>)
      }
    </ul>
  </div>
}

export default PostList;