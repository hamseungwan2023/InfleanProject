import { useNavigate } from "react-router";
import Style from "./FindAccount.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Timer from "./Timer";

const FindUserPw = () => {
  const [secondClick, setSecondClick] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [uAccessCode, setUAccessCode] = useState<string>("");
  const [uPw, setUPw] = useState<string>("");

  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  //로컬스토리지로 로그인여부 확인

  useEffect(() => {
    if (user) {
      alert("로그인하시면 볼 수 없는 페이지 입니다");
      localStorage.clear();
      navigate("/");
    }
  }, []);

  const onChange = (e: any) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "uAccessCode") {
      setUAccessCode(e.target.value);
    }
  };

  //인증번호 가져오기
  const findPassword = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/email/mailConfirm`, {
        email: email,
      });
      setSecondClick(true);
    } catch (err) {
      console.error(err);
    }
  };

  //유저가 넣은 인증번호랑 get으로 가져온 인증번호 비교하기
  const compareNumber = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/email/resetPassword", {
        email: email,
        username: username,
        code: uAccessCode,
      });
      setUPw(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={Style.form}>
      <div>
        <button
          className={Style.FindAccount_Btn}
          onClick={(e) => navigate("/findid")}
        >
          아이디 찾기
        </button>

        <div className={Style.confirm_wrap}>
          <div className={Style.box}>
            <input
              name="username"
              placeholder="아이디를 입력하세요"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
              name="email"
              placeholder="비밆번호를 찾을 이메일을 입력하세요"
              onChange={onChange}
            ></input>

            {secondClick === false ? (
              <button onClick={(e) => findPassword(e)}>인증번호 받기</button>
            ) : (
              <div>
                <input
                  placeholder="인증번호를 입력하세요"
                  name="uAccessCode"
                  onChange={onChange}
                ></input>
                {uPw.length === 0 && <Timer />}
                <button onClick={(e) => compareNumber(e)}>인증</button>

                {uPw.length > 1 ? (
                  <div>
                    <h2>
                      귀하의 임시 비밀번호는
                      <span className={Style.userInfo}>{uPw}</span>입니다.
                    </h2>
                    <button onClick={(e) => navigate("/")}>
                      로그인 하러가기
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindUserPw;
