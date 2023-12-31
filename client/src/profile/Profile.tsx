import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const url = "http://localhost:8080";
const user = {
  nickname: "홍길동",
  email: "gildong@gmail.com",
  password: "비밀번호486",
};

const Profile = () => {
  const [userReTouch, setUserReTouch] = useState<boolean>(true);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [userNickname, setUserNickname] = useState<string>("");
  const [userPass, setUserPass] = useState<string>("");

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`${url}/:user_id`, {
        //추후에 백엔드 api명세서 나오면 수정
        userNickname,
        userPass,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e: any) => {
    if (e.target.nickname) {
      setUserNickname(e.target.value);
    } else {
      setUserPass(e.target.value);
    }
  };

  let hidePassword = "";
  for (let i = 0; i < user.password.length; i++) {
    hidePassword += "*";
  }
  console.log(hidePassword);

  return (
    <div>
      {userReTouch === true ? (
        <div>
          <h2>닉네임 : {user.nickname}</h2>
          <h5>이메일 : {user.email}</h5>
          <h5>비밀번호 : {hidePassword}</h5>
          <button onClick={() => setUserReTouch(false)}>수정</button>
          <button onClick={() => navigate("/deleteAccount")}>계정 삭제</button>
        </div>
      ) : (
        <div>
          닉네임 :{" "}
          <input
            name="nickname"
            type="text"
            defaultValue={user.nickname}
            onChange={onChange}
          ></input>
          이메일 : <h5>{user.email}</h5>
          {showPass === false ? (
            <div>
              비밀번호:{" "}
              <input
                name="password"
                type="password"
                defaultValue={user.password}
                onChange={onChange}
              ></input>
              <button onClick={() => setShowPass(true)}>비밀번호 보이기</button>
            </div>
          ) : (
            <div>
              비밀번호 :{" "}
              <input
                name="password"
                type="text"
                defaultValue={user.password}
                onChange={onChange}
              ></input>
              <button onClick={() => setShowPass(false)}>
                비밀번호 가리기
              </button>
            </div>
          )}
          <button onClick={() => onSubmit}>수정 완료!</button>
          <button onClick={() => setUserReTouch(true)}>수정 취소</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
