import classNames from "classnames";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ECategory } from "../../constants/categoryList";
import { TPostItem } from "../../constants/postList";
import { ERegion } from "../../constants/regionList";
import { getDayMinuteCounter } from "../../utils/getDayMinuteCounter";
import { getKeyByValue } from "../../utils/getKeyByValue";
import style from "./PostItem.module.scss";

type Tprops = {
  postItem: TPostItem,
  isPostCorrect: boolean
};

const PostItem = React.forwardRef<HTMLLIElement, Tprops>(({ postItem :{id, title, category, writer, rank, finalLike, thumbnailUrl, contentCount, createdAt, isNotification, location}, isPostCorrect }, ref) => {
  const navigate = useNavigate();

  return <li className={classNames(style.item, {[style.is_notification] : isNotification})} ref={ref}>
    <Link to={`/postDetail/${id}`} className={style.link} />
    { isNotification ?     <div className={style.notice_icon}><img src="https://talk.op.gg/images/icon-notice@2x.png" alt="공지" width="24" /></div> :     
      <div className={style.recommend}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="#dddfe4" xmlns="http://www.w3.org/2000/svg" data-type="default"><path d="M12.8215 10.4987L8.55564 4.31749C8.48688 4.21791 8.40159 4.13798 8.30561 4.08318C8.20963 4.02837 8.10524 4 7.9996 4C7.89396 4 7.78957 4.02837 7.69359 4.08318C7.59761 4.13798 7.51231 4.21791 7.44355 4.31749L3.17768 10.4987C2.77056 11.0887 3.1081 12 3.73373 12H12.2667C12.8923 12 13.2299 11.0887 12.8215 10.4987Z"></path></svg>
        <span className={style.count}>
          {finalLike}
        </span>
      </div>
    }
    <div className={style.main}>
      <div data-visited={false} className={style.title_wrap}>
        <strong className={style.title} data-visited={false}>
          {title}
        </strong>
        <em className={style.count}>[{contentCount}]</em>
        {isPostCorrect && <Link to="/postCorrect/23" className={style.btn_correct}>수정하기</Link>}
      </div>
      <div className={style.info}>
        <span className={style.category}>{getKeyByValue(ERegion, location)}</span>
        <span className={style.category}>{getKeyByValue(ECategory, category)}</span>
        <span className={style.last_update}>
          {getDayMinuteCounter(createdAt)}
        </span>
        <span className={style.writer}>
          <i className={style.rank}>
            <span className="blind">레벨{rank}</span>
          </i>
          <span>{writer}</span>
        </span>
      </div>
    </div>
    <span className={style.thumbnail}>
      <img src={thumbnailUrl} alt="썸네일 이미지" width={93} height={60} className={style.img}/>
    </span>
  </li>
})

export default PostItem;
