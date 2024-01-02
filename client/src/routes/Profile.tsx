import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Style from "./Profile.module.scss";

export const url = "http://localhost:8080";
export const srcUrl =
  "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

export const user = {
  nickname: "홍길동",
  email: "gildong@gmail.com",
  password: "비밀번호486",
};

const Profile = () => {
  const [userReTouch, setUserReTouch] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<string[]>([]);

  const [showPass, setShowPass] = useState<boolean>(false);
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<string>("");

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

  const imageOnChange = (e: any) => {
    if (e.target.files !== null) {
      const selectedFiles = e.target.files as FileList;
      setImage(URL.createObjectURL(selectedFiles?.[0]));
    }
  };

  const onChange = (e: any) => {};

  //   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     try {
  //       await axios.put(`${url}/:user_id`, {
  //         //추후에 백엔드 api명세서 나오면 수정
  //         userData.userData.nickname,
  //         userData.userData.password,
  //         userData.userData.profileImg,
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

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
          <div className={Style.retouch_wrapper}>
            <h1>프로필 수정</h1>
            {/* <img src={profileImg} style={{ width: "100px" }}></img> //db 활성화 되면 사용 */}
            <div className={Style.userInfo_wrapper}>
              <div className={Style.imageUpload_wrapper}>
                <label className={Style.file_input}>
                  <input
                    id="profileImg"
                    type="file"
                    onChange={imageOnChange}
                    style={{ display: "none" }}
                  ></input>
                  <img src={srcUrl} style={{ width: "100px" }}></img>
                </label>
              </div>
              <div className={Style.nickname_wrapper}>
                <img
                  src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                  width={"21px"}
                ></img>
                <input
                  name="nickname"
                  type="text"
                  defaultValue={user.nickname}
                  onChange={onChange}
                ></input>
              </div>
              <div className={Style.email_wrapper}>
                <h5>
                  <img
                    src="https://t4.ftcdn.net/jpg/05/25/22/63/360_F_525226337_x7lLRcnU08vDLkijRwgcbaIs8zCfDktC.jpg"
                    width={"21px"}
                  ></img>
                  {user.email}
                </h5>
              </div>

              {showPass === false ? (
                <div className={Style.password_wrapper}>
                  <img
                    src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-circle-password-icon-vectors-png-image_5053796.jpg"
                    width={"21px"}
                  ></img>
                  <input
                    name="password"
                    type="password"
                    defaultValue={user.password}
                    onChange={onChange}
                  ></input>
                  <button onClick={() => setShowPass(true)}>
                    <img
                      src="https://static.thenounproject.com/png/777497-200.png"
                      width={"21px"}
                    ></img>
                  </button>
                </div>
              ) : (
                <div className={Style.password_wrapper}>
                  <img
                    src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-circle-password-icon-vectors-png-image_5053796.jpg"
                    width={"21px"}
                  ></img>
                  <input
                    name="password"
                    type="text"
                    defaultValue={user.password}
                    onChange={onChange}
                  ></input>
                  <button onClick={() => setShowPass(false)}>
                    <img
                      src="https://www.svgrepo.com/show/390427/eye-password-see-view.svg"
                      width={"21px"}
                    ></img>
                  </button>
                </div>
              )}
            </div>
            <button
              className={Style.retouchBtn}
              onClick={() => setUserReTouch(true)}
            >
              수정 취소
            </button>
            <button className={Style.retouchBtn}>수정 완료</button>
            {/* api 명세 나오면 buttom onClick에  onSubmit함수 넣을 예정 */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
