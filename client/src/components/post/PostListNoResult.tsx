import style from "./PostItem.module.scss";

const PostListNoResult = () => {
  return (
    <div className={style.no_result_wrap}>
      결과가 없습니다.
    </div>
  )
}

export default PostListNoResult;