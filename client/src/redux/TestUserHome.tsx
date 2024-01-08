import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "./UserReducer";
import { useNavigate } from "react-router";

const TestUserHome = () => {
  const users = useSelector((state: any) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   console.log(users[0]);

  const handleDelete = (id: any) => {
    dispatch(
      deleteUser({
        id: id,
      })
    );
  };

  const accessToken = localStorage.getItem("accessToken") || "";
  const refreshToken = localStorage.getItem("refreshToken") || "";
  const testClick = (e: any) => {
    localStorage.setItem("accessToken", "fdfsad");
    localStorage.setItem("refreshToken", "fdasfdasfs");
    navigate("/");
  };
  const clear = (e: any) => {
    localStorage.clear();
  };

  return (
    <div>
      {/* {users.map((user: any, index: any) => (
        <div key={index}>
          <h1>{user.id}</h1>
          <h2>{user.nickname}</h2>
          <h3>{user.email}</h3>
          <h4>{user.password}</h4>
          <button>수정</button>
          <button onClick={() => handleDelete(user.id)}>삭제</button>
        </div>
      ))} */}

      <button onClick={(e) => testClick(e)}>로컬스토리지받기</button>
      <button onClick={(e) => clear(e)}>클리아</button>
      {/* <input
        onChange={onChange}
        name="username"
        type="text"
        placeholder="아이디"
        value={username}
        maxLength={20}
        required
      />
      <input
        onChange={onChange}
        name="password"
        placeholder="비밀번호"
        value={password}
        maxLength={20}
        required
      />
      <button onClick={(e) => handleLogin(e)}>로그인</button> */}
    </div>
  );
};

export default TestUserHome;
