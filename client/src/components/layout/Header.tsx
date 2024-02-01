import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { regionList } from "../../constants/regionList";
import style from "./Header.module.scss";
import { useSelector } from "react-redux";
import Logout from "../../routes/Logout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../slices/store";
import { clickedLocation } from "../../slices/reducers/location";

const Header = () => {
  const dispatch:AppDispatch = useDispatch();
  const [location ,setLocation] = useState("서울");

  const onClickLocation = (location: string) => () => {
    setLocation(location);
  }

  useEffect(()=> {
    dispatch(clickedLocation(location));
  },[location]);

  return (
    <header>
      <div className={style.header_common}>
        <Link to="/" className={style.logo}>
          지역 익명 커뮤니티 RAC
        </Link>
        <Logout />
      </div>
      <div className={style.header_service}>
        <ul role="menu" className={style.list}>
          {regionList.map((item, index) => {
            return (
              <li role="presentation" key={index} className={style.item}>
                <button
                  role="menuitem"
                  aria-current={location===item}
                  data-key={item}
                  type="button"
                  className={style.link}
                  onClick={onClickLocation(item)}
                >
                  <Link to="/">
                    {item}
                  </Link>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Header;
