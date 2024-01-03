import React from "react";
import { postDetailData } from "../../constants/post";
import style from "./PostDetail.module.scss";

const PostDetail = () => {

  const postDetail = postDetailData;

  return <div className="postDetail">
    <div className={style.title_wrap}>
      <h1 className={style.title}>{postDetail.title}</h1>
      <div className={style.title_info}>
        <div className={style.info_wrap}>
          <span className={style.category}>{postDetail.category}</span>
          <span className={style.last_update}>8시간 전</span>
          <span className={style.writer}>
            <i className={style.rank} />
            <span>{postDetail.writer}</span>
          </span>
        </div>
        <div className={style.info_wrap}>
          <span className={style.views}>조회수 {postDetail.views}</span>
          <span className={style.comment_count}>댓글 6</span>
          <span className={style.recommend_count}>추천 {postDetail.finalLike}</span>
        </div>
      </div>
    </div>
    <div className={style.content_wrap}>{postDetail.content}</div>
    <div className={style.recommend_wrap}>
      <button type="button" className={style.btn_recommend}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-type="default"><path d="M12.8215 10.4987L8.55564 4.31749C8.48688 4.21791 8.40159 4.13798 8.30561 4.08318C8.20963 4.02837 8.10524 4 7.9996 4C7.89396 4 7.78957 4.02837 7.69359 4.08318C7.59761 4.13798 7.51231 4.21791 7.44355 4.31749L3.17768 10.4987C2.77056 11.0887 3.1081 12 3.73373 12H12.2667C12.8923 12 13.2299 11.0887 12.8215 10.4987Z"></path></svg>
        <span>{postDetail.like}</span>
        <span className="blind">추천 수</span>
      </button>
      <button type="button" className={style.btn_recommend}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-type="default"><path d="M12.8215 10.4987L8.55564 4.31749C8.48688 4.21791 8.40159 4.13798 8.30561 4.08318C8.20963 4.02837 8.10524 4 7.9996 4C7.89396 4 7.78957 4.02837 7.69359 4.08318C7.59761 4.13798 7.51231 4.21791 7.44355 4.31749L3.17768 10.4987C2.77056 11.0887 3.1081 12 3.73373 12H12.2667C12.8923 12 13.2299 11.0887 12.8215 10.4987Z"></path></svg>
        <span>-{postDetail.dislike}</span>
        <span className="blind">비추천 수</span>
      </button>
    </div>
  </div>
}

export default PostDetail;