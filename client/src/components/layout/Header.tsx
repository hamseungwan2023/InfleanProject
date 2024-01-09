import React from "react";
import { Link } from "react-router-dom";
import { regionList } from "../../constants/regionList";
import style from "./Header.module.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/login/reducer";
import Logout from "../../routes/Logout";
const Header = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  // const dispatch = useDispatch();

  // // const accessToken = localStorage.getItem("accessToken") || "";
  // // const refreshToken = localStorage.getItem("refreshToken") || "";

  // const onClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   localStorage.clear();
  //   dispatch(logout());
  // };

  return (
    <header>
      <div className={style.header_common}>
        <Link to="/" className={style.logo}>
          지역 익명 커뮤니티 RAC
        </Link>
        {isLoggedIn === true ? <Logout /> : null}
      </div>
      <div className={style.header_service}>
        <ul role="menu" className={style.list}>
          {regionList.map((item, index) => {
            return (
              <li role="presentation" key={index} className={style.item}>
                <a
                  role="menuitem"
                  aria-current={false}
                  data-key={item}
                  href="#"
                  className={style.link}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Header;
