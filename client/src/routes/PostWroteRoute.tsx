import React from "react";
import PostList from "../components/post/PostList";
import PostWrote from "../components/post/PostWrote";

const PostWroteRoute = () => {
  return (
    <section className="postWroteRoute">
      <PostWrote />
      <PostList />
    </section>
  )
}

export default PostWroteRoute;