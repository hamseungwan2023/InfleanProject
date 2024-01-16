import React from "react";
import CommentList from "../components/comment/CommentList";
import PostDetail from "../components/post/PostDetail";
import PostList from "../components/post/PostList";

const PostDetailRoute = () => {
  return (
    <section className="postDetailRoute">
      <PostDetail />
      <CommentList />
      <PostList isPostCorrect={false}/>
    </section>
  );
};

export default PostDetailRoute;
