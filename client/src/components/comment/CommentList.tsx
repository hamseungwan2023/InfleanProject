import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { commentListData, TComment } from "../../constants/comment";
import { countComment } from "../../utils/count";
import { filterCommentByLikes, filterCommentByRecent } from "../../utils/filter";
import style from "./Comment.module.scss";
import CommentItem from "./CommentItem";
import CommentWrite from "./CommentWrite";

enum ECommentTab {
  recent= 1,
  popular= 2,
}

const CommentList = () => {
  const [commentList, setCommentList] = useState<TComment[]>(filterCommentByRecent(commentListData));
  const [tab, setTab] = useState<number>(1);
  const [clickReplyBtnParentNumber, setClickReplyBtnParentNumber] = useState<number | null>(null); 
  const commentListRef = useRef<HTMLDivElement>(null);
  const [isScrollOver, setIsScrollOver] = useState(false);

  const [commentListSize, setCommentListSize] = useState(0);//댓글 리스트 높이
  const [commentListTop, setCommentListTop] = useState(0);//댓글 리스트 top값

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

  const handleScroll = () => {
    if(window.pageYOffset >= commentListTop && window.pageYOffset <= commentListTop+commentListSize) {
      setIsScrollOver(true);
      if(commentListRef.current) {
        setCommentListSize(commentListRef.current.offsetHeight);
        setCommentListTop(commentListRef.current.offsetTop);
      }
    }else {
      setIsScrollOver(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  return <div className="comment">
    <div className={classNames(style.title_wrap, {[style.is_fixed]:isScrollOver})}>
      <h2>댓글</h2>
      <span className={style.count}>총 <em className={style.color}>{countComment(commentList)}</em> 개</span>
    </div>
    {/* [TODO] 로그인한 사용자 모두에게 댓글쓰기 노출 */}
    <div ref={commentListRef}>
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
          commentList.map((item, index) => <CommentItem comment={item} key={index} clickReplyBtnParentNumber={clickReplyBtnParentNumber} setClickReplyBtnParentNumber={setClickReplyBtnParentNumber} />)
        }
      </ul>
    </div>
  </div>
}

export default CommentList