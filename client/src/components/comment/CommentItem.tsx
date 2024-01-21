import axios from "axios";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { TComment } from "../../constants/comment";
import { loadReduxCommentList } from "../../slices/reducers/commentList";
import { AppDispatch } from "../../slices/store";
import { getDayMinuteCounter } from "../../utils/getDayMinuteCounter";
import style from "./Comment.module.scss";
import CommentWrite from "./CommentWrite";

type TProps = {
  comment: TComment,
  setClickReplyBtnParentId: React.Dispatch<React.SetStateAction<number | null>>,
  clickReplyBtnParentId: number | null,
  setCommentList: React.Dispatch<React.SetStateAction<TComment[]>>;
}

const CommentItem = ({ comment, clickReplyBtnParentId, setClickReplyBtnParentId, setCommentList } : TProps ) => {

  const [isEdit, setIsEdit] = useState(false);
  const [isEditReplyComment, setIsEditReplyComment] = useState(false);
  const [editNumber, setEditNumber] = useState(0);
  const dispatch:AppDispatch = useDispatch();
  const postId = useParams().id;

  const onClickDelete = (commentId: number) => async () => {
    try{
      const res = await axios.delete(`/api/commentDelete/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
  
      if(res.status===200) {
        if(postId) {
          dispatch(loadReduxCommentList(postId));
        }
      }
    } catch(e) {
      console.log(e);
    }
  }

  const onClickReplyDelete = (replyCommentId: number) => async () => {
    try{
      const res = await axios.delete(`/api/replyCommentDelete/${replyCommentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
  
      if(res.status===200) {
        if(postId) {
          dispatch(loadReduxCommentList(postId));
        }
      }
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <>
      <li className={style.comment_item}>
        <div className={style.recommend_wrap}>
          <button type="button" className={style.btn_like}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-type="default"><path d="M12.8215 10.4987L8.55564 4.31749C8.48688 4.21791 8.40159 4.13798 8.30561 4.08318C8.20963 4.02837 8.10524 4 7.9996 4C7.89396 4 7.78957 4.02837 7.69359 4.08318C7.59761 4.13798 7.51231 4.21791 7.44355 4.31749L3.17768 10.4987C2.77056 11.0887 3.1081 12 3.73373 12H12.2667C12.8923 12 13.2299 11.0887 12.8215 10.4987Z"></path></svg>
            <span className="blind">추천</span>
          </button>
          <span className={style.recommend_count}>{comment.like}</span>
          <button type="button" className={style.btn_dislike}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-type="default"><path d="M12.8215 10.4987L8.55564 4.31749C8.48688 4.21791 8.40159 4.13798 8.30561 4.08318C8.20963 4.02837 8.10524 4 7.9996 4C7.89396 4 7.78957 4.02837 7.69359 4.08318C7.59761 4.13798 7.51231 4.21791 7.44355 4.31749L3.17768 10.4987C2.77056 11.0887 3.1081 12 3.73373 12H12.2667C12.8923 12 13.2299 11.0887 12.8215 10.4987Z"></path></svg>
            <span className="blind">비추천</span>
          </button>
        </div>
        <div className={style.main_wrap}>
          <div className={style.info_wrap}>
            <span className={style.rank}><span className="blind">레벨1</span></span>
            <Link to={`/postWrote/${comment.writerId}`} className={style.writer}>{comment.writerNickname}</Link>
            <span className={style.last_update}>{getDayMinuteCounter(comment.createdAt)}</span>
          </div>
          <div className={classNames(style.content, {[style.is_deleted] : comment.deleted})}>
          {
            isEdit ? <CommentWrite isReplyComment={false} setCommentList={setCommentList} isEditComment commentContent={comment.content} setIsEdit={setIsEdit} editNumber={editNumber}/>  : (comment.deleted ? "삭제된 댓글 입니다." :comment.content)
          }
          </div>
          <div className={style.bottom_wrap}>
            <button type="button" className={style.btn_delete} onClick={onClickDelete(comment.id)}>
              삭제하기
            </button>
            <button type="button" className={style.btn_edit} onClick={() => {setIsEdit(true); setEditNumber(comment.id)}}>
              수정하기
            </button>
            <button type="button" className={style.btn_report}>
              신고하기
            </button>
            <button type="button" className={style.btn_reply} onClick={() => setClickReplyBtnParentId(comment.id)}>
              <img src="https://talk.op.gg/images/icon-reply@2x.png" alt="답글쓰기" width="16" />
              답글쓰기
            </button>
          </div>
        </div>
      </li>
      {
        comment.id === clickReplyBtnParentId && <CommentWrite setCommentList={setCommentList} isReplyComment parentCommentId={comment.id}/>
      }
      { comment.replyCommentList?.map(
          (replyComment, index) => (
            <>
            <li key={index} className={classNames(style.comment_item,style.has_reply)}>
              <div className={style.reply_wrap}>
                <i className={style.icon_reply} />
              </div>
              <div className={style.main_wrap}>
                <div className={style.info_wrap}>
                  <span className={style.rank}><span className="blind">레벨1</span></span>
                  <Link to={`/postWrote/${replyComment.writerId}`} className={style.writer}>{replyComment.writerNickname}</Link>
                  <span className={style.last_update}>{getDayMinuteCounter(replyComment.createdAt)}</span>
                </div>
                <div className={classNames(style.content, {[style.is_deleted] : replyComment.deleted})}>
                  { replyComment.parentCommentNickname !== comment.writerNickname && <span className={style.tag_comment}>{replyComment.parentCommentNickname}</span>}
                  {
                    isEditReplyComment ? <CommentWrite isReplyComment={true} setCommentList={setCommentList} isEditComment commentContent={replyComment.content} setIsEditReplyComment={setIsEditReplyComment} editNumber={editNumber}/>  : ( replyComment.deleted ? "삭제된 댓글입니다." : replyComment.content)
                  }
                </div>
                <div className={style.bottom_wrap}>
                <button type="button" className={style.btn_delete} onClick={onClickReplyDelete(replyComment.id)}>
                  삭제하기
                </button>
                <button type="button" className={style.btn_edit} onClick={() => {setIsEditReplyComment(true); setEditNumber(replyComment.id)}}>
                  수정하기
                </button>
                  <button type="button" className={style.btn_report}>
                    신고하기
                  </button>
                </div>
              </div>
            </li>
            {
              replyComment.id === clickReplyBtnParentId && <CommentWrite setCommentList={setCommentList} isReplyComment />
            }
            </>
          )
        )
      }
    </>
  )
}

export default CommentItem
