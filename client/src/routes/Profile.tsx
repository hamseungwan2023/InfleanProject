import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Style from "./Profile.module.scss";
import RetouchProfile from "./ReTouchProfile";

export const url = "http://localhost:8080";
export const srcUrl =
  "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

const user = {
  nickname: "홍길동",
  email: "gildong@gmail.com",
  password: "비밀번호486",
};

const Profile = () => {
  const [userReTouch, setUserReTouch] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    // getUserData();
    setIsLoading(false);
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get(`${url}/:user_id`);
      setUserData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  let hidePassword = "";
  for (let i = 0; i < user.password.length; i++) {
    hidePassword += "*";
  }

  return (
    <div>
      {userReTouch === true ? (
        <div className={Style.profile_wrapper}>
          <h1>프로필</h1>
          {/* <img src={profileImg} style={{ width: "100px" }}></img> //db 활성화 되면 사용 */}
          <div className={Style.userInfo_wrapper}>
            <div>
              <img src={srcUrl} style={{ width: "100px" }}></img>
            </div>
            <div className={Style.nickname_wrapper}>
              <h5>{user.nickname}</h5>
            </div>
            <div className={Style.email_wrapper}>
              <h5>{user.email}</h5>
            </div>
            <div className={Style.password_wrapper}>
              <h5>{hidePassword}</h5>
            </div>

            <button
              className={Style.retouchBtn}
              onClick={() => setUserReTouch(false)}
            >
              프로필 수정
            </button>
            <button
              className={Style.retouchBtn}
              onClick={() => navigate("/deleteAccount")}
            >
              계정 삭제
            </button>
          </div>
        </div>
      ) : (
        <div>
          <RetouchProfile userData={user} />
        </div>
      )}
    </div>
  );
};

export default Profile;
