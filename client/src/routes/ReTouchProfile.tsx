import { useState, useEffect } from "react";
import Style from "./Profile.module.scss";
import axios from "axios";
import { url } from "./Profile";
import { srcUrl } from "./Profile";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

const RetouchProfile = (userData: any) => {
  const [toBeforeProfile, setToBeforeProfile] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const navigate = useNavigate();

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
  //         userNickname,
  //         userPass,
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  return (
    <div>
      {toBeforeProfile === false ? (
        <div className={Style.retouch_wrapper}>
          <h1>프로필 수정</h1>
          {/* <img src={profileImg} style={{ width: "100px" }}></img> //db 활성화 되면 사용 */}
          <div className={Style.userInfo_wrapper}>
            <div className={Style.nickname_wrapper}>
              <img
                src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                width={"21px"}
              ></img>
              <input
                name="nickname"
                type="text"
                defaultValue={userData.userData.nickname}
                onChange={onChange}
              ></input>
            </div>
            <div className={Style.email_wrapper}>
              <h5>
                <img
                  src="https://t4.ftcdn.net/jpg/05/25/22/63/360_F_525226337_x7lLRcnU08vDLkijRwgcbaIs8zCfDktC.jpg"
                  width={"21px"}
                ></img>
                {userData.userData.email}
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
                  defaultValue={userData.userData.password}
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
                  defaultValue={userData.userData.password}
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
          </div>
          <button
            className={Style.retouchBtn}
            onClick={() => setToBeforeProfile(true)}
          >
            수정 취소
          </button>
          <button className={Style.retouchBtn}>수정 완료</button>
        </div>
      ) : (
        <div>
          <Profile />
        </div>
      )}
    </div>
  );
};

export default RetouchProfile;
