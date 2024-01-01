import axios from "axios";
import React, { useState } from "react";
import "../App.css";
import Style from "./join.module.scss";

const Join = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/user/signup", {
        username,
        nickname,
        password,
        email,
        profileImg,
      });
    } catch (e) {
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
    } else if (e.target.name === "nickname") {
      setNickname(value);
    } else {
      setEmail(value);
    }
  };

  const onProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      const file = files[0];
      /* const locationRef = ref(storage, `avatar/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const uploadUrl = await getDownloadURL(result.ref); */
      const uploadUrl = "업로드된 url 받으면 여기에";
      setProfileImg(uploadUrl);
    } else {
      return;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">ID</label>
      <input
        onChange={onChange}
        name="username"
        type="text"
        placeholder="ID를 입력하세요"
        value={username}
        required
      />
      <label htmlFor="password">PASSWORD</label>
      <input
        onChange={onChange}
        name="password"
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        required
      />
      <label htmlFor="nickname">닉네임</label>
      <input
        onChange={onChange}
        name="nickname"
        type="text"
        placeholder="닉네임을 입력하세요"
        value={nickname}
      />
      <label htmlFor="email">Email</label>
      <input
        onChange={onChange}
        name="email"
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
      />
      <label htmlFor="profileImage" id="profileImageLabel">
        {profileImg ? (
          <img
            src={profileImg}
            alt="회원가입 프로필 이미지"
            style={{ width: "100px" }}
          />
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        )}
      </label>
      <input
        name="profileImage"
        type="file"
        id="profileImage"
        accept="image/*"
        onChange={onProfileImageChange}
      />
      <input type="submit" value={isLoading ? "처리 중 ..." : "회원가입"} />
    </form>
  );
};

export default Join;
