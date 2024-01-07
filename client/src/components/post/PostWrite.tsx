import React from "react";
import { CategoryList } from "../../constants/categoryList";
import style from "./PostItem.module.scss";

const PostWrite = () => {
  return (
    <div className={style.post_write}>
      <h2 className={style.post_write_top}>게시글 작성</h2>
      <form className={style.form}>
        <select name="category">
          {CategoryList.map((item, index) => {
            if(index >=1) {
              item.category.map((subItem, subIndex) => {
                if(subIndex >=1 ){
                  return (
                    <option className={style.option} value={subItem}>{subItem}</option>
                  )
                }
              })
            } else return null; 
          })}
        </select>
        <input type="text" name="title" placeholder="제목" value=""/>
      </form>
    </div>
  )
}

export default PostWrite;