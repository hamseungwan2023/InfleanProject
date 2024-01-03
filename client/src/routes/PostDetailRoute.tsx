import React from "react";
import PostDetail from "../components/postDetail/PostDetail";
import PostList from "../components/postList/PostList";

const PostDetailRoute = () => {
  return <section className="postDetailRoute">
    <PostDetail />
    <PostList />
  </section>
}

export default PostDetailRoute;