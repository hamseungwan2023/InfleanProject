import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CategoryList } from "../../constants/categoryList";
import style from "./Category.module.scss";

const Category = () => {
  const [click, setClick] = useState("전체");

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
                  to=""
                  className={style.link}
                  onClick={() => {
                    setClick(subItem);
                  }}
                >
                  {subItem}
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
                  to=""
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
