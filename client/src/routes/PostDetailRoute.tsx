import React, { useState } from "react";
import CommentList from "../components/comment/CommentList";
import PostDetail from "../components/post/PostDetail";
import PostList from "../components/post/PostList";

const PostDetailRoute = () => {
  const [commentCount, setCommentCount] = useState<number>(0);

  return (
    <section className="postDetailRoute">
      <PostDetail commentCount={commentCount}/>
      <CommentList setCommentCount={setCommentCount}/>
      <PostList isPostCorrect={false}/>
    </section>
  );
};

export default PostDetailRoute;
