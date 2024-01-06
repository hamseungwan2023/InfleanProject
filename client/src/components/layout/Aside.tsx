import React from "react";
import Category from "../category/Category";
import Login from "../login/Login";
import Profile from "../profile/Profile";

const Aside = () => {
  return <aside className="aside">
    <Profile />
    {/* 로그인 시 <Profile /> 노출 */}
    <Category />
  </aside>
}

export default Aside;