import React from "react";
import style from "./PostItem.module.scss";

type Tprops = {
  title: string;
}

const PostItem = ({title}: Tprops) => {
  return <div className={style.item}>
    {title}
  </div>
}

export default PostItem;