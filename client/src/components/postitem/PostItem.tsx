import React from "react";
import { Link } from "react-router-dom";
import style from "./PostItem.module.scss";

type Tprops = {
  title: string;
}

const PostItem = ({title}: Tprops) => {
  return <li className={style.item}>
    <Link to="/postDetail/:id" className={style.link} />
    <div className={style.recommend}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="#dddfe4" xmlns="http://www.w3.org/2000/svg" data-type="default"><path d="M12.8215 10.4987L8.55564 4.31749C8.48688 4.21791 8.40159 4.13798 8.30561 4.08318C8.20963 4.02837 8.10524 4 7.9996 4C7.89396 4 7.78957 4.02837 7.69359 4.08318C7.59761 4.13798 7.51231 4.21791 7.44355 4.31749L3.17768 10.4987C2.77056 11.0887 3.1081 12 3.73373 12H12.2667C12.8923 12 13.2299 11.0887 12.8215 10.4987Z"></path></svg>
      <span className={style.count}>
        406
      </span>
    </div>
    <div className={style.main}>
      <div data-visited={false} className={style.title_wrap}>
        <strong className={style.title} data-visited={false}>요즘 유행한다는 띠부씰.jpg</strong>
        <em className={style.count}>[27]</em>
      </div>
      <div className={style.info}>
        <span className={style.category}>시사</span>
        <span className={style.last_update}>9시간 전</span>
        <span className={style.writter}>
          <i className={style.rank}><span className="blind">레벨1</span></i>
          <span>작성자</span>
        </span>
      </div>
    </div>
    <span className={style.thumbnail}>
      <img src="https://opgg-com-image.akamaized.net/attach/images/20240103063850.2121435.jpg?image=w_200" alt="aasdasd" width={93} height={60} className={style.img}/>
    </span>
  </li>
}

export default PostItem;