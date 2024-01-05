import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Login.module.scss";
import LoginForm from "./LoginForm";

const Login = () => {
  const [isBtnClick, setIsBtnClick] = useState(false);

  const onClick = (e: React.MouseEvent) => {
    setIsBtnClick(true);
  };

  return (
    <div className={style.area_login}>
      <div className={style.wrap_login}>
        {isBtnClick ? (
          <LoginForm />
        ) : (
          <>
            <p className={style.top_text}>글을 작성하시려면 로그인하세요.</p>
            <button type="button" className={style.btn_login} onClick={onClick}>
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
