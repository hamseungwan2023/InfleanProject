import React from "react";
import { Link } from "react-router-dom";
import { regionList } from "../../constants/regionList";
import style from "./Header.module.scss";
import { useSelector } from "react-redux";
import Logout from "../../routes/Logout";
const Header = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

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
