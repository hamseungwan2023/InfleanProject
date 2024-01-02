import React, { useState } from "react";
import { bottomFilterList } from "../../constants/bottomFilterList";
import { CategoryList } from "../../constants/categoryList";
import style from "./Filter.module.scss";

const Filter = () => {

  const [bottomFilterClick, setBottomFilterClick] = useState(0);

  return <div className="filter">
    <div className={style.main}>
      <div className={style.category_area}>
        <div>
          <button type="button" className={style.category_wrap}>
            <div className={style.title}>전체</div>
          </button>
        </div>
        <select className={style.select}>
          {CategoryList.map((item) => item.category.map((subItem) => <option key="subItem">{subItem}</option>)) }
        </select>
      </div>
    </div>
    <div className={style.sub}>
      <ul role="tablist" className={style.bottom_filter_list}>
        {
          bottomFilterList.map((item, index) => 
            <li role="presentation" className={style.bottom_filter_item}>
              <button type="button" aria-selected={ bottomFilterClick === index ? true : false } key={index} onClick={() => setBottomFilterClick(index)} className={style.btn_bottom_filter}>{item}</button>
            </li>
          )
        }
      </ul>
    </div>
  </div>
}

export default Filter;