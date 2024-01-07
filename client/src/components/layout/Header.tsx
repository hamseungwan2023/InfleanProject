import React from "react";
import { Link } from "react-router-dom";
import { regionList } from "../../constants/regionList";
import style from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [userState, setUserState] = useState(false);

  const accessToken = localStorage.getItem("accessToken") || "";
  const refreshToken = localStorage.getItem("refreshToken") || "";
  useEffect(() => {
    setUserState(false);
    if (accessToken.length && refreshToken.length > 0) {
      setUserState(true);
    }
  }, [userState]);

  const onClick = (e: React.MouseEvent) => {
    localStorage.clear();
    setUserState(false);
  };

  return (
    <header>
      <div className={style.header_common}>
        <Link to="/" className={style.logo}>
          지역 익명 커뮤니티 RAC
        </Link>
        {userState === true ? (
          <button
            type="button"
            onClick={(e) => onClick(e)}
            className={style.btn_logout}
          >
            로그아웃
          </button>
        ) : null}
      </div>
      <div className={style.header_service}>
        <ul role="menu" className={style.list}>
          {regionList.map((item, index) => {
            return (
              <li role="presentation" key={index} className={style.item}>
                <a
                  role="menuitem"
                  onClick={onClick}
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
