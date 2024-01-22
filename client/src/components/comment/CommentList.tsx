import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TComment } from "../../constants/comment";
import { loadReduxCommentList } from "../../slices/reducers/commentList";
import { AppDispatch } from "../../slices/store";
import { countComment } from "../../utils/count";
import { filterCommentByLikes, filterCommentByRecent } from "../../utils/filter";
import style from "./Comment.module.scss";
import CommentItem from "./CommentItem";
import CommentWrite from "./CommentWrite";

enum ECommentTab {
  recent= 1,
  popular= 2,
}

type TProps = {
  setCommentCount: React.Dispatch<React.SetStateAction<number>>
}

const CommentList = ({ setCommentCount }: TProps) => {
  const postId = useParams().id;
  const dispatch:AppDispatch = useDispatch();
  const reduxCommentList = useSelector((state:any) => state.commentList.commentList);
  const [commentList, setCommentList] = useState<TComment[]>([]);
  const [tab, setTab] = useState<number>(1);
  const [clickReplyBtnParentId, setClickReplyBtnParentId] = useState<number | null>(null); 
  const commentListRef = useRef<HTMLDivElement>(null);
  const [isScrollOver, setIsScrollOver] = useState(false);

  const commentListHeight = useRef(0);//댓글 리스트 높이
  const commentListTop = useRef(0);//댓글 리스트 top값

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
    if(window.pageYOffset >= commentListTop.current && window.pageYOffset <= commentListTop.current+commentListHeight.current) {
      console.log(commentListTop.current+commentListHeight.current);
      console.log(window.pageYOffset);
      setIsScrollOver(true);
    }else {
      console.log(commentListTop.current+commentListHeight.current);
      console.log(window.pageYOffset);
      setIsScrollOver(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  useEffect(()=> {
    if(postId) dispatch(loadReduxCommentList(postId));
    setCommentList(filterCommentByRecent(reduxCommentList));
    if(commentListRef.current) {
      commentListHeight.current = commentListRef.current.offsetHeight;
      commentListTop.current = commentListRef.current.offsetTop;
    }
  },[]);

  useEffect(() => {
    setCommentCount(countComment(commentList));
  }, [commentList])

  return <div className="comment">
    <div className={classNames(style.title_wrap, {[style.is_fixed]:isScrollOver})}>
      <h2>댓글</h2>
      <span className={style.count}>총 <em className={style.color}>{countComment(commentList)}</em> 개</span>
    </div>
    {/* [TODO] 로그인한 사용자 모두에게 댓글쓰기 노출 */}
    <div ref={commentListRef}>
      <CommentWrite setCommentList={setCommentList} isReplyComment={false}/>
      {
        commentList.length >=1 && (
          <ul className={style.tab_list} role="tablist">
            <li className={style.tab_item} role="presentation">
              <button type="button" className={style.btn_tab} aria-selected={tab === ECommentTab.recent} onClick={onClickTab(ECommentTab.recent)}>최신순</button>
            </li>
            <li className={style.tab_item} role="presentation">
              <button type="button" className={style.btn_tab} aria-selected={tab === ECommentTab.popular} onClick={onClickTab(ECommentTab.popular)}>인기순</button>
            </li>
          </ul>
        )
      }
      <ul role="tabpanel" className={style.comment_list}>
        {
          commentList.map((item, index) => <CommentItem setCommentList={setCommentList} comment={item} key={index} clickReplyBtnParentId={clickReplyBtnParentId} setClickReplyBtnParentId={setClickReplyBtnParentId} />)
        }
      </ul>
    </div>
  </div>
}

export default CommentList