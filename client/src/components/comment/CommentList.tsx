import React, { useState } from "react";
import { commentListData, TComment } from "../../constants/comment";
import { filterCommentByLikes, filterCommentByRecent } from "../../utils/filter";
import style from "./Comment.module.scss";
import CommentItem from "./CommentItem";
import CommentWrite from "./CommentWrite";

enum ECommentTab {
  recent= 1,
  popular= 2,
}

const CommentList = () => {
  const [commentList, setCommentList] = useState<TComment[]>(filterCommentByLikes(commentListData));
  const [tab, setTab] = useState<number>(1);

  const onClickTab = (tabIndex:ECommentTab) => {
    return (e:React.MouseEvent<HTMLElement>) => {
      setTab(tabIndex);
      if(tabIndex===ECommentTab.popular) {
        setCommentList(() => filterCommentByLikes(commentList));
      }else {
        setCommentList(() => filterCommentByRecent(commentList));
      }
    }
  }

  return <div className="comment">
    {/* [TODO] 댓글 스크롤 시 data-in-view state설정 후 스타일 */}
    <div className={style.title_wrap} style={{position: "sticky", top: "0px", zIndex:"1000px"}} data-in-view={true}>
      <h2>댓글</h2>
      <span className={style.count}>총 <em className={style.color}>{commentListData.length}</em> 개</span>
    </div>
    {/* [TODO] 로그인한 사용자 모두에게 댓글쓰기 노출 */}
    <CommentWrite isReplyComment={false}/>
    <ul className={style.tab_list} role="tablist">
      <li className={style.tab_item} role="presentation">
        <button type="button" className={style.btn_tab} aria-selected={tab === ECommentTab.recent} onClick={onClickTab(ECommentTab.recent)}>최신순</button>
      </li>
      <li className={style.tab_item} role="presentation">
        <button type="button" className={style.btn_tab} aria-selected={tab === ECommentTab.popular} onClick={onClickTab(ECommentTab.popular)}>인기순</button>
      </li>
    </ul>
    <ul role="tabpanel" className={style.comment_list}>
      {
        commentList.map((item, index) => <CommentItem comment={item} key={index} />)
      }
    </ul>
  </div>
}

export default CommentList