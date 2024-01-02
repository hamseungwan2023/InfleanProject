import React from "react";
import { Link } from "react-router-dom";
import { CategoryList } from "../../constants/categoryList";
import style from "./Category.module.scss";

const Category = () => {
  return (
    <ul className={style.list} role="menu">
      {
        CategoryList.map((item, index) =>
          <li className={style.item} role="presentation" key={index}>
            {
              item.category.map((subItem, subIndex) => subIndex === 0 ? <strong key={subIndex} className={style.main_item} role="menuitem" aria-current={false}>
              <Link to="" className={style.link}>{subItem}</Link>
              </strong> : <div key={subIndex} className={style.sub_item} role="menuitem" aria-current={false}>
                <Link to="" className={style.link}>{subItem}</Link>
              </div>
              )
            }
          </li>
        )
      }
    </ul>
  )
}

export default Category