import React from "react";
import style from "./Comment.module.scss";
import CommentItem from "./CommentItem";

const CommentList = () => {
  return <div className="comment">
    {/* [TODO] 댓글 스크롤 시 data-in-view state설정 후 스타일 */}
    <div className={style.title_wrap} style={{position: "sticky", top: "0px", zIndex:"1000px"}} data-in-view={true}>
      <h2>댓글</h2>
      <span className={style.count}>총 <em className={style.color}>56</em> 개</span>
    </div>
    <ul className={style.tab_list} role="tablist">
      <li className={style.tab_item} role="presentation">
        <button type="button" className={style.btn_tab} aria-selected={true}>인기순</button>
      </li>
      <li className={style.tab_item} role="presentation">
        <button type="button" className={style.btn_tab} aria-selected={false}>최신순</button>
      </li>
    </ul>
    <ul role="tabpanel" className={style.comment_list}>
      <CommentItem />
    </ul>
  </div>
}

export default CommentList