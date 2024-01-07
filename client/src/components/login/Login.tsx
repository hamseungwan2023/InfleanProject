import React, { useState } from "react";
import style from "./Login.module.scss";
import Style from "./LoginForm.module.scss"; //로그인 버튼 클릭시 보이는 css

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import classnames from "classnames";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/login/thunk";
import { userData } from "../../constants/userData";

interface Ires {
  data: {
    accessToken: string;
    refreshToken: string;
    memberId: number;
    nickname: string;
  };
}

interface LoginProps {
  history: any;
}

const Login = () => {
  const [isBtnClick, setIsBtnClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSecretPassword, setIsSecretPassword] = useState(true);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<any>({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const users = useSelector((state: any) => state.users);
  console.log(userData);

  const onClickPasswordShow = (e: React.MouseEvent) => {
    setIsSecretPassword(!isSecretPassword);
  };
  const onChange = (e: any) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const SignIn = async () => {
    const data = userData.find((user: any) => {
      if (user.username === username && user.password === password) {
        return user;
      }
    });
    console.log(data);
    // await axios
    //   .post(`${process.env.REACT_APP_API_URL}/auth/login`, data)
    //   .then((response) => {
    //     localStorage.setItem("accessToken", response.data.token);
    //     window.location.href = `${process.env.REACT_APP_CLIENT_URL}/HealthFoodData`;
    //   });
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
    <div className={style.area_login}>
      <div className={style.wrap_login}>
        {isBtnClick ? (
          <form onSubmit={onSubmit} className={Style.form}>
            <div className={Style.wrapper_username}>
              <input
                onChange={onChange}
                name="username"
                type="text"
                placeholder="아이디"
                value={username}
                maxLength={20}
                className={Style.input}
                required
              />
            </div>
            <div className={Style.wrapper_password}>
              <input
                onChange={onChange}
                name="password"
                type={isSecretPassword ? "password" : "text"}
                placeholder="비밀번호"
                value={password}
                maxLength={20}
                className={style.input}
                required
              />
              <div className={Style.password_info}>
                <button
                  type="button"
                  className={classnames(Style.btn_show, {
                    [Style.is_hide]: !isSecretPassword,
                  })}
                  onClick={onClickPasswordShow}
                >
                  <span className="blind">비밀번호 숨기기</span>
                </button>
              </div>
            </div>
            {/* <input
              type="submit"
              value={isLoading ? "로그인 중 ..." : "로그인하기"}
              disabled={isLoading}
              className={Style.btn_submit}
            /> */}
            <button className={Style.btn_submit} onClick={SignIn}>
              로그인하기
            </button>
          </form>
        ) : (
          <>
            <p className={style.top_text}>글을 작성하시려면 로그인하세요.</p>
            <button
              type="button"
              className={style.btn_login}
              onClick={(e) => setIsBtnClick(true)}
            >
              로그인
            </button>
          </>
        )}
        <div className={style.bottom_menu}>
          <div className={style.info_find}>
            <Link to="">아이디 찾기</Link>
            <span className={style.dot} />
            <Link to="">비밀번호 찾기</Link>
          </div>
          <div className={style.sign_in}>
            <Link to="/join">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
