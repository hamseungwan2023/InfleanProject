import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "./Profile";

const DeleteAccount = () => {
  const [deleteBtn, setDeleteBtn] = useState<boolean>(false);
  const [goodbyePage, setGoodbyePage] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChange = (e: any) => {
    if (e.target.username === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const deleteUser = async (e: any) => {
    e.preventDefault();
    try {
      await axios.delete(`${url}/user/delete`, {
        data: {
          username,
          password,
        },
      });
      console.log(1);
      setGoodbyePage(true);
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      회원탈퇴페이지
      {goodbyePage === false ? (
        <div>
          <input
            placeholder="아이디를 입력해주세요..."
            name="username"
            onChange={onChange}
          ></input>
          <input
            placeholder="비밀번호를 입력해주세요..."
            name="password"
            onChange={onChange}
          ></input>
          <button onClick={() => navigate("/profile")}>삭제 취소</button>
          {deleteBtn === false ? (
            <button onClick={() => setDeleteBtn(true)}>계정삭제</button>
          ) : (
            <button onClick={() => deleteUser}>정말로 탈퇴하시겠습니까?</button>
          )}
        </div>
      ) : (
        <div>계정이 삭제 되었습니다</div>
      )}
    </div>
  );
};

export default DeleteAccount;
