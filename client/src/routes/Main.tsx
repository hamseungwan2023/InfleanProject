import React from "react";
import Filter from "../components/filter/Filter";
import PostList from "../components/postlist/PostList";

const Main = () => {
  return <main role="tabpanel">
    <Filter />
    <PostList />
  </main>
}

export default Main;