import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import Style from "./Profile.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../slices/store";
import Modal from "../components/location/Modal";
import { updateNickname, updateProfile } from "../slices/reducers/auth";

export const srcUrl =
  "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

const Profile = () => {
  const [userReTouch, setUserReTouch] = useState<boolean>(true);

  const [showCurrentPw, setShowCurrentPw] = useState<boolean>(false);
  const [showNewPw, setShowNewPw] = useState<boolean>(false);
  const [showNewConfirmPw, setShowNewConfirmPw] = useState<boolean>(false);

  const [isPwOpen, setIsPwOpen] = useState<boolean>(false);

  const [nickName, setNickName] = useState<string>("");
  const [profileImg, setProfileImg] = useState("");
  const [currentPw, setCurrentPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [confirmPw, setConfirmPw] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const user = useSelector((state: any) => state.auth.user);
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const dispatch: AppDispatch = useDispatch();

  const AllowedImageExtensions = [".jpg", ".jpeg", ".png", ".svg"]; // 허용할 이미지 확장자들

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/");
    }
    getUserData();
  }, [isLoggedIn]);

  const getUserData = async () => {
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
  const isValidImageExtension = (filename: any) => {
    const extension = filename.slice(
      ((filename.lastIndexOf(".") - 1) >>> 0) + 2
    );
    return AllowedImageExtensions.includes(`.${extension.toLowerCase()}`);
  };

  const imageOnChange = (e: any) => {
    if (e.target.files !== null) {
      const selectedFiles = e.target.files as FileList;
      setImage(URL.createObjectURL(selectedFiles?.[0]));
      if (!isValidImageExtension(image)) {
        alert("jpg, jpeg, png, svg의 형태만 가능합니다.");
        return null;
      }
    }
  };
  console.log(nickName);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!isPwOpen) {
      dispatch(updateNickname(nickName));
    } else {
      dispatch(updateProfile(nickName, currentPw, newPw));
    }
  };

  return (
    <div className={Style.form}>
      {isLoggedIn === true ? (
        <div>
          {userReTouch === true ? (
            <div className={Style.profile_wrapper}>
              <div className={Style.infoState_wrapper}>
                <h1>프로필</h1>
              </div>

              <div className={Style.userInfo_wrapper}>
                <div>
                  <img id="image" src={profileImg} />
                  {/* <img src={srcUrl} style={{ width: "150px" }}></img> */}
                </div>
                <div className={Style.wrapper_nickname}>
                  <h5>{user.nickname}</h5>
                </div>
                <div className={Style.wrapper_rank}>
                  <h5>{user.rank}레벨</h5>
                </div>
                <div className={Style.wrapper_location}>
                  <h5>지역 : {user.loaction}</h5>
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
            <div className={Style.profile_wrapper}>
              <div className={Style.userInfo_wrapper}>
                <div className={Style.infoState_wrapper}>
                  <h1>프로필 수정</h1>
                </div>
                {/* <img src={profileImg} style={{ width: "100px" }}></img> //db 활성화 되면 사용 */}
                <div>
                  <div>
                    <label className={Style.imgInput}>
                      <input
                        id="profileImg"
                        type="file"
                        onChange={imageOnChange}
                        style={{ display: "none" }}
                      ></input>
                      <img src={profileImg}></img>
                    </label>
                  </div>
                  <div className={Style.wrapper_nickname}>
                    <input
                      name="nickname"
                      type="text"
                      defaultValue={user.nickname}
                      onChange={(e) => setNickName(e.target.value)}
                    ></input>
                  </div>

                  {isPwOpen && (
                    <div>
                      {showCurrentPw === false ? (
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
                      ) : (
                        <div className={Style.wrapper_password}>
                          <input
                            name="currentPw"
                            type="text"
                            placeholder="기존 비밀번호"
                            onChange={(e) => setCurrentPw(e.target.value)}
                          />
                          <button
                            className={Style.btn_noShow}
                            onClick={() => setShowCurrentPw(false)}
                          ></button>
                        </div>
                      )}
                      <div>
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
                              onClick={() => setShowNewConfirmPw(false)}
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
                    </div>
                  )}
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

                {/* api 명세 나오면 buttom onClick에  onSubmit함수 넣을 예정 */}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
