import axios from "axios";
import classNames from "classnames";
import React, { ChangeEvent, forwardRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { TComment } from "../../constants/comment";
import { loadReduxCommentList } from "../../slices/reducers/commentList";
import { AppDispatch } from "../../slices/store";
import { filterCommentByRecent } from "../../utils/filter";
import style from "./Comment.module.scss";

type TProps = {
  isReplyComment: boolean;
  isEditComment?: boolean;
  setCommentList: React.Dispatch<React.SetStateAction<TComment[]>>;
  parentCommentId?: number;
  commentContent?: string;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditReplyComment?: React.Dispatch<React.SetStateAction<boolean>>;
  editNumber?: number;
}

const CommentWrite = ({ isReplyComment, setCommentList, parentCommentId, isEditComment, commentContent, setIsEdit, setIsEditReplyComment, editNumber }:TProps) => {

  const [content, setContent] = useState("");
  const postId = useParams().id;
  const dispatch:AppDispatch = useDispatch();
  const reduxCommentList = useSelector((state:any) => state.commentList.commentList);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onChangeContent = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  useEffect(() => {
    setCommentList(filterCommentByRecent(reduxCommentList));
  },[reduxCommentList])

  useEffect(() => {
    textAreaRef.current?.focus();
    if(isEditComment && commentContent) {
      setContent(commentContent);
    }
  },[]);

  const onClickBtnWrite = async (e:React.MouseEvent<HTMLButtonElement>) => {
    try {
      let api="";
      let res;

      if(isEditComment) {
        // 댓글 수정
        api=`/api/commentCorrect/${editNumber}`;
        if(isReplyComment) {
          // 대댓글 수정
          api=`/api/replyCommentCorrect/${editNumber}`;
        }
        res = await axios.patch(api,{
          content
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
        if(setIsEdit) {
          setIsEdit(false);
        } else if(setIsEditReplyComment) {
          setIsEditReplyComment(false);
        }
      }else{
        // 댓글 쓰기
        api=`/api/commentWrite/${postId}`;
        if(isReplyComment) {
          // 대댓글 쓰기
        api=`/api/replyCommentWrite/${parentCommentId}`;
        }
        res = await axios.post(api,{
          content
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
      }
      if(res.status===200) {
        if(postId) {
          dispatch(loadReduxCommentList(postId));
        }
      }
    } catch(e) {
      console.log(e);
    } finally {
      setContent("");
    }
  }

  const tag = isReplyComment ? "li" : "div";

  const elementProps = {
    className: classNames(style.comment_write_wrap, {[style.is_reply_comment] : isReplyComment}, {[style.is_edit] : isEditComment}),
  };

  const children = (
    <>
      {isReplyComment && <i className={style.icon_reply} />}
      <div className={style.comment_write_area}>
        <textarea name="content" ref={textAreaRef} id="comment_content" maxLength={1000} placeholder="주제와 무관한 댓글, 타인의 권리를 침해하거나 명예를 훼손하는 게시물은 별도의 통보 없이 제재를 받을 수 있습니다." value={content} onChange={onChangeContent}/>
        <input type="file" id="imageUrl" className={style.input_image}/>
        <div className={style.comment_write_bottom}>
        <div className={style.info}>
          <label htmlFor="imageUrl" className={style.label_image}>사진</label>
          <span className={style.content_length}>{content.length}/1000</span>
        </div>
        <button type="button" className={style.btn_comment_write} onClick={onClickBtnWrite}>{isEditComment? "수정" : "작성"}</button>
      </div>
      </div>
    </>
  )

  return React.createElement(tag, elementProps, children);
}

export default CommentWrite