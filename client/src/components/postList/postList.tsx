import React from "react";
import { postListData } from "../../constants/postList";
import PostItem from "../postItem/PostItem";
import style from "./PostList.module.scss";

const PostList = () => {

  const postList = postListData;
  return <div className="postlist" role="tabpanel">
    <ul className={style.list}>
      {
        postList.map((item,index) => <PostItem postItem={item} key={index}/>)
      }
    </ul>
  </div>
}

export default PostList;