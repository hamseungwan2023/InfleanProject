import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import Style from "./Profile.module.scss";
import { useSelector } from "react-redux";
import Modal from "../components/location/Modal";

export const srcUrl =
  "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

const Profile = () => {
  const [userReTouch, setUserReTouch] = useState<boolean>(true);

  const [showPass, setShowPass] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPwOpen, setIsPwOpen] = useState<boolean>(false);

  const [location, setLocation] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [currentPw, setCurrentPw] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [confirmPw, setConfirmPw] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const user = useSelector((state: any) => state.auth.user);
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const AllowedImageExtensions = [".jpg", ".jpeg", ".png", ".svg"]; // 허용할 이미지 확장자들

  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const response = await axios.get(`/user/load-profile/${user?.memberId}`, {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
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

  //백엔드 명세서 나오면 사용

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (isPwOpen == false) {
      try {
        await axios.patch(
          `/profile/update`,
          {
            //추후에 백엔드 api명세서 나오면 수정
            nickname: nickName,
            loaction: location,
            // profileImg: image,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setUserReTouch(false);
      } catch (e) {
        console.log(e);
      }
    } else {
      const passwordRegExp =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      if (!passwordRegExp.test(newPw)) {
        alert(
          "비밀번호: 숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
        );
      }
      if (newPw === confirmPw) {
        try {
          await axios.patch(
            `/user/update`,

            {
              //추후에 백엔드 api명세서 나오면 수정
              nickname: nickName,
              loaction: location,
              password: currentPw,
              newPassword: newPw,
              // profileImg: image,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          setUserReTouch(false);
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("변경할 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  const getAddress = (e: string) => {
    setLocation(e);
  };

  return (
    <div className={Style.form}>
      {isLoggedIn === true ? (
        <div>
          {userReTouch === true ? (
            <div className={Style.profile_wrapper}>
              <h1>프로필</h1>
              {/* <img src={profileImg} style={{ width: "100px" }}></img> //db 활성화 되면 사용 */}
              <div className={Style.userInfo_wrapper}>
                <div>
                  <img src={srcUrl} style={{ width: "150px" }}></img>
                </div>
                <div className={Style.wrapper_nickname}>
                  <h5>{user.nickname}</h5>
                </div>
                <div className={Style.wrapper_rank}>
                  <h5>{user.rank}레벨</h5>
                </div>
                <div className={Style.wrapper_location}>
                  <h5>{user.loaction}</h5>
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
            </div>
          ) : (
            <div>
              <div className={Style.info_wrapper}>
                <h1>프로필 수정</h1>
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
                      <img src={srcUrl} style={{ width: "100px" }}></img>
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
                  <div className={Style.wrapper_location}>
                    <h5>
                      <button onClick={(e) => setIsOpen(true)}>
                        {location.length > 0
                          ? location
                          : `${user.location} 주소를 변경하시겠습니까?`}
                      </button>
                      {isOpen && (
                        <Modal getAddress={getAddress} setIsOpen={setIsOpen} />
                      )}
                      {user.location}
                    </h5>
                  </div>
                  {isPwOpen && (
                    <div>
                      {showPass === false ? (
                        <div>
                          <div className={Style.wrapper_password}>
                            <input
                              name="currentPw"
                              type="password"
                              placeholder="기존 비밀번호"
                              onChange={(e) => setCurrentPw(e.target.value)}
                            />
                            <button
                              className={Style.btn_show}
                              onClick={() => setShowPass(true)}
                            ></button>
                          </div>
                          <div className={Style.wrapper_password}>
                            <input
                              name="password"
                              type="password"
                              onChange={(e) => setNewPw(e.target.value)}
                              placeholder="변경할 비밀번호"
                            />
                            <button
                              className={Style.btn_show}
                              onClick={() => setShowPass(true)}
                            ></button>
                          </div>
                          <div className={Style.wrapper_password}>
                            <input
                              name="confirmPw"
                              type="password"
                              placeholder="비밀번호 확인"
                              onChange={(e) => setConfirmPw(e.target.value)}
                            />
                            <button
                              className={Style.btn_show}
                              onClick={() => setShowPass(true)}
                            ></button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className={Style.wrapper_password}>
                            <input
                              name="currentPw"
                              type="text"
                              placeholder="기존 비밀번호"
                              onChange={(e) => setCurrentPw(e.target.value)}
                            />
                            <button
                              className={Style.btn_noShow}
                              onClick={() => setShowPass(false)}
                            ></button>
                          </div>
                          <div className={Style.wrapper_password}>
                            <input
                              name="password"
                              type="text"
                              placeholder="변경할 비밀번호"
                              onChange={(e) => setNewPw(e.target.value)}
                            ></input>
                            <button
                              className={Style.btn_noShow}
                              onClick={() => setShowPass(false)}
                            ></button>
                          </div>

                          <div className={Style.wrapper_password}>
                            <input
                              name="confirmPw"
                              type="text"
                              placeholder="비밀번호 확인"
                              onChange={(e) => setConfirmPw(e.target.value)}
                            />
                            <button
                              className={Style.btn_noShow}
                              onClick={() => setShowPass(false)}
                            ></button>
                          </div>
                        </div>
                      )}
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
      ) : (
        <div>로그인이 안되면 못 보는 페이지</div>
      )}
    </div>
  );
};

export default Profile;
