import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "./UserReducer";

const Update = () => {
  //   const { id } = useParams();
  const id = 1;
  const users = useSelector((state: any) => state.users);
  const dispatch = useDispatch();
  const existingUser = users.filter((f: any) => f.id === id);
  const { nickname, password } = existingUser[0];
  const [uNickname, setNickname] = useState(nickname);
  const [uPassword, setPassword] = useState(password);

  //   console.log("existingUser", existingUser);
  //   console.log("nickname", nickname);
  //   console.log("password", password);

  const onChange = (e: any) => {
    if (e.target.name === "nickname") {
      setNickname(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const handleUpdate = (e: any) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: id,
        nickname: uNickname,
        password: uPassword,
      })
    );
    console.log("uNickname", uNickname);
    console.log("uPassword", uPassword);
  };

  return (
    <div>
      <input
        type="text"
        name="nickname"
        defaultValue={uNickname}
        placeholder={nickname}
        onChange={onChange}
      ></input>
      <input
        type="password"
        name="password"
        defaultValue={uPassword}
        placeholder={password}
        onChange={onChange}
      ></input>
      <button onClick={(e) => handleUpdate(e)}>업데이트 !</button>
    </div>
  );
};

export default Update;
