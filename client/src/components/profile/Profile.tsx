import classNames from "classnames";
import { Link } from "react-router-dom";
import style from "./Profile.module.scss";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state: any) => state.auth?.user);
  const isLoggedIn = useSelector((state: any) => state.auth?.isLoggedIn);
  console.log(user);
  return (
    <section className={style.profile_wrap}>
      <div className={style.profile_area}>
        <span className={style.rank} />
        <div className={style.info}>
          <div className={style.top_area}>
            <strong className={style.nickname}>{user?.nickname}</strong>
            <Link to="/noteList/23" className={style.send_note}>
              쪽지<span className={style.unread_note_count}>23</span>
            </Link>
          </div>
          <span className={style.level}>{user?.rank}레벨</span>
          <div className={style.bar}>
            <span className={style.gage}>
              <span className="blind">0%</span>
            </span>
          </div>
          <span className={style.level_info}>다음 레벨까지 11 남음</span>
        </div>
      </div>
      <nav className={style.nav}>
        <Link to="/postWrote/23" className={style.link}>
          내가 쓴 글
        </Link>
        <Link to={`/profile/${user?.memberId}`} className={style.link}>
          프로필 수정
        </Link>
        <Link to="/postWrite" className={style.link}>
          글쓰기
        </Link>
      </nav>
    </section>
  );
};

export default Profile;
