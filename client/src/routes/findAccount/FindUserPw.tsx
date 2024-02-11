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

  const [initialTime, setInitialTime] = useState<number>(300);
  const [isActive, setIsActive] = useState<boolean>(true);

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

  const handleResetTimer = () => {
    setInitialTime(300); // 초기 시간을 다시 300으로 설정
    setIsActive(true); // 타이머를 다시 활성화
  };

  return (
    <form className={Style.form}>
      <button
        className={Style.FindAccount_Btn}
        onClick={(e) => navigate("/findid")}
      >
        아이디 찾기
      </button>
      <div className={Style.find_wrapper}>
        <div className={Style.wrapper_username}>
          <input
            name="username"
            placeholder="아이디를 입력하세요"
            maxLength={20}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={Style.wrapper_email}>
          <input
            name="email"
            placeholder="비밀번호를 찾을 이메일을 입력하세요"
            onChange={onChange}
          />
        </div>
      </div>

      {secondClick === false ? (
        <button onClick={(e) => findPassword(e)} className={Style.findBtn}>
          인증번호 받기
        </button>
      ) : (
        <div>
          <div className={Style.wrapper_userCode}>
            <input
              placeholder="인증번호를 입력하세요"
              name="uAccessCode"
              onChange={onChange}
            ></input>
          </div>

          {uPw.length === 0 && (
            <Timer initialTime={initialTime} active={isActive} />
          )}
          <button onClick={(e) => compareNumber(e)} className={Style.findBtn}>
            인증하기
          </button>

          {uPw.length > 1 ? (
            <div>
              <div className={Style.wrapper_userInfo}>
                <h2>
                  귀하의 임시 비밀번호는
                  <span className={Style.userInfo}>{uPw}</span>입니다.
                </h2>
              </div>
              <button onClick={(e) => navigate("/")} className={Style.findBtn}>
                로그인 하러가기
              </button>
            </div>
          ) : null}
        </div>
      )}
    </form>
  );
};

export default FindUserPw;
