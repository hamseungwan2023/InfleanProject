import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slices/reducers/auth";
import style from "../components/layout/Header.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";
// import { persistor } from "../slices/store";

function Logout() {
  const user = useSelector((state: any) => state.auth.user);
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const accessToken = localStorage.getItem("accessToken");

  const dispatch = useDispatch();
  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await axios.delete("/user/logout", {
        headers: {
          Authorization: accessToken,
        },
      });
      localStorage.clear();
      dispatch(logout());
    } catch (err) {
      console.error(err);
    }
  };
  // console.log(user);
  return (
    <div>
      {isLoggedIn && (
        <button
          type="button"
          onClick={(e) => onClick(e)}
          className={style.btn_logout}
        >
          로그아웃
        </button>
      )}
    </div>
  );
}

export default Logout;
