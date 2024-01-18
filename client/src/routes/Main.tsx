import React from "react";
import Filter from "../components/filter/Filter";
import PostList from "../components/post/PostList";

const Main = () => {
  return <main>
    <Filter />
    <PostList isPostCorrect={false} />
  </main>
}

export default Main;