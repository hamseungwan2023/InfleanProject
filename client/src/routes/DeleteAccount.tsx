import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const [deleteBtn, setDeleteBtn] = useState<boolean>(false);
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
      await axios.delete("/user/delete", {
        data: {
          username,
          password,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();

  return (
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
      <button onClick={() => deleteUser}>삭제하기</button>
    </div>
  );
};

export default DeleteAccount;
