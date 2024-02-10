import classNames from "classnames";
import { Link } from "react-router-dom";
import style from "./Profile.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { tokenRefresh } from "../../slices/reducers/auth";
import { AppDispatch } from "../../slices/store";

const Profile = () => {
  const [userData, setUserData] = useState<any>({});
  const [noRead, setNoRead] = useState<any>("");

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth?.user);
  // console.log(user);
  useEffect(() => {
    getUserData(dispatch);
    notRead();
  }, []);

  const notRead = async () => {
    try {
      const response = await axios.get("/api/noteNotReadReceivedList", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setNoRead(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserData = async (dispatch: AppDispatch) => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const response = await axios.get("/user/api/userDetail", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data);
      setUserData(response.data);
    } catch (err: any) {
      if (err.response.data.message === "기간이 만료된 토큰") {
        dispatch(tokenRefresh(String(refreshToken))); // 토큰을 갱신한 후에
        // await getUserData(); // 다시 데이터를 가져옴
      }
      console.error(err.response.data.message);
    }
  };

  return (
    <section className={style.profile_wrap}>
      <div className={style.profile_area}>
        <span className={style.rank} />
        <div className={style.info}>
          <div className={style.top_area}>
            <strong className={style.nickname}>{userData?.nickname}</strong>
            <Link to="/noteList/23" className={style.send_note}>
              쪽지
              <span className={style.unread_note_count}>{noRead}</span>
            </Link>
          </div>
          <span className={style.level}>{userData?.rank}레벨</span>
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
