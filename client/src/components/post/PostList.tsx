import moment from "moment";
import React from "react";
import { postListData } from "../../constants/postList";
import PostItem from "./PostItem";

const PostList = () => {

  const postList = postListData.sort((a, b) => -moment(a.createdAt).diff(moment(b.createdAt)));

  return <div className="postlist" role="tabpanel">
    <ul>
      {
        postList.map((item,index) => <PostItem postItem={item} key={index}/>)
      }
    </ul>
  </div>
}

export default PostList;