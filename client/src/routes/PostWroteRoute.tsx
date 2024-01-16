import React from "react";
import PostList from "../components/post/PostList";
import PostWrote from "../components/post/PostWrote";

const PostWroteRoute = () => {
  return (
    <section className="postWroteRoute">
      <PostWrote />
      <PostList isPostCorrect={true}/>
    </section>
  )
}

export default PostWroteRoute;