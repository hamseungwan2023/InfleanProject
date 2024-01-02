import React, { useState } from "react";
import { bottomFilterList } from "../../constants/bottomFilterList";
import { CategoryList } from "../../constants/categoryList";
import style from "./Filter.module.scss";

const Filter = () => {

  const [bottomFilterClick, setBottomFilterClick] = useState(0);
  const [isClickSearch, setIsClickSearch] = useState(false);
  const [dropdownOption, setDropdownOption] = useState(0);
  const [search, setSearch] = useState("");

  const searchDropdownOptions = ["글", "글+내용", "내용"];

  const onChangeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const onSubmitSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 글, 글+내용, 작성자에 따라 검색 ex) state=0(글), 1(글+내용), 2(작성자) ,search="김철수"
  }

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
      <form className={style.area_search}>
        <div className={style.wrap_search}>
          <a role="button" href="#" className={style.select_search} aria-expanded={isClickSearch} onClick={() => setIsClickSearch(!isClickSearch)}>{searchDropdownOptions[dropdownOption]}
            <i className={style.icon_expand}><span className="blind">검색모드 펼치기</span></i>
          </a>
          <input type="text" onChange={onChangeSearch} value={search} name="search" className={style.input_search} maxLength={225}/>
          <ul className={style.dropdown_select} aria-hidden={!isClickSearch}>
            {searchDropdownOptions.map((item, index) => <li className={style.dropdown_option} role="presentation">
              <button type="button" key={index} role="option" aria-selected={dropdownOption === index ? true : false} onClick={() => {setDropdownOption(index); setIsClickSearch(false)}} className={style.btn_option}>{item}</button>
            </li>)}
          </ul>
        </div>
        <button type="button" className={style.btn_search} aria-label="검색">
          <i className={style.icon_search} />
        </button>
      </form>
    </div>
  </div>
}

export default Filter;