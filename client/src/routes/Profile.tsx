import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Style from "./Profile.module.scss";
import { useSelector } from "react-redux";
import { tokenRefresh } from "../hooks/tokenRefresh";

export const srcUrl =
  "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

const Profile = () => {
  const [userReTouch, setUserReTouch] = useState<boolean>(true);

  const [showCurrentPw, setShowCurrentPw] = useState<boolean>(false);
  const [showNewPw, setShowNewPw] = useState<boolean>(false);
  const [showNewConfirmPw, setShowNewConfirmPw] = useState<boolean>(false);

  const [isPwOpen, setIsPwOpen] = useState<boolean>(false);
  const [isUpdateImg, setIsUpdateImg] = useState<boolean>(false);

  const [userData, setUserData] = useState<any>({});
  const [nickName, setNickName] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string>("");
  const [updateImgSrc, setUpdateImgSrc] = useState<string>("");
  const [updateImg, setUpdateImg] = useState<Blob | null>(null);
  const [currentPw, setCurrentPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [confirmPw, setConfirmPw] = useState<string>("");

  const user = useSelector((state: any) => state.auth.user);
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const AllowedImageExtensions = [".jpg", ".jpeg", ".png", ".svg"]; // 허용할 이미지 확장자들

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/");
    }
    getUserImg();
    userDetail();
  }, []);

  const userDetail = async () => {
    try {
      const response = await axios.get("/user/api/userDetail", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setNickName(response.data.nickname);
      setUserData(response.data);
      console.log(response);
    } catch (err: any) {
      if (err.response.data.message === "기간이 만료된 토큰") {
        await tokenRefresh(); // 토큰을 갱신한 후에
        // await getUserData(); // 다시 데이터를 가져옴
      }
      console.error(err.response.data.message);
    }
  };

  const getUserImg = async () => {
    try {
      const response = await axios.get<Blob>(`/user/load-profile`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const file = new File([response.data], "image");
      const reader = new FileReader();
      reader.onload = (ev) => {
        const previewImage = String(ev.target?.result);
        setProfileImg(previewImage);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.log(err);
    }
  };

  //image 유형 걸러주는 함수
  // const isValidImageExtension = (filename: any) => {
  //   const extension = filename.slice(
  //     ((filename.lastIndexOf(".") - 1) >>> 0) + 2
  //   );
  //   return AllowedImageExtensions.includes(`.${extension.toLowerCase()}`);
  // };

  const onProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      const reader = new FileReader();

      const file = files[0];
      setUpdateImg(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const imageSrc: string = reader.result;
          setUpdateImgSrc(imageSrc);
          setIsUpdateImg(true);
          console.log(imageSrc);
        }
      };
      reader.readAsDataURL(file);
    } else {
      return;
    }
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const formData = new FormData();
      const jsonData = {
        nickname: nickName,
        password: currentPw,
        newPassword: newPw,
      };
      if (updateImg) {
        formData.append("profileImg", updateImg);
      }
      formData.append(
        "userUpdateDto",
        new Blob([JSON.stringify(jsonData)], { type: "application/json" })
      );
      const response = await axios.patch(`/user/update`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      getUserImg();
      userDetail();
      setUserReTouch(true);
      console.log("수정 성공:", response.data);
    } catch (err) {
      console.error("수정 실패:", err);
    }
  };

  return (
    <div className={Style.form}>
      {isLoggedIn === true ? (
        <div>
          {userReTouch === true ? (
            <div className={Style.profile_wrapper}>
              <div className={Style.infoState_wrapper}>
                <button
                  className={Style.toHomeBtn}
                  title="홈으로"
                  onClick={(e) => navigate("/")}
                ></button>
                <h1>프로필</h1>
              </div>

              <div className={Style.userInfo_wrapper}>
                <div className={Style.wrapper_img}>
                  <img id="image" src={profileImg} />
                  {/* <img src={srcUrl} style={{ width: "150px" }}></img> */}
                </div>
                <div className={Style.wrapper_nickname}>
                  <h5>{userData.nickname}</h5>
                </div>
                <div className={Style.wrapper_rank}>
                  <h5>{userData.rank}레벨</h5>
                </div>
                <div className={Style.wrapper_location}>
                  <h5>지역 : {userData.location}</h5>
                </div>
              </div>
              <div className={Style.wrapper_btn}>
                <button
                  className={Style.retouchBtn}
                  onClick={() => setUserReTouch(false)}
                >
                  프로필 수정
                </button>
                <button
                  className={Style.toDelete}
                  onClick={() => navigate(`/deleteAccount/${user?.memberId}`)}
                >
                  계정 삭제
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className={Style.userInfo_wrapper}>
                <div className={Style.infoState_wrapper}>
                  <button
                    className={Style.toHomeBtn}
                    title="홈으로"
                    onClick={(e) => navigate("/")}
                  ></button>
                  <h1>프로필 수정</h1>
                </div>
                {/* <img src={profileImg} style={{ width: "100px" }}></img> //db 활성화 되면 사용 */}
                <div>
                  <label className={Style.wrapper_imgInput}>
                    <input
                      id="profileImg"
                      type="file"
                      onChange={onProfileImageChange}
                      style={{ display: "none" }}
                    ></input>

                    {isUpdateImg === false ? (
                      <img src={profileImg}></img>
                    ) : (
                      <img src={updateImgSrc}></img>
                    )}
                  </label>
                </div>
                <div className={Style.profile_wrapper}>
                  {isPwOpen === false ? (
                    <div className={Style.wrapper_nickname}>
                      <input
                        name="nickname"
                        type="text"
                        defaultValue={userData.nickname}
                        onChange={(e) => setNickName(e.target.value)}
                      ></input>
                    </div>
                  ) : (
                    <div>
                      {showCurrentPw === false ? (
                        <div>
                          <div className={Style.wrapper_nickname}>
                            <input
                              name="nickname"
                              type="text"
                              defaultValue={userData.nickname}
                              onChange={(e) => setNickName(e.target.value)}
                            ></input>
                          </div>
                          <div className={Style.wrapper_password}>
                            <input
                              name="currentPw"
                              type="password"
                              placeholder="기존 비밀번호"
                              onChange={(e) => setCurrentPw(e.target.value)}
                            />
                            <button
                              className={Style.btn_show}
                              onClick={() => setShowCurrentPw(true)}
                            ></button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className={Style.wrapper_nickname}>
                            <input
                              name="nickname"
                              type="text"
                              defaultValue={userData.nickname}
                              onChange={(e) => setNickName(e.target.value)}
                            ></input>
                          </div>
                          <div className={Style.wrapper_password}>
                            <input
                              name="currentPw"
                              type="password"
                              placeholder="기존 비밀번호"
                              onChange={(e) => setCurrentPw(e.target.value)}
                            />
                            <button
                              className={Style.btn_show}
                              onClick={() => setShowCurrentPw(false)}
                            ></button>
                          </div>
                        </div>
                      )}
                      {showNewPw === false ? (
                        <div className={Style.wrapper_password}>
                          <input
                            name="password"
                            type="password"
                            onChange={(e) => setNewPw(e.target.value)}
                            placeholder="변경할 비밀번호"
                          />
                          <button
                            className={Style.btn_show}
                            onClick={() => setShowNewPw(true)}
                          ></button>
                        </div>
                      ) : (
                        <div className={Style.wrapper_password}>
                          <input
                            name="password"
                            type="text"
                            placeholder="변경할 비밀번호"
                            onChange={(e) => setNewPw(e.target.value)}
                          ></input>
                          <button
                            className={Style.btn_noShow}
                            onClick={() => setShowNewPw(false)}
                          ></button>
                        </div>
                      )}
                      {showNewConfirmPw === false ? (
                        <div className={Style.wrapper_password}>
                          <input
                            name="confirmPw"
                            type="password"
                            placeholder="비밀번호 확인"
                            onChange={(e) => setConfirmPw(e.target.value)}
                          />
                          <button
                            className={Style.btn_show}
                            onClick={() => setShowNewConfirmPw(true)}
                          ></button>
                        </div>
                      ) : (
                        <div className={Style.wrapper_password}>
                          <input
                            name="confirmPw"
                            type="text"
                            placeholder="비밀번호 확인"
                            onChange={(e) => setConfirmPw(e.target.value)}
                          />
                          <button
                            className={Style.btn_noShow}
                            onClick={() => setShowNewConfirmPw(false)}
                          ></button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* api 명세 나오면 buttom onClick에  onSubmit함수 넣을 예정 */}
              </div>
              {isPwOpen === false ? (
                <button
                  className={Style.mainBtn}
                  onClick={() => setIsPwOpen(true)}
                >
                  비밀번호 변경
                </button>
              ) : (
                <button
                  className={Style.mainBtn}
                  onClick={() => setIsPwOpen(false)}
                >
                  비밀번호 변경 취소
                </button>
              )}
              <button
                className={Style.subBtn}
                onClick={() => setUserReTouch(true)}
              >
                수정 취소
              </button>

              <button className={Style.subBtn} onClick={(e) => onSubmit(e)}>
                수정 완료
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
