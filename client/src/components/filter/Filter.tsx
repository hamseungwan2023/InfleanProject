import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bottomFilterList } from "../../constants/bottomFilterList";
import { CategoryList, ECategory } from "../../constants/categoryList";
import { ERegion } from "../../constants/regionList";
import { clickedCategory } from "../../slices/reducers/category";
import { clickOrderBy } from "../../slices/reducers/orderBy";
import { clickSearch } from "../../slices/reducers/search";
import { AppDispatch } from "../../slices/store";
import { getKeyByValue } from "../../utils/getKeyByValue";
import style from "./Filter.module.scss";

const Filter = () => {

  const [bottomFilterClick, setBottomFilterClick] = useState(0);
  const [isClickSearch, setIsClickSearch] = useState(false);
  const [dropdownOption, setDropdownOption] = useState(0);
  const [category, setCategory] = useState(CategoryList[0].category[0]);
  const [search, setSearch] = useState("");
  const [constantSearch, setConstantSearch] = useState("");
  const filterTop = useRef(0);
  const [isScrollOver, setIsScrollOver] = useState(false);
  const [isSearchResult, setIsSearchResult] = useState(false);

  const dispatch:AppDispatch = useDispatch();

  const isMounted = useRef(false);

  useEffect(()=>{
    dispatch(clickedCategory(ECategory[category]));
},[category]); // 셀렉트 변경시 리덕스 카테고리 값 같이변경

  const reduxCategory = useSelector((state:any) => state.category.category); //리덕스 카테고리값
  const reduxLocation = useSelector((state:any) => state.location.location); //리덕스 지역값
  const reduxSearch = useSelector((state:any) => state.location.search); //리덕스 검색어

  useEffect(()=> {
    if (isMounted.current) {
      setCategory(getKeyByValue(ECategory, reduxCategory));
    }
    else {
      isMounted.current = true;
    }
  },[reduxCategory]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const searchDropdownOptions = ["제목", "내용", "제목+내용"];

  const onChangeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const onClickSearch = () => {
    if(search==="") {
      window.confirm("검색어를 입력해주세요!");
    }else {
      setIsSearchResult(true);
      setConstantSearch(search);
      dispatch(clickSearch({search,searchCategory: dropdownOption}));
    }
  }

  const onChangeSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }

  const handleScroll = () => {
    if(window.pageYOffset >= filterTop.current) {
      setIsScrollOver(true)
    }else {
      setIsScrollOver(false);
    }
  }

  useEffect(()=> {
    dispatch(clickSearch({search,searchCategory: dropdownOption}));
    dispatch(clickOrderBy("createdDate"));
    if(scrollRef.current) {
        filterTop.current = scrollRef.current.offsetTop;
      }
  }, []);

  useEffect(() => {
    setIsSearchResult(false);
  }, [reduxCategory, reduxLocation])

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    
    return ()=> document.removeEventListener("scroll", handleScroll);
  })

  useEffect(() => {
    if(bottomFilterClick===1) {
      dispatch(clickOrderBy("createdDate"));
    } else if(bottomFilterClick===2) {
      dispatch(clickOrderBy("finalLike"));
    }

    /* [TODO] 추후 공지기능 생기면 추가
    else {
      dispatch(clickOrderBy(bottomFilterClick));
    }
    */
  }, [bottomFilterClick]);

  return <div className={classNames("filter", {"is_fixed": isScrollOver})} ref={scrollRef}>
    <div className={style.main}>
      <div className={style.area_wrap}>
        <div className={style.location_area}><span className={style.em_location}>{getKeyByValue(ERegion, reduxLocation)}</span> 지역</div>
        <div className={style.category_area}>
          <div>
            <button type="button" className={style.category_wrap}>
              <div className={style.title}>{category}</div>
            </button>
          </div>
          <select className={style.select} onChange={onChangeSelect} value={category}>
            {CategoryList.map((item) => item.category.map((subItem) => <option key="subItem" value={subItem}>{subItem}</option>)) }
          </select>
        </div>
      </div>
    </div>
    <div className={style.sub}>
      {isSearchResult ? <div className={style.result}><span className={style.filtering_words}>{reduxLocation}</span> 지역의 <span className={style.filtering_words}>{reduxCategory}</span> 카테고리 <span className={style.filtering_words}>'{constantSearch}'</span> 검색한 결과</div> : <ul role="tablist" className={style.bottom_filter_list}>
        {
          bottomFilterList.map((item, index) => 
            <li role="presentation" className={style.bottom_filter_item}>
              <button type="button" aria-selected={ bottomFilterClick === index ? true : false } key={index} onClick={() => setBottomFilterClick(index)} className={style.btn_bottom_filter}>{item}</button>
            </li>
          )
        }
      </ul>}
      <div className={style.area_search} >
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
        <button type="button" className={style.btn_search} aria-label="검색" onClick={onClickSearch}>
          <i className={style.icon_search} />
        </button>
      </div>
    </div>
  </div>
}

export default Filter;