import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CategoryList, ECategory } from "../../constants/categoryList";
import { clickedCategory } from "../../slices/reducers/category";
import { getKeyByValue } from "../../utils/getKeyByValue";
import style from "./Category.module.scss";

const Category = () => {
  const [click, setClick] = useState("전체");
  const dispatch:any = useDispatch();

  const isMounted = useRef(false);

  useEffect(()=>{
    dispatch(clickedCategory(ECategory[click]))
  },[click]);

  const reduxCategory = useSelector((state:any) => state.category.category); //리덕스 카테고리값

  useEffect(()=> {
    if (isMounted.current) {
      setClick(getKeyByValue(ECategory, reduxCategory));
    }
    else { 
      isMounted.current = true;
    }
  },[reduxCategory]);
//필터에서 값 변경시 category도 변경

  return (
    <ul className={style.list} role="menu">
      {CategoryList.map((item, index) => (
        <li className={style.item} role="presentation" key={index}>
          {item.category.map((subItem, subIndex) =>
            subIndex === 0 ? (
              <strong
                key={subIndex}
                className={style.main_item}
                role="menuitem"
                aria-current={click === subItem ? true : false}
              >
                <Link
                  to="/"
                  className={style.link}
                  onClick={() => {
                    setClick(subItem);
                  }}
                >{subItem}
                </Link>
              </strong>
            ) : (
              <div
                key={subIndex}
                className={style.sub_item}
                role="menuitem"
                aria-current={click === subItem ? true : false}
              >
                <Link
                  to="/"
                  className={style.link}
                  onClick={() => {
                    setClick(subItem);
                  }}
                >
                  {subItem}
                </Link>
              </div>
            )
          )}
        </li>
      ))}
    </ul>
  );
};

export default Category;
