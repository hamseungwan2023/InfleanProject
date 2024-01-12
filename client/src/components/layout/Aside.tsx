import React from "react";
import Category from "../category/Category";
import Login from "../login/Login";
const Aside = () => {
  return (
    <aside className="aside">
      <Login />
      <Category />
    </aside>
  );
};

export default Aside;
