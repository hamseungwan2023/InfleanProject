import React from "react";
import { Link } from "react-router-dom";
import { regionList } from "../../constants/regionList";
import style from "./Header.module.scss";

const Header = () => {
  const onClick = (e:React.MouseEvent) => {
    console.log(e);
  }

  return <header>
    <div className={style.header_common}>
      <Link to="/" className={style.logo}>지역 익명 커뮤니티 RAC</Link>
      <button type="button" className={style.btn_logout}>
        로그아웃
      </button>
    </div>
    <div className={style.header_service}>
      <ul role="menu" className={style.list}>
        {regionList.map((item, index) => {
          return (
            <li role="presentation" key={index} className={style.item}>
              <a role="menuitem" onClick={onClick} aria-current={false} data-key={item} href="#" className={style.link}>{item}</a>
            </li>
          )
        })}
      </ul>
    </div>
  </header>
}

export default Header;