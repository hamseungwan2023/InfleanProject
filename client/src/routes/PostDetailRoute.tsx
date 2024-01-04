import React from "react";
import CommentList from "../components/commnet/CommentList";
import PostDetail from "../components/postDetail/PostDetail";
import PostList from "../components/postList/PostList";

const PostDetailRoute = () => {
  return <section className="postDetailRoute">
    <PostDetail />
    <CommentList />
    <PostList />
  </section>
}

export default PostDetailRoute;