import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/login/reducer";
import style from "../components/layout/Header.module.scss";

function Logout() {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(logout());
  };
  return (
    <div>
      <button
        type="button"
        onClick={(e) => onClick(e)}
        className={style.btn_logout}
      >
        로그아웃
      </button>
    </div>
  );
}

export default Logout;
