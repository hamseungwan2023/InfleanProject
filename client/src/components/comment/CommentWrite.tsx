import classNames from "classnames";
import React, { ChangeEvent, useState } from "react";
import style from "./Comment.module.scss";

type TProps = {
  isReplyComment: boolean;
}

const CommentWrite = ({ isReplyComment }: TProps) => {

  const [content, setContent] = useState("");

  const onChangeContent = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  return (
    <div className={classNames(style.comment_write_wrap, {[style.is_reply_comment] : isReplyComment})}>
      {isReplyComment && <i className={style.icon_reply} />}
      <div className={style.comment_write_area}>
        <textarea name="content" id="comment_content" maxLength={1000} placeholder="주제와 무관한 댓글, 타인의 권리를 침해하거나 명예를 훼손하는 게시물은 별도의 통보 없이 제재를 받을 수 있습니다." value={content} onChange={onChangeContent}/>
        <input type="file" id="imageUrl" className={style.input_image}/>
        <div className={style.comment_write_bottom}>
        <div className={style.info}>
          <label htmlFor="imageUrl" className={style.label_image}>사진</label>
          <span className={style.content_length}>{content.length}/1000</span>
        </div>
        <button type="button" className={style.btn_comment_write}>작성</button>
      </div>
      </div>
    </div>
  )
}

export default CommentWrite