import axios from 'axios';
import { BADHINTS } from 'dns';
import React, { useState } from 'react';
import style from "./join.module.scss";

const Join = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [realname, setRealname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      await axios.post("/user/signup" , {
        username, nickname, password, profileImg
      }); 

    } catch(e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === "username") {
      setUsername(value);
    } else if (e.target.name === "password") {
      setPassword(value);
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

  const onProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if(files && files.length === 1) {
      const file = files[0];
      /* const locationRef = ref(storage, `avatar/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const uploadUrl = await getDownloadURL(result.ref); */
      const uploadUrl ="업로드된 url 받으면 여기에";
      setProfileImg(uploadUrl);
    }else {
      return;
    }
  }

  return (
    <form onSubmit={onSubmit} className={style.form}>
      <div className={style.input_wrapper}>
        <div className={style.wrapper_id}>
          <input
            onChange={onChange}
            name="username"
            type="text"
            placeholder="아이디"
            value={username}
            className={style.input}
            maxLength={20}
            required
          />
        </div>
        <div className={style.wrapper_password}>
          <input
            onChange={onChange}
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
        <div className={style.wrapper_realname}>
          <input
            onChange={onChange}
            id="nickname"
            name="nickname"
            type="text"
            placeholder="이름"
            className={style.realname}
            value={realname}
          />
        </div>
        <div className={style.wrapper_birthday}>
          <input
            onChange={onChange}
            id="birthday"
            name="birthday"
            type="text"
            placeholder="생년월일 8자리"
            className={style.birthday}
            value={birthday}
          />
        </div>
      </div>
      <strong className={style.error_text}></strong>
      <div className={style.input_wrapper}>
        <div className={style.wrapper_nickname}>
          <input
            onChange={onChange}
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임"
            className={style.nickname}
            value={nickname}
          />
        </div>
        <div className={style.wrapper_phone}>
          <input
            onChange={onChange}
            id="phone"
            name="phone"
            type="text"
            placeholder="휴대전화번호"
            className={style.phone}
            value={phone}
          />
        </div>
        <div className={style.wrapper_profileImg}>
          <strong className={style.profileImg_title}>프로필이미지 설정</strong>
          <p className={style.profileImg_desc}>나중에 언제든지 변경할 수 있습니다.</p>
          <label htmlFor="profileImage" className={style.profileImg_label} >
            {profileImg ? (
                <img src={profileImg} alt="회원가입 프로필 이미지" style={{width: "100px"}}/>
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
      <strong className={style.error_text}></strong>
      <div className={style.btn_submit}>
        <input type="submit" value={isLoading ? "처리 중 ..." : "회원가입"} />
      </div>
    </form>
  );
};

export default Join;
