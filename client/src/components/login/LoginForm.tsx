import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./LoginForm.module.scss";

interface Ires {
  data: {
    accessToken: string;
    refreshToken: string;
    memberId: number;
    nickname: string;
  };
}

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e: any) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const res: Ires = await axios.post("/user/login", {
      username,
      password,
    });
    try {
      console.log(res.data);
      localStorage.clear();
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      navigate("/");
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={style.form}>
      <div className={style.wrapper_username}>
        <input
          onChange={onChange}
          name="username"
          type="text"
          placeholder="아이디"
          value={username}
          maxLength={20}
          className={style.input}
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
        <div className={style.password_info}><button type="button" className={style.btn_show}><span className="blind">비밀번호 숨기기</span></button></div>
      </div>
      <input
        type="submit"
        value={isLoading ? "로그인 중 ..." : "로그인하기"}
        disabled={isLoading}
        className={style.btn_submit}
      />
  </form>
  )
}

export default LoginForm;