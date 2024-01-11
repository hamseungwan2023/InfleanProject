import React from "react";
import { Link } from "react-router-dom";
import { TPostItem } from "../../constants/postList";
import { getDayMinuteCounter } from "../../utils/getDayMinuteCounter";
import PostDetail from "./PostDetail";
import style from "./PostItem.module.scss";

type Tprops = {
  postItem: TPostItem;
};

<<<<<<< HEAD
const PostItem = ({
  postItem: {
    id,
    title,
    category,
    writer,
    rank,
    finalLike,
    thumbnailUrl,
    commentCount,
    createdAt,
  },
}: Tprops) => {
  return (
    <li className={style.item}>
      <Link to={`/postDetail/${id}`} className={style.link} />
      <div className={style.recommend}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="#dddfe4"
          xmlns="http://www.w3.org/2000/svg"
          data-type="default"
        >
          <path d="M12.8215 10.4987L8.55564 4.31749C8.48688 4.21791 8.40159 4.13798 8.30561 4.08318C8.20963 4.02837 8.10524 4 7.9996 4C7.89396 4 7.78957 4.02837 7.69359 4.08318C7.59761 4.13798 7.51231 4.21791 7.44355 4.31749L3.17768 10.4987C2.77056 11.0887 3.1081 12 3.73373 12H12.2667C12.8923 12 13.2299 11.0887 12.8215 10.4987Z"></path>
        </svg>
        <span className={style.count}>{finalLike}</span>
=======
const PostItem = React.forwardRef<HTMLLIElement, Tprops>(({ postItem :{id, title, category, writer, rank, finalLike, thumbnailUrl, commentCount, createdAt} }, ref) => {
  return <li className={style.item} ref={ref}>
    <Link to={`/postDetail/${id}`} className={style.link} />
    <div className={style.recommend}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="#dddfe4" xmlns="http://www.w3.org/2000/svg" data-type="default"><path d="M12.8215 10.4987L8.55564 4.31749C8.48688 4.21791 8.40159 4.13798 8.30561 4.08318C8.20963 4.02837 8.10524 4 7.9996 4C7.89396 4 7.78957 4.02837 7.69359 4.08318C7.59761 4.13798 7.51231 4.21791 7.44355 4.31749L3.17768 10.4987C2.77056 11.0887 3.1081 12 3.73373 12H12.2667C12.8923 12 13.2299 11.0887 12.8215 10.4987Z"></path></svg>
      <span className={style.count}>
        {finalLike}
      </span>
    </div>
    <div className={style.main}>
      <div data-visited={false} className={style.title_wrap}>
        <strong className={style.title} data-visited={false}>{title}</strong>
        <em className={style.count}>[{commentCount}]</em>
>>>>>>> feature/20240105kdh
      </div>
      <div className={style.main}>
        <div data-visited={false} className={style.title_wrap}>
          <strong className={style.title} data-visited={false}>
            {title}
          </strong>
          <em className={style.count}>[{commentCount}]</em>
        </div>
        <div className={style.info}>
          <span className={style.category}>{category}</span>
          <span className={style.last_update}>
            {getDayMinuteCounter(createdAt)}
          </span>
          <span className={style.writer}>
            <i className={style.rank}>
              <span className="blind">레벨1</span>
            </i>
            <span>{writer}</span>
          </span>
        </div>
      </div>
<<<<<<< HEAD
      <span className={style.thumbnail}>
        <img
          src={thumbnailUrl}
          alt="썸네일 이미지"
          width={93}
          height={60}
          className={style.img}
        />
      </span>
    </li>
  );
};
=======
    </div>
    <span className={style.thumbnail}>
      <img src={thumbnailUrl} alt="썸네일 이미지" width={93} height={60} className={style.img}/>
    </span>
  </li>
})
>>>>>>> feature/20240105kdh

export default PostItem;
