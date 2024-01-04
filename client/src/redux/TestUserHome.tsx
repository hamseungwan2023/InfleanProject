import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "./UserReducer";

const TestUserHome = () => {
  const users = useSelector((state: any) => state.users);
  console.log(users);
  const dispatch = useDispatch();
  //   console.log(users[0]);

  const handleDelete = (id: any) => {
    dispatch(
      deleteUser({
        id: id,
      })
    );
  };

  return (
    <div>
      {users.map((user: any, index: any) => (
        <div key={index}>
          <h1>{user.id}</h1>
          <h2>{user.nickname}</h2>
          <h3>{user.email}</h3>
          <h4>{user.password}</h4>
          <button>수정</button>
          <button onClick={() => handleDelete(user.id)}>삭제</button>
        </div>
      ))}
    </div>
  );
};

export default TestUserHome;
