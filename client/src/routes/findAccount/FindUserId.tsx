import { useNavigate } from "react-router";
import Style from "./FindAccount.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Timer from "./Timer";

const FindUserId = () => {
  const [secondClick, setSecondClick] = useState<boolean>(false);
  const [emailClick, setEmailClick] = useState<boolean>(false);
  const [phoneClick, setPhoneClick] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [accessCode, setAccessCode] = useState<string>("");
  const [uAccessCode, setUAccessCode] = useState<string>("");
  const [uId, setUId] = useState<string>("");

  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  //로컬스토리지로 로그인여부 확인

  useEffect(() => {
    if (user) {
      alert("로그인하시면 볼 수 없는 페이지 입니다");
      localStorage.clear();
      navigate("/");
    }
    if (emailClick === true) setHide(true);
    if (phoneClick === true) setHide(true);
    getNumber();
  });

  const onChange = (e: any) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "number") {
      setNumber(e.target.value);
    } else if (e.target.name === "uAccessCode") {
      setUAccessCode(e.target.value);
    }
  };

  //이메일로 인증번호 수신
  const postEmail = async (e: any) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post(`/user/findid`, {

    //   setUId(response.data.username);

    //   setSecondClick(true);
    //   }}
    try {
      const response = await axios.post("/user/findid", {
        accessCode,
      });
      setUId(response.data.username);
      setSecondClick(true);
    } catch (err) {
      console.error(err);
    }
  };

  //휴대폰으로 인증번호 수신
  const postPhone = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/user/findid`, {
        phoneNumber: number,
      });
      setUId(response.data.username);
      setSecondClick(true);
    } catch (err) {
      console.error(err);
    }
  };

  //인증번호 가져오기
  const getNumber = async () => {
    try {
      const response = await axios.get(`/api/user/certNumber
      `);
      setAccessCode(response.data.certNumber);
    } catch (err) {
      console.error(err);
    }
  };

  //유저가 입력한 인증번호와 get으로 가져온 인증번호랑 비교
  const compareNumber = (e: any) => {
    e.preventDefault();
    if (accessCode === uAccessCode) {
      alert(`아이디는 ${uId} 입니다`);
    } else {
      alert("인증번호가 다릅니다");
    }
  };

  return (
    <div className={Style.find_wrap}>
      <div>
        <button
          className={Style.FindAccount_Btn}
          onClick={(e) => navigate("/findpw")}
        >
          비밀번호 찾기
        </button>
        <div>
          {emailClick === false ? (
            <div>
              {hide === false ? (
                <button
                  className={Style.firstClick}
                  onClick={() => setEmailClick(true)}
                >
                  이메일로 찾기
                </button>
              ) : null}
            </div>
          ) : (
            <div className={Style.confirm_wrap}>
              <input
                name="email"
                placeholder="인증번호 받으실 이메일을 입력하세요"
                onChange={onChange}
              ></input>
              <button onClick={(e) => postEmail(e)}>인증번호 받기</button>
            </div>
          )}
          {phoneClick === false ? (
            <div>
              {hide === false ? (
                <button
                  className={Style.firstClick}
                  onClick={() => setPhoneClick(true)}
                >
                  휴대전화로 찾기
                </button>
              ) : null}
            </div>
          ) : (
            <div className={Style.confirm_wrap}>
              <input
                name="phone"
                placeholder="인증번호 받으실 전화번호 입력하세요"
                onChange={onChange}
              ></input>
              <button onClick={(e) => postPhone(e)}>인증번호 받기</button>
            </div>
          )}
          {secondClick === true ? (
            <div className={Style.confirm_wrap}>
              <input
                placeholder="인증번호를 입력하세요"
                name="uAccessCode"
                onChange={onChange}
              ></input>
              <button onClick={(e) => compareNumber(e)}>인증하기</button>
              <Timer />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FindUserId;
