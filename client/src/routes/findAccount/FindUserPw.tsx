import { useNavigate } from "react-router";
import Style from "./FindAccount.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../slices/login/reducer";
import { useSelector } from "react-redux";

const FindUserPw = () => {
  const [next, setNext] = useState<boolean>(false);
  const [secondClick, setSecondClick] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [accessCode, setAccessCode] = useState<string>("");
  const [uAccessCode, setUAccessCode] = useState<string>("");
  const [uPw, setUPw] = useState<string>("");

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  useEffect(() => {
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

  const getUserData = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/user/findpw`, {
        username: email,
      });
      setUserPhone(response.data.phoneNumber);
      setNext(true);
    } catch (err) {
      console.error(err);
    }
  };

  const postPhone = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/user/findid`, {
        phoneNumber: number,
      });
      setSecondClick(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getNumber = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/certNumber
      `);
      setAccessCode(response.data.accesscode);
      setUPw(response.data.password);
    } catch (err) {
      console.error(err);
    }
  };

  const compareNumber = (e: any) => {
    e.preventDefault();
    if (accessCode === uAccessCode) {
      alert(`비밀번호는 ${uPw} 입니다.`);
    } else {
      alert("인증번호가 다릅니다");
    }
  };

  return (
    <div className={Style.find_wrap}>
      {isLoggedIn === false ? (
        <div>
          <button
            className={Style.FindAccount_Btn}
            onClick={(e) => navigate("/findid")}
          >
            아이디 찾기
          </button>
          {next === false ? (
            <div className={Style.confirm_wrap}>
              <input
                name="email"
                placeholder="비밆번호를 찾을 이메일을 입력하세요"
                onChange={onChange}
              ></input>
              <button onClick={(e) => getUserData(e)}>다음</button>
            </div>
          ) : (
            <div>
              <div>
                <div className={Style.confirm_wrap}>
                  <input
                    name="phone"
                    // defaultValue={userPhone} 이메일의 휴대폰 번호

                    placeholder="인증번호 받으실 전화번호 입력하세요"
                    onChange={onChange}
                  ></input>
                  <button onClick={(e) => postPhone(e)}>인증번호 받기</button>
                </div>

                {secondClick === true ? (
                  <div className={Style.confirm_wrap}>
                    <input
                      placeholder="인증번호를 입력하세요"
                      name="uAccessCode"
                      onChange={onChange}
                    ></input>
                    <button onClick={(e) => compareNumber(e)}>인증하기</button>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FindUserPw;
