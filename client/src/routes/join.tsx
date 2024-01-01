import axios from 'axios';
import React, { useState } from 'react';
import style from "./Join.module.scss";
import classnames from "classnames";

const Join = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [realname, setRealname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 오류메세지, 유효여부 상태 저장
  const [requiredMessage, setRequiredMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState("");

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isRealnameValid, setIsRealnameValid] = useState(true);
  const [isBirthdayValid, setIsBirthdayValid] = useState(true);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isProfileImgValid, setIsProfileImgValid] = useState(true);

  const [isUsernameFocus, setIsUsernameFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isRealnameFocus, setIsRealnameFocus] = useState(false);
  const [isBirthdayFocus, setIsBirthdayFocus] = useState(false);
  const [isNicknameFocus, setIsNicknameFocus] = useState(false);
  const [isPhoneFocus, setIsPhoneFocus] = useState(false);
  const [isProfileImgFocus, setIsProfileImgFocus] = useState(false);

  const [profileImgSrc, setProfileImgSrc] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const formData = new FormData();

      if(profileImg) {
        formData.append("profileImg", profileImg);
        const jsonData = {
          username, nickname, password, email: "awdad@naver.com"
        };
  
        formData.append("jsonData",new Blob([JSON.stringify(jsonData)], {type: 'application/json'}));
        await axios.post("/user/signup" , formData, {
          headers: {'Content-Type': 'multipart/form-data', charset: 'utf-8'},
        });
      } 
    } catch(e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === "username") {
      setUsername(value);
      const usernameRegExp = /^[a-zA-z0-9]{4,16}$/;
      if (!usernameRegExp.test(username)) {
        setRequiredMessage("아이디: 4-16사이 대소문자 또는 숫자만 입력해 주세요.");
        setIsUsernameValid(false);
      } else {
        setRequiredMessage("");
        setIsUsernameValid(true);
      }
    } else if (e.target.name === "password") {
      setPassword(value);
      const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      if (!passwordRegExp.test(password)) {
        setRequiredMessage(
          "비밀번호: 숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
        );
        setIsPasswordValid(false);
        console.log("@");
        console.log(isPasswordValid);
      } else {
        setRequiredMessage("");
        setIsPasswordValid(true);
      }
    } else if (e.target.name === "realname") {
      setRealname(value);
    } else if (e.target.name === "birthday") {
      setBirthday(value);
    } else if (e.target.name === "phone") {
      setPhone(value);
    } else if (e.target.name === "nickname") {
      setNickname(value);
    } else {
      return;
    }
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setIsUsernameFocus(true);
      setIsPasswordFocus(false);
      setIsRealnameFocus(false);
      setIsBirthdayFocus(false);
      setIsPhoneFocus(false);
      setIsNicknameFocus(false);
      setIsProfileImgFocus(false);
    } else if (e.target.name === "password") {
      setIsPasswordFocus(true);
      setIsUsernameFocus(false);
      setIsRealnameFocus(false);
      setIsBirthdayFocus(false);
      setIsPhoneFocus(false);
      setIsNicknameFocus(false);
      setIsProfileImgFocus(false);
    } else if (e.target.name === "realname") {
      setIsRealnameFocus(true);
      setIsUsernameFocus(false);
      setIsPasswordFocus(false);
      setIsBirthdayFocus(false);
      setIsPhoneFocus(false);
      setIsNicknameFocus(false);
      setIsProfileImgFocus(false);
    } else if (e.target.name === "birthday") {
      setIsBirthdayFocus(true);
      setIsUsernameFocus(false);
      setIsPasswordFocus(false);
      setIsRealnameFocus(false);
      setIsPhoneFocus(false);
      setIsNicknameFocus(false);
      setIsProfileImgFocus(false);
    } else if (e.target.name === "phone") {
      setIsPhoneFocus(true);
      setIsUsernameFocus(false);
      setIsPasswordFocus(false);
      setIsRealnameFocus(false);
      setIsBirthdayFocus(false);
      setIsNicknameFocus(false);
      setIsProfileImgFocus(false);
    } else if (e.target.name === "nickname") {
      setIsNicknameFocus(true);
      setIsUsernameFocus(false);
      setIsPasswordFocus(false);
      setIsRealnameFocus(false);
      setIsBirthdayFocus(false);
      setIsPhoneFocus(false);
      setIsProfileImgFocus(false);
    } else {
      return;
    }
  }

  const onClickProfileImg = (e:React.MouseEvent) => {
    setIsProfileImgFocus(true);
    setIsUsernameFocus(false);
    setIsPasswordFocus(false);
    setIsRealnameFocus(false);
    setIsBirthdayFocus(false);
    setIsPhoneFocus(false);
    setIsNicknameFocus(false);
  }

  const onProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if(files && files.length === 1) {
      /* const locationRef = ref(storage, `avatar/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const uploadUrl = await getDownloadURL(result.ref); */
      const uploadUrl ="업로드된 url 받으면 여기에";
      const reader = new FileReader();

      setProfileImg(files[0]);
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        if(typeof reader.result === 'string') {
          setProfileImgSrc(reader.result);
        }
      }
      console.log(profileImgSrc);
    }else {
      return;
    }
  }

  return (
    <form onSubmit={onSubmit} className={style.form}>
      <div className={style.input_wrapper}>
        <div className={classnames(style.wrapper_username, { [style.is_error] : !isUsernameValid }, { [style.is_focus] : isUsernameFocus })}>
          <input
            onChange={onChange}
            onFocus={onFocus}
            name="username"
            type="text"
            placeholder="아이디"
            value={username}
            className={style.input}
            maxLength={20}
            required
          />
        </div>
        <div className={classnames(style.wrapper_password, { [style.is_error] : !isPasswordValid }, { [style.is_focus] : isPasswordFocus })}>
          <input
            onChange={onChange}
            onFocus={onFocus}
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            maxLength={20}
            className={style.input}
            required
          />
          <div className={style.password_info}>
            <button type="button" className={style.btn_show}>
              <span className="blind">비밀번호 숨기기</span>
            </button>
          </div>
        </div>
        <div className={classnames(style.wrapper_realname, { [style.is_error] : !isRealnameValid }, { [style.is_focus] : isRealnameFocus })}>
          <input
            onChange={onChange}
            onFocus={onFocus}
            id="realname"
            name="realname"
            type="text"
            placeholder="이름"
            className={style.realname}
            value={realname}
          />
        </div>
        <div className={classnames(style.wrapper_birthday, { [style.is_error] : !isBirthdayValid }, { [style.is_focus] : isBirthdayFocus })}>
          <input
            onChange={onChange}
            onFocus={onFocus}
            id="birthday"
            name="birthday"
            type="text"
            placeholder="생년월일 8자리"
            className={style.birthday}
            value={birthday}
          />
        </div>
      </div>
      {requiredMessage !== "" ? <strong className={style.error_text}>{requiredMessage}</strong> : null}
      <div className={style.input_wrapper}>
        <div className={classnames(style.wrapper_nickname, { [style.is_focus] : isNicknameFocus })}>
          <input
            onChange={onChange}
            onFocus={onFocus}
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임"
            className={style.nickname}
            value={nickname}
          />
        </div>
        <div className={classnames(style.wrapper_phone, { [style.is_focus] : isPhoneFocus })}>
          <input
            onChange={onChange}
            onFocus={onFocus}
            id="phone"
            name="phone"
            type="text"
            placeholder="휴대전화번호"
            className={style.phone}
            value={phone}
          />
        </div>
        <div className={classnames(style.wrapper_profileImg, { [style.is_error] : !isProfileImgValid }, { [style.is_focus] : isProfileImgFocus })}>
          <strong className={style.profileImg_title}>프로필이미지 설정</strong>
          <p className={style.profileImg_desc}>나중에 언제든지 변경할 수 있습니다.</p>
          <label htmlFor="profileImage" className={classnames(style.profileImg_label , { [style.is_focus] : profileImgSrc.length >= 1 })} onClick={onClickProfileImg}>
            {profileImgSrc ? (
                <img className={style.profile_img} src={profileImgSrc} alt="회원가입 프로필 이미지" />
              ) : 
              <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              >
                <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
              </svg>
              }
          </label>
          <input id="profileImage" type="file" className={style.profileImgInput} accept="image/*" onChange={onProfileImageChange} />
        </div>
      </div>
      {selectedMessage !== "" ? <strong className={style.error_text}>{selectedMessage}</strong> : null}
      <div className={style.btn_submit}>
        <input type="submit" value={isLoading ? "처리 중 ..." : "회원가입"} />
      </div>
    </form>
  );
};

export default Join;
