import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { TComment } from "../../constants/comment";
import { getDayMinuteCounter } from "../../utils/getDayMinuteCounter";
import style from "./Comment.module.scss";

type TProps = {
  comment: TComment,
}

const CommentItem = ({ comment } : TProps ) => {
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
          <div className={style.content}>
            {comment.content}
          </div>
          <div className={style.bottom_wrap}>
            <button type="button" className={style.btn_report}>
              신고하기
            </button>
            <button type="button" className={style.btn_reply}>
              <img src="https://talk.op.gg/images/icon-reply@2x.png" alt="답글쓰기" width="16" />
              답글쓰기
            </button>
          </div>
        </div>
      </li>
      { comment.replyCommentList?.map(
          (replyComment, index) => (
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
                <div className={style.content}>
                  { replyComment.parentCommentNickname !== comment.writerNickname && <span className={style.tag_comment}>{replyComment.parentCommentNickname}</span>}{replyComment.content}
                </div>
                <div className={style.bottom_wrap}>
                  <button type="button" className={style.btn_report}>
                    신고하기
                  </button>
                  <button type="button" className={style.btn_reply}>
                    <img src="https://talk.op.gg/images/icon-reply@2x.png" alt="답글쓰기" width="16" />
                    답글쓰기
                  </button>
                </div>
              </div>
            </li>
          )
        )
      }
    </>
  )
}

export default CommentItem