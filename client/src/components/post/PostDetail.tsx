import axios, { Axios, AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ECategory } from "../../constants/categoryList";
import { TPost } from "../../constants/post";
import { ERegion } from "../../constants/regionList";
import { getDayMinuteCounter } from "../../utils/getDayMinuteCounter";
import { getKeyByValue } from "../../utils/getKeyByValue";
import style from "./PostDetail.module.scss";

type TProps = {
  commentCount: number;
}

const PostDetail = ({commentCount}:TProps) => {
  const [postDetail, setPostDetail] = useState<TPost>();

  const postId = useParams().id;

  const onClickLike = async () => {
    try {
      const res = await axios.post(`/api/increasePostLike/${postId}`,{},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      if(res.status===200) {
        getPostDetail();
      }
    } catch (e: any) {
      console.log(e.response.data.message);
      if(e.response.data.message === "이미 좋아요/싫어요한 게시글에 좋아요/싫어요를 할 수 없습니다.") {
        window.confirm("이미 추천/비추천한 게시글에 추천을 할 수 없습니다.")
      }else if(e.response.data.message === "자신이 작성한 게시글에는 좋아요를 할 수 없습니다.") {
        window.confirm("자신이 작성한 게시글에는 추천을 할 수 없습니다.")
      }
    }
  }

  const onClickDisLike = async () => {
    try {
      const res = await axios.post(`/api/decreasePostLike/${postId}`,{},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      if(res.status===200) {
        getPostDetail();
      }
    } catch (e: any) {
      console.log(e.response.data.message);
      if(e.response.data.message === "이미 좋아요/싫어요한 게시글에 좋아요/싫어요를 할 수 없습니다.") {
        window.confirm("이미 추천/비추천한 게시글에 비추천을 할 수 없습니다.")
      }else if(e.response.data.message === "자신이 작성한 게시글에는 싫어요를 할 수 없습니다.") {
        window.confirm("자신이 작성한 게시글에는 비추천을 할 수 없습니다.")
      }
    }
  }

  const getPostDetail = async () => {
    const res = await axios.get(`/api/postDetail/${postId}`);
  
    try {
      if(res.status===200) {
        setPostDetail(res.data);
      }
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getPostDetail();
  },[]);

  return (
    <div className="postDetail">
      <div className={style.title_wrap}>
        <h1 className={style.title}>{postDetail?.title}</h1>
        <div className={style.title_info}>
          <div className={style.info_wrap}>
            <span className={style.category}>{getKeyByValue(ERegion, postDetail? postDetail.location : "지역없음")}</span>
            <span className={style.category}>{getKeyByValue(ECategory, postDetail? postDetail.category : "카테고리없음")}</span>
            <span className={style.last_update}>
              {postDetail && getDayMinuteCounter(postDetail.createdAt)}
            </span>
            <Link
              to={`/postWrote/${postDetail?.writerId}`}
              className={style.writer}
            >
              <i className={style.rank} />
              <span>{postDetail?.writerNickname}</span>
            </Link>
          </div>
          <div className={style.info_wrap}>
            <span className={style.views}>조회수 {postDetail?.views}</span>
            <span className={style.comment_count}>댓글 {commentCount}</span>
            <span className={style.recommend_count}>
              추천 {postDetail?.finalLike}
            </span>
          </div>
        </div>
      </div>
      <div className={style.content_wrap} dangerouslySetInnerHTML={ postDetail && {__html: postDetail.content}}/>
      <div className={style.recommend_wrap}>
        <button type="button" className={style.btn_recommend} onClick={onClickLike}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-type="default"
          >
            <path d="M12.8215 10.4987L8.55564 4.31749C8.48688 4.21791 8.40159 4.13798 8.30561 4.08318C8.20963 4.02837 8.10524 4 7.9996 4C7.89396 4 7.78957 4.02837 7.69359 4.08318C7.59761 4.13798 7.51231 4.21791 7.44355 4.31749L3.17768 10.4987C2.77056 11.0887 3.1081 12 3.73373 12H12.2667C12.8923 12 13.2299 11.0887 12.8215 10.4987Z"></path>
          </svg>
          <span>{postDetail?.like}</span>
          <span className="blind">추천 수</span>
        </button>
        <button type="button" className={style.btn_recommend} onClick={onClickDisLike}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-type="default"
          >
            <path d="M12.8215 10.4987L8.55564 4.31749C8.48688 4.21791 8.40159 4.13798 8.30561 4.08318C8.20963 4.02837 8.10524 4 7.9996 4C7.89396 4 7.78957 4.02837 7.69359 4.08318C7.59761 4.13798 7.51231 4.21791 7.44355 4.31749L3.17768 10.4987C2.77056 11.0887 3.1081 12 3.73373 12H12.2667C12.8923 12 13.2299 11.0887 12.8215 10.4987Z"></path>
          </svg>
          <span>{postDetail && postDetail.dislike > 0 ? "-" : ""}{postDetail?.dislike}</span>
          <span className="blind">비추천 수</span>
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
