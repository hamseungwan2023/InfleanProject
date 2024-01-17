import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slices/reducers/auth";
import style from "../components/layout/Header.module.scss";
import axios from "axios";

function Logout() {
  const dispatch = useDispatch();
  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await axios.delete("/user/logout" , { data: {
        refreshToken: localStorage.getItem("refreshToken")
      }, headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }});
      localStorage.clear();
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
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
